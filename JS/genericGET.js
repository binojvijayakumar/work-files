var latest_getAPIResponse;
function getAPIResponse(apiURL, responseCtrl, cskii, cskii_upn) {
    var custom_headers = {};
    custom_headers['CSKII'] = cskii;
    custom_headers['CSKII_UPN'] = cskii_upn;
    $.ajax({
        method: 'GET', crossDomain: true,
        xhrFields: { withCredentials: true },
        headers: custom_headers,
        cache: false,
        contentType: 'application/json',
        url: apiURL,
        success: function (response) {
            latest_getAPIResponse = response;
            if (responseCtrl.split('_').length == 3) {
                $('#' + responseCtrl).val(JSON.stringify(response));
                textBoxChangeEvent(responseCtrl, $('#' + responseCtrl).attr('name'), $('#' + responseCtrl).val());
            }
        }, error: function (response) {
            if (responseCtrl.split('_').length == 3) {
                $('#' + responseCtrl).val(JSON.stringify(response));
                textBoxChangeEvent(responseCtrl, $('#' + responseCtrl).attr('name'), $('#' + responseCtrl).val());
            }
        }
    });
}