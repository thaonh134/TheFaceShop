using ananlips.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ananlips.Models.DefaultView;

namespace ananlips.Controllers
{
    public class BillController : Controller
    {
        // GET: Category
        public ActionResult Index()
        {
            var dict = new Dictionary<string, object>();
            //if(!string.IsNullOrEmpty(ProductId))  DefaultView.FE_Bill.AddItemToBillSection( ProductId);
            dict["data_Bill"] = DefaultView.FE_Bill.GetBillSection();
            return View(dict);
        }
        public ActionResult AddToBill(FE_BillDetail Item)
        {
            var dict = new Dictionary<string, object>();
            if (!string.IsNullOrEmpty(Item.ProductId.ToString())) DefaultView.FE_Bill.AddItemToBillSection(Item);
            dict["data_Bill"] = DefaultView.FE_Bill.GetBillSection();
            return RedirectToAction("Index");
        }

        public ActionResult QuickBill(FE_QuickBillDetail Item)
        {

            var bill = DefaultView.FE_Bill.ConvertQuickBill(Item);
            return Json(new { success = true, data = bill });
        }
        [HttpPost]
        public ActionResult RemoveBillItem(FE_BillDetail Item)
        {

            DefaultView.FE_Bill.RemoveItemBillSection(Item);
            return PartialView("_BillDetailPartial");
        }
        [HttpPost]
        public ActionResult UpdateBillItem(List<FE_BillDetail> lstItem)
        {
            DefaultView.FE_Bill.UpdateBillItem(lstItem);
            return PartialView("_BillDetailPartial");
        }
        public ActionResult SaveBill(FE_BillDetail Item)
        {
            return Json(new { success = true, data = Item });
        }
    }
}