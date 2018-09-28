using ananlips.Areas.Admin.Models;
using ananlips.ConstantValue;
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
    public class ArticleController : GuestController
    {
        // GET: Category
        public ActionResult Index(string type)
        {
            var dict = new Dictionary<string, object>();
            type = string.IsNullOrEmpty(type) ? "0" : type;
            ArticleType articletype = (ArticleType)Enum.Parse(typeof(ArticleType), type);
            dict["data_Article"] = DefaultView.FE_Article.GetByArticleType(articletype);
            dict["list_TopicContacts"] = CustomModel.GetTopicContactDDl();

            ViewBag.Title = ((DefaultView.FE_Article)dict["data_Article"]).ArticleName;
            return View(dict);
        }

        public ActionResult SaveContactRequest(FE_ContactRequest Item)
        {
            //valid
            if (DefaultView.GetRandomCapcha() != Item.CaptchaCode) return Json(new { success = false, message = "Mã xác minh không đúng." });
            var userID = ViewData["AuthUser"] == null ? 0 : ((AuthUser)ViewData["AuthUser"]).entryid;
            Item.Address = Item.Address??"";
            int resutl = FE_ContactRequest.SaveContactRequest(userID, Item);
            return Json(new { success = resutl > 0 });
        }
    }
}