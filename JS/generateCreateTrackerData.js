function generateCreateTrackerData(keysCtrl, resultCtrl) {
    if (keysCtrl && keysCtrl.split('_').length == 3 &&
        resultCtrl && resultCtrl.split('_').length == 3) {
        var keys = [];
        keys = $('#' + keysCtrl).val().split(',');

        var trackerData = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]; var element = document.getElementsByName(key)[0];
            var value = element ? element.value : "";
            trackerData.push({ "ID": key, "value": value });
        }

        trackerData = JSON.stringify(trackerData);
        $('#' + resultCtrl).val(trackerData);
        textBoxChangeEvent(resultCtrl, $('#' + resultCtrl).attr('name'), trackerData, '', '');
    }
}