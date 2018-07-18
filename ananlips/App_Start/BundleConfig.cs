using System.Web;
using System.Web.Optimization;

namespace ananlips
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));


            #region SmartAdmin
            //bundles.Add(new StyleBundle("~/content/smartadmin").IncludeDirectory("~/content/css", "*.min.css"));
            bundles.Add(new StyleBundle("~/content/smartadmin").Include(

               "~/Content/css/bootstrap.min.css",
               "~/Content/css/demo.min.css",
               "~/Content/css/invoice.min.css",
               "~/Content/css/lockscreen.min.css",
               "~/Content/css/font-awesome.min.css",
               "~/Content/css/smartadmin-production-plugins.min.css",
               "~/Content/css/smartadmin-production.min.css",
               "~/Content/css/smartadmin-rtl.min.css",
               "~/Content/css/smartadmin-skins.min.css",
                //"~/Content/css/your_style.css",
                //"~/Content/css/phonght_style.css",
                "~/Content/css/thaonh_test_style.css",
               "~/Content/css/tw_style.css"


                ));
            bundles.Add(new ScriptBundle("~/scripts/smartadmin").Include(
               "~/scripts/app.config.js",
               "~/scripts/plugin/jquery-touch/jquery.ui.touch-punch.min.js",
               "~/scripts/bootstrap/bootstrap.min.js",
               "~/scripts/notification/SmartNotification.min.js",
               "~/scripts/smartwidgets/jarvis.widget.min.js",
               "~/scripts/plugin/jquery-validate/jquery.validate.min.js",
               "~/scripts/plugin/masked-input/jquery.maskedinput.min.js",
               "~/scripts/plugin/select2/select2.min.js",
               "~/scripts/plugin/bootstrap-slider/bootstrap-slider.min.js",
               "~/scripts/plugin/bootstrap-progressbar/bootstrap-progressbar.min.js",
               "~/scripts/plugin/msie-fix/jquery.mb.browser.min.js",
               "~/scripts/plugin/fastclick/fastclick.min.js",
               "~/scripts/app.min.js"));

            bundles.Add(new ScriptBundle("~/scripts/full-calendar").Include(
                "~/scripts/plugin/moment/moment.min.js",
                "~/scripts/plugin/fullcalendar/jquery.fullcalendar.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/charts").Include(
                "~/scripts/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js",
                "~/scripts/plugin/sparkline/jquery.sparkline.min.js",
                "~/scripts/plugin/morris/morris.min.js",
                "~/scripts/plugin/morris/raphael.min.js",
                "~/scripts/plugin/flot/jquery.flot.cust.min.js",
                "~/scripts/plugin/flot/jquery.flot.resize.min.js",
                "~/scripts/plugin/flot/jquery.flot.time.min.js",
                "~/scripts/plugin/flot/jquery.flot.fillbetween.min.js",
                "~/scripts/plugin/flot/jquery.flot.orderBar.min.js",
                "~/scripts/plugin/flot/jquery.flot.pie.min.js",
                "~/scripts/plugin/flot/jquery.flot.tooltip.min.js",
                "~/scripts/plugin/dygraphs/dygraph-combined.min.js",
                "~/scripts/plugin/chartjs/chart.min.js",
                "~/scripts/plugin/highChartCore/highcharts-custom.min.js",
                "~/scripts/plugin/highchartTable/jquery.highchartTable.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/datatables").Include(
                "~/scripts/plugin/datatables/jquery.dataTables.min.js",
                "~/scripts/plugin/datatables/dataTables.colVis.min.js",
                "~/scripts/plugin/datatables/dataTables.tableTools.min.js",
                "~/scripts/plugin/datatables/dataTables.bootstrap.min.js",
                "~/scripts/plugin/datatable-responsive/datatables.responsive.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/jq-grid").Include(
                "~/scripts/plugin/jqgrid/jquery.jqGrid.min.js",
                "~/scripts/plugin/jqgrid/grid.locale-en.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/forms").Include(
                "~/scripts/plugin/jquery-form/jquery-form.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/smart-chat").Include(
                "~/scripts/smart-chat-ui/smart.chat.ui.min.js",
                "~/scripts/smart-chat-ui/smart.chat.manager.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/vector-map").Include(
                "~/scripts/plugin/vectormap/jquery-jvectormap-1.2.2.min.js",
                "~/scripts/plugin/vectormap/jquery-jvectormap-world-mill-en.js"
                ));
            #endregion
            #region Kendo
            bundles.Add(new ScriptBundle("~/scripts/kendo").Include(
                     "~/Scripts/kendo/2015.1.429/jszip.min.js",
                      "~/Scripts/kendo/2015.1.429/kendo.all.min.js",
                      "~/Scripts/kendo/2015.1.429/kendo.aspnetmvc.min.js"
              ));
            bundles.Add(new StyleBundle("~/content/kendo").Include(
                      "~/Content/kendo/2015.1.429/kendo.common.min.css",
                      "~/Content/kendo/2015.1.429/kendo.mobile.all.min.css",
                      "~/Content/kendo/2015.1.429/kendo.dataviz.min.css",
                      "~/css/font-awesome.min.css",
                      "~/Content/customkendo.css",
                      "~/Content/chosen.min.css",
                      "~/Content/daterangepicker.css",
                      "~/js/plugin/fontIconPicker-2.0.0/css/jquery.fonticonpicker.css",
                      "~/js/plugin/fontIconPicker-2.0.0/themes/grey-theme/jquery.fonticonpicker.grey.min.css",
                      "~/js/plugin/fontIconPicker-2.0.0/themes/dark-grey-theme/jquery.fonticonpicker.darkgrey.min.css",
                      "~/js/plugin/fontIconPicker-2.0.0/themes/bootstrap-theme/jquery.fonticonpicker.bootstrap.min.css",
                      "~/js/plugin/fontIconPicker-2.0.0/themes/inverted-theme/jquery.fonticonpicker.inverted.min.css",
                      "~/js/plugin/fontIconPicker-2.0.0/demo/fontello-7275ca86/css/fontello.css"

            ));

            #endregion
            #region orther
            bundles.Add(new ScriptBundle("~/scripts/ortherjs").Include(
                  "~/Scripts/daterangepicker.min.js",
                  "~/Scripts/moment.min.js",
                  "~/Scripts/autoNumeric.js",
                  "~/Scripts/jquery.number.js",
                  "~/Scripts/jquery.blockUI.js",
                  //"~/Scripts/jquery.signalR-2.2.0.min.js",
                  //"~/signalr/hubs",
                  //"~/Scripts/app/PortalMessage.js",

                  //BOOSTRAP TIMEPICKER
                  "~/Scripts/plugin/bootstrap-timepicker/bootstrap-timepicker.min.js",
                  "~/Scripts/plugin/clockpicker/clockpicker.min.js",
                  "~/Scripts/plugin/colorpicker/bootstrap-colorpicker.min.js",

                  //JQUERY SELECT2 INPUT
                  "~/Scripts/plugin/select2/select2.min.js",

                  //JQUERY VALIDATE
                  "~/Scripts/plugin/jquery-validate/jquery.validate.min.js",

                  //CK editor
                  "~/Scripts/plugin/ckeditor/ckeditor.js",
                   //Twin app js
                   "~/Scripts/app/app.js"

              ));

            bundles.Add(new StyleBundle("~/content/ordercss").Include(
                "~/Content/css/zzdungndq_style.css"

          ));
            #endregion
        }
    }
}
