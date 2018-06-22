function HeightAutoCtrl(idCollection) {
    var ids = idCollection.split(',');
    $.each(ids, function (i, v) {
        $('#' + v).css('min-height', $('#' + v).css('height'));
        $(document).on('input change', '#' + v, function () {
            var s = this.scrollHeight;
            $(this).css('overflow', 'hidden');
            $(this).css('height', s);
        })
    });
}

function HeightAutoCtrlMT(id) {
    setTimeout(function () {
        $('#' + id).trigger('change');
    }, 2000);
}