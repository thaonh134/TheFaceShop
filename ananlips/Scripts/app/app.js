/// <reference path="app.js" />
//var currentTimeSystem;
//var channelIDforPartial;
var idPopup;
var isOpenPopup = false;
var currentPopup = '';
var beforePopup = '';
var idopengrid;//tam thoi de cho nay bien open popup employer
var listIgnorKeywordSearch = '';

$(document).ready(function () {

    $(window).keydown(function (event) {
        if (event.which == 13 && !$(event.target).is("textarea") && (event.target.form && $(event.target.form)[0].id != 'formSearch')) {
            event.preventDefault();
            return false;
        }
    });

    // cấu hình dùng js để xử lý nút back
    window.onpopstate = function (event) {
        onLoadPage(location.href, "1", 1);// load ajax ko có layout
    };

    //resize window event
    $(window).resize(function () {
        resizedivMainContent();
    });
    //Show hide content in divSearch
    $('.tw_widget .tw_widget_heading').click(function () {
        showhide_widget_contain(this);
    });

    // cấu hình dùng js để gọi controler
    $('a.redirectbyajax').click(function (e) {
        e.preventDefault();
        onLoadPage($(this).attr("href"), "1", 0);
    });


    //Tắt pop đang active
    $(document).on("click", ".k-overlay", function () {
        var popup = getActiveKendoWindow();
        if (popup) $("#" + popup + "").data("kendoWindow").close();
        else $('.k-overlay').css('display', 'none');

    });
    //Tắt popup bootbox
    $(document).on('click', '.modal-backdrop', function (event) {
        //bootbox.hideAll();
    });
    //listIgnorKeywordSearch_Mail = '.com, com., com, .gmail, gmail,gmail.,.vn,@gm,@gma, @gmai, @gmail , @gmail';
    //listIgnorKeywordSearch_Company = 'co phan,cổ phần,tnhh,TNHH,công ty,cong ty, cty, MTV, cp';

    //kendo.culture("vi-VN");
    initTwinApp();

});

function initTwinApp() {
    commonElement();
    jqueryValidator_custom();
    setValidSelection();
    loadToolbarStyle();
    ckeditorAllowModal();
}

//phim tat on form
function onInitFunctionForm(fid,btn_g_id,btn_f_id) {

    //Type + => insert
    if ($("#" + btn_g_id).length > 0) {
        $(document)
            .keypress(function (e) {
                if (e.keyCode == 43) { // 43 : +
                    var btnInsert = $("#" + btn_g_id)[0];
                    if (!isOpenPopup) {
                        bootbox.hideAll();
                        routerActionLink(btnInsert);
                    }

                }
            });
    }

    //Type Ctr + S => submit form
    $(document)
        .bind('keydown',
            function (event) {
                if (isOpenPopup) {
                    if (event.ctrlKey || event.metaKey) {
                        switch (String.fromCharCode(event.which).toLowerCase()) {
                            case 's':
                                event.preventDefault();
                                if ($("#" + btn_f_id).length > 0) {
                                    $(':focus').blur();
                                    if ($("#" + fid).valid()) {
                                        $("#" + fid).submit();
                                    }
                                }
                                break;
                        }
                    }
                }
            });
}
/**
 * begin load page with ajax
 */

function onLoadPage(url, redirectbyajax, IsOnpopstate) {
    //IsOnpopstate: 0| 1 - 0: add new history(ko back), 1: replace history(use back)
    var dataPost = { redirectbyajax: redirectbyajax }
    if (url != "" && url != "#" && url != null) {
        if (redirectbyajax == "1") {
            $.ajax({
                url: url,
                type: "get",
                data: dataPost,
                beforeSend: function () {
                },
                success: function (data) {
                    $("div.k-window").remove();
                    $("div#content").html(data);

                    localStorage['urlpage_pre'] = window.location;
                    localStorage['urlpage'] = url;
                    if (IsOnpopstate == 0) window.history.pushState({}, '', url);
                    else if (IsOnpopstate == 1) window.history.replaceState({}, '', url);

                },
                error: function (e) { }
            });
        } else if (redirectbyajax == "0") {


        }
    }

}
/**
 * end load page with ajax
 */
/**
 * begin funtions common
 */

function commonElement() {

    $('.tw-help-icon[data-toggle="tooltip"]').tooltip();

    $('.bootbox').on('hidden.bs.modal', function () {
        onClosePopupCustom();
    });

    $('.start_EndDate').daterangepicker({
        format: 'DD/MM/YYYY',
        locale: {
            applyLabel: 'Xác nhận',
            cancelLabel: 'Đóng lại',
            fromLabel: 'Từ ngày',
            toLabel: 'Đến ngày',
            customRangeLabel: 'Custom',
            daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            firstDay: 1
        }
    });
    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    $('.clockpicker').clockpicker({
        placement: 'bottom',
        donetext: 'Xác nhận',
        //autoclose:"true"
    });
    $(".timepicker").kendoTimePicker({
        format: "HH:mm"
    });
    $('.start_EndDate').click(function () {

        var popub_zIndex = $('.k-widget.k-window[isactive="true"]').css('z-index');
        //alert(temp + '' + tempc);
        $('.daterangepicker.dropdown-menu.opensright').css('z-index', popub_zIndex + 1);

    });

    $('.datepicker').click(function () {
        var popub_zIndex = $('.k-widget.k-window[isactive="true"]').css('z-index');
        //alert(temp + '' + tempc);
        $('#ui-datepicker-div').css('z-index', popub_zIndex + 1);

    });

    $('.clockpicker').click(function () {

        var popub_zIndex = $('.k-widget.k-window[isactive="true"]').css('z-index');
        //alert(popub_zIndex);
        $('.clockpicker-popover').css('z-index', popub_zIndex + 1);
    });

    $('.js-copy').click(function () {
        var text = $(this).attr('data-copy');
        var el = $(this);
        copyToClipboard(text, el);
    });
}
//function copyToClipboard(text) {
//    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
//    //document.execCommand('copy');
//}
function copyToClipboard(text, el) {
    var copyTest = document.queryCommandSupported('copy');
    var elOriginalText = el.attr('data-original-title');

    if (copyTest === true) {
        var copyTextArea = document.createElement("textarea");
        copyTextArea.value = text;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'Copied!' : 'Whoops, not copied!';
            el.attr('data-original-title', msg).tooltip('show');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(copyTextArea);
        el.attr('data-original-title', elOriginalText);
    } else {
        // Fallback if browser doesn't support .execCommand('copy')
        window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
    }
}

function jqueryValidator_custom() {

    jQuery.validator.addMethod("alphanumeric", function (value, element) {
        return this.optional(element) || /^\w+$/i.test(value);
    }, "Không nhập ký tự đặc biệt");

    jQuery.validator.addMethod("emailRegex", function (value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Email không hợp lệ");

    jQuery.validator.addMethod("clockpickerRegex", function (value, element) {

        var check = false;
        var stringH = value;
        var lst = value.split(':');
        if (lst.length != 2) return false;
        var str1 = lst[0];
        var str2 = lst[1];
        try {
            if ((str1.length != 2 || str2.length != 2) || (str1 < 0 || str1 >= 24) || (str2 < 0 || str2 >= 60)) return false;
        }
        catch (err) {
        }
        return true;
    }, "Giờ nhập không đúng");

    jQuery.validator.addMethod("NumRegex", function (value, element) {
        return this.optional(element) || /^[0-9-.+()/ ]*$/.test(value);
    }, "Số điện thoại bao gồm số và các kí tự '+,-,(,),/'");

    //Ràng buộc nhập số và chữ
    jQuery.validator.addMethod("NumberAndLetter", function (value, element) {
        return this.optional(element) || /^[0-9a-zA-Z/ ]*$/.test(value);
    }, "Vui lòng không nhập ký tự đặc biệt");

    jQuery.validator.addMethod("dateFormatVN", function (value, element) {
        var check = false;
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if (re.test(value)) {
            var adata = value.split('/');
            var dd = parseInt(adata[0], 10);
            var mm = parseInt(adata[1], 10);
            var yyyy = parseInt(adata[2], 10);
            var xdata = new Date(yyyy, mm - 1, dd);
            if ((xdata.getFullYear() === yyyy) && (xdata.getMonth() === mm - 1) && (xdata.getDate() === dd)) {
                check = true;
            }
            else {
                check = false;
            }
        } else {
            check = false;
        }
        return this.optional(element) || check;
    }, "Vui lòng nhập đúng định dạng dd/MM/yyyy !");

    jQuery.validator.addMethod("min_length_100", function (value, element) {
        return value.length >= 100;
    }, "Tối thiểu 100 ký tự");

    jQuery.validator.addMethod("time", function (value, element) {
        return this.optional(element) || /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/i.test(value);
    }, "Vui lòng nhập đúng định dạng HH:mm.");

    jQuery.validator.addMethod("dateVNGreaterThan", function (value, element, params) {

        var adata = value.split('/');
        var dd = parseInt(adata[0], 10);
        var mm = parseInt(adata[1], 10);
        var yyyy = parseInt(adata[2], 10);
        var xdata = new Date(yyyy, mm - 1, dd);

        var bdata = params[0].val().split('/');
        var dd = parseInt(bdata[0], 10);
        var mm = parseInt(bdata[1], 10);
        var yyyy = parseInt(bdata[2], 10);
        var ydata = new Date(yyyy, mm - 1, dd);
        return Number(xdata) > Number(ydata);
    }, 'Ngày phải lơn hơn {1}.');
    jQuery.validator.addMethod("dateVNGreaterOrThan", function (value, element, params) {

        var adata = value.split('/');
        var dd = parseInt(adata[0], 10);
        var mm = parseInt(adata[1], 10);
        var yyyy = parseInt(adata[2], 10);
        var xdata = new Date(yyyy, mm - 1, dd);

        var bdata = params[0].val().split('/');
        var dd = parseInt(bdata[0], 10);
        var mm = parseInt(bdata[1], 10);
        var yyyy = parseInt(bdata[2], 10);
        var ydata = new Date(yyyy, mm - 1, dd);
        if (!value) {
            return true;

        }
        return Number(xdata) >= Number(ydata);
    }, 'Ngày phải lơn hơn hoặc bằng {1}.');

    jQuery.validator.addMethod("dateVNLesserThan", function (value, element, params) {
        debugger
        var adata = value.split('/');
        var dd = parseInt(adata[0], 10);
        var mm = parseInt(adata[1], 10);
        var yyyy = parseInt(adata[2], 10);
        var xdata = new Date(yyyy, mm - 1, dd);

        var bdata = params[0].val().split('/');
        var dd = parseInt(bdata[0], 10);
        var mm = parseInt(bdata[1], 10);
        var yyyy = parseInt(bdata[2], 10);
        var ydata = new Date(yyyy, mm - 1, dd);
        if (!value) {
            return true;

        }
        return Number(xdata) < Number(ydata);
    }, 'Ngày phải nhỏ hơn {1}.');
    jQuery.validator.addMethod("dateVNLesserOrThan", function (value, element, params) {

        var adata = value.split('/');
        var dd = parseInt(adata[0], 10);
        var mm = parseInt(adata[1], 10);
        var yyyy = parseInt(adata[2], 10);
        var xdata = new Date(yyyy, mm - 1, dd);

        var bdata = params[0].val().split('/');
        var dd = parseInt(bdata[0], 10);
        var mm = parseInt(bdata[1], 10);
        var yyyy = parseInt(bdata[2], 10);
        var ydata = new Date(yyyy, mm - 1, dd);
        if (!value) {
            return true;
        }
        return Number(xdata) <= Number(ydata);
    }, 'Ngày phải nhỏ hơn {1}.');

    //Author: phonght
    jQuery.validator.addMethod("dateVNLesserOrThan_string", function (value, element, params) {

        var adata = value.split('/');
        var dd = parseInt(adata[0], 10);
        var mm = parseInt(adata[1], 10);
        var yyyy = parseInt(adata[2], 10);
        var xdata = new Date(yyyy, mm - 1, dd);

        var bdata = $(params[0]).val().split('/');
        var dd = parseInt(bdata[0], 10);
        var mm = parseInt(bdata[1], 10);
        var yyyy = parseInt(bdata[2], 10);
        var ydata = new Date(yyyy, mm - 1, dd);
        if (!value) {
            return true;
        }
        return Number(xdata) <= Number(ydata);
    }, 'Ngày phải nhỏ hơn {1}.');

    jQuery.validator.addMethod("dateVNMinWeek", function (value, element, params) {

        var adata = value.split('/');
        var dd = parseInt(adata[0], 10);
        var mm = parseInt(adata[1], 10);
        var yyyy = parseInt(adata[2], 10);
        var xdata = new Date(yyyy, mm - 1, dd);

        var bdata = params[0].val().split('/');
        var dd = parseInt(bdata[0], 10);
        var mm = parseInt(bdata[1], 10);
        var yyyy = parseInt(bdata[2], 10);
        var ydata = new Date(yyyy, mm - 1, dd);
        if (!value) {
            return true;
        }
        xdata.setDate(xdata.getDate() + 7);
        return Number(xdata) < Number(ydata);
    }, 'Ngày phải nhỏ hơn [{1}] 7 ngày.');

    jQuery.validator.addMethod("notEqual", function (value, element, param) {

        return value != param;
    }, "Thông tin bắt buộc");
    jQuery.validator.addMethod("GreaterOrThan", function (value, element, params) {

        if (!value) return true;
        return Number(value) >= Number(params[0].val());
    }, '{1}.');

    //Bội số của 1000
    jQuery.validator.addMethod("_1000x", function (value, element, params) {
        value = $(element).autoNumeric('get');
        if (value == 0)
            return false;
        if (!value) return true;

        return (value % (params[0]) == 0);
    }, 'Số điểm mua phải là bội số của {1}.');

    jQuery.validator.addMethod("notEqualPW", function (value, element, param) {

        return value != param;
    }, "Mật khẩu quá đơn giản");


}

function ckeditorAllowModal() {
    //fix ckeditor input don't work modal bootbox
    $.fn.modal.Constructor.prototype.enforceFocus = function () {
        var $modalElement = this.$element;
        $(document).on('focusin.modal', function (e) {
            var $parent = $(e.target.parentNode);
            if ($modalElement[0] !== e.target
                            && !$modalElement.has(e.target).length
                            && $(e.target).parentsUntil('*[role="dialog"]').length === 0) {
                $modalElement.focus();
            }
        });
    };
}
//event đóng mở popup
function onOpenPopupCustom(obj) {
    if (obj) {
        var temp = $(obj)[0].element[0];
        $(temp).parent().css({ 'top': '10px' });
    }
    //$('body').css('overflow', 'hidden');
    //$(this)
    //$('body').css('overflow', 'hidden');
}

function onClosePopupCustom(obj) {
    //$('body').css('overflow', 'auto');
    //khi tạo mới xong bấm đóng popup no ko bị mất màn đen, chưa rỏ nguyên nhân tại sao. thánh nào vô sau thì fix hộ
    setTimeout(function () { $('.k-overlay').css('display', 'none'); }, 200);
    if (param_obj.ourl) window.history.replaceState({}, '', r + param_obj.ourl);
    isOpenPopup = false;
}

function openImport() {
    idPopup = ".k-window";
    //$("#divMaskPopup").show();
    $('#popupImport').data("kendoWindow").open();
    $(".k-window span.k-i-close").click(function () {
        //$("#divMaskPopup").show();
    });
}

$("#importform").ajaxForm({
    beforeSend: function () {
        $("#popupImport").data("kendoWindow").close();
        blockUIFromUser();
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

/*Import export*/
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

function onPopupOpenEvent() { };


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
//Thaonh
function setForcusPopup(fid, type) {
    if (!fid) return;
    $("#" + fid + " input:text:visible:first").focus().select();
}
/**
 * end functions common
 */

function showhide_widget_contain(e) {
    var item = $(e);
    var icon = $(e).find('.button-icon i');
    var aside = $(e).parent().find('aside.tw_widget_contain');
    //fa fa-chevron-circle-down
    //fa fa-chevron-circle-up
    if ($(item).hasClass('hidden-aside')) icon.removeClass().addClass('fa fa-minus');
    else icon.removeClass().addClass('fa fa-plus');
    if ($(item).hasClass('hidden-aside')) $(item).removeClass('hidden-aside').parent().find('aside.tw_widget_contain').show();
    else $(item).removeClass('hidden-aside').addClass('hidden-aside').parent().find('aside.tw_widget_contain').hide();

}
//Custome panel
function CustomePanelWidget() {
    $('.jarviswidget header').css({ 'background-color': 'rgb(198,239,206)', 'color': 'rgb(0,97,0)' });
    $('.jarviswidget header').hover(function () {
        $(this).css('cursor', 'pointer');
    });
    $('.jarviswidget header').click(function () {
        var div_content = $(this).parent().find('div[role = "content"]').length > 0 ? $(this).parent().find('div[role = "content"]') : $(this).parent().find('div[data-role = "content"]');
        var header = $(this).parent().find('header[role = "heading"]').length > 0 ? $(this).parent().find('header[role = "heading"]') : $(this).parent().find('header[data-role = "heading"]');

        if (div_content.css('display') == 'none') {
            div_content.slideDown('fast');
            header.find('div a i').removeClass('fa-plus').addClass('fa-minus');

        }
        else {
            div_content.slideUp('fast');
            header.find('div a i').removeClass('fa-minus').addClass('fa-plus');
        }
    });
}

function resizedivMainContent(number) {
    //resize height content
    $('#main').height(parseInt($(window).height() - $('#header').height() - 65));

    var w, w_menu, w_search, w_maincontent;
    var min_w_maincontent = 500;
    w = parseInt($(window).width());
    //w menu
    w_menu = $('#left-panel #menuLeft').width();
    //w search
    w_search = $('#content .divSearch').width();
    if ($('body').hasClass('hidden-menu')) {
        w_maincontent = w - w_search;

    } else {
        w_maincontent = w - w_menu - w_search;

    }
    if (!number) w_maincontent = (w_maincontent - 90) > min_w_maincontent ? w_maincontent - 90 : min_w_maincontent;
    else w_maincontent = (w_maincontent - number) > min_w_maincontent ? w_maincontent - number : min_w_maincontent;
    //console.log(w_maincontent);
    $('#content .divMainContent').width(w_maincontent + 40);
    //hidden-menu"
    //if(number)
}

function resizeGrid(number) {

    //var h_search = $(".divSearch").height();
    //var h = parseInt($(window).height()) - h_search;
    //var content = $("#grid").find(".k-grid-content");
    // var contentlock = $("#grid").find(".k-grid-content-locked");

    //content.height(h - number);
    //content_lock.height(h - number - 20);
    //content.height("auto");
    //content.css({
    //    "overflow-y": "hidden"
    //});
    // content_lock.height("auto");
    //content_lock.css({
    //    "overflow-y": "hidden"
    //});
    //resize
    //$("#grid").data("kendoGrid").dataSource.fetch();
}

function resizeOtherGrid(number, gridE) {

    //var h_search = $(".divSearch").height();
    //if (h_search === null) {
    //    var h_contentTab = 0;
    //    var h_header = $('#header').height();
    //    if ($(".ContentTab").length) {
    //        h_contentTab = $($(".ContentTab")[0]).height();
    //    }
    //    h_search = h_contentTab + h_header * 2;
    //}

    //var h = parseInt($(window).height()) - h_search;

    //var content = gridE.find(".k-grid-content");
    //var content_lock = gridE.find(".k-grid-content-locked");
    //content.height("auto");
    //content.css({
    //    "overflow-y": "hidden"
    //});
    //content.height(h - number);
    //content_lock.height(h - number - 20);


    //resize
    //gridE.data("kendoGrid").dataSource.fetch();
}

function alertBox(title, content, flag, timeout) {
    //var icon = flag ? "fa-thumbs-up" : "fa-thumbs-down";
    var color = '';

    if (flag == true) {
        color = "#8ac38b";
    }
    else if (flag == false) {
        color = "#c26565";
    }
    else if (flag == 'warning') {
        color = "#c79121";
    }
    title = title.replace('The transaction ended in the trigger. The batch has been aborted.', '');
    content = content.replace('The transaction ended in the trigger. The batch has been aborted.', '');
    $.smallBox({
        title: title,
        content: content,
        color: color,
        //iconSmall: "fa " + icon + " bounce animated",
        timeout: timeout
        //icon: "fa fa-volume-off"
    });
}

//load dynamic list selection 

/*
* lưu ý trước khi bơi vào đây
các kiểu khai báo ở file html
type1:<select id="EmployerID" name="EmployerID" placeholder="-- Nhà tuyển dụng --"></select>
type2:  @Html.DropDownList("CustomerID", new SelectList(listCustomer, "ID", "Name"), new { placeholder = "-- Khách hàng thanh toán --"})
type3: @Html.DropDownList("PaymentMethod", new SelectList(listPaymentMethod, "Value", "Text"), "-- Chọn hình thức thanh toán --")
ở type 1,2 : selection sẻ add thuộc tính placeholder vào trong thẻ select
ở type 3: selection sẻ add giá trị default vào trong thẻ option với value '' (có thể chọn được)

*/

function getListItem(data, idElementSet, routerName, method, width) {

    $.ajax({
        url: r + "/" + routerName + "/" + method,
        type: "post",
        async: false,
        data: data,
        beforeSend: function () {
            blockUIFromUser(false);
        },
        success: function (data) {

            if (data.success) {

                var lstE = $("#" + idElementSet);
                var selectE, idSelectE, s2idE;
                for (var i = 0; i < lstE.length; i++) {
                    selectE = $(lstE[i]);
                    if (!selectE.is("select")) {
                        continue;
                    }

                    selectE.select2();
                    var item = '';
                    var optionDefault = selectE.find('option')[0];
                    selectE.find('option').remove();
                    if (typeof (optionDefault) != "undefined") {

                        item = '<option value="">' + optionDefault.textContent + '</option>';
                    }
                    else {
                        item = '<option value=""></option>';
                    }
                    for (var i = 0; i < data.data.length; i++) {
                        var value = data.data[i];
                        item += '<option value="' + value.ID + '">' + value.Name + '</option>';
                    }
                    selectE.append(item);
                    selectE.select2();
                    idSelectE = selectE.attr('id');
                    s2idE = selectE.parent().find("#s2id_" + idSelectE);

                    if (selectE.prev().attr('id') == 's2id_' + idSelectE) {
                        selectE.prev().css('width', width);
                    }
                    selectE.on("select2-open", function (e) {
                        $('.select2-drop-mask').zIndex(s2idE.zIndex() + 1);
                        $('#select2-drop').zIndex(s2idE.zIndex() + 2);
                    });
                }

            }
            else {
                alertBox("Có lỗi", data.message, false, 3000);
                console.log(data.message);
            }

        }
    });
}

function getListItemAndPushData(data, idElementSet, routerName, method, width) {

    $.ajax({
        url: r + "/" + routerName + "/" + method,
        type: "post",
        async: false,
        data: data,
        beforeSend: function () {
            blockUIFromUser(false);
        },
        success: function (data) {

            if (data.success) {

                var lstE = $("#" + idElementSet);
                var selectE, idSelectE, s2idE;
                for (var i = 0; i < lstE.length; i++) {
                    selectE = $(lstE[i]);
                    if (!selectE.is("select")) {
                        continue;
                    }

                    selectE.select2();
                    var item = '';
                    var optionDefault = selectE.find('option')[0];
                    selectE.find('option').remove();
                    if (typeof (optionDefault) != "undefined") {

                        item = '<option value="">' + optionDefault.textContent + '</option>';
                    }
                    else {
                        item = '<option value=""></option>';
                    }
                    for (var i = 0; i < data.data.length; i++) {
                        var value = data.data[i];
                        item += '<option value="' + value.ID + '">' + value.Name + '</option>';
                    }
                    selectE.append(item);
                    selectE.select2();
                    idSelectE = selectE.attr('id');
                    s2idE = selectE.parent().find("#s2id_" + idSelectE);
                    if (selectE.prev().attr('id') == 's2id_' + idSelectE) {
                        selectE.prev().css('width', width);
                    }
                    selectE.on("select2-open", function (e) {
                        $('.select2-drop-mask').zIndex(s2idE.zIndex() + 1);
                        $('#select2-drop').zIndex(s2idE.zIndex() + 2);
                    });
                }

                pushAllOptionMultiSelect(idElementSet);
                generateSelect2('m', idElementSet, '', width);

            }
            else {
                alertBox("Có lỗi", data.message, false, 3000);
                console.log(data.message);
            }

        }
    });
}

function getInputSearchId(id, parent) {

    var result = '';
    var select2InputE = $('#' + parent + ' #s2id_' + id).find('.select2-offscreen').attr('for');
    if (select2InputE != null) {
        //var id_input = select2InputE[0].id;
        result = select2InputE + "_search";
    }
    return result

}
//bind data tu link server ra list

function bindDataToList(idElementSet, data, width) {

    var lstE = $("#" + idElementSet);
    for (var i = 0; i < lstE.length; i++) {
        var selectE = $(lstE[i]);
        if (!selectE.is("select")) {
            continue;
        }

        var item = '';
        var optionDefault = selectE.find('option')[0];
        selectE.find('option').remove();
        if (typeof (optionDefault) != "undefined") {

            item = '<option value="">' + optionDefault.textContent + '</option>';
        }
        else {
            item = '<option value=""></option>';
        }
        for (var i = 0; i < data.length; i++) {
            var value = data[i];
            item += '<option value="' + value.ID + '">' + value.Name + '</option>';
        }
        selectE.append(item);
        selectE.select2();
        var idSelectE = selectE.attr('id');
        if (selectE.prev().attr('id') == 's2id_' + idSelectE) {
            selectE.prev().css('width', width);
        }
        //selectE.select2('open');
    }
}

//reset select 2 chi conf 1 the option default
function resetSelect2OnlyDefault(type, idElementSet, width) {
    var lstE = $("#" + idElementSet);
    for (var i = 0; i < lstE.length; i++) {
        var selectE = $(lstE[i]);
        if (!selectE.is("select")) {
            continue;
        }
        selectE.select2();
        var item = '';
        var optionDefault = selectE.find('option')[0];
        selectE.find('option').remove();
        if (typeof (optionDefault) != "undefined") {

            item = '<option value="">' + optionDefault.textContent + '</option>';
        }
        else {
            item = '<option value=""></option>';
        }
        selectE.append(item);

        var idSelectE = selectE.attr('id');
        $("#" + idElementSet + " option[value='']").attr('selected', true);
        selectE.select2();
        if (selectE.prev().attr('id') == 's2id_' + idSelectE) {
            selectE.prev().css('width', width);
        }
    }
}

//generate select
function generateSelect2(type, id, value, width) {
   
    var selectE, idSelectE, s2idE;
    var lstE;
    //fix lại có thể truyền id hoặc itemE
    if (typeof id == "string")  lstE = $("#" + id);
    else lstE = id;
    if (lstE == null) {
        return false;
    }
    for (var i = 0; i < lstE.length; i++) {
        selectE = $(lstE[i]);
        if (!selectE.is("select")) {
            continue;
        }

        idSelectE = selectE.attr('id');
        s2idE = selectE.parent().find("#s2id_" + idSelectE);
        if (s2idE.length == 0)
            selectE.select2();

        idSelectE = selectE.attr('id');
        s2idE = selectE.parent().find("#s2id_" + idSelectE);
        if (s2idE.length == 0)
            continue;

        if (type == 'm') {
            //kieu chon nhieu
           

            s2idE.css('width', width);
            s2idE.find('input').css('width', width);
            if (selectE.find("option[selected='selected']").length > 0) {
                s2idE.find("ul .select2-search-field input").css({ 'width': '10px' });
            }
            //onclick
            selectE.click(function () {
                s2idE.find('.select2-search-field').css('width', 'auto');
            });
            var lst = [];
            selectE.find("option[selected='selected']").each(function (i, selected) {
                lst[i] = $(selected).val();
            });
            //var temp = selectE.val();
            selectE.select2('val', lst);
        }
        else if (type == 's') {
            if (value == null || value == '') {
                if (value === 0) {
                    selectE.find("option[value='0']").attr('selected', true);
                }
                else {
                    selectE.find("option").removeAttr('selected');
                }
            }
            else {
                selectE.find("option").removeAttr('selected');

                //không phân biệt hoa thường

                var value_maps = $.map(selectE.find("option"), function (elt, i) {
                    var temp = $(elt).attr('value');
                    if (typeof value == "string") {
                        if (temp.toLowerCase() == value.toLowerCase()) return $(elt).attr('value');
                    }

                });
                if (value_maps.length > 0) value = value_maps[0];
                selectE.find("option[value='" + value + "']").attr('selected', true);

            }

            selectE.select2();
            selectE.select2("val", value);

            if (selectE.prev().attr('id') == 's2id_' + idSelectE) {
                selectE.prev().css('width', width);
            }

        }

        selectE.on("select2-open", function (e) {
            //$('.select2-drop-mask').zIndex($(this).zIndex() + 1);
            //$('#select2-drop').zIndex($(this).zIndex() + 2);
        });
    }
    return 1;
}

//call dungNDQ request
function call_DungNDQRequest_Select(lstE, lstignore) {
    setTypeNonDataForSelect(lstE, lstignore);
    if (lstE == null) {
        return false;
    }
    for (var i = 0; i < lstE.length; i++) {
        var itemE = $(lstE[i]);
        run_DungNDQRequest_Select(itemE, lstignore);

    }
    return 1;
}
//set type nodata for select option
function setTypeNonDataForSelect(lstE, lstignore) {
    if (lstE == null) {
        return false;
    }
    if (!lstignore || lstignore.length == 0 || !lstignore) return;
    for (var i = 0; i < lstE.length; i++) {
        var itemE =$(lstE[i]);
        for (var j = 0; j < lstignore.length; j++) {
            itemE.find("option[value='" + lstignore[j] + "']").attr('type', 'nodata');
        }
    }

   
}

//run dungNDQ request
function run_DungNDQRequest_Select(itemE, lstignore) {
    var id, s2idE;

    if (!itemE.is("select")) {
       return ;
    }
    id = itemE.attr('id');
    s2idE = itemE.parent().find("#s2id_" + id);

    if (s2idE.length == 0)
        itemE.select2();

    id = itemE.attr('id');
    s2idE = itemE.parent().find("#s2id_" + id);
    if (s2idE.length == 0)
        return;

    s2idE.find(".select2-choices").click(function () {
        dungNDQ_prechoice = itemE.val();
    });
    itemE.change(function () {
        removeSelect2Choice(itemE, dungNDQ_prechoice, $(this).val(), lstignore);
    });
}

//remove select2-search-choice by values
function removeSelect2Choice(itemE, prechoice, lstchoice, lstignore) {
    /*
    id: id element
    value: value choices
    lstignore: 

    -- yêu cầu sau đó: lstIgnore tương đương các item trong list này là kiểu nodata (type=nodata)
    -- các select kiểu nodata sẻ auto selected all value của select hiện tại
    */
    var id, s2idE;
    if (!itemE.is("select")) {
        return;
    }
    id = itemE.attr('id');
    s2idE = itemE.parent().find("#s2id_" + id);

    if (s2idE.length == 0)
        itemE.select2();

    id = itemE.attr('id');
    s2idE = itemE.parent().find("#s2id_" + id);
    if (s2idE.length == 0)
        return;


    //không có chọn gì 
    if (!lstchoice || lstchoice.length == 0 ) return;
    //chọn lần đầu tiên prechoice = null kiểm tra giá trị được chọn vs giá trị ignore
    if (!prechoice && lstchoice) {
        if (lstignore.indexOf(lstchoice[0]) != -1) {
            itemE.find("option").removeAttr('selected');
            itemE.find("option[type!='nodata']").attr('selected', true);
            generateSelect2('m', itemE, '', '100%');
            dungNDQ_choice = [lstchoice[0]];
            return;
        } else return;
    }
    itemE.find("option").removeAttr('selected');

    var choices = lstchoice.filter(function (obj) { return prechoice.indexOf(obj) == -1; });
    
    dungNDQ_choice = choices;
    if (lstignore.indexOf(choices[0]) == -1) {
        // remove inoge;
        for (var i = 0; i < lstchoice.length; i++) {
            if (lstignore.indexOf(lstchoice[i]) == -1) itemE.find("option[value='" + lstchoice[i] + "']").attr('selected', true);
            else itemE.find("option[value='" + lstchoice[i] + "']").removeAttr('selected');
        }

    } else {
        //truoc day la load data của lstignore , sau này thay đổi nên load tất cả data của selection ngoại trừ type=nodata (ngoại trừ value trong lstignore)
        //// load ignore
        //for (var i = 0; i < lstchoice.length; i++) {

        //    if (lstignore.indexOf(lstchoice[i]) != -1) $("#" + id + " option[value='" + lstchoice[i] + "']").attr('selected', true);
        //}
        itemE.find("option[type!='nodata']").attr('selected', true);

    }
    generateSelect2('m', itemE, '', '100%');

}


//set all value multi select
function setAllValueSelectMulti(lstE, selected) {
    
    if (lstE == null) {
        return false;
    }
    for (var i = 0; i < lstE.length; i++) {
        var itemE = $(lstE[i]);
        if (selected) itemE.find('option[type!="nodata"]').attr('selected', 'selected');
        else itemE.find("option:selected").removeAttr("selected");
    }
    generateSelect2('m', lstE, '', '100%');

   

}


//load all option of  multi selection
function pushAllOptionMultiSelect(id) {
    var listOptionValue = [];
    $("#" + id + " option:selected").removeAttr('selected');
    $("#" + id + " option").each(function () {
        if ($(this).val())
            listOptionValue.push($(this).val());
    });

    for (var i = 0; i < listOptionValue.length; i++) {
        $("#" + id + " option[value='" + listOptionValue[i] + "']").attr('selected', true);

    }
}

//max item select
function maxItemSelect(id, num, message) {
    var lstE = $("#" + id);
    if (lstE == null) {
        return false;
    }
    for (var i = 0; i < lstE.length; i++) {
        var selectE = $(lstE[i]);
        if (!selectE.is("select")) {
            continue;
        }
        //kieu chon nhieu
        var idSelectE = selectE.attr('id');
        var s2idE = selectE.parent().find("#s2id_" + idSelectE);
        if (s2idE.length == 0)
            continue;
        var len = s2idE.find('.select2-choices li').length;
        if (len > num + 1) {
            alertBox("Chú ý", message, false, 3000);
            //$('#' + id + ' option').attr('disabled', 'disabled');
            //$('#' + id + ' option [selected="selected"]').attr('disabled', false);
        }
        else {
            //$('#' + id + ' option').attr('disabled', false);
        }
    }
}

//nho chuyen ten ham nay thanh changeGridStyle
function changeStatusGrid(idGrid) {

    var arrRow = $("#" + idGrid).find(".k-grid-content table tbody tr");
    var arrRowLocked = $("#" + idGrid).find(".k-grid-content-locked table tbody tr");

    if (arrRowLocked.length == 0) {
        var arrRowLocked = $("#" + idGrid).find("table tbody tr");
    }
    if (arrRow.length == 0) {
        var arrRow = $("#" + idGrid).find("table tbody tr");
    }
    if (arrRowLocked.length > 0) {
        for (var i = 0; i < arrRowLocked.length; i++) {
            var arrCol = arrRowLocked[i].cells;
            if (arrCol.length == 0) {
                continue;
            }
            beginChange(arrCol);
        }
    }
    if (arrRow.length > 0) {
        for (var i = 0; i < arrRow.length; i++) {
            var arrCol = arrRow[i].cells;
            if (arrCol.length == 0) {
                continue;
            }
            beginChange(arrCol);
        }
    }
}

function beginChange(arrCol) {

    //lưu ý nên để những đoạn code change chỉ cần thay đổi màu sắc lên trên những đoạn code thay đổi giá trị của cột

    //đoạn code bên dưới chỉ là đoạn code ví dụ đổi màu của cột dựa theo những thông số trên cột khác
    //changeNameByIsActive(arrCol);
    //'change' trong 1 column không liên quan những column khác


    //[change text] true/false thanh  ngưng/đang hoạt động] trạng thai trên lưới
    changeIsActive(arrCol);
    editInputOnGird(arrCol);

}

//vi du: chuyen mau ten day du dua theo trang thai isactive

function changeIsActive(arrCol) {

    for (var j = 0; j < arrCol.length; j++) {
        var td;
        var columnName = '';
        td = arrCol[j];
        var attr = $(td).attr('data-column');
        // For some browsers, `attr` is undefined; for others,
        // `attr` is false.  Check for both.
        if (typeof attr === typeof undefined || attr === false) {
            var span = $(td).find('span');
            for (var k = 0; k < span.length; k++) {
                var attr = $(span[k]).attr('data-column');
                if (typeof attr === typeof undefined || attr === false) {
                    continue;
                }
                if (attr == 'isactive') {
                    if (span[k].textContent == "true") {
                        $(span[k]).empty().append('<span class="text-success" style="font-weight: bold;">Đang hoạt động</span>');
                    }
                    else if (span[k].textContent == "false") {
                        $(span[k]).empty().append('<span class="text-danger" style="font-weight: bold;">Ngưng hoạt động</span>');
                    }
                }
            }
            continue;
        }
        if (attr == 'isactive') {
            if (td.textContent == "true") {
                $(td).empty().append('<span class="text-success" style="font-weight: bold;">Đang hoạt động</span>');
            }
            else if (td.textContent == "false") {
                $(td).empty().append('<span class="text-danger" style="font-weight: bold;">Ngưng hoạt động</span>');
            }
        }
    }
}


function editInputOnGird(arrCol) {
    for (var j = 0; j < arrCol.length; j++) {
        var td;
        var columnName = '';
        td = arrCol[j];
        var input = $(td).find('input[data-column="Editable"]');
        if (input.length == 0) continue;

        //input.css({ "text-align": "right", "background-color": "rgb(198, 239, 206)", "width": "100%" });
        var className = '';
        if (input.hasClass('currencyRule')) className = "currencyRule";

        if (className == "currencyRule") input.autoNumeric('init', { aPad: false, vMax: '999999999999', mDec: 0 });
    }
}

//---------------------------------------------------End Change Grid-------------------------------------------------
function loadToolbarStyle() {

    //Dòng này chỉ là tạm thời
    $(".k-grid-toolbar .no-k-button").removeClass("k-button");
    // Remove Icon
    $("div.k-grid-toolbar a span").remove();
    $("a.k-grid-cancel-changes").removeClass("k-button").addClass("btn btn-default btn-sm no-k-button");
    $("a.k-grid-save-changes").removeClass("k-button").addClass("btn btn-primary btn-sm no-k-button");
    $("a.k-grid-add").removeClass("k-button").addClass("btn btn-success btn-sm no-k-button");
}

function onBindDataToForm(dataItem) {
    for (var propName in dataItem) {
        if (dataItem[propName] != null && dataItem[propName].constructor.toString().indexOf("Date") > -1) {
            var d = kendo.toString(kendo.parseDate(dataItem[propName]), 'dd/MM/yyyy')
            if (d != '01/01/1900') {
                $("#" + propName).val(d);
            }
        }
        else {
            $("#" + propName).val(dataItem[propName]);
        }
    }
}
//---------------------------------------------------Begin Date time-------------------------------------------------

// Lay ngay client
function getCurrentDateStringClient() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (day < 10 ? '0' : '') + day + '/' +
        (month < 10 ? '0' : '') + month + '/' +
         d.getFullYear();
    return output;
}

//so sanh 2 ngay string voi so 
function compareDateString(str1, str2, number) {

    var adata = str1.split('/');
    var dd = parseInt(adata[0], 10);
    var mm = parseInt(adata[1], 10);
    var yyyy = parseInt(adata[2], 10);
    var xdata = new Date(yyyy, mm - 1, dd);

    var bdata = str2.split('/');
    var dd = parseInt(bdata[0], 10);
    var mm = parseInt(bdata[1], 10);
    var yyyy = parseInt(bdata[2], 10);
    var ydata = new Date(yyyy, mm - 1, dd);
    if (!str2) {
        return true;
    }
    var d1 = xdata;
    var d2 = ydata;
    //var diff = Math.abs(d1 - d2);  // in milliseconds
    var diff = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    if (diff > number) {
        return true;
    }
    else {
        return false;
    }
    //xdata.setDate(xdata.getDate() + 7);
    //return Number(xdata) < Number(ydata);
}
//chuyen doi tu ngay thang nam sang nam thang ngay
function convertDateFormart(strDate, type) {
    var dateConver = "";
    var res = strDate.split("/");

    if (res.length < 3) {
        return "";
    }
    //defalute tu ngay thang nam -> nam thang ngay
    if (type == 0) {
        dateConver = res[2] + "/" + res[1] + "/" + res[0];
    }
    if (type == 1) {
        dateConver = res[2] + "-" + res[1] + "-" + res[0];
    }
    if (type == -1) {
        //ngày đầu tiên của tháng
        dateConver = res[2] + "-" + res[1] + "-01";
    }

    return dateConver
}

//chuyen doi ngay sang chuoi long
function dateToString(date) {

    if (date != null) {
        date = new Date(date.match(/\d+/)[0] * 1);
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return date.getFullYear() + '/' + month + '/' + day + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
    else {
        return "";
    }
}

//chuyen doi ngay sang chuoi short
function dateToShortDateString(date) {
    if (date != null) {
        date = new Date(date.match(/\d+/)[0] * 1);
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return date.getFullYear() + '/' + month + '/' + day;
    }
    else {
        return "";
    }
}
//chuyen doi ngay sang chuoi short
function newConvertdateToString(dateinput, type) {

    if (dateinput != null) {
        var date = new Date();
        try {
            var date = new Date(dateinput.match(/\d+/)[0] * 1);
        }
        catch (ex) {
            var date = new Date(dateinput);
        }
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);

        if (type == 0) return day + '/' + month + '/' + date.getFullYear(); //dd/mm/yyyy
        if (type == 1) return date.getFullYear() + '/' + month + '/' + day; //yyyy/mm/dd
        if (type == 2) return month + '/' + date.getFullYear(); //mm/yyyy
    }
    else {
        return "";
    }
}

//chuyen datestring sang ngày
function dateString2Date(dateString) {
    var dt = dateString.split(/\/|\s/);
    return dt.length == 3 ? new Date(dt.slice(0, 3).reverse().join('-')) : new Date(dt.slice(0, 3).reverse().join('-') + ' ' + dt[3]);
}

//chuyen doi tu kieu ngay sang kieu string
function dateToShortDateStringFormat(date, format) {
    if (date != null) {
        var msecond = date.match(/\d+/)[0] * 1
        date = new Date(date.match(/\d+/)[0] * 1);
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        if (msecond == 2209014000000 || msecond == 631126800000 || msecond == 62135596800000 || msecond == 2209017600000) {
            //2209014000000:1900
            //631126800000:
            //62135596800000: null-> (01/01/3939)
            return '';
        }
        if (format == "dd/MM/yyyy") {

            return day + '/' + month + '/' + date.getFullYear();
        }
        else if (format == "yyyy/MM/dd") {
            return date.getFullYear() + '/' + month + '/' + day;
        }
    }
    else {
        return "";
    }
}

function converIntToTime(i) {
    var temp = i;
    var h = parseInt(parseInt(temp) / (60 * 60));
    var mod_h = parseInt(temp) % (60 * 60);
    var m = parseInt(parseInt(mod_h) / (60));
    var s = parseInt(mod_h) % (60);
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    return h + ":" + m + ":" + s;
}

//Số ngày trong tháng
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
//========================================== END  Date time ===========================================

function removeSignFromString(obj) {
    var str;
    if (eval(obj)) {
        str = eval(obj).value;
    }
    else {
        str = obj;
    }

    str = str.toLowerCase();

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    //str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");  
    // tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - /
    //str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-  
    str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi 
    //eval(obj).value = str.toUpperCase();
    return str;
}

function activeMenu(li, ulRoot, ulItem, ulItem2, idMenu) {

    $("ul#menuLeft").find('li:eq(' + li + ')').addClass('open');
    $("ul#menuLeft").find('li:eq(' + li + ') ul#ul_root_' + ulRoot).css('display', 'block');
    $("ul#menuLeft").find('li:eq(' + li + ') ul#ul_root_' + ulRoot + ' ul#ul_item_' + ulItem).css('display', 'block');
    $("ul#menuLeft").find('li:eq(' + li + ') ul#ul_root_' + ulRoot + ' ul#ul_item_' + ulItem + ' ul#ul_item' + ulItem2).css('display', 'block');
    $("#" + idMenu).parent().addClass('active');

    $("ul#menuLeft").find('li:eq(' + li + ') > a > b > em').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
    $("ul#menuLeft").find('li:eq(' + li + ') ul#ul_root_' + ulRoot + ' > li:eq(0) > a > b > em').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
    $("ul#menuLeft").find('li:eq(' + li + ') ul#ul_root_' + ulRoot + ' ul#ul_item_' + ulItem + ' > li:eq(0) > a > b > em').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}


//========================================== CODE sua style cua kieu so tren luoi ===========================================

function numberFormatCustom(obj) {
    //CODE sua style cua kieu so
    var className = obj.container[0].className;
    var isnumberFormar = false;

    lstClassEdit = ['k-edit-cell', 'k-state-error k-edit-cell', 'k-dirty-cell k-edit-cell', 'k-dirty-cell k-state-error k-edit-cell', 'k-state-error k-dirty-cell k-edit-cell'];
    if (className == "numberRule " + lstClassEdit[0] || className == "numberRule " + lstClassEdit[1] || className == "numberRule " + lstClassEdit[2] || className == "numberRule " + lstClassEdit[3] || className == "numberRule " + lstClassEdit[4]) {
        isnumberFormar = true;
    }
    else if (className == "currencyRule " + lstClassEdit[0] || className == "currencyRule " + lstClassEdit[1] || className == "currencyRule " + lstClassEdit[2] || className == "currencyRule " + lstClassEdit[3] || className == "currencyRule " + lstClassEdit[4]) {
        isnumberFormar = true;
    }
    else if (className == "percentRule " + lstClassEdit[0] || className == "percentRule " + lstClassEdit[1] || className == "percentRule " + lstClassEdit[2] || className == "percentRule " + lstClassEdit[3] || className == "percentRule " + lstClassEdit[4]) {
        isnumberFormar = true;
    }
    else if (className == "decimalRule " + lstClassEdit[0] || className == "decimalRule " + lstClassEdit[1] || className == "decimalRule " + lstClassEdit[2] || className == "decimalRule " + lstClassEdit[3] || className == "decimalRule " + lstClassEdit[4]) {
        isnumberFormar = true;
    }
    else if (className == "ndecimalRule " + lstClassEdit[0] || className == "ndecimalRule " + lstClassEdit[1] || className == "ndecimalRule " + lstClassEdit[2] || className == "ndecimalRule " + lstClassEdit[3] || className == "ndecimalRule " + lstClassEdit[4]) {
        isnumberFormar = true;
    }
    if (isnumberFormar == false) {
        return;
    }

    var tb;//textbox

    if (obj.container.find(".k-textbox").length > 0) {
        tb = obj.container.find(".k-textbox");
    }
    else if (obj.container.find(".k-numerictextbox span input:eq(1)").length > 0) {
        tb = obj.container.find(".k-numerictextbox span input:eq(1)");
        //remove span
        obj.container.find(".k-numerictextbox span span").remove();
        obj.container.find(".k-numerictextbox span").css({ "width": "100%" });
    }
    else if (obj.container.find(".text-box.single-line").length > 0) {
        tb = obj.container.find(".text-box.single-line");
        tb.removeClass("text-box single-line").addClass("k-textbox");
        tb.attr("type", "text");
        //kieu interger la kieu so luong

    }

    if (className == "numberRule " + lstClassEdit[0] || className == "numberRule " + lstClassEdit[1] || className == "numberRule " + lstClassEdit[2] || className == "numberRule " + lstClassEdit[3] || className == "numberRule " + lstClassEdit[4]) {

        tb.autoNumeric('init', { aPad: false, vMax: '999999', mDec: 0 });
    }
    if (className == "currencyRule " + lstClassEdit[0] || className == "currencyRule " + lstClassEdit[1] || className == "currencyRule " + lstClassEdit[2] || className == "currencyRule " + lstClassEdit[3] || className == "currencyRule " + lstClassEdit[4]) {
        tb.autoNumeric('init', { aPad: false, vMax: '999999999999', mDec: 0 });
    }
    if (className == "percentRule " + lstClassEdit[0] || className == "percentRule " + lstClassEdit[1] || className == "percentRule " + lstClassEdit[2] || className == "percentRule " + lstClassEdit[3] || className == "percentRule " + lstClassEdit[4]) {
        tb.autoNumeric('init', { aPad: false, vMax: '100' });
    }
    if (className == "decimalRule " + lstClassEdit[0] || className == "decimalRule " + lstClassEdit[1] || className == "decimalRule " + lstClassEdit[2] || className == "decimalRule " + lstClassEdit[3] || className == "decimalRule " + lstClassEdit[4]) {
        tb.autoNumeric('init', { aPad: false, vMax: '999999', vMin: '0', mDec: 2 });
    }

    if (className == "ndecimalRule " + lstClassEdit[0] || className == "ndecimalRule " + lstClassEdit[1] || className == "ndecimalRule " + lstClassEdit[2] || className == "ndecimalRule " + lstClassEdit[3] || className == "ndecimalRule " + lstClassEdit[4]) {
        tb.autoNumeric('init', { aPad: false, vMax: '999999', vMin: '-999999', mDec: 2 });
    }

    //tb.focus();
    if (tb != null) {
        tb.css({ "text-align": "right" });
        //number formart
        setTimeout(function () {
            tb.select();
            //tb.data('val-required', "aaaa");
            //tb.data().autoNumeric.valRequired = 'aaa';
            var g = tb.parent().attr('data-val-required-mg');
            if (typeof (tb.parent().attr('data-val-required-mg')) == 'undefined') {
                tb.attr('data-val-required', 'Thông tin bắt buộc');
            }
            else {
                tb.attr('data-val-required', tb.parent().attr('data-val-required-mg'));
            }

        }, 300);
    }
}

//format edit input tren lưới 
function applyEditOnGrid(obj) {

    var inputE = obj.container.find("input[custom-type]");
    var type = inputE.attr('custom-type');
    if (typeof (type) == 'undefined')
        return;
    if (type == 'select') {
        applyDDL(obj);
    }
    else if (type == 'Date') {

        applyDate(obj, inputE);
    }
}
//applyr Edit DDL on grid
function applyDDL(obj, inputE) {
}

//applyr Edit Datepicker on grid

function applyDate(obj, inputE) {
    if (inputE.length == 0) {
        return;
    }
    var temp = inputE.attr('custom-default-value');
    setTimeout(function () {
        inputE.val(temp);
    }, 300);
}

//========================================== CODE sua style cua kieu so tren form ===========================================
/*
syntax
autoNumericOnForm($('#formTest #DisplayQuantity'), 'numberRule', { aSign: ' ngày', pSign: 's' }); //declare
$('#formTest #DisplayQuantity').autoNumeric('get') -- get value 
$('#formTest #DisplayQuantity').autoNumeric('set',value); -- set value
*/

function autoNumericOnForm(e, c, cs, isNegative) {
    if (e.length == 0) {
        return;
    }
       
    //append 1 the hidden de post form
    var currentID = e[0].id;
    if (currentID.indexOf('_nfRegexp') != -1) {
        // _nfRegexp dùng để post hình bằng form submit
        var lstTemp = currentID.split("_nfRegexp");
        if (lstTemp.length == 2)
            var newID = lstTemp[0];
        e.parent().append('<input type="hidden" name="' + newID + '" id="' + newID + '" value="' + e.val() + '" />');
        e.change(function () {
            var newElement = e.parent().find('#' + newID);
            if (newElement.length == 1) {
                var v = e.autoNumeric('get');
                if (typeof (v) == "undefined") {
                    v = e.val();
                }
                newElement.val(v);
            }
        });
    }
    var customNumeric = {};
    if (cs != null && typeof cs != "undefined") {
        customNumeric = cs;
    }
    var soAm = false;
    if (isNegative != null && typeof isNegative != "undefined") {
        soAm = isNegative;
    }
    if (c == "numberRule") {
        if (soAm) e.autoNumeric('init', $.extend(customNumeric, { aPad: false, vMax: '999999', vMin: '-999999', mDec: 0, aForm: true }));
        else e.autoNumeric('init', $.extend(customNumeric, { aPad: false, vMax: '999999', mDec: 0, aForm: true }));
    }
    else if (c == "currencyRule") {
        if (soAm) e.autoNumeric('init', $.extend(customNumeric, { aPad: false, vMax: '999999999999', vMin: '-999999999999', aForm: true }));
        else e.autoNumeric('init', $.extend(customNumeric, { aPad: false, vMax: '999999999999', aForm: true }));
    }
    else if (c == "percentRule") {
        e.autoNumeric('init', $.extend(customNumeric, { aPad: false, vMax: '100', aForm: true }));
    }
    else if (c == "decimalRule") {
        if (soAm) e.autoNumeric('init', $.extend(customNumeric, { aPad: false, vMax: '999999', vMin: '-999999', mDec: 2, aForm: true }));
        else e.autoNumeric('init', $.extend(customNumeric, { aPad: false, vMax: '999999', vMin: '0', mDec: 2, aForm: true }));
    }
    else if (c == "customRule") {
        e.autoNumeric('init', customNumeric);
    }
    if (e != null) {
        e.css({ "text-align": "right" });
    }
    e.click(function () {
        this.select();
    });
}

function getFromWithoutNumeric(f) {

    var stringData = "&";
    var lstData = {};
    var stringTemp = $(f).serialize();
    $('#' + f.id + ' input').each(function (i) {
        var v = '';
        var self = $(this);
        if (self.attr('type') == 'radio') {
            if (self.is(':checked')) {
                v = $(this).val();
                lstData[this.name] = v.toString();
            }
            return true;
        }
        if (self.attr('type') == 'checkbox') {

            v = $(this).val();
        }
        try {
            v = self.autoNumeric('get');
            if (typeof (v) == "undefined") {
                v = self.val();
            }
            stringData = stringData + this.id + "=" + v + "&";
            lstData[this.id] = v.toString();

        } catch (err) {
            //var v = self.val();
            v = self.val();
            if (typeof (v) == "undefined" || v == null) {
                v = '';
            }
            stringData = stringData + this.id + "=" + v.toString() + "&";
            lstData[this.id] = v.toString();
        }
    });

    $('#' + f.id + ' select').each(function (i) {

        var self = $(this);
        //var v = self.val();
        var v = self.val();
        if (typeof (v) == "undefined" || v == null) {
            v = '';
        }
        stringData = stringData + this.id + "=" + v.toString() + "&";
        lstData[this.id] = v.toString();
    });

    var res = stringData.substr(1);
    $('#' + f.id + ' textarea').each(function (i) {
        var self = $(this);

        if ($("#cke_" + self[0].id).length > 0) {
            var v = CKEDITOR.instances[self[0].id].getData();

            if (typeof (v) == "undefined" || v == null) {
                v = '';
            }
            lstData[this.id] = v.toString();
        }
        else {
            var v = self.val();


            if (typeof (v) == "undefined" || v == null) {
                v = '';
            }
            lstData[this.id] = v.toString();
        }
    });
    return lstData;
}

function setFormWithNumeric(f) {
    var tempp = f[0];
    $(f).serialize();
    $('#' + f[0].id + ' input').each(function (i) {
        var self = $(this);
        var valueE = $(this).val();
        var check = self.autoNumeric('get');
        if (typeof (check) == "undefined") {
            v = self.val();
        }
        self.autoNumeric('set', valueE);
    });

}

function getChannelIDforPartial() {

    //blockUIFromUser();
    $.post(r + "/Home/GetChannelOnlyOne_By_UserID", {}, function (data) {
        if (data.success) {

            channelIDforPartial = data.data;
            return channelIDforPartial;
        }
        else {
            alertBox("Có lỗi", "", false, 3000);
            console.log(data.message);
        }
    });
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

//========================================== ngan viec nhan submit nhieu lan ===========================================

//function blockUIFromUser() {
//    //$(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false, overlayCSS: { backgroundColor: 'transparent' } })).ajaxStop($.unblockUI);
//}

function blockUIFromUser(isMark) {
    //$(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false, overlayCSS: { backgroundColor: 'transparent' } })).ajaxStop($.unblockUI);
    //0 : co mark, 1: khong co mark
    //if (isMark) {
    //    $(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false })).ajaxStop($.unblockUI);
    //}
    //else {
    //    $(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false, overlayCSS: { backgroundColor: 'transparent' } })).ajaxStop($.unblockUI);
    //}
    //$(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false, overlayCSS: { backgroundColor: 'transparent' } })).ajaxStop($.unblockUI);
    //alertBox("goi blockui", 'Begin', false, 3000);
    if (isMark) {
        $(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false })).ajaxStop($.unblockUI);
    }
    else {
        $(document).ajaxStart($.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false, overlayCSS: { backgroundColor: 'transparent' } })).ajaxStop($.unblockUI);
    }
    //alertBox("goi blockui", 'end', false, 3000);
}

//========================================== Get the export link as jQuery object ===========================================

function getExportLink(gridE) {
    var grid = gridE.data("kendoGrid");
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
}

function setValidSelection() {
    //set valid for selection
    $('select').change(function () {

        if (this.form == null) {
            return;
        }
        if ($(this).val() != "" && $(this).val() != null) {

            $(this).valid();
        }
    });
}

function getCurrentPopup() {
    return $('.k-widget.k-window[isactive="true"] .k-window-content.k-content');
}
//code moi dong mo popup

//========================================= chuyển sang dạng tiền cho số nguyên =========================================

function NumToCurrency(n) {
    return n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

//change ServiceID ON / OFF
function changeDisplay(e1, e2, isOn) {

    if (isOn) {
        e1.css({ 'display': 'inline-block' })
        e2.css({ 'display': 'none' })
    }
    else {
        e2.css({ 'display': 'inline-block' })
        e1.css({ 'display': 'none' })
    }
}

//========================================= tooltip =========================================
function showTooltipMoreInfor(controller, method, data, tooltipE, width) {
    setTimeout(function () {
        if (tooltipE.length == 0)
            return;

        var bodyTooltip = tooltipE.parent();
        if (bodyTooltip.data('role') == 'popup') {
            bodyTooltip.css({
                "background-color": "transparent",
                "border": "none",
                "box-shadow": "none"
            });
        }

        $.post(r + "/" + controller + "/" + method, data, function (data) {
            if (data.success) {

                tooltipE.empty();
                var value = data.datavalue;
                var label = data.datalabel;
                var keys = [];
                for (var k in label) {
                    keys.push(k);
                    //
                    //var tempp = value[k];
                }
                for (var i = 0; i < keys.length; i++) {
                    var itemLabel = label[keys[i]];
                    var itemValue = value[keys[i]];

                    if (typeof (itemLabel) == "undefined") {
                        itemLabel = "";
                    }
                    if (typeof (itemValue) == "undefined") {
                        itemValue = "chưa có";
                    }
                    var tempHtml = '<div style="width:' + width + '%; float:left;margin-left:5px">'
                        + '<label>'
                            + '<i class="fa fa-lg fa-caret-right" style="color:blue;margin-right:5px"></i>'
                            + '<span style="color:#808080; font-size: 12px;font-family: \'Open+Sans\', sans-serif;">' + itemLabel + ': </span>'
                        + '</label>'
                            + '<span style=" font-size: 12px;font-weight: bold;font-family: \'Open+Sans\', sans-serif;">&nbsp;' + itemValue + '</span>'
                            //+ '<label style="float:left;margin-left:5px">' + value[keys[i]] + '</label>'
                        + '</label>'
                    + '</div>';
                    tooltipE.append(tempHtml);
                }


            }
            else {
                alertBox("Có lỗi", "", false, 3000);
                console.log(data.message);
            }

        });

    }, 200);


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

function ValidateOnChangeDDL(id) {
    $(id).change(function () {
        if ($(id).val()) {
            $(id).prev().find("a").attr("style", "");
        }
    });
}

//========================================= load image url =========================================

function showFileSize() {
    var input, file;

    // (Can't use `typeof FileReader === "function"` because apparently
    // it comes back as "object" on some browsers. So just see if it's there
    // at all.)
    if (!window.FileReader) {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('c_img_cover');

    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        alert("File " + file.name + " is " + file.size + " bytes in size");
    }
}

function readURLImage(e, imageField) {

    if (e.files && e.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + imageField).attr('src', e.target.result)
        };
        reader.readAsDataURL(e.files[0]);
    }
}

function onDeleteImage(id, classhiden, form, input) {

    $("#" + id).attr('src', r + '/img/avatars/yourlogohere.png'); // Clear the src
    $(".ImageResult_Logo").hide();
    $("#" + form + " #" + input + "").val("");
    setTimeout(function () { $("#" + form + " #isDelImg").val("true"); }, 100)
}

function onLoadImage(obj, idDelImg) {

    var temp = "";
    var src;
    src = $(obj).attr('src');
    //$(obj).parent().find("#ImageUploadInfo").empty().append('<span>None</span>');

    var item = $(obj).parent().find('input[id="' + idDelImg + '"]');
    if (item.length > 0) {

        if (src != '' && src != '/img/avatars/yourlogohere.png') {
            item.val('false');
            $(".ImageResult_Logo").show();
            return;
        }
        $(".ImageResult_Logo").hide();
        return;
    }

}

function imgErrorLogo(image, classHide) {
    image.onerror = "";
    image.src = r + "/img/avatars/default-thumbnail.jpg";
    return true;
}

function addOrUpdateUrlParam(name, value) {
    var href = window.location.href;
    var regex = new RegExp("[&\\?]" + name + "=");
    if (regex.test(href)) {
        regex = new RegExp("([&\\?])" + name + "=\\d+");
        window.location.href = href.replace(regex, "$1" + name + "=" + value);
    }
    else {
        if (href.indexOf("?") > -1)
            window.location.href = href + "&" + name + "=" + value;
        else
            window.location.href = href + "?" + name + "=" + value;
    }
}

function getActiveKendoWindow() {
    var index_highest = 0;
    var active_window;
    $('div.k-widget.k-window').each(function () {
        var index_current = parseInt($(this).css("z-index"), 10);
        if (index_current > index_highest) {
            index_highest = index_current;
            active_window = $(this)[0].children[1].id;
        }
    });
    return active_window;
}

function StandardizedInput(element) {
    $(element).blur(function () {
        if ($(element).val() != '') {
            var title = $(element).val().toString()[0].toUpperCase();
            for (var i = 1; i < $(element).val().toString().length ; i++) {
                title += $(element).val().toString()[i];
            }
            $(element).val(title);
        }
    });
}
// minhtc: this function use to convert html code
function ConvertHtml(value) {
    if ($('#txtconvert').length == 0) {
        $('body').append('<div id="txtconvert" style="display: none"></div>');
    }
    $("#txtconvert").html(value);
    return $("#txtconvert").text();
}
//minhtc : auto block and unclock for $.post
function PostAndBlock(url, parameter, fun) {
    $.blockUI({ message: '<i class="fa fa-spinner fa-3x fa-lg fa-spin txt-color-blueDark"></i>', theme: false });
    $.post(url, parameter, function (data) {
        $.unblockUI();
        fun(data);
    }).fail(function (error) {
        $.unblockUI();
        alertBox("Server Error", "", false, 5000);
    });
}

//phonght : auto block and unclock for $.post
function PostSync(url, parameter, fun) {
    return $.ajax({
        type: "POST",
        url: url,
        data: parameter,
        async: false
    }).responseText;
}

//minhtc: create divCustomKendoDatePicker
function CreateCustomKendoDatePicker(obj, basevalue) {
    if ($('#' + $(obj).attr('id') + '_dateview ').length > 0) {
        $('#' + $(obj).attr('id') + '_dateview ').remove();
    }
    //basevalue format : dd/MM/yyyy
    if (!basevalue) {
        basevalue = kendo.toString(new Date(), 'yyyy-MM-dd');
    }
    else {
        basevalue = kendo.toString(kendo.parseDate(basevalue, 'dd/MM/yyyy'), 'yyyy-MM-dd');
    }
    $(obj).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(),
        close: function (e) {
            var t1 = $('#' + $(obj).attr('id') + '_dateview .CustomKendoDatePickerDate');
            var t2 = $('#' + $(obj).attr('id') + '_dateview .CustomKendoDatePickerWeek');
            if (t1.attr('isfocus') == 'true' || t2.attr('isfocus') == 'true') {
                e.preventDefault();
                t1.removeAttr('isfocus');
                t2.removeAttr('isfocus');
            }
        },
        open: function () {
            if ($('#' + $(obj).attr('id') + '_dateview .divCustomKendoDatePicker').length == 0) {
                $('#' + $(obj).attr('id') + '_dateview .k-calendar').css('overflow', 'visible')
                    .append("<div class= 'divCustomKendoDatePicker'>"
                    + "Tuần:<input style='width:40px;margin : 5px;' type='text'  class='CustomKendoDatePickerWeek'  onclick='CustomFocus(this)' />"
                    + "Ngày:<input style='width:40px;margin : 5px;' type='text'  class='CustomKendoDatePickerDate'  onclick='CustomFocus(this)'/>"
                    + "<br\>&nbsp;<button onclick='CustomAddDate(this)' basevalue='" + basevalue + "' data-id='" + $(obj).attr('id') + "' >Thêm ngày / tuần</button></div>");
            }
        }
    });
}
function CustomAddDate(obj) {
    var numberDate = $(obj).parent().find('.CustomKendoDatePickerDate');
    var numberWeek = $(obj).parent().find('.CustomKendoDatePickerWeek');
    if (!numberDate) numberDate = 0
    if (!numberWeek) numberWeek = 0
    const currentKendoObj = $('#' + $(obj).data('id')).data('kendoDatePicker');
    var d = $(obj).attr('basevalue');
    if (!d) {
        d = new Date();
    }
    else {
        d = new Date(d);
    }
    d.setDate(d.getDate() + numberDate.val() * 1 + numberWeek.val() * 7 - 1);
    currentKendoObj.value(d);
    $('#' + $(obj).data('id')).trigger('change');
    numberDate.removeAttr('isfocus');
    numberWeek.removeAttr('isfocus');
    currentKendoObj.close();
}
function CustomFocus(obj) {
    $(obj).attr('isfocus', 'true');
    $(obj).focus();
}

//phonght
function CalculationNumberDaysOfTwoDate(date1, date2) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    //Ngày 1
    var startDate = date1.trim().split('/');
    var date_1 = new Date(startDate[2], startDate[1], startDate[0]);
    //Ngày 2
    var endDate = date2.trim().split('/');
    var date_2 = new Date(endDate[2], endDate[1], endDate[0]);

    var diffDays = Math.round(Math.abs((date_2.getTime() - date_1.getTime()) / (oneDay)));
    return diffDays + 2;
}

//phonght
function CollapseAllPanels() {
    $('.jarviswidget').find('div[role = "content"]').slideUp('fast');
    $('.jarviswidget header[role = "heading"] div a i').removeClass('fa-minus').addClass('fa-plus');
}

function ExpandAllPanels() {
    $('.jarviswidget').find('div[role = "content"]').slideDown('fast');
    $('.jarviswidget header[role = "heading"] div a i').removeClass('fa-plus').addClass('fa-minus');
}

function onChangePanel(e) {

    if ($(e).children().hasClass('glyphicon-minus')) {
        CollapseAllPanels();
        $(e).find('i').removeClass('glyphicon-minus').fadeOut(500).addClass('glyphicon-plus').fadeIn(500);
    }
    else {
        ExpandAllPanels();
        $(e).find('i').removeClass('glyphicon-plus').fadeOut(500).addClass('glyphicon-minus').fadeIn(500);
    }
}

// lấy đường dẫn hiện tại của element
$.fn.fullSelector = function () {
    var path = this.parents().addBack();
    var quickCss = path.get().map(function (item) {
        var self = $(item),
            id = item.id ? '#' + item.id : '',
            clss = item.classList.length ? item.classList.toString().split(' ').map(function (c) {
                return '.' + c;
            }).join('') : '',
            name = item.nodeName.toLowerCase(),
            index = self.siblings(name).length ? ':nth-child(' + (self.index() + 1) + ')' : '';

        if (name === 'html' || name === 'body') {
            return name;
        }
        return name + index + id + clss;

    }).join(' > ');

    return quickCss;
};

//Cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}