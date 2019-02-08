//Requested by Gopika - Deloitte - Internal Check List

function searchModifyGroupedIdentifierText(searchCtrl, newKeyWord) {
    $('#' + searchCtrl + ' .FixedTables1 > tbody > tr').each(function (i, el) {
        var lblElement = $(this).find('td > div > div > label');
        var lblValSplit = lblElement
            .text()
            .trim()
            .split(/(\()(\d)\s(Item)(s?)(\))/g);
        lblValSplit[3] = ' ' + newKeyWord;
        lblElement.text(lblValSplit.join(''));
    });
}