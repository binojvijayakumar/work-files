function disableLink(rowIndex, ColIndex, searchControlId) {
    var searchDataTable = $("#" + searchControlId + "_table");
    var rows = $('tr', searchDataTable);
    var row = rows[rowIndex - 1];
    var colInd = parseInt(ColIndex) - 1;
    var col = $(row).find('td:nth-child(' + colInd + ')');
    col.css("filter", 'alpha(opacity=20)');
    col.css("opacity", "0.25");

}