var checkedIds = new Array();
var numHeight = 170;
var keyAction;
var indexTabstripActive = -1;
var currentAnnouncementID = "";
var editor;
var contentTab;
$(document).ready(function () {
    //active menu
    setActiveMenu($("#menu_AdminConfigAnnouncement")[0]);
    document.title = "Thông báo";
    loadToolbarStyle();
  
    //fillter & form popup
    generateSelect2('s', 'filterIsActive', null, '100%');
    //generateSelect2('s', 'IsActive', null, '240px');

    //Editor
    $(function () { createEditor('en', 'ArticleContentView') });

    $(window).resize(function () {
        resizeGrid(numHeight);
    });

    //check box on grid
    $('#checkAll').bind('click', function () {

        if ($(this).is(':checked')) {
            $('.checkvalue').each(function () {
                if (!$(this).is(':checked')) {
                    $(this).trigger('click');
                }
            })
        }
        else {
            $('.checkvalue').each(function () {
                if ($(this).is(':checked')) {
                    $(this).trigger('click');
                }
            })
        }
    });
    //goi ham search khi nhan enter
    $("#filterAnnouncementID,#filterIsActive").keypress(function (e) {
        if (e.keyCode == 13) {
            doSearch();
            return false;
        }
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
            $("#popupImport").data("kendoWindow").close();
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
    $('#popup').kendoWindow({
        width: parseInt($(window).width()) - $('#header').height() - $('#header').height(),
        actions: ["Close"],
        visible: false,
        resizable: false,
        modal: true,
        open: function (e) {
            //$('body').css('overflow', 'hidden');
        },
        close: function (e) {
            //$('body').css('overflow', 'auto');
            if ($('#V_All').data('ourl')) window.history.pushState({}, '', r + $('#V_All').data('ourl'));
        }
    });
    //chan su kien click nut submit khi form dang load

    $("#formPopup").validate({
        // Rules for form validation
        rules: {
            AnnouncementID: {
                required: true,
                alphanumeric: true
            },
            Title: {
                required: true
            },

        },

        // Messages for form validation
        messages: {
            AnnouncementID: {
                required: "Thông tin bắt buộc"
            },
            Title: {
                required: "Thông tin bắt buộc"
            },

        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },

        submitHandler: function (form) {
            $(form).ajaxSubmit({

                //clearForm: true,//To clear form after ajax submitting
                data: '{"ArticleContent":"' + CKEDITOR.instances['ArticleContentView'].getData() + '"}',
                beforeSend: function () {
                    $("#loading").removeClass('hide');
                    blockUIFromUser(true);
                    return;
                },
                success: function (data) {
                    if (data.success) {
                        if (keyAction == 0) {   // Create
                            //$("#formPopup").find('fieldset:eq(0) section:eq(0)').empty().append('<label class="label">Mã thông báo: <strong style="color:red;margin-left: 20px;">' + data.ArticleID + '</strong></label><input type="hidden" id="ArticleID" name="ArticleID" value="' + data.ArticleID + '" />');
                            $("#formPopup").find('fieldset:eq(0) section:eq(0)').empty().append('<label class="label" style="float: left; width: 150px;">Mã thông báo: </label><label style="float: left;text-align: left;width: 240px;height: 19px;padding-top: 2px;"><strong style="color:red;">' + data.AnnouncementID + '</strong><input type="hidden" id="ArticleID" name="ArticleID" value="' + data.AnnouncementID + '" /></label> <div style="clear:both"></div>');
                            $("#RowCreatedAt").val(dateToString(data.createdat));
                            $("#RowCreatedBy").val(data.createdby);
                            currentAnnouncementID = data.AnnouncementID;
                            keyAction = 1;
                        }
                        $("#grid").data("kendoGrid").dataSource.read();
                        alertBox("Lưu thành công", "", true, 3000);
                    }
                    else {
                        alertBox("Có lỗi", data.message, false, 3000);
                        console.log(data.message);
                    }
                    $("#loading").addClass('hide');
                }
            });
            return false;
        }
    });
    //kiểm tra có gọi popup ko
    //hạ màn đen
    $('.k-overlay').hide();
    var allE = $('#V_All');
    //allE.data(id, 0);

    allE.attr("data-url",'');
    allE.attr("data-idopengrid", '');

    if ($(allE).data('type')) onOpenPopup(allE.data('type'), allE);
});
//============================================ ckeditor ========================================

function createEditor(languageCode, id) {
    var ArticleContentDivHeight = parseInt($(window).height()) - $('#ArticleContentInfor').height() - 460;
    var editor = CKEDITOR.replace(id, { language: languageCode, height: ArticleContentDivHeight });
    CKEDITOR.instances['ArticleContentView'].on('change', function () {
        var editor_data = CKEDITOR.instances['ArticleContentView'].getData();
        $('#ArticleContent').val(htmlEncode(editor_data));
    });
}

function getAnnouncementID() {

    return { AnnouncementID: currentAnnouncementID };
}

//============================================ Announcement ========================================

function doSearch() {
    blockUIFromUser(false);
    var grid = $("#grid").data("kendoGrid");
    var filter = { logic: "and", filters: [] };

    var text = $("#filterAnnouncementID").val();
    if (text) {
        var filterOr = { logic: "or", filters: [] };
        filterOr.filters.push({ field: "ArticleID", operator: "contains", value: text });
        filterOr.filters.push({ field: "ArticleTitle", operator: "contains", value: text });

        filter.filters.push(filterOr);
    }

    text = $("#filterIsActive").val();
    if (text) {

        filter.filters.push({ field: "IsActive", operator: "eq", value: text });
    }

    grid.dataSource.filter(filter);
}

function doCancelSearch() {
    $("#filterAnnouncementID").val('');
    generateSelect2('s', 'filterIsActive', '', '100%');
    doSearch();
}

//===========================================Databound ===========================================

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

    //load checkbox of selected rows

    for (var i = 0; i < checkedIds.length; i++) {

        $('#grid').find("input[class='checkvalue'][data-id='" + checkedIds[i] + "']").prop('checked', true);
    }
    //

    //$("#gridForm input[name='SalePriceOrther']")

    if (checkedIds.length > 0) {
        $("#btnDelete").css('opacity', '1');
    } else {
        $("#btnDelete").css('opacity', '0.3');
    }
}

function checkBox(obj) {

    if ($(obj).is(':checked')) {
        var index = checkedIds.indexOf($(obj).data('id'));
        if (index < 0) {
            //khong co moi pust vao, co roi thi bo qua
            checkedIds.push($(obj).data('id'));
        }

    }
    else {
        var index = checkedIds.indexOf($(obj).data('id'));
        if (index > -1) {
            checkedIds.splice(index, 1);
        }
    }
    if (checkedIds.length > 0) {
        $('#btnDelete').css('opacity', '1');
    } else {
        $('#btnDelete').css('opacity', '0.3');
    }

}

function checkBoxAll() {
}

function onRequestStart(e) {
    blockUIFromUser(false);
    //$("#divLoading").show();
}

function onRequestEnd(e) {

    if (e.type == "update" || e.type == "create") {
        if (e.response.Errors == null) {

            alertBox("Lưu thành công", "", true, 3000);

        }
        else {
            alertBox("Có lỗi", e.response.Errors.er.errors[0], false, 3000);
        }
    }

    else if (e.type == "read") {

    }
    else {
        arrExport = new Array();
        for (var i = 0; i < e.sender._view.length; i++) {
            var value = e.sender._view[i];
            arrExport.push(value.AnnouncementID);
        }
    }
    //$("#divLoading").hide();
}


function onClosePopup() {
    $("#popup").data("kendoWindow").close();
}

function deleteSelected() {

    //var data = checkedIds;
    if (checkedIds != "" && checkedIds != null) {
        $.SmartMessageBox({
            title: "",
            content: "Bạn có muốn xóa không?",
            buttons: '[Đóng lại][Xác nhận]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Xác nhận") {

                blockUIFromUser(true);
                $.post(r + "/AdminConfigAnnouncement/Deactive", { data: checkedIds.toString() }, function (data) {
                    if (data.success) {

                        //$('#grid').attr('data-kendogrid-selected', '');
                        checkedIds = new Array();
                        //$.gritter.add({
                        //    // (string | mandatory) the heading of the notification
                        //    title: '',
                        //    // (string | mandatory) the text inside the notification
                        //    text: 'Xóa thành công',
                        //    class_name: 'gritter-success'
                        //});

                        alertBox("Xóa thành công", "", true, 3000);

                        $("#grid").data("kendoGrid").dataSource.read();
                    }
                    else {
                        //$.gritter.add({
                        //    // (string | mandatory) the heading of the notification
                        //    title: '',
                        //    // (string | mandatory) the text inside the notification
                        //    text: data.message,
                        //    class_name: 'gritter-error'
                        //});

                        alertBox(data.message, "", false, 3000);

                    }
                });
            }
            if (ButtonPressed === "Đóng lại") {
                return;
            }

        });
    } else {
        return;
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

//===========================================Popup ===========================================

function onOpenPopup(key, obj) {
    //eventHotKey =
    $("#formPopup").find('em').remove();
    $("#formPopup").find('section label').removeClass('state-error').removeClass('state-success');
    idPopup = ".k-window";
    onRefreshPopup(obj);
    var popup = $('#popup').data("kendoWindow");
    popup.center().open();
    if (key == 0) {     // Create
        keyAction = 0;
        popup.title('Thêm');
        if ($(obj).data('url')) window.history.pushState({}, '', r + $(obj).data('url'));

    }
    else {      // Update       
        keyAction = 1;
        popup.title('Chỉnh sửa');
        var id = $(obj).data('id');
        //$("#formPopup").find('fieldset:eq(0) section:eq(0)').empty().append('<label class="label">Mã thông báo (*)<strong style="color:red;margin-left:10%">' + id + '</strong></label><input type="hidden" id="ArticleID" name="ArticleID" value="'+id+'"/>');
        $("#formPopup").find('fieldset:eq(0) section:eq(0)').empty().append('<label class="label" style="float: left; width: 150px;">Mã thông báo (*) </label><label style="float: left;text-align: left;width: 240px;height: 19px;padding-top: 2px;"><strong style="color:red;">' + id + '</strong><input type="hidden" id="ArticleID" name="ArticleID" value="' + id + '"/></label> <div style="clear:both"></div>');

        blockUIFromUser(true);
        $.post(r + "/AdminConfigAnnouncement/GetByID", { id: id }, function (data) {
            if (data.success) {

                var value = data.data;
                currentAnnouncementID = value.AnnouncementID;
                var active = value.IsActive == true ? "True" : "False";
                $("#formPopup #ArticleID").val(value.AnnouncementID);
                $("#formPopup #ArticleTitle").val(value.Title);

                $("#formPopup #ArticleText").val(value.ArticleText);
                CKEDITOR.instances['ArticleContentView'].setData(htmlDecode(value.ArticleContent));
                $("#formPopup #ArticleContent").val(value.ArticleContent);
                generateSelect2('s', 'formPopup #IsActive', active, '100%');
            }
            else {
                alertBox("Có lỗi", "", false, 3000);
                console.log(data.message);
            }

        });
        if ($(obj).data('url')) window.history.pushState({}, '', r + $(obj).data('url'));
    }
}

function onRefreshPopup(obj) {
    $('#formPopup')[0].reset();
    $("#formPopup").find('fieldset:eq(0) section:eq(0)').empty();
    generateSelect2('s', 'formPopup #IsActive', null, '100%');
}



