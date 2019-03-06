var _isDirty = _userDialogConfirm = _activeTabNotifier = _logResults = false;
var _excludedCtrlsArray = [];
var _postMessageTargetUrl = '';
var _controlInFormErrorMsg = 'First parameter is not provided (or proper) for function "setFormControlsDirty".';
var _isDirtyMessage = 'There are unsaved changes on current page. Do you want to save the changes before proceeding?<br/><br/>Click on <b>Save</b> to save the changes<br/><br/>Click on <b>Don\'t Save</b> to not save the changes<br/><br/>Click on <b>Cancel</b> for no action';

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

var showIsDirtyDialog = function (newTabID, yesTrigger, noTrigger, cancelTrigger) {
    var _idDirtyDialog = $('<div>').html(_isDirtyMessage).dialog({
        title: 'Unsaved Changes',
        width: 400,
        autoOpen: false,
        modal: true,
        dialogClass: 'dirtyDialog',
        close: function (e, u) { $(this).remove(); },
        buttons: {
            'Save': function () {
                _userDialogConfirm = true;
                if (yesTrigger && yesTrigger.split('_').length == 3) {
                    // var randVal = parseInt(Math.random() * 10000);
                    $('#' + yesTrigger).val(newTabID);
                    textBoxChangeEvent(yesTrigger, $('#' + yesTrigger).attr('name'), newTabID, '', '');
                }
                $(this).dialog('close');
                setDirtyFormValue(false);
            },
            'Don\'t Save': function () {
                _userDialogConfirm = true;
                if (noTrigger && noTrigger.split('_').length == 3) {
                    // var randVal = parseInt(Math.random() * 10000);
                    $('#' + noTrigger).val(newTabID);
                    textBoxChangeEvent(noTrigger, $('#' + noTrigger).attr('name'), newTabID, '', '');
                }
                $(this).dialog('close');
                setDirtyFormValue(false);
            },
            'Cancel': function () {
                _userDialogConfirm = false;
                $(this).dialog('close');
                if (cancelTrigger && cancelTrigger.split('_').length == 3) {
                    // var randVal = parseInt(Math.random() * 10000);
                    $('#' + cancelTrigger).val(newTabID);
                    textBoxChangeEvent(cancelTrigger, $('#' + cancelTrigger).attr('name'), newTabID, '', '');
                }
            }
        }
    });
    $(_idDirtyDialog).dialog('open');
}

var setFormControlsDirtyValue = function (state) {
    setDirtyFormValue(!!parseInt(state));
}

var isFormControlsDirty = function () {
    return getDirtyFormValue() ? 1 : 0;
}

var setTabDirtyCheckEvent = function (tabCtrlID, yesTrigger, noTrigger, cancelTrigger, postMessageUrl, logResults) {
    _postMessageTargetUrl = postMessageUrl;
    _logResults = logResults === 'logResults';
    sendDirtyFormValuePostMessage(false);
    $('#' + tabCtrlID).on('tabsbeforeactivate', function (event, ui) {
        if (!_userDialogConfirm && getDirtyFormValue()) {
            var newTabID = ui.newTab.index() / 2;
            showIsDirtyDialog(newTabID, yesTrigger, noTrigger, cancelTrigger);
            return false;
        }
        _userDialogConfirm = false;
    });
}

Array.prototype.pushArray = function() {
    var toPush = this.concat.apply([], arguments);
    for (var i = 0, len = toPush.length; i < len; ++i) {
        this.push(toPush[i]);
    }
};

var setFormControlsDirty = function (controlInForm, excludedCtrls) {
    if (excludedCtrls) {
        _excludedCtrlsArray.pushArray(excludedCtrls.split(','));
    }
    if (!controlInForm && controlInForm.split('_').length != 3) {
        alert(_controlInFormErrorMsg);
        return;
    }

    $('<style>.dirtyDialog{z-index:9991}.dirtyDialog+.ui-widget-overlay.ui-front{z-index:9990}.dirtyDialog .ui-dialog-titlebar {/*display:none*/}</style>').appendTo('head');

    $('#' + controlInForm)
        .closest('.clcontrol-form')
        .on('change', ':input', function () {
            var el = this;
            if (el.type == "button" ||
                el.type == "reset" ||
                el.type == "submit" ||
                ($.inArray(el.name, _excludedCtrlsArray) < 0 ? false : true) ||
                ($.inArray(el.id, _excludedCtrlsArray) < 0 ? false : true)
            ) return;
            setDirtyFormValue(true);
            var activeTabName = $(el).closest('.clcontrol-tabcontrol').attr('dirtyCheckActivatedTab');
            if (typeof activeTabName !== typeof undefined && activeTabName !== false && _activeTabNotifier) {
                $('#' + _activeTabNotifier).val(activeTabName);
                textBoxChangeEvent(_activeTabNotifier, $('#' + _activeTabNotifier).attr('name'), activeTabName, '', '');
            }
        });
}

var assignTabName = function (tabDetails, activeTabNotifier) {
    tabDetails = tabDetails.split('#');
    $.each(tabDetails, function (i, item) {
        var tabDetail = item.split(':');
        $('#' + tabDetail[0]).attr('dirtyCheckActivatedTab', tabDetail[1]);
    });
    if (activeTabNotifier && activeTabNotifier.split('_').length == 3) {
        _activeTabNotifier = activeTabNotifier;
    }
}