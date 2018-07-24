// var portalServiceUrl = 'https://qa4svc.apps.tax';
// var clientKey = "35bba0d9-f7e5-413a-8815-d2945c55b169";
// var userName = "ankushbhatia";
function execPostRequest_CreateTracker(ctrlTrigger, portalServiceUrl, clientKey, userName) {
    var keys = ["Jurisdiction", "TaxProcess", "MasterObligation", "ItemName",
        "ItemOwner", "CIInternalDueDate", "CIDueDate", "TaxYear", "Period", "ReturnType",
        "IsNoDueDateItem", "RequesterName", "RequestingTeam", "Urgency",
        "WhatSystemsisimpactedbythissuggestion", "TypeofRequest", "ProjectDescription",
        "TargetCompletionDate", "ProjectDeliverableDate", "Recurring", "OverallStatus", "Team"];

    var trackerData = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]; var element = document.getElementsByName(key)[0];
        var value = element ? element.value : "";
        trackerData.push({ "ID": key, "value": value });        
    }
    var custom_headers = {};
    custom_headers['CSKII'] = clientKey;
    custom_headers['CSKII_UPN'] = userName;
    var input = JSON.stringify(trackerData);
    $.ajax({
        type: 'POST',
        url: portalServiceUrl + '/api/DynamicComplianceItem/CreateTrackerByForms/1',
        headers: custom_headers,
        dataType: "json",
        data: input,
        xhrFields: { withCredentials: true },
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var result = JSON.parse(JSON.stringify(data));
            var message = [];
            for (var item in result) {
                if (item !== '$id') {
                    message.push(item);
                }
            } if (typeof result[message[0]] === 'undefined') {
                alert('Tracker created Successfully');
                if (ctrlTrigger && ctrlTrigger.split('_').length == 3) {
                    var randVal = parseInt(Math.random() * 10000);
                    $('#' + ctrlTrigger).val(randVal);
                    textBoxChangeEvent(ctrlTrigger, $('#' + ctrlTrigger).attr('name'), randVal, '', '');
                }
            }
            else {
                var validationMsg = '';
                for (index = 0; index < message.length; ++index) {
                    validationMsg += message[index] + " - " + result[message[index]];
                }
                alert('Validation Message : ' + validationMsg);
            }
        },
        error: function (data) {
            if (typeof data.statusText === 'undefined') {
                alert('Tracker create failed');
            }
            else {
                alert('Failure Message :' + data.statusText);
            }
        }
    });
}