using ananlips.Areas.Admin.Models;
using ananlips.Resources;
using ananlips.Service;
using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ServiceStack.OrmLite;
using System.Text;
using System.IO;
using OfficeOpenXml;
using System.Data.SqlClient;

namespace ananlips.Areas.Admin.Controllers
{
    public class MasterCategoryManagementController : CustomController
    {
        #region Tree
        public ActionResult Index(string redirectbyajax, string entryid, string actiontype, string fa)
        {
            //fa: form another - default form popup
            IDbConnection dbConn = new OrmliteConnection().openConn();
            var dict = new Dictionary<string, object>();
            dict["activestatus"] = CustomModel.GetActiveStatus();
            dict["listlanguage"] = CustomModel.GetLanguage();
            dict["areasname"] = "Admin";
            dict["redirectbyajax"] = string.IsNullOrEmpty(redirectbyajax) ? "0" : "1";
            dbConn.Close();

            //param cho form
            ViewBag.entryid = string.IsNullOrEmpty(entryid) ? "0" : entryid;
            ViewBag.actiontype = string.IsNullOrEmpty(actiontype) ? "" : actiontype;
            ViewBag.fa = string.IsNullOrEmpty(fa) ? "" : fa;
            return View("CategoryManagementTree", dict);

        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Read([DataSourceRequest]DataSourceRequest request, string isactive)
        {
            string whereCondition = "";
            if (request.Filters.Count > 0)
            {
                whereCondition = " AND " + new KendoApplyFilter().ApplyFilter(request.Filters[0]);
            }
            //var UserType = 1;//1: backend|2: card-holder|3: pos
            var userid = 0;
            var data = new Category().GetPage(request, whereCondition, isactive, userid);
            return Json(data);
        }

         //===============================================Import export==================================================
        public FileResult Export([DataSourceRequest]DataSourceRequest request)
        {
            ExcelPackage pck = new ExcelPackage(new FileInfo(Server.MapPath("~/ExportTemplate/Category.xlsx")));
            ExcelWorksheet ws = pck.Workbook.Worksheets["Data"];
            string whereCondition = "";
            if (request.Filters.Count > 0)
            {
                whereCondition = " AND " + new KendoApplyFilter().ApplyFilter(request.Filters[0]);
            }
            IDbConnection db = new OrmliteConnection().openConn();
            var lstResult = new Category().GetExport(request, whereCondition,"1",0);
            int rowNum = 2;
            foreach (var item in lstResult)
            {
                ws.Cells["A" + rowNum].Value = item.entryid;
                ws.Cells["B" + rowNum].Value = item.entrycode;
                ws.Cells["C" + rowNum].Value = item.entryname;
                ws.Cells["D" + rowNum].Value = item.isactive == true ? "Đang hoạt động" : "Ngưng hoạt động";
               
                rowNum++;
            }
            db.Close();

           
            // Sheet Active
            ws = pck.Workbook.Worksheets["Active"];
            rowNum = 2;
            foreach (var item in  CustomModel.GetActiveStatus())
            {
                ws.Cells["A" + rowNum].Value = item.Name;
                rowNum++;
            }
            MemoryStream output = new MemoryStream();
            pck.SaveAs(output);
            return File(output.ToArray(), //The binary data of the XLS file
                        "application/vnd.ms-excel", //MIME type of Excel files
                        "Category_" + DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".xlsx");     //Suggested file name in the "Save as" dialog which will be displayed to the end user
        }

        [HttpPost]
        public ActionResult Import()
        {
            try
            {
                if (Request.Files["FileUpload"] != null && Request.Files["FileUpload"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["FileUpload"].FileName);
                    if (fileExtension == ".xls" || fileExtension == ".xlsx")
                    {
                        string fileLocation = string.Format("{0}/{1}", Server.MapPath("~/ExcelImport"), Request.Files["FileUpload"].FileName);
                        string SystemFolder = string.Format("{0}", Server.MapPath("~/"));
                        if (System.IO.File.Exists(fileLocation))
                        {
                            System.IO.File.Delete(fileLocation);
                        }

                        // Save file to folder                            
                        Request.Files["FileUpload"].SaveAs(fileLocation);

                        List<SqlParameter> param = new List<SqlParameter>();
                        param.Add(new SqlParameter("@UserID", currentUser.entryid));
                        param.Add(new SqlParameter("@FilePath", fileLocation));
                        param.Add(new SqlParameter("@SystemFolder", SystemFolder));
                        DataSet ds = new SqlHelper().ExcuteQueryDataSet("p_Category_Import", param);
                        if (ds.Tables.Count != 2)
                        {
                            return Json(new { success = true });
                        }
                        else
                        {
                            return Json(new { success = true, errorfile = ds.Tables[1].Rows[0][0].ToString() });
                        }

                    }
                }
                return Json(new { success = false, message = "Không có file hoặc file không phải là Excel" });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }

        //===============================================Openpopup======================================================        


        #endregion
        #region Form
        public ActionResult FormPopup(string entryid, string entrykey, string redirectbyajax)
        {
            IDbConnection dbConn = new OrmliteConnection().openConn();
            var dict = new Dictionary<string, object>();
            dict["activestatus"] = CustomModel.GetActiveStatus();

            dict["ddl_article_type"] = CustomModel.GetActiveStatus();
            dbConn.Close();

            //set parameter

            dict["redirectbyajax"] = redirectbyajax;
            ViewBag.entryid = string.IsNullOrEmpty(entryid) ? "0" : entryid;
            ViewBag.entrykey = string.IsNullOrEmpty(entrykey) ? "0" : entrykey;
            return View("CategoryManagementForm", dict);


        }

        [HttpPost]
        public ActionResult Create(Category item)
        {
            IDbConnection db = new OrmliteConnection().openConn();
            try
            {
                if (string.IsNullOrEmpty(item.entryname) || string.IsNullOrEmpty(item.entrycode)) return Json(new { success = false, message = tw_Lang.Common_ActionResult_MissingInfo });
                var isExist = Category.GetById(item.entryid) ;

                //Validate

                //insert / update
                if (item.entryid == 0)
                {
                    //insert
                    item.createdat = DateTime.Now;
                    item.createdby = currentUser.entryid;
                    item.updatedat = DateTime.Now;
                    item.updatedby = currentUser.entryid;
                    item.isactive = true;

                }
                else
                {
                    //update
                    item.createdby = isExist.createdby;
                    item.updatedat = DateTime.Now;
                    item.updatedby = currentUser.entryid;

                }
                item.AddOrUpdate(currentUser.entryid);
                return Json(new { success = true, data = item });

            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
            finally { db.Close(); }

        }
       

        [HttpPost]
        public ActionResult UpdateActiveStatus(int entryid, bool isactive)
        {
            IDbConnection db = new OrmliteConnection().openConn();
            try
            {
                var isExist =Category.GetById(entryid);
                isExist.isactive = isactive;
                isExist.updatedby = currentUser.entryid;
                isExist.updatedat = DateTime.Now;
                db.UpdateOnly(isExist,
                                    onlyFields: p =>
                                        new
                                        {
                                            p.isactive,
                                            p.updatedat,
                                            p.updatedby
                                        },
                                where: p => p.entryid == entryid);
                return Json(new { success = true });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
            finally { db.Close(); }
        }

        [HttpPost]
        public ActionResult GetByID(int entryid)
        {
            IDbConnection dbConn = new OrmliteConnection().openConn();
            try
            {
                var data =Category.GetById(entryid);
                var ref_Roles = CustomModel.GetActiveStatus(); 
                return Json(new
                {
                    success = true,
                    data = data
                   
                });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
            finally { dbConn.Close(); }
        }
        #endregion

    }
}