//Requested by Gopika - Deloitte - Internal Check List

var searchModifyGroupedIdentifierText = function (searchCtrl, newKeyWordSingular, colsToValidate, validateKey) {
    colsToValidate = colsToValidate && colsToValidate.split(',').map(function (col) { return ':nth-child(' + (parseInt(col, 10) + 1) + ')'; });
    $('table#' + searchCtrl + '_table>tbody>tr').each(function () {
        var lblElement = $(this).find('td > div > div > label');
        var lblTextSplitArr = lblElement
            .text()
            .trim()
            .split(/(\()(\d)(\s+)(Item)(s?)(\))/g);
        lblTextSplitArr[4] = newKeyWordSingular;

        if (parseInt(lblTextSplitArr[2], 10) === 1 && colsToValidate && colsToValidate.length > 0) {
            var colTextValidationMatches = [];
            $(this).find('td>div>div+div>table>tbody>tr>td')
                .filter(colsToValidate.join(','))
                .each(function () {
                    var colText = $(this).find('div[type="searchlabel"]').text().trim();
                    colTextValidationMatches.push(colText === validateKey);
                });
            if (colTextValidationMatches.every(function (el) { return el === true; })) {
                lblTextSplitArr[2] = 0;
                lblTextSplitArr[4] += 's';
            }
        }

        lblElement.text(lblTextSplitArr.join(''));
    });
}