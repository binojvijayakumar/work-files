var _isDirty = _isDirty_subForm = _userDialogConfirm = false;
var _excludedCtrlsArray = _excludedCtrlsArray_subForm = [];
var _postMessageTargetUrl = '';
var _contrilInFormErrorMsg = '"setFormControlsDirty(controlInForm, excludedCtrls, isSubForm)" First parameter is not provided (or proper).';
var _isDirtyMessage = 'There are unsaved changes on current page. Do you want to save the changes before proceeding?<br/><br/>Click on <b>Save</b> to save the changes<br/><br/>Click on <b>Don\'t Save</b> to not save the changes<br/><br/>Click on <b>Cancel</b> for no action';

var getDirtyFormValue = function (isSubForm) {
    return isSubForm ? _isDirty_subForm : _isDirty;
}

var setDirtyFormValue = function (value, isSubForm) {
    if (getDirtyFormValue(isSubForm) != value) {
        sendDirtyFormValuePostMessage(value);
    }
    isSubForm ? (_isDirty_subForm = value) : (_isDirty = value);
}

var sendDirtyFormValuePostMessage = function (value) {
    window.parent.postMessage(!value ? 'formValid' : 'formDirty', _postMessageTargetUrl);
}

function setFormControlsDirty(controlInForm, excludedCtrls, isSubForm) {
    isSubForm = transformValuetoBoolean(isSubForm);
    if (excludedCtrls) {
        isSubForm ?
            _excludedCtrlsArray_subForm = excludedCtrls.split(',') :
            _excludedCtrlsArray = excludedCtrls.split(',');
    }
    if (!controlInForm && controlInForm.split('_').length != 3) {
        alert(_contrilInFormErrorMsg);
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
                ($.inArray(
                    el.name,
                    isSubForm ? _excludedCtrlsArray_subForm : _excludedCtrlsArray
                ) < 0 ? false : true) ||
                ($.inArray(
                    el.id,
                    isSubForm ? _excludedCtrlsArray_subForm : _excludedCtrlsArray
                ) < 0 ? false : true)) {
                return;
            }
            setDirtyFormValue(true, isSubForm);
            // isSubForm ? (_isDirty_subForm = true) : (_isDirty = true);
        });
}

function showIsDirtyDialog(tabCtrlID, newTabID, yesTrigger, noTrigger, cancelTrigger) {
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
                setDirtyFormValue(false, true);
                // _isDirty_subForm = _isDirty = false;
                // $('#' + tabCtrlID).tabs('option', 'active', newTabID);
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
                setDirtyFormValue(false, true);
                // _isDirty_subForm = _isDirty = false;
                // $('#' + tabCtrlID).tabs('option', 'active', newTabID);
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

function setFormControlsDirtyValue(state, isSubForm) {
    isSubForm = transformValuetoBoolean(isSubForm);
    setDirtyFormValue(!!parseInt(state), isSubForm);
    // isSubForm ? (_isDirty_subForm = !!parseInt(state)) : (_isDirty = !!parseInt(state));
}

function isFormControlsDirty(isSubForm) {
    isSubForm = transformValuetoBoolean(isSubForm);
    return getDirtyFormValue(isSubForm) ? 1 : 0;
    // return isSubForm ? (_isDirty_subForm ? 1 : 0) : (_isDirty ? 1 : 0);
}

function setTabDirtyCheckEvent(tabCtrlID, yesTrigger, noTrigger, cancelTrigger, postMessageUrl) {
    _postMessageTargetUrl = postMessageUrl;
    $('#' + tabCtrlID).on('tabsbeforeactivate', function (event, ui) {
        // if (_isDirty &&
        //     !confirm(_isDirtyMessage)) {
        //     if (cancelTrigger && cancelTrigger.split('_').length == 3) {
        //         var randVal = parseInt(Math.random() * 10000);
        //         $('#' + cancelTrigger).val(randVal);
        //         textBoxChangeEvent(cancelTrigger, $('#' + cancelTrigger).attr('name'), randVal, '', '');
        //     }
        //     return false
        // } else {
        //     _isDirty_subForm = _isDirty = false;
        //     if (okTrigger && okTrigger.split('_').length == 3) {
        //         var randVal = parseInt(Math.random() * 10000);
        //         $('#' + okTrigger).val(randVal);
        //         textBoxChangeEvent(okTrigger, $('#' + okTrigger).attr('name'), randVal, '', '');
        //     }
        //     return true;
        // }
        if (!_userDialogConfirm && getDirtyFormValue(false)) {
            var newTabID = ui.newTab.index() / 2;
            showIsDirtyDialog(tabCtrlID, newTabID, yesTrigger, noTrigger, cancelTrigger);
            return false;
        }
        _userDialogConfirm = false;
    });
}

function transformValuetoBoolean(isSubForm) {
    return !!isSubForm &&
        $.trim(isSubForm).toLowerCase() == 'true';
}