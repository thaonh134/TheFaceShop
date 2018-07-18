
var chat;

$(document).ready(function () {
    GetCountMessage();

    chat = $.connection.chatHub;
    $.connection.hub.start();
    chat.client.broadcastMessage = function (message) {
        alertBox(message, "", 'warning', 15000);
        GetCountMessage();
    };
    setInterval(function () {
        GetCountMessage();
    }, 600000);
});
function GetCountMessage() {
    $.ajax({
        url: r + "/PortalMessage/GetCountMessage",
        type: 'POST',
        success: function (data) {
            totalmessage = data.data;
            if (totalmessage > 0) {
                $("#number_notify").show().text(totalmessage);
            }
        }
    });
}
function onclickprofile() {
    $('#divpopover').show();
    $("#number_notify").hide().text('');
    $('#Portal_Message_tab').click();
}
$("body").click(function (e) {
    var popup = $("#divpopover");
    if (!$('#profile').is(e.target) && $('#profile').has(e.target).length == 0 && !popup.is(e.target) && popup.has(e.target).length == 0) {
        $('#divpopover').hide();
    }
});
//function popover profile
function onActiveTab(obj) {
    
    $(".popover-item").parent().removeClass('active');
    $(obj).parent().addClass('active');
    if (obj.title == "Thông tin") {
        $.ajax({
            url: r + "/SalesEmployerTouch/_PartialTreeProfiles",
            type: 'GET',
            success: function (partialView) {
                $(".popover-content-profile").hide().html(partialView).fadeIn("fast");
            }
        });
    }
    else if (obj.title == 'Nhắc nhở') {
        $.ajax({
            url: r + "/PortalMessage/GetCountForAccountant",
            type: 'POST',
            success: function (data) {
                $(".popover-content-profile").html($('#CountForAccountantTemplate').html());
                $('.itemright').html('0');
                $.each(data.Data, function (index, d) {
                    if (d.Type == 'Giảm giá ngoài chính sách') {
                        $('#CountForAccountant1').html(d.Total);
                    }
                    else if (d.Type == 'Phiếu đăng ký') {
                        $('#CountForAccountant2').html(d.Total);
                    }
                    else if (d.Type == 'Duyệt kích tin') {
                        $('#CountForAccountant3').html(d.Total);
                    }
                    else if (d.Type == 'Duyệt yêu cầu') {
                        $('#CountForAccountant4').html(d.Total);
                    }
                    else if (d.Type == 'Cài đặt bảng giá tháng mới') {
                        $('#CountForAccountant5').html(d.Total);
                    }
                });
                if (data.Data.length > 0) {
                    $('#LastReadAccountant').html('Cập nhật lúc: ' +kendo.toString(kendo.parseDate(data.Data[0].RowLastUpdatedAt),'HH:mm dd-MM-yyyy'));
                }
            }
        });
    }
    else {
        $.ajax({
            url: r + "/PortalMessage/GetMessage",
            type: 'POST',
            success: function (data) {
                var html = '<div class="row"><div class="col-sm-12" style="margin-bottom: 10px;text-align:right;max-height: 400px;overflow-y: scroll;">';
                $.each(data.Data, function (index, d) {
                    html += '<a data-link="' + d.Link + '" href="#" onclick="ClickMessage(this)" data-id="' + d.RowID + '"  class="list-group-item ';
                    if (d.IsRead == 2) {
                        html += 'disabled';
                    }
                    else {
                        html += 'active';
                    }
                    html += '"><h6 class="list-group-item-heading" style="font-size: 12px;">' + d.Description + '</h6>';
                    html += ' <p class="text-right"><small><span class="glyphicon glyphicon-time"></span>' + kendo.toString(kendo.parseDate(d.RowCreatedAt), "HH:mm dd/MM/yyyy") + '</small>';
                    html += ' Từ ' + d.RowCreatedBy + '</p>';
                    html += ' </a>';
                });
                html += '</div><br/><a href="' + r + '/PortalMessage" style="display:block;text-align:center"> Xem thêm</a></div>';
                $(".popover-content-profile").html(html).fadeIn("fast");
            }
        });
    }
}
function ClickMessage(e) {
    $.post(r + "/PortalMessage/UpdateClick?id=" + $(e).data('id'));
    window.location = r + $(e).data('link');
}