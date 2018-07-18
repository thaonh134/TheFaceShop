using ananlips.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ananlips.Controllers
{
    public class CategoryController : Controller
    {
        // GET: Category
        public ActionResult Index(string Id)
        {
            var dict = new Dictionary<string, object>();
            dict["data_Product"] = DefaultView.FE_Product.GetByCategory(Id);
            return View(dict);
        }
    }
}