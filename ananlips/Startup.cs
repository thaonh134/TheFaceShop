using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ananlips.Startup))]
namespace ananlips
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
