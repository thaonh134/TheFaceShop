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
            dict["data_Category"] = DefaultView.FE_Category.GetDetail(Id);
            dict["data_lstSubCategory"] = DefaultView.FE_SubCategory.GetByCategory(Id);
            
            return View(dict);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Read(SearchRequest request, string id)
        {
          
            var data = DefaultView.FE_Product.SearchByCategory(request,id);
            return Json(data);
        }
    }
}