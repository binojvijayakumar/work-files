function gridTitleRowHeight(height) {
    $('.headingRow').closest('tr').find('td *').css('max-height', height + 'px');
}
