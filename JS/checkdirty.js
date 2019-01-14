var _isDirty = _isDirty_subForm = _userDialogConfirm = false;
var _excludedCtrlsArray = _excludedCtrlsArray_subForm = [];
var _contrilInFormErrorMsg = '"setFormControlsDirty(controlInForm, excludedCtrls, isSubForm)" First parameter is not provided (or proper).';
var _isDirtyMessage = 'There are unsaved changes in current tab. Do you want to save the changes on this tab before proceeding?';

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

    $('<style>.noTitleDialog{z-index:9991}.noTitleDialog+.ui-widget-overlay.ui-front{z-index:9990}.noTitleDialog .ui-dialog-titlebar {display:none}</style>').appendTo('head');
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
            isSubForm ? (_isDirty_subForm = true) : (_isDirty = true);
        });
}

function showIsDirtyDialog(tabCtrlID, newTabID, yesTrigger, noTrigger, cancelTrigger) {
    var _idDirtyDialog = $('<div>').html(_isDirtyMessage).dialog({
        // _dirtyDialog = $("#tabDirtyDialog").dialog({
        autoOpen: false,
        modal: true,
        dialogClass: 'noTitleDialog',
        close: function (e, u) { $(this).remove(); },
        buttons: {
            'Yes': function () {
                _userDialogConfirm = true;
                if (yesTrigger && yesTrigger.split('_').length == 3) {
                    // var randVal = parseInt(Math.random() * 10000);
                    $('#' + yesTrigger).val(newTabID);
                    textBoxChangeEvent(yesTrigger, $('#' + yesTrigger).attr('name'), newTabID, '', '');
                }
                $(this).dialog('close');
                _isDirty_subForm = _isDirty = false;
                // $('#' + tabCtrlID).tabs('option', 'active', newTabID);
            },
            'No': function () {
                _userDialogConfirm = true;
                if (noTrigger && noTrigger.split('_').length == 3) {
                    // var randVal = parseInt(Math.random() * 10000);
                    $('#' + noTrigger).val(newTabID);
                    textBoxChangeEvent(noTrigger, $('#' + noTrigger).attr('name'), newTabID, '', '');
                }
                $(this).dialog('close');
                _isDirty_subForm = _isDirty = false;
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
    isSubForm ? (_isDirty_subForm = !!parseInt(state)) : (_isDirty = !!parseInt(state));
}

function isFormControlsDirty(isSubForm) {
    isSubForm = transformValuetoBoolean(isSubForm);
    return isSubForm ? (_isDirty_subForm ? 1 : 0) : (_isDirty ? 1 : 0);
}

function setTabDirtyCheckEvent(tabCtrlID, yesTrigger, noTrigger, cancelTrigger) {
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
        if (!_userDialogConfirm && _isDirty) {
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