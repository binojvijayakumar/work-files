function textareaAutoTrigger(ctrlids) {
    var ids = ctrlids.split(',');
    $.each(ids, function (i, v) {
        $('#' + v).on('keyup', function () {
            if (!$(this).val()) {
                textBoxChangeEvent(v, $('#' + v).attr('name'), '', '', '');
            }
        });
    });
}