
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
                        var PopupFormEmployer_TVNId = currentPopup[0].id;
                        if (PopupFormEmployer_TVNId == 'PopupFormEmployer_TVN') {

                            if (indextabstripFormEmployer_TVNActive == -1) {
                                indextabstripFormEmployer_TVNActive = 0;
                            }
                            if (indextabstripFormEmployer_TVNActive == 0 && $("#formPopupFormEmployer_TVN #btnSubmit").length > 0) {
                                $(':focus').blur();
                                if ($("#formPopupFormEmployer_TVN").valid()) {
                                    $("#formPopupFormEmployer_TVN").submit();
                                }
                            }
                        }
                        break;
                }
            }
        }
    });


});
