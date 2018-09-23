using ananlips.Service;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ananlips.Areas.Admin.Models.CommonModel;

namespace ananlips.Areas.Admin.Controllers
{
    public class HomeController : CustomController
    {
        // GET: Admin/Home
        public ActionResult Index()
        {
            if (Convert.ToBoolean( ViewData["IsAuthenticated"]) == false)  return RedirectToAction("NoAccess", "Error");
            return View();
        }
        public ActionResult PartialChangePass()
        {
            return PartialView("_ChangePass");
        }
        [HttpPost]
        public ActionResult UploadFiles()
        {
            var r = new List<ViewDataUploadFilesResult>();

            foreach (string file in Request.Files)
            {
                var statuses = new List<ViewDataUploadFilesResult>();
                var headers = Request.Headers;

                if (string.IsNullOrEmpty(headers["X-File-Name"]))
                {
                    UploadWholeFile(Request, statuses);
                }
                //else
                //{
                //    UploadPartialFile(headers["X-File-Name"], Request, statuses);
                //}

                JsonResult result = Json(statuses);
                result.ContentType = "text/plain";

                return result;
            }

            return Json(r);
        }
        private void UploadWholeFile(HttpRequestBase request, List<ViewDataUploadFilesResult> statuses)
        {
            for (int i = 0; i < request.Files.Count; i++)
            {
                var file = request.Files[i];
                var fileName = string.Format(@"{0}"+ Path.GetExtension(file.FileName), Guid.NewGuid());
                var fullPath = Path.Combine(StorageRoot, Path.GetFileName(fileName));

                file.SaveAs(fullPath);

                statuses.Add(new ViewDataUploadFilesResult()
                {
                    name = file.FileName,
                    size = file.ContentLength,
                    type = file.ContentType,
                    url = "/Files/Download/" + fileName,
                    //delete_url = "/Home/Delete/" + file.FileName,
                    //thumbnail_url = @"data:image/png;base64," + EncodeFile(fullPath),
                    //delete_type = "GET",
                });
            }
        }
        private string StorageRoot
        {
            get { return Path.Combine(Server.MapPath("~/Files/Download")); }
        }
        private string EncodeFile(string fileName)
        {
            return Convert.ToBase64String(System.IO.File.ReadAllBytes(fileName));
        }
    }
}