
var numHeight = 230;
$(document).ready(function () {

    //active menu
    setActiveMenu($("#menu_AdminMasterTerritory")[0]);
    document.title = "Vị trí địa lý";

    loadToolbarStyle();
});

function onTabstripIndexContentLoad(e) {
    if ($(e.contentElement).find("#txtTerritoryIDCountry").length > 0) {
        $(e.contentElement).find("#txtTerritoryIDCountry").keypress(function (e) {
           
            if (e.keyCode == 13) {
                doSearchCountry();
                return false;
            }
        });
    }
    if ($(e.contentElement).find("#txtTerritoryIDRegion").length > 0) {
        $(e.contentElement).find("#txtTerritoryIDRegion").keypress(function (e) {
           
            if (e.keyCode == 13) {
               
                doSearchRegion();
                return false;
            }
        });

    }
  
    if ($(e.contentElement).find("#txtTerritoryIDProvince").length > 0) {
        $(e.contentElement).find("#txtTerritoryIDProvince").keypress(function (e) {

            if (e.keyCode == 13) {

                doSearchProvince();
                return false;
            }
        });

    }
    if ($(e.contentElement).find("#txtTerritoryIDDistrict").length > 0) {
        $(e.contentElement).find("#txtTerritoryIDDistrict").keypress(function (e) {

            if (e.keyCode == 13) {

                doSearchDistrict();
                return false;
            }
        });

    }
   
    // parent filter
    if ($(e.contentElement).find("#txtTerritoryIDRegionParent").length > 0) {
        $(e.contentElement).find("#txtTerritoryIDRegionParent").keypress(function (e) {

            if (e.keyCode == 13) {

                doSearchRegion();
                return false;
            }
        });

    }
    if ($(e.contentElement).find("#txtTerritoryIDProvinceParent").length > 0) {
        $(e.contentElement).find("#txtTerritoryIDProvinceParent").keypress(function (e) {

            if (e.keyCode == 13) {

                doSearchProvince();
                return false;
            }
        });

    }
    if ($(e.contentElement).find("#txtTerritoryIDDistrictParent").length > 0) {
        $(e.contentElement).find("#txtTerritoryIDDistrictParent").keypress(function (e) {

            if (e.keyCode == 13) {

                doSearchDistrict();
                return false;
            }
        });

    }
   
}

//filter Country

function doSearchCountry() {
    
    var grid = $("#gridCountry").data("kendoGrid");
    var filter = { logic: "and", filters: [] };

    var text = $("#txtTerritoryIDCountry").val();
    if (text) {
        var filterOr = { logic: "or", filters: [] };
        filterOr.filters.push({ field: "TerritoryID", operator: "contains", value: text });
        filterOr.filters.push({ field: "TerritoryName", operator: "contains", value: text });

        filter.filters.push(filterOr);
    }
    grid.dataSource.filter(filter);
}

function doSearchRegion() {
    
    var grid = $("#gridRegion").data("kendoGrid");
    var filter = { logic: "and", filters: [] };

    var text = $("#txtTerritoryIDRegion").val();
    if (text) {
        var filterOr = { logic: "or", filters: [] };
        filterOr.filters.push({ field: "TerritoryID", operator: "contains", value: text });
        filterOr.filters.push({ field: "TerritoryName", operator: "contains", value: text });

        filter.filters.push(filterOr);
    }
    text = $("#txtTerritoryIDRegionParent").val();
    if (text) {
       
        filter.filters.push({ field: "ParentName", operator: "contains", value: text });
    }
    grid.dataSource.filter(filter);
}

function doSearchProvince() {
    
    var grid = $("#gridProvince").data("kendoGrid");
    var filter = { logic: "and", filters: [] };

    var text = $("#txtTerritoryIDProvince").val();
    if (text) {
        var filterOr = { logic: "or", filters: [] };
        filterOr.filters.push({ field: "TerritoryID", operator: "contains", value: text });
        filterOr.filters.push({ field: "TerritoryName", operator: "contains", value: text });

        filter.filters.push(filterOr);
    }
    text = $("#txtTerritoryIDProvinceParent").val();
    if (text) {
      
        filter.filters.push({ field: "ParentName", operator: "contains", value: text });
    }
    grid.dataSource.filter(filter);
}

function doSearchDistrict() {
    
    var grid = $("#gridDistrict").data("kendoGrid");
    var filter = { logic: "and", filters: [] };

    var text = $("#txtTerritoryIDDistrict").val();
    if (text) {
        var filterOr = { logic: "or", filters: [] };
        filterOr.filters.push({ field: "TerritoryID", operator: "contains", value: text });
        filterOr.filters.push({ field: "TerritoryName", operator: "contains", value: text });

        filter.filters.push(filterOr);
    }
    text = $("#txtTerritoryIDDistrictParent").val();
    if (text) {
        filter.filters.push({ field: "ParentName", operator: "contains", value: text });
    }
    grid.dataSource.filter(filter);
}

function doCancelSearch(name) {
    if (name == 'Country') {
        doSearchCountry();
    }
    else if (name == 'Region') {
        doSearchRegion();
    }
    else if (name == 'District') {
        doSearchDistrict();
    }
    else if (name == 'Province') {
        doSearchProvince();
    }
}

//===========================================Databound ===========================================

function onDataboundCountry(e) {
    resizeOtherGrid(numHeight, $("#gridCountry"));
    loadToolbarStyle();
    var grid = $("#gridCountry").data("kendoGrid");
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

function onDataboundRegion(e) {
    loadToolbarStyle();
    resizeOtherGrid(numHeight, $("#gridRegion"));
    var grid = $("#gridRegion").data("kendoGrid");
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

function onDataboundProvince(e) {
    loadToolbarStyle();
    resizeOtherGrid(numHeight, $("#gridProvince"));
    var grid = $("#gridProvince").data("kendoGrid");
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

function onDataboundDistrict(e) {
    loadToolbarStyle();
    resizeOtherGrid(numHeight, $("#gridDistrict"));
    var grid = $("#gridDistrict").data("kendoGrid");
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


//===========================================Request===========================================

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

    else {
        arrExport = new Array();
        for (var i = 0; i < e.sender._view.length; i++) {
            var value = e.sender._view[i];
            arrExport.push(value.TerritoryID);
        }
    }
    
    //$("#divLoading").hide();
}