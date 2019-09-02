var disablecheckboxgroupitem = function (ctrlid, values, separator, state) {
    state = state === 'true';
    if (ctrlid && values && separator) {
        var valueArr = values.split(separator);
        $.each(valueArr, function (i, v) {
            $('#' + ctrlid + ' input[type="checkbox"][value="' + v + '"]').prop('disabled', state);
        });
    }
}