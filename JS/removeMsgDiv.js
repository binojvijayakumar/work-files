function removeMsgDivAttribute(ctrlids) {
    $.each(ctrlids.split(','), function (i, v) {
        var curattr = $('#' + v).attr('onchange');
        $('#' + v).attr('onchange', 'removeMsgDiv(this.id);' + curattr);
    });
}

function removeMsgDiv(ids) {
    TempValidationError = 1;
    $.each(ids.split(','), function (i, id) {
        $('#' + id + '_msgdiv').remove();
    });
}