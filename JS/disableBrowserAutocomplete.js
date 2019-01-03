function disableBrowserAutocomplete(ctrls) {
    if (ctrls) ctrls = ctrls.split(',');
    $('#'+ctrls.join(', #')).attr('autocomplete', 'off');
}