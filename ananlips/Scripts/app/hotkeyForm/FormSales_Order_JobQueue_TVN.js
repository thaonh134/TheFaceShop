﻿
$(document).ready(function () {
    //Ctr + S luu form
    $(document).bind('keydown', function (event) {
        if (eventHotKey) {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
                    case 's':

                        event.preventDefault();
                        var currentPopup = getCurrentPopup();
                        if (typeof (currentPopup) == "undefined" || currentPopup == null || currentPopup == '' || currentPopup.length == 0) {
                            return;
                        }
                        var PopupSales_Order_JobQueue_TVNId = currentPopup[0].id;
                        if (PopupSales_Order_JobQueue_TVNId == 'PopupSales_Order_JobQueue_TVN') {
                            if (typeof (indextabstripSales_Order_JobQueue_TVNActive) == 'undefined') var indextabstripSales_Order_JobQueue_TVNActive = -1

                            if (indextabstripSales_Order_JobQueue_TVNActive == -1) {
                                indextabstripSales_Order_JobQueue_TVNActive = 0;
                            }
                            if (indextabstripSales_Order_JobQueue_TVNActive == 0 && $("#formPopupSales_Order_JobQueue_TVN #btnSubmitSales_Order_JobQueue").length > 0) {
                                if ($("#formPopupSales_Order_JobQueue_TVN #status") == 1) {
                                    alertBox("Tin đã duyệt không thể chỉnh sửa", "", false, 3000);
                                    return;
                                }
                                $(':focus').blur();
                                if ($("#formPopupSales_Order_JobQueue_TVN").valid()) {
                                    $("#formPopupSales_Order_JobQueue_TVN").submit();
                                }
                            }
                        }
                        break;
                }
            }
        }
    });
});
