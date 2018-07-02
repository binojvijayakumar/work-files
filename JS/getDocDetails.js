function getDocDetails(apiURL, contetntType, taxProcess, Jurisdiction, itemID, ctrlid, samName) {
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
    $.ajax({
        type: "POST",
        url: apiURL,//"//qa4svc.apps.tax/api/documents/GetDocumentsFromDB/1/",
        headers: {
            'CSKII': '35bba0d9-f7e5-413a-8815-d2945c55b169',
            'CSKII_UPN': samName
        },
        data: JSON.stringify(apiData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        // beforeSend: function(xhr) {
        //     xhr.setRequestHeader("Authorization", getAuthCookie());
        // },
        // username: "taxcloud\\nithapaul",
        // password: "virtual_2017",

        success: function (response) {
            $('#' + ctrlid).val(JSON.stringify(response));
            textBoxChangeEvent(ctrlid, $('#' + ctrlid).attr('name'), $('#' + ctrlid).val());
        }
    });
}

// function getAuthCookie() {
//     debugger;
//     var cn = "ASP.NET_SessionId=";
//     // var cn = "Authorization=";
//     var idx = document.cookie.indexOf(cn)

//     if (idx != -1) {
//         var end = document.cookie.indexOf(";", idx + 1);
//         if (end == -1) end = document.cookie.length;
//         return unescape(document.cookie.substring(idx + cn.length, end));
//     } else {
//         return "";
//    }
//  }