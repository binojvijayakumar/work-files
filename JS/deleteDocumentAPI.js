function DeleteDocumentAPI(ids, tpid, jurid, targeturl, ispublished, apiurl, ctrlid, clientKey, userName, authHeader) {
    var custom_headers = {};
    custom_headers['CSKII'] = clientKey;
    custom_headers['CSKII_UPN'] = userName;
    if (authHeader) custom_headers['Authorization'] = 'Bearer ' + authHeader;
    var ajaxData = {
        'DocumentIDs': $.map(ids.split(','), function (x) { return parseInt(x) }),
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
        data: JSON.stringify(ajaxData),
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