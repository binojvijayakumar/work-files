var getClientCurrencyText = function (ctrlid) {
    if (!(ctrlid && ctrlid.split('_').length == 3)) return;
    var ctrl = $('#' + ctrlid);
    if (ctrl.attr('iscurrency') && ctrl.attr('iscurrency').toLowerCase() === 'true' && ctrl.attr('unconvertedvalue')) {
        return Math.round(ctrl.attr('unconvertedvalue')).toLocaleString('en-US');
    }
}