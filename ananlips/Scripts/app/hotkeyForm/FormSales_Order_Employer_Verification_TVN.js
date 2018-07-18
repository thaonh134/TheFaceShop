
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
                        var PopupSales_Order_Employer_Verification_TVNId = currentPopup[0].id;
                        if (PopupSales_Order_Employer_Verification_TVNId == 'PopupSales_Order_Employer_Verification_TVN') {
                            if (typeof (indextabstripSales_Order_Employer_Verification_TVNActive) == 'undefined') var indextabstripSales_Order_Employer_Verification_TVNActive=-1

                            if (indextabstripSales_Order_Employer_Verification_TVNActive == -1) {
                                indextabstripSales_Order_Employer_Verification_TVNActive = 0;
                            }
                            if (indextabstripSales_Order_Employer_Verification_TVNActive == 0 && $("#formPopupSales_Order_Employer_Verification_TVN #btnSubmitSales_Order_Employer_Verification").length > 0) {
                                $(':focus').blur();
                                if ($("#formPopupSales_Order_Employer_Verification_TVN").valid()) {
                                    $("#formPopupSales_Order_Employer_Verification_TVN").submit();
                                }
                            }
                        }
                        break;
                }
            }
        }
    });
});
