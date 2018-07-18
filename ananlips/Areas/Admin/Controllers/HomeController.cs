using ananlips.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}