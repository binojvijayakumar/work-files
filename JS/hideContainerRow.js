function hideContainerRow(ctrlid, hide) {
    $('#' + ctrlid).closest('table.parentRow').css('display', hide === 'true' ? 'none' : 'table');
}