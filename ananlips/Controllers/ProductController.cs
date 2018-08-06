using ananlips.Models;
using ananlips.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ananlips.Controllers
{
    public class ProductController : GuestController
    {
        // GET: Category
        public ActionResult Index(string Id)
        {
            var dict = new Dictionary<string, object>();

            var item = DefaultView.FE_Product.GetDetail(Id);
            dict["data_SubCategory"] = DefaultView.FE_SubCategory.GetDetail(item.SubCategoryId.ToString()); ;
            dict["data_Category"] = DefaultView.FE_Category.GetDetail(item.CategoryId.ToString());
            dict["data_lstProduct"] = DefaultView.FE_Product.GetBySubCategory(item.SubCategoryId.ToString());

            dict["data_Product"] = item;
            return View(dict);
        }

       
    }
}