var disablecheckboxgroupitem = function (ctrlid, values, separator, state) {
    state = state === 'true';
    if (ctrlid && values && separator) {
        var valueArr = values.split(separator);
        // $.each(valueArr, function (i, v) {
        //     $('#' + ctrlid + ' input[type="checkbox"][value="' + v + '"]').prop('disabled', state);
        // });

        $('#' + ctrlid + ' input[type="checkbox"]').each(function () {
            if ($.inArray($(this).attr('value').replace(/\\u[\dA-F]{4}/gi, function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
            }), valueArr) > -1) {
                $(this).prop('disabled', state);
            }
        });
    }
}