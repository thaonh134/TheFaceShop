using ananlips.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ananlips.Controllers
{
    public class BillController : Controller
    {
        // GET: Category
        public ActionResult Index(string ProductId)
        {
            var dict = new Dictionary<string, object>();
            if(!string.IsNullOrEmpty(ProductId))  DefaultView.FE_Bill.AddItemToBillSection( ProductId);
            dict["data_Bill"] = DefaultView.FE_Bill.GetBillSection();
            return View(dict);
        }
    }
}