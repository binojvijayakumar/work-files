function getDocFetchJS(url, trigCtrl) {
    $.getScript(url, function (script, textStatus, jqXHR) {
        if (trigCtrl && trigCtrl.split('_').length == 3 && jqXHR.status == 200) {
            $('#' + trigCtrl).val(jqXHR.status);
            textBoxChangeEvent(trigCtrl, $('#' + trigCtrl).attr('name'), jqXHR.status, '', '');
        }
    });
}