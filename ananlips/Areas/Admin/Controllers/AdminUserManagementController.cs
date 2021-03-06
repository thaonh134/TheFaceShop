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
using ananlips.ConstantValue;

namespace ananlips.Areas.Admin.Controllers
{
    public class AdminUserManagementController : CustomController
    {
        #region Tree
        public ActionResult Index(string redirectbyajax, string entryid, string actiontype, string fa)
        {
            //fa: form another - default form popup
            IDbConnection dbConn = new OrmliteConnection().openConn();
            var dict = new Dictionary<string, object>();
            dict["activestatus"] = CustomModel.GetActiveStatus();
            dict["listLoginType"] = CustomModel.GetLoginTypeDDL();
            dict["listlanguage"] = CustomModel.GetLanguage();
            dict["areasname"] = "Admin";
            dict["redirectbyajax"] = string.IsNullOrEmpty(redirectbyajax) ? "0" : "1";
            dbConn.Close();

            //param cho form
            ViewBag.entryid = string.IsNullOrEmpty(entryid) ? "0" : entryid;
            ViewBag.actiontype = string.IsNullOrEmpty(actiontype) ? "" : actiontype;
            ViewBag.fa = string.IsNullOrEmpty(fa) ? "" : fa;
            return View("UserManagementTree", dict);

        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Read([DataSourceRequest]DataSourceRequest request, string logintype, string isactive)
        {
            string whereCondition = "";
            if (request.Filters.Count > 0)
            {
                whereCondition = " AND " + new KendoApplyFilter().ApplyFilter(request.Filters[0]);
            }
            //var UserType = 1;//1: backend|2: card-holder|3: pos
            var userid = 0;
            logintype = string.IsNullOrEmpty(logintype) ? "0" : logintype;
            var data = new AuthUser().GetPage(request, whereCondition,Convert.ToInt32(logintype), isactive, userid);
            return Json(data);
        }

        //===============================================Import export==================================================

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
            return View("UserManagementForm", dict);


        }

        [HttpPost]
        public ActionResult Create(AuthUser item)
        {
            IDbConnection db = new OrmliteConnection().openConn();
            try
            {
                if (string.IsNullOrEmpty(item.entryname) || string.IsNullOrEmpty(item.entrycode)) return Json(new { success = false, message = tw_Lang.Common_ActionResult_MissingInfo });
                var isExist = AuthUser.GetById(item.entryid,null,false) ;

                //Validate

                //insert / update
                if (item.entryid == 0)
                {
                    //insert
                    item.password = SqlHelper.GetMd5Hash("123456"); ;
                    item.entrycode = item.entryname;
                    item.logintype =(int) LoginType.Admin;
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
                var isExist =AuthUser.GetById(entryid,null,false);
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
                var data =AuthUser.GetById(entryid, null, false);
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