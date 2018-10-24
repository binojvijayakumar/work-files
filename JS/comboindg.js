function fillcomboindg(dgctrlid, combocol, combovalcol, values) {
    hideCombovalColinDG(dgctrlid, combovalcol);
    values = '[Select],' + values;
    var comboValues = values.split(',');
    var combo = $('#' + dgctrlid + '_parent_td select[name="' + combocol + '"]');
    combo.html('');
    $.each(comboValues, function (i, v) {
        combo.append($('<option/>', { value: v, text: v }));
    });

    combo.each(function (i, e) {
        $(this).val($(this).closest('tr').find('[name="' + combovalcol + '"]').text());
    });
}

var hideCombovalColinDGInitialised = false;
function hideCombovalColinDG(dgctrlid, combovalcol) {
    if (!hideCombovalColinDGInitialised) {
        var hideIndex = $('#' + dgctrlid + '_parent_td [name="' + combovalcol + '"]').closest('.clcontainer').index() + 1;
        $('<style>#' + dgctrlid + '_parent_td .mainTable_div .clcontainer:nth-of-type(' + hideIndex + '), #' + dgctrlid + '_parent_td #fixedHead>.mainTable th:nth-of-type(' + hideIndex + '){display:none}</style>').appendTo('head');
        hideCombovalColinDGInitialised = true;
    }
}