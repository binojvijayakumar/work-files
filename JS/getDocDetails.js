function getDocDetails(apiURL, contetntType, taxProcess, Jurisdiction, itemID, ctrlid, clientKey, userName, authHeader) {
    var apiData = {
        "SortByColumn": "DocumentID",
        "SortType": "DESC",
        "Count": "100",
        "ItemId": "0",
        "ContentType": contetntType,//"Income Tax US",
        "FilterCollection": [{
            "SPInternalName": "TaxProcess",
            "value": taxProcess//"Income Tax"
        }, {
            "SPInternalName": "Jurisdiction",
            "value": Jurisdiction//"United States"
        }, {
            "SPInternalName": "ItemId",
            "value": itemID//7347
        }],
        "ModuleName": "Documents"
    };
    var custom_headers = {};
    custom_headers['CSKII'] = clientKey;
    custom_headers['CSKII_UPN'] = userName;
    $.ajax({
        type: "POST",
        url: apiURL,//"//qa4svc.apps.tax/api/documents/GetDocumentsFromDB/1/",
        headers: custom_headers,
        data: JSON.stringify(apiData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            if(authHeader) xhr.setRequestHeader('Authorization', 'Bearer ' + authHeader);
        },
        xhrFields: {
            withCredentials: true
        },

        success: function (response) {
            $('#' + ctrlid).val(JSON.stringify(response));
            textBoxChangeEvent(ctrlid, $('#' + ctrlid).attr('name'), $('#' + ctrlid).val());
        }
    });
}
