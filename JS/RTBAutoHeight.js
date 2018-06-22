function autoHeightRTB(ctrlid) {
    $('#' + ctrlid + '_div').css({
        'box-shadow': 'none',
        'border': 'none'
    });
    // $('#' + ctrlid + '_div').removeClass('clcontrol clcontrol-richtextbox');
    $('#' + ctrlid + '_div .jqte_editor').css('height', 'auto');
    $('#' + ctrlid + '_div .jqte').css({
        'box-shadow': 'none',
        'border': 'none',
        'outline': 'none'
    });
}