function EnableMultiListTooltip(ctrlIDs) {
    $.each(ctrlIDs.split(','), function (i, val) {
        $('#' + val + ' option').each(function (index, element) {
            $(this).attr('title', $(this).text());
        });
    });
}