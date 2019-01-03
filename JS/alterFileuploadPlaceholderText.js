function alterFileuploadPlaceholderText(ctrlID, placeholderText) {
    $('#' + ctrlID + '_fle .clfilearea>.displayText>tbody>tr>td').text(placeholderText);
}