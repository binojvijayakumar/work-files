var _isDirty = _logResults = false;
var _excludedCtrlsArray = [];
var _postMessageTargetUrl = '';
var _controlInFormErrorMsg = 'First parameter is not provided (or proper) for function "setFormControlsDirtyCheckEvent".';

var getDirtyFormValue = function () {
    return _isDirty;
}

var setDirtyFormValue = function (value) {
    if (getDirtyFormValue() != value) {
        sendDirtyFormValuePostMessage(value);
    }
    _isDirty = value;
}

var sendDirtyFormValuePostMessage = function (value) {
    if (!_postMessageTargetUrl) return;
    var postMessageValue = !value ? 'formValid' : 'formDirty';
    if (_logResults) console.log({ targetUrl: _postMessageTargetUrl, value: postMessageValue });
    window.top.postMessage(postMessageValue, _postMessageTargetUrl);
}

var setFormControlsDirtyValue = function (state) {
    setDirtyFormValue(!!parseInt(state));
}

var isFormControlsDirty = function () {
    return getDirtyFormValue() ? 1 : 0;
}

var setFormControlsDirtyCheckEvent = function (controlInForm, excludedCtrls, postMessageUrl, logResults) {
    _postMessageTargetUrl = postMessageUrl;
    _logResults = logResults === 'logResults';
    sendDirtyFormValuePostMessage(false);
    if (excludedCtrls) {
        _excludedCtrlsArray = excludedCtrls.split(',');
    }
    if (!controlInForm && controlInForm.split('_').length != 3) {
        alert(_controlInFormErrorMsg);
        return;
    }

    $('#' + controlInForm)
        .closest('.innerframe')
        .on('change', ':input', function () {
            var el = this;
            if (el.type == "button" ||
                el.type == "reset" ||
                el.type == "submit" ||
                ($.inArray(el.name, _excludedCtrlsArray) < 0 ? false : true) ||
                ($.inArray(el.id, _excludedCtrlsArray) < 0 ? false : true)
            ) return;
            setDirtyFormValue(true);
        });
}

$(function () {
    var parentTriggerControl = $('input[type="Text"][name="txtFormDirtyCheckScriptLoaded"]');
    if (parentTriggerControl) {
        var randVal = parseInt(Math.random() * 10000);
        parentTriggerControl.val(randVal);
        textBoxChangeEvent(parentTriggerControl.attr('id'), parentTriggerControl.attr('name'), randVal, '', '');
    }
});