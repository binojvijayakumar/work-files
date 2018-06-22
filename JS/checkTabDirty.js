function setTabDirtyCheckEvent(tabCtrlID) {
    $('#' + tabCtrlID).on("tabsbeforeactivate", function (event, ui) {
        if (_isDirty && !confirm('There are un-saved changes in this tab. Confirm?')) {
            return false
        }
        else {
            _isDirty = false;
            return true;
        }
    });
}