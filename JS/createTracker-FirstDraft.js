var portalServiceUrl = 'https://qa4svc.apps.tax';

function execPostRequest_CreateTracker() {
    var keys = ['Jurisdiction', 'TaxProcess', 'MasterObligation', 'ItemName', 'ItemOwner', 'CIInternalDueDate', 'CIDueDate', 'TaxYear', 'Period', 'LegalEntity', 'LegalEntityID', 'ReturnType', 'ParentEntityID', 'IsNoDueDateItem'];
    var trackerData = [];
    var itemName = '';
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var element = document.getElementsByName(key)[0];
        var value = element ? element.value : "";
        trackerData.push({
            "ID": key,
            "value": value
        });
        if (key === 'ItemName') {
            itemName = value;
        }
    }
    var input = JSON.stringify([trackerData]);
    $.ajax({
        type: 'POST',
        url: portalServiceUrl + '/api/DynamicComplianceItem/CreateTrackerByForms/1',
        dataType: "json",
        data: input,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var result = JSON.parse(JSON.stringify(data));
            var message = [];
            for (var item in result) {
                if (item !== '$id') {
                    message.push(item);
                }
            }
            if (typeof result[message[0]] === 'undefined') {
                alert('Tracker created Successfully');
            } else {
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
            } else {
                alert('Failure Message :' + data.statusText);
            }
        }
    });
}