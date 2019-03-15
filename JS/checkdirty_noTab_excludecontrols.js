var excludeControlsFromDirtyCheckEvent = function (excludedCtrls) {
    if (typeof Array.prototype.pushArray != 'function') {
        Array.prototype.pushArray = function () {
            var toPush = this.concat.apply([], arguments);
            for (var i = 0, len = toPush.length; i < len; ++i) {
                this.push(toPush[i]);
            }
        };
    }

    if (excludedCtrls && (_excludedCtrlsArray != undefined)) {
        var excludedCtrls = excludedCtrls.split(',');
        _excludedCtrlsArray.pushArray(excludedCtrls);
        $.each(excludedCtrls, function (i, excludedCtrl) {
            $('#' + excludedCtrl + ' :input, .' + excludedCtrl + ' :input, [name="' + excludedCtrl + '"] :input').each(function (index, el) {
                if (($(el).attr('id') || $(el).attr('name'))
                    && (el.type != "button" ||
                        el.type != "reset" ||
                        el.type != "submit")) {
                    _excludedCtrlsArray.push(($(el).attr('id') || $(el).attr('name')));
                }
            });
        });
    }
}