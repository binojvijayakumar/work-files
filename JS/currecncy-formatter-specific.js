function formatNumbertoCurrency(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function currencyFormatTextBox(ctrlid) {
    var textCtrl = $('#' + ctrlid);
    textCtrl.val(formatNumbertoCurrency(textCtrl.val()));
}

function currencyFormatGeneric(ctrlid) {
    var textCtrl = $('#' + ctrlid);
    textCtrl.text(formatNumbertoCurrency(textCtrl.text()));
}

function currencyFormatSearch(ctrlid, cols) {
    var cols = $.map(cols.split(','), function (val) {
        return parseInt(val);
    });
    $('#' + ctrlid + ' .fixedContainer table>tbody>tr').each(function (index, element) {
        $(this).find('td').each(function (i, el) {
            if ($.inArray(i + 1, cols) < 0) return;
            var textCtrl = $(this).find('[type="searchlabel"]');
            textCtrl.text(formatNumbertoCurrency(textCtrl.text()));
        });
    });
}