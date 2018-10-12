function DeleteDocumentAPI(ids, tpid, jurid, targeturl, ispublished, apiurl, ctrlid, clientKey, userName) {
    var custom_headers = {};
    custom_headers['CSKII'] = clientKey;
    custom_headers['CSKII_UPN'] = userName;
    var ajaxData = {
        'DocumentIDs': ids.split(',').map(function (x) { return parseInt(x) }),
        'TPID': parseInt(tpid),
        'JurID': parseInt(jurid),
        'TargetUrl': targeturl,
        'isPublished': ispublished == 'true'
    };
    $.ajax({
        method: 'POST', crossDomain: true,
        xhrFields: { withCredentials: true },
        headers: custom_headers,
        cache: false,
        contentType: 'application/json',
        url: apiurl,
        data: ajaxData,
        success: function (response) {
            if (ctrlid.split('_').length == 3) {
                $('#' + ctrlid).val(JSON.stringify(response));
                textBoxChangeEvent(ctrlid, $('#' + ctrlid).attr('name'), $('#' + ctrlid).val());
            }
        }, error: function (response) {
            if (ctrlid.split('_').length == 3) {
                $('#' + ctrlid).val(JSON.stringify(response));
                textBoxChangeEvent(ctrlid, $('#' + ctrlid).attr('name'), $('#' + ctrlid).val());
            }
        }
    });
}