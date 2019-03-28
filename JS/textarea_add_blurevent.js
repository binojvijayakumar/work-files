var attachBlurEventTextarea = function (ctrlid) {
    if (ctrlid && ctrlid.split('_').length == 3) {
        $('#' + ctrlid).on('blur', function () {
            textBoxChangeEvent(this.id, this.name, this.value, '', '');
        });
    }
}