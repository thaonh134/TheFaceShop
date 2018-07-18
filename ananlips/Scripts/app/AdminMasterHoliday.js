var checkedIds = new Array();
var numHeight = 200;
//var eventHotKey =
$(document).ready(function () {
    loadToolbarStyle();
    //active menu
    setActiveMenu($("#menu_AdminMasterHoliday")[0]);
    document.title = "Lịch";

    $("#tabstrip").kendoTabStrip({
        animation: { open: { effects: "fadeIn" } }
    });

    $("#filterisactive").select2();
    $("#s2id_filterIsActive").css('width', '100%');

    $("#isactive").select2();
    $("#s2id_IsActive").css('width', '240px');


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
    $('#popupImport').kendoWindow({
        width: "600px",
        actions: ["Close"],
        title: "Import",
        visible: false,
        resizeable: false,
        open: function (e) {
            this.wrapper.css({ top: $('#header').height() });
            onPopupOpenEvent($('#popupImport'));
        },
        close: function (e) {
            onPopupOpenEvent(null);
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
    //chan su kien click nut submit khi form dang load
    
    $('#popup').kendoWindow({
       width: "1000px",
        actions: ["Close"],
        visible: false,
        resizable: false,
        open: function (e) {
            this.wrapper.css({ top: $('#header').height() });
            onPopupOpenEvent($('#popup'));
        },
        close: function (e) {
            onPopupOpenEvent(null);
        }
    });

    $("#formPopup").validate({
        // Rules for form validation
        rules: {
            Date: {
                required: true
            },
            Week: {
                required: true
            },

        },

        // Messages for form validation
        messages: {
            Date: {
                required: "Thông tin bắt buộc"
            },
            Week: {
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
                beforeSend: function () {
                    $("#loading").removeClass('hide');
                    blockUIFromUser(true);
                },
                success: function (data) {

                    if (data.success) {
                        $("#grid").data("kendoGrid").dataSource.read();
                        alertBox("Lưu thành công", "", true, 3000);
                    }
                    else {
                        alertBox(data.message, "", false, 3000);
                        console.log(data.message);
                    }
                    $("#loading").addClass('hide');
                }
            });
            return false;
        }
    });

    $("#txtDateToDate").keypress(function (e) {
        if (e.keyCode == 13) {
            doSearch();
            return false;
        }
    });

    $("#txtDate").keypress(function (e) {
        if (e.keyCode == 13) {
            doSearch();
            return false;
        }
    });

    $("#filterisactive").change(function () {
        if (e.keyCode == 13) {
            doSearch();
            return false;
        }
    });
    if ($("#btnInsert").length > 0) {
        $(document).keypress(function (e) {
            if (e.keyCode == 43) {  // 43 : +
                onOpenPopup(0, null);
            }
        });
    }
 
});

$(document).bind('keydown', function (event) {

    if (!eventHotKey) {
        //eventHotKey =
    }
    if (eventHotKey) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    
                    var temp = $("a.k-grid-save-changes");
                    if ($("a.k-grid-save-changes").length > 0) {
                        $("#grid").data("kendoGrid").saveChanges();
                    }
                    break;
            }
        }
    }
});

//============================================ UOM ========================================

function doSearch() {
    blockUIFromUser(false);
    var grid = $("#grid").data("kendoGrid");
    var filter = { logic: "and", filters: [] };

    var text = $("#txtDateToDate").val();
    if (text) {

        var res = text.split(" - ");
        if (res.length == 2) {
            var fromDate = convertDateFormart(res[0].trim(), 0);
            var toDate = convertDateFormart(res[1].trim(), 0);
            //chuyen doi tu ngay thang nam thanh nam thang ngay

            var filterAnd = { logic: "and", filters: [] };
            filterAnd.filters.push({ field: "Date", operator: "lte", value: toDate });
            filterAnd.filters.push({ field: "Date", operator: "gte", value: fromDate });
        }




        filter.filters.push(filterAnd);
    }
    var text = $("#txtDate").val();
    if (text) {
        var filterOr = { logic: "or", filters: [] };
        filterOr.filters.push({ field: "Week", operator: "contains", value: text });
        filterOr.filters.push({ field: "Month", operator: "contains", value: text });
        filterOr.filters.push({ field: "Year", operator: "contains", value: text });


        filter.filters.push(filterOr);
    }


    text = $("#filterisactive").val();
    if (text) {
        filter.filters.push({ field: "isactive", operator: "eq", value: text });
    }

    grid.dataSource.filter(filter);
}

function doCancelSearch() {
    $("#txtDateToDate").val('');
    $("#txtDate").val('');
    generateSelect2('s', 'filterisactive', '', '100%');
    doSearch();
}

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
    colorInCell_onDatabound();
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

//================================================== load style cell in kendogrid by status================================================

function colorInCell_onDatabound() {

    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataSource.data();
    $.each(data, function (i, row) {

        var temprow = $('tr[data-uid="' + row.uid + '"] ');
        if (temprow.length > 0) {
            var cells = $('tr[data-uid="' + row.uid + '"] ')[0].cells;
            //var aaa = cells.length - 1;
            var statusCell = cells[cells.length - 1];
            //var statusCell2 = $('tr[data-uid="' + row.uid + '"] ')[0].cells[cells.length];

            //$('tr[data-uid="' + row.uid + '"] ').css("background-color", "#0000ff");  //blue
            $(statusCell).css("background-color", "#C6EFCE");

        }



    });
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
        //$("#grid").data("kendoGrid").dataSource.read();
    }

    else if (e.type == "read") {

    }
    else {
        arrExport = new Array();
        for (var i = 0; i < e.sender._view.length; i++) {
            var value = e.sender._view[i];
            arrExport.push(value.Date);
        }
    }
    //$("#divLoading").hide();
}

function onOpenPopup(key, obj) {

}

function onRefreshPopup() {
    //$("#formPopup").find('fieldset:eq(0) section:eq(0)').empty().append('<label class="label" style="float:left">Mã đơn vị (*)</label><label class="input" style="float:right;width:240px;"><input type="text" id="Date" name="Date" class="input-xs" placeholder="Mã đơn vị" style="margin-right:85px" /><b class="tooltip tooltip-top-right">Mã đơn vị</b></label><div style="clear:both"></div>');
    //$("#isactive option[value='True']").attr('selected', true);
    //$("#Week").val('');
    //$("#Note").val('');
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
                $.post(r + "/AdminMasterHoliday/Deactive", { data: checkedIds.toString() }, function (data) {
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
