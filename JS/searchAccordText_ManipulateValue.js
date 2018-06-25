function decrementGroupHeaderValue(searchCtrl) {
    $('#' + searchCtrl + ' .FixedTables1 > tbody > tr').each(function (i, el) {
        var lblElement = $(this).find('td > div > div > label');
        var lblValSplit = lblElement
            .text()
            .trim()
            .split(/(Form\s\d{3,4}\s{1,2})(\()(\d*)(\sItems?\))/g);
        lblValSplit[3] = parseInt(lblValSplit[3]) - 1;
        lblElement.text(lblValSplit.join(''));
    });
}