using ananlips.Areas.Admin.Models;
using ananlips.ConstantValue;
using ananlips.Models;
using ananlips.Service;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ananlips.Models.DefaultView;

using System.Threading.Tasks;
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
            var data_Article= DefaultView.FE_Article.GetByArticleType(articletype);
            dict["data_Article"] = data_Article == null ? new FE_Article() : data_Article;
            dict["list_TopicContacts"] = CustomModel.GetTopicContactDDl();

            ViewBag.Title = ((DefaultView.FE_Article)dict["data_Article"]).ArticleName;
            return View(dict);
        }

        public async Task<ActionResult> SaveContactRequest(FE_ContactRequest Item)
        {
            //valid
            if (DefaultView.GetRandomCapcha() != Item.CaptchaCode) return Json(new { success = false, message = "Mã xác minh không đúng." });
            var userID = ViewData["AuthUser"] == null ? 0 : ((AuthUser)ViewData["AuthUser"]).entryid;
            Item.Address = Item.Address ?? "";
            int resutl = FE_ContactRequest.SaveContactRequest(userID, Item);
            //string subject = "[Contact] Thông tin liên hệ";
            string subject = "["+((TopicContact)Item.TopicContact).DescriptionAttr().ToString()+ "]" ;
            subject +=" - "+ Item.EntryName ?? "";
            //send ContactEmail
            await sendContactEmail(new List<string>() { ConfigurationManager.AppSettings.Get("EmailContact").ToString() }, subject, Item);

            return Json(new { success = resutl > 0 });
        }
        public async Task sendContactEmail(List<string> emailsfrome, string subject, FE_ContactRequest item)
        {
            #region sent email with password random when create new user
            //begin sendemail
            using (var sr = System.IO.File.OpenText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/EmailTemplates/ContactEmail.html")))
            {
                var defaulUrl = ConfigurationManager.AppSettings.Get("DefaultServerUrl");
                var emailContent = sr.ReadToEnd();
                emailContent = emailContent
                    .Replace(EmailKeyword.FULL_NAME, item.FullName)
                    .Replace(EmailKeyword.EMAIL_ADDRESS, item.Email)
                    .Replace(EmailKeyword.PHONE_NUMBER, item.Phone)
                    .Replace(EmailKeyword.DATE_SEND, DateTime.Now.ToString("dd/MM/yyyy") + "(dd/MM/yyyy)")
                    .Replace(EmailKeyword.CONTENT_STR, item.Comments);

                await new SendEmailService().SendEmail(emailsfrome, subject, emailContent);
            }
            #endregion
        }


    }
}