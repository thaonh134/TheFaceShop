var numHeight = 195;
var keyAction;
var indexTabstripActive = -1;
var contentTab;
$(document).ready(function () {
    //active menu
    setActiveMenu($("#menu_HOAdminAuthUser")[0]);
    document.title = "Người dùng";
    loadToolbarStyle();
    resizedivMainContent();
    //fillter & form popup

    generateSelect2('m', 'filterroles', null, '100%');
    generateSelect2('s', 'filterisactive', null, '100%');

    //goi ham search khi nhan enter
    $("#filterUserID,#filterroles").keypress(function (e) {
        if (e.keyCode == 13) {
            doSearch();
        }
    });

    //bam + de them moi
    if ($("#btnInsert").length > 0) {
        $(document).keypress(function (e) {
            if (e.keyCode == 43) {  // 43 : +
                e.preventDefault();
                onOpenPopup(0, null);
            }
        });
    }

    eventHotKey = true;

    //Ctr + S luu form
    $(document).bind('keydown', function (event) {
        if (eventHotKey) {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
                    case 's':
                        event.preventDefault();
                        if ($("#btnSubmit").length > 0) {
                            $(':focus').blur();
                            if ($("#formPopup").valid()) {
                                $("#formPopup").submit();
                            }
                        }
                        break;
                }
            }
        }
    });

    $("#filterisactive").change(function () {
        doSearch();
    });

    //popup
    $('#popupImport').kendoWindow({
        width: "600px",
        actions: ["Close"],
        title: "Import",
        visible: false,
        resizeable: false,
        modal: true,
        open: function (e) {
            //$('body').css('overflow', 'hidden');
            //this.wrapper.css({ top: $('#header').height() });
            //onPopupOpenEvent($('#popupImport'));
        },
        close: function (e) {
            //$('body').css('overflow', 'auto');
            //onPopupOpenEvent(null);
        }

    });

    $("#importform").ajaxForm({
        beforeSend: function () {
            blockUIFromUser(true);
        },
        uploadProgress: function (event, position, total, percentComplete) { },
        success: function (data) {
            if (data.success) {
                $("#grid").data("kendoGrid").dataSource.read();
                //hideMaskPopup('#divMaskPopup');
                if (data.errorfile != null && data.errorfile != "") {
                    console.log(data.errorfile);
                    $.SmartMessageBox({
                        title: "Lỗi",
                        content: "Có dòng lỗi, tải về để sửa lại.",
                        buttons: '[Hủy][Tải]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "Tải") {

                            //window.location.href = r + "/Error/Download?file=" + data.errorfile;
                            //window.location.href = r + data.errorfile;
                            var locationFileName = data.errorfile;
                            var urlFolder = "ExcelImport\\Error\\";
                            var strParam = "urlFolder=" + urlFolder + "&file=" + locationFileName;
                            window.open(r + "/Home/Download?" + strParam, "_blank");
                        }
                        if (ButtonPressed === "Hủy") {
                            return;
                        }
                    });
                }
                else {
                    alertBox("Thành công", "", true, 3000);
                }
            }
            else {
                alertBox("Chưa nhập được<br>" + data.message, "", false, 3000);
                console.log(data.message);
            }
            //$("#divLoading").hide();
        },
        complete: function (xhr) { }
    });

    //$("#formPopup").validate({
    //    // Rules for form validation
    //    rules: {
    //        UserName: {
    //            required: true,
    //            alphanumeric: true
    //        },
    //        FullName: {
    //            required: true
    //        },
    //        Email: {
    //            email: true
    //        },
    //        BirthdayString: {
    //            dateFormatVN: true
    //        }
    //    },

    //    // Messages for form validation
    //    messages: {
    //        UserName: {
    //            required: "Thông tin bắt buộc",
    //        },
    //        FullName: {
    //            required: "Thông tin bắt buộc"
    //        },
    //        Email: {
    //            email: "Email sai định dạng"
    //        }
    //    },

    //    // Do not change code below
    //    errorPlacement: function (error, element) {
    //        error.insertAfter(element);
    //    },

    //    submitHandler: function (form) {
    //        $(form).ajaxSubmit({
    //            //clearForm: true,//To clear form after ajax submitting
    //            beforeSend: function () {
    //                blockUIFromUser(true);
    //            },
    //            success: function (data) {
    //                if (data.success) {
    //                    alertBox("Lưu thành công", "", true, 3000);
    //                    $("#grid").data("kendoGrid").dataSource.read();
    //                    var ID = '';
    //                    if (keyAction == 0) {
    //                        ID = data.UserID;
    //                        keyAction = 1;
    //                        var urlNow = "/HOAdminAuthUser/FormPopup?ID=" + ID;
    //                        $("#V_All").data({ "type": 1, "id": ID, "url": urlNow });
    //                        console.log("Load Create Form: "+ $("#V_All").data());
    //                    } else if (keyAction == 1) {
    //                        ID = $('#V_All').data('id');
    //                    }

    //                    $('#grid').data('kendoGrid').dataSource.read();
    //                    if ($('#V_All').data('type')) onOpenPopup($('#V_All').data('type'), $('#V_All'));

    //                    //window.location.href = r + "/HOAdminAuthUser/FormUser?Type=1&UserID=" + ID;
    //                }
    //                else {
    //                    alertBox("Có lỗi", data.message, false, 3000);
    //                    console.log(data.message);
    //                }
    //                $("#loading").addClass('hide');
    //            }
    //        });
    //        return false;
    //    }
    //});

    ////kiểm tra có gọi popup ko
    ////hạ màn đen
    //$('.k-overlay').hide();
    //var allE = $('#V_All');
    ////allE.data(id, 0);

    //allE.attr("data-url", '');
    //allE.attr("data-idopengrid", '');
    //if ($(allE).data('type')) onOpenPopup(allE.data('type'), allE);
});



//========================================== router Form/Popup ====================================
function renderForm() {
    param_obj.redirectbyajax = 1;
    var dataPost = param_obj;
    $.get(r + "/HOAdminAuthUser/FormPopup", dataPost, function (data) {

        htmlData = data;
        $("#divPopup").empty().html(htmlData);

    });

}
function routerActionLink(obj) {
    
    param_obj.actiontype = $(obj).data('actiontype');
    param_obj.entryid = $(obj).data('entryid') ? $(obj).data('entryid')  : null;
    param_obj.key = $(obj).data('key') ? $(obj).data('key') : null;
    param_obj.url = set_router_url(param_obj);
    if (param_obj.actiontype == "form") {
        window.open(param_obj.url);
    }
    else if (param_obj.actiontype == "popup") {
        renderForm();
    }

}
////cấu hình các parame inout ở hàm này
function set_router_url(obj) {
    var urlParam = '';
    var url_return = "";
    if (obj.id) urlParam += '&ID=' + obj.id;
    if (obj.key) urlParam += '&key=' + obj.key;

    if (param_obj.actiontype == "form") {
        if (urlParam != '') url_return = r + obj.ourl + '/FormPopup?' + urlParam.substring(1);
        else url_return = r + obj.ourl + '/FormPopup';
    }
    else if (param_obj.actiontype == "popup") {
        if (obj.actiontype) urlParam += '&actiontype=' + obj.actiontype;

        if (urlParam != '') url_return = obj.ourl + '?' + urlParam.substring(1);
        else url_return = obj.ourl + '';
    }

    return url_return;
}

function OnchangeType() {
    if ($("#type").val() == "EMPLOYER_CUSTOMER_CARE") {
        $(".EMPLOYER_CUSTOMER_CARE").show();
    } else {
        $(".EMPLOYER_CUSTOMER_CARE").hide();
    }
}
//========================================== code co ban ====================================

//search
function doSearch() {
    blockUIFromUser(false);
    var grid = $("#grid").data("kendoGrid");
    var filter = { logic: "and", filters: [] };
    var text = $("#filterUserID").val();
    if (text) {
        var filterOr = { logic: "or", filters: [] };
        filterOr.filters.push({ field: "UserName", operator: "contains", value: text });
        filterOr.filters.push({ field: "FullName", operator: "contains", value: text });
        filter.filters.push(filterOr);
    }

    text = $("#filterroles").val();
    if (text) {
        filter.filters.push({ field: "Roles", operator: "contains", value: text });
    }
    text = $("#filterisactive").val();
    if (text) {
        filter.filters.push({ field: "isactive", operator: "eq", value: text });
    }

    var temppp = grid.dataSource.filter;
    grid.dataSource.filter(filter);
}

//search
function doCancelSearch() {
    $("#filterUserID").val('');
    $("#filterroles").val('');
    generateSelect2('s', 'filterisactive', '', '100%');
    doSearch();
}

//grid 
function onDatabound(e) {
    resizeGrid(numHeight);
    var grid = $("#grid").data("kendoGrid");

    // ask the parameterMap to create the request object for you
    var requestObject = (new kendo.data.transports["aspnetmvc-server"]({ prefix: "" }))
    .options.parameterMap({
        page: grid.dataSource.page(),
        sort: grid.dataSource.sort(),
        filter: grid.dataSource.filter()
    });

    // Get the export link as jQuery object
    var $exportLink = grid.element.find('.export');

    // Get its 'href' attribute - the URL where it would navigate to
    var href = $exportLink.attr('href');
    if (href) {
        // Update the 'page' parameter with the grid's current page
        //href = href.replace(/page=([^&]*)/, 'page=' + requestObject.page || '~');

        // Update the 'sort' parameter with the grid's current sort descriptor
        href = href.replace(/sort=([^&]*)/, 'sort=' + requestObject.sort || '~');

        // Update the 'pageSize' parameter with the grid's current pageSize
        //href = href.replace(/pageSize=([^&]*)/, 'pageSize=' + grid.dataSource._pageSize);

        //update filter descriptor with the filters applied

        href = href.replace(/filter=([^&]*)/, 'filter=' + (requestObject.filter || '~'));

        // Update the 'href' attribute
        $exportLink.attr('href', href);
    }
    changeStatusGrid('grid');
}

function onRequestStart(e) {
    blockUIFromUser(false);
}

function onRequestEnd(e) {
    if (e.type == "update" || e.type == "create" || e.type == "delete") {
        if (e.response.Errors == null) {
            alertBox("Lưu thành công", "", true, 3000);
        }
        else {
            alertBox("Có lỗi", e.response.Errors.er.errors[0], false, 3000);
        }
    }
}

function openImport() {
    idPopup = ".k-window";
    //$("#divMaskPopup").show();
    $('#popupImport').data("kendoWindow").open();
    $(".k-window span.k-i-close").click(function () {
        //$("#divMaskPopup").show();
    });
}

function beginImport() {
    var value = $("input[name='FileUpload']").val();
    if (value != null && value != "") {
        blockUIFromUser(true);
        //$("#divLoading").show();
        $("#importform").submit();
    }
    else {
        alertBox("Có lỗi", "Chọn file để nhập Excel", false, 3000);
    }
}

function onResetPassword(obj) {
    var userID = $(obj).data('id');
    if (userID) {
        $.SmartMessageBox({
            title: "Khôi phục mật khẩu",
            content: "Khôi phục mật khẩu cho " + userID + " ?",
            buttons: '[Đóng lại][Xác nhận]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Xác nhận") {
                blockUIFromUser(true);
                //$("#divLoading").show();
                $(obj).attr('disabled', true);
                blockUIFromUser(true);
                $.post(r + "/HOAdminAuthUser/ResetPasswordUser", { userID: userID }, function (data) {
                    if (data.success) {
                        alertBox("Khôi phục thành công", "", true, 3000);
                    }
                    else {
                        alertBox("Có lỗi", data.message, false, 3000);
                        console.log(data.message);
                    }
                    $(obj).attr('disabled', false);
                    //$("#divLoading").hide();
                });
            }
            if (ButtonPressed === "Đóng lại") {
                return;
            }
        });
    }
    else {
        alertBox("Có lỗi", "Chưa khôi phục được", false, 3000);
    }
}

//Cập nhật trạng thái kích hoạt
function onUpdateActiveStatus(UserID, UserName,isactive) {
    if (UserID) {
        $.SmartMessageBox({
            title: isactive == 'true' ? "Kích hoạt người dùng" : "Ngưng hoạt động người dùng",
            content: (isactive == 'true' ? "Kích hoạt người dùng '" : "Ngưng hoạt động người dùng ' ") + UserName + "' ?",
            buttons: '[Xác nhận][Đóng lại]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Xác nhận") {
                blockUIFromUser(true);
                $.post(r + "/HOAdminAuthUser/UpdateActiveStatus", { UserID: UserID, isactive: isactive }, function (data) {
                    if (data.success) {
                        alertBox(isactive == 'true' ? "Kích hoạt người dùng" : "Ngưng hoạt động người dùng" + " thành công", "", true, 3000);
                        $('#grid').data('kendoGrid').dataSource.read();
                    }
                    else {
                        alertBox("Có lỗi", data.message, false, 3000);
                        console.log(data.message);
                    }
                });
            }
            if (ButtonPressed === "Đóng lại") {
                return;
            }
        });
        $("#bot1-Msg1").addClass("btn btn-primary btn-sm").prepend('<i class="fa fa-check"></i>');
        $("#bot2-Msg1").addClass("btn btn-default btn-sm").prepend('<i class="glyphicon glyphicon-remove"></i>');
    }
    else {
        alertBox("Có lỗi", "Không đủ thông tin", false, 3000);
    }
}


function onResetPassword(obj) {
    var userID = $(obj).data('id');
    if (userID) {
        $.SmartMessageBox({
            title: "Khôi phục mật khẩu",
            content: "Khôi phục mật khẩu cho " + userID + " ?",
            buttons: '[Đóng lại][Xác nhận]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Xác nhận") {
                blockUIFromUser(false);
                //$("#divLoading").show();
                $(obj).attr('disabled', true);
                blockUIFromUser(true);
                $.post(r + "/HOAdminAuthUser/ResetPasswordUser", { userID: userID }, function (data) {
                    if (data.success) {
                        alertBox("Khôi phục thành công", "", true, 3000);
                    }
                    else {
                        alertBox("Có lỗi", data.message, false, 3000);
                        console.log(data.message);
                    }
                    $(obj).attr('disabled', false);
                    //$("#divLoading").hide();
                });
            }
            if (ButtonPressed === "Đóng lại") {
                return;
            }
        });
    }
    else {
        alertBox("Có lỗi", "Chưa khôi phục được", false, 3000);
    }
}