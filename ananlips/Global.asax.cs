using ananlips.AutoMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ananlips
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AutoMapper.Mapper.Initialize(cfg => cfg.AddProfile<Fe_Mapper>());
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        protected void Application_AuthorizeRequest(object sender, EventArgs e)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies["Language"];
            string userLang = "";
            string rsLang = "en";
            try
            {
                if (cookie == null) cookie = new HttpCookie("Language");
                cookie.Value = rsLang;
                Response.Cookies.Add(cookie);

                //System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(rsLang);
                //System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(rsLang);
            }
            catch (Exception)
            {

                //System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("en");
                //System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("en");
            }
        }
    }
}
