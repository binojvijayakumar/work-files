function EnableMultiListTooltip(ctrlID) {
    $('#' + ctrlID + ' option').each(function (index, element) {
        $(this).attr('title', $(this).text());
    });
}