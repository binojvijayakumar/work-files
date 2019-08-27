var TimeDiffObj = [];
var registerTimeDiff = function (name, startstop) {
    if (startstop === 'start') {
        TimeDiffObj.push({ name: name, start: Date.now() });
    }
    else if (startstop === 'stop') {
        var diffObj = TimeDiffObj.find(function (item) {
            if (item.name === name) {
                return item;
            }
        });
        diffObj.end = Date.now();
        diffObj.diff = (new Date(diffObj.end).getTime() - new Date(diffObj.start).getTime()) / 1000;
        console.log(diffObj);
    }
}