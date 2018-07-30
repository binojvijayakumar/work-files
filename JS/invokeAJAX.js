function InvokeAjax(method, data, ctrlId, url, clientKey, userName) {
    var custom_headers = {};
    custom_headers['CSKII'] = clientKey;
    custom_headers['CSKII_UPN'] = userName;
    $.ajax({
        method: method, crossDomain: true,
        xhrFields: { withCredentials: true },
        headers: custom_headers,
        cache: false,
        contentType: 'application/json',
        url: url,
        data: data,
        success: function (resdata) {
            if (!$.trim(resdata)) {
                $("#" + ctrlId).val("@Null@");
                $("#" + ctrlId).change();
            } else {
                $("#" + ctrlId).val(resdata);
                $("#" + ctrlId).change();
            }
        }, error: function (e, b, error) { }
    });
}