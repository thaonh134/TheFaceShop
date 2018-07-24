using ananlips.Models;
using ananlips.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ananlips.Controllers
{
    public class SubCategoryController : GuestController
    {
        // GET: Category
        public ActionResult Index(string Id)
        {
            var dict = new Dictionary<string, object>();
            var item= DefaultView.FE_SubCategory.GetDetail(Id);
            dict["data_SubCategory"] = item;
            dict["data_Category"] = DefaultView.FE_Category.GetDetail(item.CategoryId.ToString());
            dict["data_lstSubCategory"] = DefaultView.FE_SubCategory.GetByCategory(item.CategoryId.ToString());
            return View(dict);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Read(SearchRequest request, string id)
        {

            var data = DefaultView.FE_Product.SearchBySubCategory(request, id);
            return Json(data);
        }
    }
}