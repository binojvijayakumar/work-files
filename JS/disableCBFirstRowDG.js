function disableCBFirstRowDG(dgCtrlID) {
    $('#' + dgCtrlID + '_subparent_td .mainTable>tbody>tr:first-child')
        .find('input[type="radio"]')
        .prop('disabled', 'disabled');
}