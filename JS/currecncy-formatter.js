var tbClassName = '.clcontrol-textbox-dg, .clcontrol-textbox';

function formatNumbertoCurrency(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function formatLabel(controlstr) {
    var controls = controlstr.split(',');
    $.each(controls, function (i, v) {
        var lblControl = $('[name="' + v + '"]');
        lblControl.text(formatNumbertoCurrency(lblControl.text()));
    });
}

function formatAllTextBox() {
    $(tbClassName).each(function (i, el) {
        $(el).val(formatNumbertoCurrency($(el).val()));

    });
}

$(function () {
    formatAllTextBox();
    $(tbClassName).change(function () {
        $(this).val(formatNumbertoCurrency($(this).val()));
    });
});