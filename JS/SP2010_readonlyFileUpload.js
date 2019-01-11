function setReadOnlyFileUpload(ctrlid) {
    var _ctrl = $('#' + ctrlid + '_fle');
    _ctrl.find('.fileClose').each(function () {
        $(this).replaceWith($(this)[0].outerHTML.replace("onclick=","onclick_bak="));
    });
    _ctrl.find('input[type="file"]').attr('disabled','disabled');
}
function removeReadOnlyFileUpload(ctrlid) {
    var _ctrl = $('#' + ctrlid + '_fle');
    _ctrl.find('.fileClose').each(function () {
        $(this).replaceWith($(this)[0].outerHTML.replace("onclick_bak=","onclick="));
    });
    _ctrl.find('input[type="file"]').removeAttr('disabled');
}