var TimeDiffArr = [];
var registerTimeDiff = function (name, startstop) {
    if (startstop === 'start') {
        TimeDiffArr.push({ name: name, start: Date.now() });
    }
    else if (startstop === 'stop') {
        var diffObj;
        $.each(TimeDiffArr, function () {
            if (this.name === name) {
                diffObj = this;
            }
        });
        if (diffObj) {
            diffObj.end = Date.now();
            diffObj.diff = (new Date(diffObj.end).getTime() - new Date(diffObj.start).getTime()) / 1000;
            console.log(diffObj);
        }
    }
}