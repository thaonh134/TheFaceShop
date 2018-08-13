using ananlips.Areas.Admin.Models;
using ananlips.Models;
using ananlips.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ananlips.Models.DefaultView;

namespace ananlips.Controllers
{
    public class BillController : GuestController
    {
        // GET: Category
        public ActionResult Index()
        {
            var dict = new Dictionary<string, object>();
            //if(!string.IsNullOrEmpty(ProductId))  DefaultView.FE_Bill.AddItemToBillSection( ProductId);
            dict["data_Bill"] = DefaultView.FE_Bill.GetBillSection();
            return View(dict);
        }
        public ActionResult CheckOut()
        {
            
            var dict = new Dictionary<string, object>();
            var userID= ViewData["AuthUser"] == null?0 : ((AuthUser)ViewData["AuthUser"]).entryid;
            var Delivery = DefaultView.FE_Delivery.GetDefaultDelivery(userID);
            dict["data_Bill"] = DefaultView.FE_Bill.BindFullBill(userID, Delivery);
            return View(dict);
        }
        public ActionResult AddItemToBill(FE_BillDetail Item)
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
        //Bill checkout
        public ActionResult SaveBill(FE_Delivery Item)
        {
            //valid
            if(DefaultView.GetRandomCapcha()!=Item.CaptchaCode) return Json(new { success = false , message="Mã xác minh không đúng." });
            var userID = ViewData["AuthUser"] == null ? 0 : ((AuthUser)ViewData["AuthUser"]).entryid;
           DefaultView.FE_Bill.BindFullBill(userID, Item);
           int resutl= FE_Bill.SaveBill(userID);
            return Json(new { success = resutl>0});
        }
    }
}