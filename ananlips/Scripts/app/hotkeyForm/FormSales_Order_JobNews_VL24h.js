
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
                        var PopupSales_Order_JobNews_24HId = currentPopup[0].id;
                        if (PopupSales_Order_JobNews_24HId == 'PopupSales_Order_JobNews_24H') {
                            if (typeof (indextabstripSales_Order_JobNews_24HActive) == 'undefined') var indextabstripSales_Order_JobNews_24HActive = -1

                            if (indextabstripSales_Order_JobNews_24HActive == -1) {
                                indextabstripSales_Order_JobNews_24HActive = 0;
                            }
                            if (indextabstripSales_Order_JobNews_24HActive == 0 && $("#formPopupSales_Order_JobNews_24H #btnSubmitSales_Order_JobNews").length > 0) {
                                $(':focus').blur();
                                if ($("#formPopupSales_Order_JobNews_24H").valid()) {
                                    $("#formPopupSales_Order_JobNews_24H").submit();
                                }
                            }
                        }
                        break;
                }
            }
        }
    });
});
