using Microsoft.Owin;
using Owin;

using CKSource.CKFinder.Connector.Config;
using CKSource.CKFinder.Connector.Core.Builders;
using CKSource.CKFinder.Connector.Core.Logs;
using CKSource.CKFinder.Connector.Host.Owin;
using CKSource.CKFinder.Connector.KeyValue.FileSystem;
using CKSource.FileSystem.Local;
using CKSource.CKFinder.Connector.Core.Acl;
using System.Collections.Generic;
using ananlips.Models;

[assembly: OwinStartupAttribute(typeof(ananlips.Startup))]
namespace ananlips
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            ///*
            //* Register the "local" type backend file system.
            //*/
            //FileSystemFactory.RegisterFileSystem<LocalStorage>();

            ///*
            // * Map the CKFinder connector service under a given path. By default the CKFinder JavaScript
            // * client expects the ASP.NET connector to be accessible under the "/ckfinder/connector" route.
            // */
            //app.Map("/ckfinder/connector", SetupConnector);

            var connectorBuilder = ConfigureConnector();
            var connector = connectorBuilder.Build(new OwinConnectorFactory());
            app.Map("/CKFinder/connector", builder => builder.UseConnector(connector));
        }

        private static void SetupConnector(IAppBuilder app)
        {
            /*
             * Create a connector instance using ConnectorBuilder. The call to the LoadConfig() method
             * will configure the connector using CKFinder configuration options defined in Web.config.
             */
            var connectorFactory = new OwinConnectorFactory();
            var connectorBuilder = new ConnectorBuilder();

            /*
             * Create an instance of authenticator implemented in the previous step.
             */
            var customAuthenticator = new CkIdentityModels();


            connectorBuilder
                /*
                 * Provide the global configuration.
                 *
                 * If you installed CKSource.CKFinder.Connector.Config, you should load the static configuration
                 * from XML:
                 * connectorBuilder.LoadConfig();
                 */
                .LoadConfig()
                .SetAuthenticator(customAuthenticator)
                .SetRequestConfiguration(
                    (request, config) =>
                    {
                        /*
                         * If you installed CKSource.CKFinder.Connector.Config, you might want to load the static
                         * configuration from XML as a base configuration to modify:
                         */
                        config.LoadConfig();

                        /*
                         * Configure settings per request.
                         *
                         * The minimal configuration has to include at least one backend, one resource type
                         * and one ACL rule.
                         *
                         * For example:
                         */
                        //System.Web.Hosting.HostingEnvironment.MapPath(@"~/EmailTemplates/ContactEmail.html")
                        //config.AddBackend("default", new LocalStorage(System.Web.Hosting.HostingEnvironment.MapPath(@"~/Upload/Ckfinder/files")));

                        //config.AddBackend("default", new LocalStorage(System.Web.Hosting.HostingEnvironment.MapPath(@"~/Upload/Ckfinder/files")));
                        var xx = System.Web.Hosting.HostingEnvironment.MapPath(@"~/Upload");
                        config.AddBackend("local", new LocalStorage(xx));
                        config.AddResourceType("images", builder => builder.SetBackend("local", "Ckfinder"));
                        config.AddAclRule(new AclRule(
                              new StringMatcher("*"),
                              new StringMatcher("*"),
                              new StringMatcher("*"),
                              new Dictionary<Permission, PermissionType> { { Permission.All, PermissionType.Allow } }));


                        /*
                         * If you installed CKSource.CKFinder.Connector.KeyValue.FileSystem, you may enable caching:
                         */
                        var defaultBackend = config.GetBackend("local");
                        var keyValueStoreProvider = new FileSystemKeyValueStoreProvider(defaultBackend);
                        config.SetKeyValueStoreProvider(keyValueStoreProvider);
                    }
                );

            /*
             * Build the connector middleware.
             */
            var connector = connectorBuilder
                .Build(connectorFactory);

            /*
             * Add the CKFinder connector middleware to the web application pipeline.
             */
            app.UseConnector(connector);
        }

        public ConnectorBuilder ConfigureConnector()
        {
            var connectorBuilder = new ConnectorBuilder();
            connectorBuilder
                .SetRequestConfiguration(
                    (request, config) =>
                    {
                        config.AddProxyBackend("local", new LocalStorage(@"~/Upload"));
                        config.AddResourceType("Files", resourceBuilder => resourceBuilder.SetBackend("local", "files"));
                        config.AddAclRule(new AclRule(
                            new StringMatcher("*"), new StringMatcher("/"), new StringMatcher("*"),
                            new Dictionary<Permission, PermissionType>
                            {
                         { Permission.FolderView, PermissionType.Allow },
                         { Permission.FolderCreate, PermissionType.Allow },
                         { Permission.FolderRename, PermissionType.Allow },
                         { Permission.FolderDelete, PermissionType.Allow },

                         { Permission.FileView, PermissionType.Allow },
                         { Permission.FileCreate, PermissionType.Allow },
                         { Permission.FileRename, PermissionType.Allow },
                         { Permission.FileDelete, PermissionType.Allow },

                         { Permission.ImageResize, PermissionType.Allow },
                         { Permission.ImageResizeCustom, PermissionType.Allow }
                            }));
                    })
                .SetAuthenticator(new CkIdentityModels());

            return connectorBuilder;
        }
    }
}
