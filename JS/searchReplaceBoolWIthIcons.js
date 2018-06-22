function searchReplaceBoolWithIcons(ctrlID, cols) {
    cols = cols.split(',');
    $('#' + ctrlID + '_table>tbody>tr')
        .each(function (i, trel) {
            $.each(cols, function (i, v) {
                $(trel).find('td').each(function (j, tdel) {
                    var colIndex = parseInt(v) - 1;
                    if (colIndex != j) return true;
                    $(tdel)
                        .find('[type="searchlabel"]')
                        .html(
                            (/(true)|(1)/gi).test($(tdel).text().trim()) ?
                            trueIcon : falseIcon
                        );
                });
            });
        });
}
var trueIcon = '<i class="fa fa-circle fa-1x" aria-hidden="true"></i>';
var falseIcon = '<i class="fa fa-circle-o fa-1x" aria-hidden="true"></i>';