using ananlips.Areas.Admin.Models;
using ananlips.ConstantValue;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace ananlips.Service
{
    public class CustomController : Controller
    {
        protected AuthUser currentUser;
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            var ctx = Request.GetOwinContext();
            var authManager = ctx.Authentication;
            if (this.User.Identity.IsAuthenticated)
            {
                ViewData["IsAuthenticated"] = true;
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var UserId = claimsIdentity.FindFirst(ClaimTypes.PrimarySid).Value;
                ViewBag.UserId = UserId;
                currentUser = ananlips.Areas.Admin.Models.AuthUser.GetById(string.IsNullOrEmpty(UserId) ? 0 : Convert.ToInt32(UserId),null,false);
                if (currentUser.logintype != (int)LoginType.Admin)
                {
                    ViewData["IsAuthenticated"] = false;
                    ViewData["AuthUser"] = null;
                }
                else
                {
                    ViewData["AuthUser"] = currentUser;

                }

            }
            else { ViewData["IsAuthenticated"] = false;
                ViewData["AuthUser"] = null;
            }
        }

        public static Dictionary<string, bool> GetViewData()
        {
           
            Dictionary<string, bool> dictView = new Dictionary<string, bool>();
            var listAllMenu = new AuthMenu().GetAllMenu("en");
            foreach (var i in listAllMenu)
            {
                if (!dictView.ContainsKey("menu_" + i.menuid))
                {
                    dictView.Add("menu_" + i.menuid, true);
                }
            }
            return dictView;
        }

    }
}