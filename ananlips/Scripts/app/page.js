var idPopup;
var eventHotKey = false;

$(document).ready(function () {
    //trang chu
    $("#menu_Home").click(function () {        
        resetMenu();        
        $(document).unbind("keypress");
        $(document).unbind("keydown");
        eventHotKey = false;
        onLoadPage(r + "/Home/Partial");
        //hideLoading();
    });
    //phan quyen
    $("#menu_AdminAuthRole").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminAuthRole/PartialRole");
    });

    //nguoi dung
    $("#menu_AdminAuthUser").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminAuthUser/PartialUser");
    });

    //api
    $("#menu_AdminAuthAPITVN").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminAuthAPITVN/TreeView");
    });

    //thong bao
    $("#menu_AdminConfigAnnouncement").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminConfigAnnouncement/TreeView");
    });

    //vi tri dia ly
    $("#menu_AdminMasterTerritory").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminMasterTerritory/PartialOthersTerritory");
    });

    //lich nghi
    $("#menu_AdminMasterHoliday").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminMasterHoliday/TreeView");
    });

    //kenh
    $("#menu_AdminMasterChannel").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminMasterChannel/TreeView");
    });

    //nhom ban hang
    $("#menu_SalesMasterTeam").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesMasterTeam/TreeView");
    });

    //chăm sóc nhà tuyển dụng
    $("#menu_SalesEmployerTouch").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesEmployerTouch/TreeView");
    });

    //Theo dõi hiệu suất bán hàng
    $("#menu_SalesMonitoringPerformance").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesMonitoringPerformance/TreeView");
    });

    //Kịch bản thoại
    $("#menu_SalesMasterTouchScript").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesMasterTouchScript/TreeView");
    });

    //Gói dịch vụ
    $("#menu_AdminMasterService").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminMasterService/TreeView");
    });
    
    //Bảng giá
    $("#menu_AccountantServicePriceList").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantServicePriceList/TreeView");
    });
    //Thông tin nhà tuyển dụng
    $("#menu_SalesEmployerInformation").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesEmployerInformation/TreeView");
    });

    //Khuyến mãi
    $("#menu_AccountantServicePromotion").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantServicePromotion/TreeView");
    });

    //Chỉ tiêu bán hàng
    $("#menu_SalesKPIRegistration").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesKPIRegistration/TreeView");
    });

    //Hiệu ứng
    $("#menu_AdminMasterEffect").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminMasterEffect/TreeView");
    });

    //Đăng ký dịch vụ
    $("#menu_SalesServiceRegistration").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesServiceRegistration/TreeView");
    });

    //Đồng bộ dữ liệu
    $("#menu_AdminSyncData").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AdminSyncData/TreeView");
    });

    //Duyệt phiếu đăng kí
    $("#menu_AccountantServiceApproveRegistration").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantServiceApproveRegistration/TreeView");
    });

    //Công nợ nhà tuyển dụng
    $("#menu_AccountantLiabilityCustomer").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantLiabilityCustomer/TreeView");
    });

    //Khách hàng
    $("#menu_AccountantMasterCustomer").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantMasterCustomer/TreeView");
    });

    //Yêu cầu bảo lưu
    $("#menu_SalesServiceReservation").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesServiceReservation/TreeView");
    });

    //Duyệt bảo lưu
    $("#menu_AccountantServiceApproveReservation").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantServiceApproveReservation/TreeView");
    });

    //Yêu cầu đặt chỗ
    $("#menu_SalesServiceBooking").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesServiceBooking/TreeView");
    });

    //Duyệt đặt chỗ
    $("#menu_AccountantServiceApproveBooking").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantServiceApproveBooking/TreeView");
    });

    //Tải báo cáo
    $("#menu_SalesReportPerformance").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesReportPerformance/TreeView");
    });

    //Chỉ tiêu doanh thu
    $("#menu_AccountantKPIRegistration").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantKPIRegistration/TreeView");
    });
    
    //Lịch sử công nợ
    $("#menu_AccountantLiabilityHistory").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantLiabilityHistory/TreeView");
    });

    //Tải báo cáo công nợ
    $("#menu_AccountantReportLiability").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantReportLiability/TreeView");
    });


    //Tải báo cáo doanh thu
    $("#menu_AccountantReportRevenue").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantReportRevenue/TreeView");
    });

    //Yêu cầu chuyển CSKH
    $("#menu_QualityControlEmployerSalesmanChange").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/QualityControlEmployerSalesmanChange/TreeView");
    });

    //Duyệt yêu cầu chuyển CSKH
    $("#menu_AccountantServiceApproveQualityControlEmployerSalesmanChange").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantServiceApproveQualityControlEmployerSalesmanChange/TreeView");
    });

    //Bản đồ doanh thu
    $("#menu_AccountantMonitoringSalesMap").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantMonitoringSalesMap/TreeView");
    });

    //Danh sách tin tuyển dụng
    $("#menu_AccountantJobNewsList").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantJobNewsList/TreeView");
    });

    //Tin chờ duyệt
    $("#menu_AccountantQueueNewList").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/AccountantQueueNewList/TreeView");
    });
    //Theo dõi công nợ phiếu thu
    $("#menu_SalesMonitoringLiability").click(function () {
        setActiveMenu(this);
        onLoadPage(r + "/SalesMonitoringLiability/TreeView");
    });

    var url = localStorage['urlpage'] || '';
    if (url) {
        onLoadPage(url);
    }
    else {
        onLoadPage(r + "/Home/Partial");
    }
});

function onLoadPage(url) {
    
    $(document).unbind("keypress");
    $(document).unbind("keydown");
    eventHotKey = false;
    if (url != "" && url != null) {
        $.ajax({
            url: url,
            type: "get",
            beforeSend: function () {
                //$('#content').ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false })).ajaxStop($.unblockUI);
                //$(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false })).ajaxStop($.unblockUI);
                //$("#divLoading").show();
            },
            success: function (data) {
                
                $("div.k-window").remove();
                $("div#content").html(data);
                localStorage['urlpage'] = url;

            },
            error: function (e) { }            
        });
    }
}

function resetMenu() {
    
    $("#menuLeft").find('li').removeClass('active').removeClass('open');
    $("#menuLeft").find('ul').css({ 'display': 'none', 'margin-left': '0px' });
    $("#menuLeft").find('em').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
}

function setActiveMenu(e) {
    if (e == '' || e == null || typeof (e) == "undefined") {
        return;
    }
    resetMenu();
    
    var nextParent;
    var liActive = $(e).parent();
    var isFinalBoss = false;
    liActive.addClass('active');
    nextParent = liActive.parent();

    while (!isFinalBoss) {
        if (nextParent.is("li")) {
            if (nextParent.parent() != null && nextParent.parent().length > 0) {
                if (nextParent.parent()[0].id == 'menuLeft') {
                    nextParent.addClass('open');
                    isFinalBoss = true;
                }
                else {
                    nextParent = nextParent.parent();
                }
            }
        }
        else if (nextParent.is("ul")) {
            nextParent.css({ 'display': 'block' });
            nextParent = nextParent.parent();
        }
    }
}

function blockUIFromUser() {
    //$(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false })).ajaxStop($.unblockUI);
}