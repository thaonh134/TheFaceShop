var numHeight = 200;
var generateTreeList = false;
var indexTabstripActive = -1;
var selectedMenu = "";
var contentTab;
$(document).ready(function () {
    //active menu
    setActiveMenu($("#menu_HOAdminAuthRole")[0]);
    document.title = "Nhóm người dùng";
    loadToolbarStyle();
    resizedivMainContent();
    
    //fillter & form popup
    generateSelect2('s', 'filterisactive', null, '100%');

    //goi ham search khi nhan enter
    $("#filterRoleID,#filterisactive").keypress(function (e) {
        if (e.keyCode == 13) {
            doSearch();
            return false;
        }
    });

});
//========================================== code co ban ====================================

//search
function doSearch() {
    blockUIFromUser(false);
    var grid = $("#grid").data("kendoGrid");
    var filter = { logic: "and", filters: [] };
    var text = $("#filterRoleID").val();
    if (text) {
        var filterOr = { logic: "or", filters: [] };
        filterOr.filters.push({ field: "RoleID", operator: "contains", value: text });
        filterOr.filters.push({ field: "RoleName", operator: "contains", value: text });
        filter.filters.push(filterOr);

        
    }
    text = $("#filterisactive").val();
    if (text) {
        filter.filters.push({ field: "isactive", operator: "eq", value: text });
    }

    grid.dataSource.filter(filter);
}

//cancel
function doCancelSearch() {
    $("#filterRoleID").val('');
    generateSelect2('s', 'filterisactive', '', '100%');
    doSearch();
}

//grid 
function onDatabound(e) {
    resizeGrid(numHeight);
    changeStatusGrid('grid');
    //$("#divLoading").hide();
}

function onRequestStart(e) {
    blockUIFromUser(false);
    //$("#divLoading").show();
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
    //$("#divLoading").hide();
}

//========================================== code khac neu co ====================================

//========================================== router Form/Popup ====================================
//render form
function renderForm() {
    param_obj.redirectbyajax = 1;
    var dataPost = param_obj;
    $.get(r + param_obj.ourl + "/FormPopup", dataPost, function (data) {

        htmlData = data;
        $("#divPopup").empty().html(htmlData);

    });

}
function routerActionLink(obj) {
    param_obj.actiontype = $(obj).data('actiontype');
    param_obj.entryid = $(obj).data('entryid') ? $(obj).data('entryid') : null;
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
    var url_return="";
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


