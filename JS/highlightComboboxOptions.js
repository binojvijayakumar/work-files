function highlightComboboxOptions(ctrlid, options, bold, italic, bg, fg) {
    options = options.split(',');
    var selectorArr = [];
    $.each(options, function (i, value) {
        selectorArr.push('#' + ctrlid + '>option[value="' + value + '"]');
    });
    bold = parseInt(bold) ? 'bold' : 'normal';
    italic = parseInt(italic) ? 'italic' : 'normal';
    bg = bg || '#b3b3b3';
    fg = fg || '#0051ff';
    $('<style>' + selectorArr.join(',') + '{font-weight: '+bold+';font-style: '+italic+';background-color: '+bg+';color: '+fg+';}</style>').appendTo('head');
}