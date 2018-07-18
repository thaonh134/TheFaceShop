
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

                        var PopupFormEmployer_VL24hId = currentPopup[0].id;
                        if (PopupFormEmployer_VL24hId == 'PopupFormEmployer_VL24h') {

                            if (indextabstripFormEmployer_VL24hActive == -1) {
                                indextabstripFormEmployer_VL24hActive = 0;
                            }
                            if (indextabstripFormEmployer_VL24hActive == 0 && $("#formPopupFormEmployer_VL24h #btnSubmit").length > 0) {
                                $(':focus').blur();
                                if ($("#formPopupFormEmployer_VL24h").valid()) {
                                    $("#formPopupFormEmployer_VL24h").submit();
                                }
                            }
                        }
                        break;
                }
            }
        }
    });
});
