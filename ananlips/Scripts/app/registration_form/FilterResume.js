$(document).ready(function () {
    //========================================================== Lọc hồ sơ 24H =====================================================================
    //24H

    autoNumericOnForm($('#formPopupSales_Order_Employer_FilterResume_24H #c_point'), 'numberRule', { aSign: ' điểm', pSign: 's' });
    autoNumericOnForm($('#formPopupSales_Order_Employer_FilterResume_TVN #point'), 'numberRule', { aSign: ' điểm', pSign: 's' });
    autoNumericOnForm($('#formPopupSales_Order_Employer_FilterResume_TVN #extend_time'), 'numberRule', { aSign: ' lần', pSign: 's' });

    onRefreshPopupSales_Order_Employer_FilterResume_24H();

    $('#formPopupSales_Order_Employer_FilterResume_24H #c_loai_khach_hang').change(function () {
        if ($(this).val() == 1) {
            $('#formPopupSales_Order_Employer_FilterResume_24H #c_hop_dong').parent().parent().show();
        }
        else {
            $('#formPopupSales_Order_Employer_FilterResume_24H #c_hop_dong').parent().parent().hide();
        }
    });

    $("#formPopupSales_Order_Employer_FilterResume_24H").validate({
        // Rules for form validation
        rules: {
            c_point: {
                required: true,
                _1000x : [1000, '1000']
            },
            c_loai_ntd: {
                required: true,
            },
            c_loai_khach_hang: {
                required: true,
            },
            c_thu_phi: {
                required: true,
            }
        },
        // Messages for form validation
        messages: {
            c_point: {
                required: "Thông tin bắt buộc",
            },
            c_loai_ntd: {
                required: "Thông tin bắt buộc",
            },
            c_loai_khach_hang: {
                required: "Thông tin bắt buộc",
            },
            c_thu_phi: {
                required: "Thông tin bắt buộc",
            }
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            if ($(element).hasClass('datepicker2')) {
                $(element).parent().parent().parent().addClass('state-error');
                error.insertAfter($(element).parent().parent()).addClass('emerror');
            } else {
                error.insertAfter(element);
            }
        },

        submitHandler: function (form) {
            $(form).on('submit', function (e) {
                e.preventDefault();
            });

            var dataPost = getFromWithoutNumeric(form);
            blockUIFromUser(true);
            $.post(r + "/SalesJobRegistration/CreateEmployer_FilterResumme_Queue_24H", dataPost, function (data) {
                if (data.success) {
                    $('#gridSales_Order_FilterResume_Registration_24H').data('kendoGrid').dataSource.read();
                    $('#popupFil').data('kendoWindow').close();

                    if (data.result == 'error') {
                        alertBox("Có lỗi", 'Phát hiện lỗi đăng ký vui lòng kiểm tra lại', false, 3000);

                        //Hiển thị popup cho phép nhập lý do
                        onOpenPopupValidation($('#V_ID').val(), 5, 0);
                    }
                    else if (data.result == 'warning') {
                        alertBox("Thông báo", 'Phát hiện thông tin không hợp lệ, vui lòng nhập lý do', false, 3000);

                        //Hiển thị popup cho phép nhập lý do
                        onOpenPopupValidation($('#V_ID').val(), 5, 0);
                    }
                    else {
                        alertBox("Lưu thành công", "", true, 3000);
                    }
                }
                else {
                    alertBox("Có lỗi", data.message, false, 3000);
                    console.log(data.message);
                }
            });
            return false;
        }
    });


    //TVN
    onRefreshPopupSales_Order_Employer_FilterResume_TVN();

    $('#formPopupSales_Order_Employer_FilterResume_TVN #active_type').change(function () {
        if ($(this).val() == 2) {
            $('#formPopupSales_Order_Employer_FilterResume_TVN #extend_time').parent().parent().show();
        }
        else {
            $('#formPopupSales_Order_Employer_FilterResume_TVN #extend_time').parent().parent().hide();
        }
    });

    $("#formPopupSales_Order_Employer_FilterResume_TVN").validate({
        // Rules for form validation
        rules: {
            package: {
                required: true,
            },
            point: {
                required: true,
                _1000x: [1000, '1000']
            },
            active_type: {
                required: true,
            },
            extend_time: {
                required: function (element) {
                    var temp = $("#formPopupSales_Order_Employer_FilterResume_TVN #active_type").val();
                    return temp == '2';
                },
            }
        },
        // Messages for form validation
        messages: {
            package: {
                required: "Thông tin bắt buộc"
            },
            point: {
                required: "Thông tin bắt buộc"
            },
            active_type: {
                required: "Thông tin bắt buộc"
            },
            extend_time: {
                required: "Thông tin bắt buộc"
            }
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            if ($(element).hasClass('datepicker2')) {
                $(element).parent().parent().parent().addClass('state-error');
                error.insertAfter($(element).parent().parent()).addClass('emerror');
            } else {
                error.insertAfter(element);
            }
        },

        submitHandler: function (form) {
            $(form).on('submit', function (e) {
                e.preventDefault();
            });

            var dataPost = getFromWithoutNumeric(form);
            blockUIFromUser(true);
            $.post(r + "/SalesJobRegistration/CreateEmployer_FilterResumme_Queue_TVN", dataPost, function (data) {
                if (data.success) {
                    $('#gridSales_Order_FilterResume_Registration_TVN').data('kendoGrid').dataSource.read();
                    $('#popupFil').data('kendoWindow').close();

                    if (data.result == 'error') {
                        alertBox("Có lỗi", 'Phát hiện lỗi đăng ký vui lòng kiểm tra lại', false, 3000);

                        //Hiển thị popup cho phép nhập lý do
                        onOpenPopupValidation($('#V_ID').val(), 5, 0);
                    }
                    else if (data.result == 'warning') {
                        alertBox("Thông báo", 'Phát hiện thông tin không hợp lệ, vui lòng nhập lý do', false, 3000);

                        //Hiển thị popup cho phép nhập lý do
                        onOpenPopupValidation($('#V_ID').val(), 5, 0);
                    }
                    else {
                        alertBox("Lưu thành công", "", true, 3000);
                    }
                }
                else {
                    alertBox("Có lỗi", data.message, false, 3000);
                    console.log(data.message);
                }
            });
            return false;
        }
    });
})


//======================================================== Thêm chức năng lọc hồ sơ ====================================================
//24H
function onDataboundEmployerFilterResumeVL24h() {
    $("#gridSales_Order_Employer_FilterResume_24H").find(".k-grid-content").css({
        "min-height": "300px",
        "max-height": "500px",
        "height": "auto"
    });
    $('a[data-toggle = "popover"]').popover();

    $.post(r + "/SalesJobRegistration/GetIDs_Running", { EmployerID: $('#V_EmployerID').val(), ChannelID: $('#V_ChannelID').val() }, function (data) {
        if (data.success) {
            var value = data.data;
            if (value.length > 0) {
                $('#btnReserveFilterResume').show();
            }
            else {
                $('#btnReserveFilterResume').hide();
            }
        } else {
            alertBox("Có lỗi", data.message, false, 3000);
        }
    });

    $.post(r + "/SalesJobRegistration/GetIDs_Reserving", { EmployerID: $('#V_EmployerID').val(), ChannelID: $('#V_ChannelID').val() }, function (data) {
        if (data.success) {
            var value = data.data;
            if (value.length > 0) {
                $('#btnContinousFilterResume').show();
            }
            else {
                $('#btnContinousFilterResume').hide();
            }
        } else {
            alertBox("Có lỗi", data.message, false, 3000);
        }
    });
}

function onRefreshPopupSales_Order_Employer_FilterResume_24H() {
    $("#formPopupSales_Order_Employer_FilterResume_24H").find('em').remove();

    $("#formPopupSales_Order_Employer_FilterResume_24H").find('fieldset:eq(0) section:eq(0)').empty().css({ 'padding': '0', 'margin': '0' });

    $("#formPopupSales_Order_Employer_FilterResume_24H #FilterResumeRegistrationID").val('0');

    $("#formPopupSales_Order_Employer_FilterResume_24H #c_point").autoNumeric('set', '0');

    generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_24H #c_loai_ntd', '', '100%');
    generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_24H #c_loai_khach_hang', '', '100%');
    generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_24H #c_thu_phi', '', '100%');

    //$('#formPopupSales_Order_Employer_FilterResume_24H #c_hop_dong').parent().parent().hide();
}

function onLoadgridSales_Order_FilterResume_Registration_24H(EmployerID, ChannelID, SalesOrderID) {

    var obj = {};
    blockUIFromUser(true);
    obj = { "EmployerID": EmployerID, "ChannelID": ChannelID, "SalesOrderID": SalesOrderID };
    $("#divGridSales_Order_FilterResume_Registration_VL24h").empty();
    var detailTemplate = kendo.template($('#templategridSales_Order_FilterResume_Registration_VL24h').html());
    $("#divGridSales_Order_FilterResume_Registration_VL24h").html(detailTemplate(obj));
    $("#divGridSales_Order_FilterResume_Registration_VL24h").css({ 'clear': 'both' });
    loadToolbarStyle();

    var heightChildrendGridJobQueue_VL24h = 400;

    //resizeOtherGrid(heightChildrendGridJobQueue_VL24h, $('#gridSales_Order_FilterResume_Registration_VL24h'));
    $(window).resize(function () {
        resizeOtherGrid(heightChildrendGridJobQueue_VL24h, $('#gridSales_Order_FilterResume_Registration_VL24h'));
    });

    $('#btnContinousFilterResume').prepend('<i class="glyphicon glyphicon-forward"></i> ');
    $('#btnReserveFilterResume').prepend('<i class="glyphicon glyphicon-save"></i> ');
    $('#btnHistoryFilterResume').prepend('<i class="glyphicon glyphicon-time"></i> ');

    $.get(r + '/SalesJobRegistration/GetInforPoint',
        { EmployerID: $('#V_EmployerID').val(), ChannelID: $('#V_ChannelID').val() },
        function(data) {
            if (data.success) {
                $('#gridSales_Order_FilterResume_Registration_24H .k-grid-toolbar')
                    .append('<span style="float: right; padding-top: 8px; font-weight: bold; font-size: 18px; padding-right: 3px;">Điểm còn lại :  ' + NumToCurrency(data.RemainBuying + data.RemainGiving) + '</span>')
            } else {
                alertBox("Có lỗi", "Lỗi không xác định", false, 3000);
            }
        });
}

function onOpenPopupSales_Order_Employer_FilterResume_24H(key, obj) {
    $("#formPopupSales_Order_Employer_FilterResume_24H").find('em').remove();
    $("#formPopupSales_Order_Employer_FilterResume_24H").find('section label').removeClass('state-error').removeClass('state-success');

    var popup = $('#popupFil').data('kendoWindow');
    popup.title('Thêm mới đăng ký lọc hồ sơ');
    popup.open().center();

    onRefreshPopupSales_Order_Employer_FilterResume_24H(obj);

    if (key == 0) {     // Create

        var RegistrationID = $("#formPopupSales_Order_Employer_FilterResume_24H #SalesOrderFilterResumeID").val();

        //Lấy thông tin mapping
        $.post(r + "/SalesServiceRegistration/GetSales_Order_FilterResumeByID", { id: RegistrationID, type: 'reg' }, function (data) {
            if (data.success) {

                var value = data.data;
                $("#formPopupSales_Order_Employer_FilterResume_24H #c_point").autoNumeric('set', value.Point);

                //Lấy thông tin gói dịch vụ
                $.post(r + "/SalesServiceRegistration/GetMappingForRegistration/", { SO: value.ServiceID, Type: 'FilterResume', ChannelID: $('#V_ChannelID').val() }, function (data) {
                    if (data.success) {
                        generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_24H #c_loai_ntd', data.data[0].ID, '100%');
                    }
                });
            }
            else {
                alertBox("Có lỗi", "", false, 3000);
                console.log(data.message);
            }
        });
    }
    else {      // Update

        popup.title('Cập nhật đăng ký lọc hồ sơ');
        //keyActionSales_Order = -1;
        var currentSalesOrderEmployerVerificationID = $(obj).data('id');
        var salesorderid = $(obj).data('salesorderid');
        blockUIFromUser(true);
        $.post(r + "/SalesJobRegistration/GetEmployer_VerificationByID", { SalesOrderID: salesorderid, ChannelID: "VL24h", EmployerVerificationID: currentSalesOrderEmployerVerificationID, Type : 'FIL' }, function (data) {

            if (data.success) {

                var value = data.data;
                $("#formPopupSales_Order_Employer_FilterResume_24H #SalesOrderFilterResumeID").val(data.registrationID);
                $("#formPopupSales_Order_Employer_FilterResume_24H #FilterResumeRegistrationID").val(currentSalesOrderEmployerVerificationID);
                //input
                $("#formPopupSales_Order_Employer_FilterResume_24H #c_hop_dong").val(value.c_hop_dong);
                $("#formPopupSales_Order_Employer_FilterResume_24H #c_point").autoNumeric('set', value.c_point);
                //single select
                generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_24H #c_loai_ntd', value.c_loai_ntd, '100%');
                generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_24H #c_loai_khach_hang', value.c_loai_khach_hang, '100%');
                generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_24H #c_thu_phi', value.c_thu_phi, '100%');

                if (value.c_loai_khach_hang == 1) {
                    $('#formPopupSales_Order_Employer_FilterResume_24H #c_hop_dong').parent().parent().show();
                }
                else {
                    $('#formPopupSales_Order_Employer_FilterResume_24H #c_hop_dong').parent().parent().hide();
                }
            }
            else {
                alertBox("Có lỗi", "", false, 3000);
                console.log(data.message);
            }
        });
    }
}

//TVN
function onDataboundEmployerFilterResumeTVN() {
    $("#gridSales_Order_Employer_FilterResume_24H").find(".k-grid-content").css({
        "min-height": "300px",
        "max-height": "500px",
        "height": "auto"
    });
    $('a[data-toggle = "popover"]').popover();

    $.post(r + "/SalesJobRegistration/GetIDs_Running", { EmployerID: $('#V_EmployerID').val(), ChannelID: $('#V_ChannelID').val() }, function (data) {
        if (data.success) {
            var value = data.data;
            if (value.length > 0) {
                $('#btnReserveFilterResume').show();
            }
            else {
                $('#btnReserveFilterResume').hide();
            }
        } else {
            alertBox("Có lỗi", data.message, false, 3000);
        }
    });

    $.post(r + "/SalesJobRegistration/GetIDs_Reserving", { EmployerID: $('#V_EmployerID').val(), ChannelID: $('#V_ChannelID').val() }, function (data) {
        if (data.success) {
            var value = data.data;
            if (value.length > 0) {
                $('#btnContinousFilterResume').show();
            }
            else {
                $('#btnContinousFilterResume').hide();
            }
        } else {
            alertBox("Có lỗi", data.message, false, 3000);
        }
    });
}

function onRefreshPopupSales_Order_Employer_FilterResume_TVN() {
    $("#formPopupSales_Order_Employer_FilterResume_TVN").find('em').remove();

    $("#formPopupSales_Order_Employer_FilterResume_TVN").find('fieldset:eq(0) section:eq(0)').empty().css({ 'padding': '0', 'margin': '0' });

    $("#formPopupSales_Order_Employer_FilterResume_TVN #FilterResumeRegistrationID").val('0');

    generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_TVN #package', '', '100%');
    generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_TVN #active_type', '', '100%');

    $('#formPopupSales_Order_Employer_FilterResume_TVN #point').autoNumeric('set', '0');
    $('#formPopupSales_Order_Employer_FilterResume_TVN #extend_time').autoNumeric('set', '0');

    $('#formPopupSales_Order_Employer_FilterResume_TVN #extend_time').parent().parent().hide();
}

function onLoadgridSales_Order_FilterResume_Registration_TVN(EmployerID, ChannelID, SalesOrderID) {

    var obj = {};
    blockUIFromUser(true);
    obj = { "EmployerID": EmployerID, "ChannelID": ChannelID, "SalesOrderID": SalesOrderID };
    $("#divGridSales_Order_FilterResume_Registration_TVN").empty();
    var detailTemplate = kendo.template($('#templategridSales_Order_FilterResume_Registration_TVN').html());
    $("#divGridSales_Order_FilterResume_Registration_TVN").html(detailTemplate(obj));
    $("#divGridSales_Order_FilterResume_Registration_TVN").css({ 'clear': 'both' });
    loadToolbarStyle();

    var heightChildrendGridJobQueue_TVN = 400;

    //resizeOtherGrid(heightChildrendGridJobQueue_TVN, $('#gridSales_Order_FilterResume_Registration_TVN'));
    $(window).resize(function () {
        resizeOtherGrid(heightChildrendGridJobQueue_TVN, $('#gridSales_Order_FilterResume_Registration_TVN'));
    });

    $('#btnContinousFilterResume').prepend('<i class="glyphicon glyphicon-forward"></i> ');
    $('#btnReserveFilterResume').prepend('<i class="glyphicon glyphicon-save"></i> ');
    $('#btnHistoryFilterResume').prepend('<i class="glyphicon glyphicon-time"></i> ');

    $.get(r + '/SalesJobRegistration/GetInforPoint', { EmployerID: $('#V_EmployerID').val(), ChannelID: $('#V_ChannelID').val() }, function (data) {
        if (data.success) {
            $('#gridSales_Order_FilterResume_Registration_TVN .k-grid-toolbar').append('<span style="float: right; padding-top: 8px; font-weight: bold; font-size: 18px; padding-right: 3px;">Điểm còn lại :  ' + NumToCurrency(data.RemainBuying + data.RemainGiving) + '</span>')
        }
        else {
            alertBox("Có lỗi", "Lỗi không xác định", false, 3000);
        }
    })
}

function onOpenPopupSales_Order_Employer_FilterResume_TVN(key, obj) {
    $("#formPopupSales_Order_Employer_FilterResume_TVN").find('em').remove();
    $("#formPopupSales_Order_Employer_FilterResume_TVN").find('section label').removeClass('state-error').removeClass('state-success');

    var popup = $('#popupFil').data('kendoWindow');
    popup.title('Thêm mới đăng ký lọc hồ sơ');
    popup.open().center();

    onRefreshPopupSales_Order_Employer_FilterResume_TVN(obj);

    if (key == 0) {     // Create

        var RegistrationID = $("#formPopupSales_Order_Employer_FilterResume_TVN #SalesOrderFilterResumeID").val();

        //Lấy thông tin mapping
        $.post(r + "/SalesServiceRegistration/GetSales_Order_FilterResumeByID", { id: RegistrationID, type: 'reg' }, function (data) {
            if (data.success) {

                var value = data.data;
                $("#formPopupSales_Order_Employer_FilterResume_TVN #point").autoNumeric('set', value.Point);

                //Lấy thông tin gói dịch vụ
                $.post(r + "/SalesServiceRegistration/GetMappingForRegistration/", { SO: value.ServiceID, Type: 'FilterResume', ChannelID: $('#V_ChannelID').val() }, function (data) {
                    if (data.success) {
                        generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_TVN #package', data.data[0].ID, '100%');
                    }
                });
            }
            else {
                alertBox("Có lỗi", "", false, 3000);
                console.log(data.message);
            }
        });
    }
    else {      // Update

        popup.title('Cập nhật đăng ký lọc hồ sơ');
        //keyActionSales_Order = -1;
        var currentSalesOrderEmployerVerificationID = $(obj).data('id');
        var salesorderid = $(obj).data('salesorderid');
        blockUIFromUser(true);
        $.post(r + "/SalesJobRegistration/GetEmployer_VerificationByID", { SalesOrderID: salesorderid, ChannelID: "TVN", EmployerVerificationID: currentSalesOrderEmployerVerificationID, Type : "FIL"}, function (data) {

            if (data.success) {

                var value = data.data;
                $("#formPopupSales_Order_Employer_FilterResume_TVN #SalesOrderFilterResumeID").val(data.registrationID);
                $("#formPopupSales_Order_Employer_FilterResume_TVN #FilterResumeRegistrationID").val(currentSalesOrderEmployerVerificationID);
                //input
                $("#formPopupSales_Order_Employer_FilterResume_TVN #extend_time").autoNumeric('set', value.extend_time);

                $("#formPopupSales_Order_Employer_FilterResume_TVN #point").autoNumeric('set', value.point);

                //single select
                generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_TVN #package', value.package, '100%');
                generateSelect2('s', 'formPopupSales_Order_Employer_FilterResume_TVN #active_type', value.active_type, '100%');

                if (value.active_type == 2) {
                    $('#formPopupSales_Order_Employer_FilterResume_TVN #extend_time').parent().parent().show();
                }
                else {
                    $('#formPopupSales_Order_Employer_FilterResume_TVN #extend_time').parent().parent().hide();
                }
            }
            else {
                alertBox("Có lỗi", "", false, 3000);
                console.log(data.message);
            }
        });
    }
}

//CSKH xóa đăng ký FilterResume
function onDeleteFilterResumeQueue(obj) {

    var id = $(obj).data('id');
    var channelid = $(obj).data('channelid');
    var salesorderid = $(obj).data('salesorderid');
    if (id == "" || id == null)
        return;
    if (!salesorderid) {
        alertBox("Không tìm thấy mã phiếu đăng ký", "", false, 3000);
        return false;
    }
    $.SmartMessageBox({
        title: "Xác nhận xóa",
        content: "Bạn có chắc chắn không?",
        buttons: '[Xác nhận][Đóng lại]'
    }, function (ButtonPressed) {
        if (ButtonPressed === "Xác nhận") {
            blockUIFromUser(true);
            jQuery.ajaxSettings.traditional = true;
            $.post(r + "/SalesJobRegistration/DeleteFilterResumeQueueID", { FilterResumeRegistrationID: id.toString(), SalesOrderID: salesorderid, ChannelID: channelid }, function (data) {
                if (data.success) {
                    alertBox("Xóa thành công", "", true, 3000);
                    if ($('#V_ChannelID').val() == 'TVN') {
                        $("#gridSales_Order_FilterResume_Registration_TVN").data("kendoGrid").dataSource.read();
                        onRefreshPopupSales_Order_Employer_FilterResume_TVN();
                    }
                    else {
                        $("#gridSales_Order_FilterResume_Registration_24H").data("kendoGrid").dataSource.read();
                        onRefreshPopupSales_Order_Employer_FilterResume_24H();
                    }
                } else {
                    alertBox("Có lỗi", data.message, false, 3000);
                }
            });
        }
        if (ButtonPressed === "Đóng lại") {
            return;
        }

    });
    $("#bot1-Msg1").addClass("btn btn-primary btn-sm").prepend('<i class="glyphicon glyphicon-ok"></i>');
    $("#bot2-Msg1").addClass("btn btn-default btn-sm").prepend('<i class="glyphicon glyphicon-remove"></i>');
}

function onReserve() {
    $.SmartMessageBox({
        title: "Xác nhận bảo lưu",
        content: "Bạn có chắc chắn không?",
        buttons: '[Xác nhận][Đóng lại]'
    }, function (ButtonPressed) {
        if (ButtonPressed === "Xác nhận") {
            blockUIFromUser(true);
            jQuery.ajaxSettings.traditional = true;
            $.post(r + "/SalesJobRegistration/ReserveFilterResume", { EmployerID: $('#V_EmployerID').val(), ChannelID: $('#V_ChannelID').val() }, function (data) {
                if (data.success) {
                    alertBox("Bảo lưu thành công", "", true, 3000);
                    if ($('#V_ChannelID').val() == 'TVN') {
                        $('#gridSales_Order_FilterResume_Registration_TVN').data('kendoGrid').dataSource.read();
                    }
                    else {
                        $('#gridSales_Order_FilterResume_Registration_24H').data('kendoGrid').dataSource.read();
                    }
                } else {
                    alertBox("Có lỗi", data.message, false, 3000);
                }
            });
        }
        if (ButtonPressed === "Đóng lại") {
            return;
        }

    });
    $("#bot1-Msg1").addClass("btn btn-primary btn-sm").prepend('<i class="glyphicon glyphicon-ok"></i>');
    $("#bot2-Msg1").addClass("btn btn-default btn-sm").prepend('<i class="glyphicon glyphicon-remove"></i>');
}

function onContinous() {
    $.SmartMessageBox({
        title: "Xác nhận tiếp tục",
        content: "Bạn có chắc chắn không?",
        buttons: '[Xác nhận][Đóng lại]'
    }, function (ButtonPressed) {
        if (ButtonPressed === "Xác nhận") {
            blockUIFromUser(true);
            jQuery.ajaxSettings.traditional = true;
            $.post(r + "/SalesJobRegistration/ContinousFilterResume", { EmployerID: $('#V_EmployerID').val(), ChannelID: $('#V_ChannelID').val() }, function (data) {
                if (data.success) {
                    alertBox("Tiếp tục thành công", "", true, 3000);
                    if ($('#V_ChannelID').val() == 'TVN') {
                        $('#gridSales_Order_FilterResume_Registration_TVN').data('kendoGrid').dataSource.read();
                    }
                    else {
                        $('#gridSales_Order_FilterResume_Registration_24H').data('kendoGrid').dataSource.read();
                    }
                } else {
                    alertBox("Có lỗi", data.message, false, 3000);
                }
            });
        }
        if (ButtonPressed === "Đóng lại") {
            return;
        }

    });
    $("#bot1-Msg1").addClass("btn btn-primary btn-sm").prepend('<i class="glyphicon glyphicon-ok"></i>');
    $("#bot2-Msg1").addClass("btn btn-default btn-sm").prepend('<i class="glyphicon glyphicon-remove"></i>');
}

//Hạ minisite
function onDropFilterResume(RegID, ChannelID, EmployerID, EndDate) {

    var now = new Date();
    var today = (((now.getDate()).toString().length > 1) ? (now.getDate()) : ("0" + (now.getDate()).toString())) + "/"
            + (((now.getMonth() + 1).toString().length > 1) ? (now.getMonth() + 1) : ("0" + (now.getMonth() + 1).toString())) + "/"
            + now.getFullYear();
    $.SmartMessageBox({
        title: "Xác nhận hạ gói lọc hồ sơ",
        content: "Bạn có chắc chắn không?",
        buttons: '[Xác nhận][Đóng lại]'
    }, function (ButtonPressed) {
        if (ButtonPressed === "Xác nhận") {
            $('#formTest').validate();

            if ($('#formTest').valid()) // Kiểm tra validate
            {
                blockUIFromUser(true);
                var DropDateString = $("#formTest #DropDateString").val();
                //var IsDropped = $("#formTest #IsDropped").prop('checked') ? true : false;
                //thay đổi: khi chọn ngày = ngày hiện tại thì hạ ngay
                var IsDropped = ($("#formTest #DropDateString").val() == today) ? true : false;
                var data = { RegID: RegID, ChannelID: ChannelID, EmployerID: EmployerID, DropDateString: DropDateString, IsDropped: IsDropped };
                $.post(r + "/SalesJobRegistration/Save_FilterResume_Drop", data, function (data) {
                    if (data.success) {
                        if ($('#gridSales_Order_FilterResume_Registration_TVN').length > 0)
                            $("#gridSales_Order_FilterResume_Registration_TVN").data("kendoGrid").dataSource.read();
                        if ($('#gridSales_Order_FilterResume_Registration_24H').length > 0)
                            $("#gridSales_Order_FilterResume_Registration_24H").data("kendoGrid").dataSource.read();
                        alertBox("Thành công", "", true, 3000);
                    }
                    else {

                        alertBox("Có lỗi", data.message, false, 3000);
                        console.log(data.message);
                    }
                });
            }
            else {
                preventDefault();
            }
        }
        if (ButtonPressed === "Đóng lại") {
            return;
        }
    });
    $("#bot1-Msg1").addClass("btn btn-primary btn-sm").prepend('<i class="glyphicon glyphicon-ok"></i>');
    $("#bot2-Msg1").addClass("btn btn-default btn-sm").prepend('<i class="glyphicon glyphicon-remove"></i>');

    $('#Msg1 .MessageBoxMiddle .pText').after("<form id='formTest'>");

    $('#formTest').append("<input type ='hidden' class='form-control ' id='hiddenCurrentDate' value='" + today + "'></input>");
    $('#formTest').append("<input class='form-control' data-dateformat='dd/mm/yy' id='DropDateString' name='DropDateString' placeholder='Ngày hạ minisite' type='text' value='" + today + "'></input>");
    $('#formTest').append("<span id='secDropNow'  style='display:none'><input type='checkbox' id='IsDropped' name='IsDropped' checked style='width: 16px;' /> Hạ ngay</br><span>");
    $('#formTest').append("<input class='form-control' id='EndDateString' name='EndDateString' type='hidden' value='" + EndDate + "'></input></br>");
    $('#Msg1 .MessageBoxMiddle .pText').append("</form>");

    var minDate = new Date();

    $('#DropDateString').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: minDate,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    $('#DropDateString').click(function () {
        var popub_zIndex = $('.k-widget.k-window[isActive="true"]').css('z-index');
        //alert(temp + '' + tempc);
        $('#ui-datepicker-div').css('z-index', popub_zIndex + 1);
    });

    $('#formTest #PaymentDate').val(getCurrentDateStringClient());
    $('#formTest #PaymentDate').css({ 'text-align': 'right' });

    //form trong popup
    $("#formTest").validate({
        // Rules for form validation
        rules: {
            DropDateString: {
                dateFormatVN: true,
                required: true,
                dateVNLesserOrThan: [$('#formTest #EndDateString'), $('#formTest #EndDateString').val() + " - Ngày hết hạn của gói tin"],
                dateVNGreaterOrThan: [$('#formTest #hiddenCurrentDate'), "Ngày hiện tại"],
            }
        },
        // Messages for form validation
        messages: {
            DropDateString: {
                required: "Thông tin bắt buộc"
            }
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });
}
