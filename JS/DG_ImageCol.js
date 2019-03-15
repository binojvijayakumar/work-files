var dgImageColumn = function (_ctrlID, _colName, _fontValue, _fontSize, _fontColour, _alignCenter) {
    if (!_ctrlID || _ctrlID.split('_').length != 3 || !_colName || !_fontValue) return;
    _fontSize = _fontSize || '12px';
    _fontColour = _fontColour || '#000000';
    _alignCenter = _alignCenter == 'alignCenter';
    var dgColElements = $('#' + _ctrlID + '_parent_td a[name="' + _colName + '"][controltype="HyperlinkButton"]');
    if (_alignCenter) _alignCenter = 'margin: 0 50%;left: -' + parseInt(_fontSize, 10) / 2 + 'px;top: ' + ((dgColElements.outerHeight() / 2) - (parseInt(_fontSize, 10) / 2)) + 'px;position: absolute;';
    else _alignCenter = '';

    
    $('<style>.dgImageCol_'+_ctrlID+'_'+_colName+'{font-size: ' + _fontSize + ';color: ' + _fontColour + ';' + _alignCenter + '}</style>').appendTo('head');

    dgColElements.html('<i class="fa ' + _fontValue + ' dgImageCol_'+_ctrlID+'_'+_colName+'" aria-hidden="true"></i>')
}