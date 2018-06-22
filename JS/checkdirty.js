var _isDirty = false;
var _isDirty_subForm = false;
var _contrilInFormErrorMsg = '"setFormControlsDirty(controlInForm, excludedCtrls)" First parameter is not provided/proper.';
var _excludedCtrlsArray = [];
var _excludedCtrlsArray_subForm = [];
var _isDirtyMessage = 'There are unsaved changes in the tab, click "OK" to continue or click "Cancel" to go back to the tab to save it.';

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

function setFormControlsDirtyValue(state, isSubForm) {
    isSubForm = transformValuetoBoolean(isSubForm);
    isSubForm ? (_isDirty_subForm = !!parseInt(state)) : (_isDirty = !!parseInt(state));
}

function isFormControlsDirty(isSubForm) {
    isSubForm = transformValuetoBoolean(isSubForm);
    return isSubForm ? (_isDirty_subForm ? 1 : 0) : (_isDirty ? 1 : 0);
}

function setTabDirtyCheckEvent(tabCtrlID, cancelTrigger, okTrigger) {
    $('#' + tabCtrlID).on("tabsbeforeactivate", function (event, ui) {
        if (_isDirty &&
            !confirm(_isDirtyMessage)) {
            if (cancelTrigger && cancelTrigger.split('_').length == 3) {
                var randVal = parseInt(Math.random() * 10000);
                $('#' + cancelTrigger).val(randVal);
                textBoxChangeEvent(cancelTrigger, $('#' + cancelTrigger).attr('name'), randVal, '', '');
            }
            return false
        } else {
            _isDirty_subForm = _isDirty = false;
            if (okTrigger && okTrigger.split('_').length == 3) {
                var randVal = parseInt(Math.random() * 10000);
                $('#' + okTrigger).val(randVal);
                textBoxChangeEvent(okTrigger, $('#' + okTrigger).attr('name'), randVal, '', '');
            }
            return true;
        }
    });
}

function transformValuetoBoolean(isSubForm) {
    return !!isSubForm &&
        $.trim(isSubForm).toLowerCase() == 'true';
}