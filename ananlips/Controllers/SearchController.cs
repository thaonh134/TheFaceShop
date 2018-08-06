using ananlips.Models;
using ananlips.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ananlips.Controllers
{
    public class SearchController : GuestController
    {
        // GET: Category
        public ActionResult Index(  string keyword)
        {
            var dict = new Dictionary<string, object>();
            
            dict["data_SearchRequest"] = new SearchRequest();
            dict["data_keyword"] = keyword;
            return View(dict);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Read(SearchRequest request, string id, string keyword)
        {

            var data = DefaultView.FE_Product.SearchByKeyWord(request,  keyword);
            return Json(data);
        }
    }
}