using ananlips.Models;
using ananlips.Service;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ananlips.Controllers
{
    public class HomeController : GuestController
    {
        public ActionResult Index()
        {
            var dict = new Dictionary<string, object>();
            dict["data_MenuItem"] = DefaultView.FE_MenuItem.GetHomeItem();
            dict["data_ProductGroupByCategory"] = DefaultView.FE_Product.GetByGroupCategory(8);
            return View(dict);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        //===============================================Cac ham khac======================================================        

        public ActionResult Download(string urlFolder, string file)
        {
            string fileName = urlFolder + file;
            string fullPath = Path.Combine(Server.MapPath("~/"), fileName);
            return File(fullPath, System.Net.Mime.MediaTypeNames.Application.Octet, file);
        }
    }
}