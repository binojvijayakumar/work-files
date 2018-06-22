function SetSearchDetailedLinks(srcCtrl, trigControl, itemsPerPage) {
    $('#' + srcCtrl).on('click', '.srcDetailedRedirect', function (e) {
        e.preventDefault();
        var _searchDetailedLinksPageNumber = 0;
        var _pagerControl = $('#' + srcCtrl + 'pager')
        if (_pagerControl && _pagerControl.length) {
            _searchDetailedLinksPageNumber = _pagerControl.find('td:nth-child(4)>input').val();
            _searchDetailedLinksPageNumber = parseInt(_searchDetailedLinksPageNumber) - 1;
        }
        var _val = (_searchDetailedLinksPageNumber * parseInt(itemsPerPage)) + $(this).closest('tr').index() + 1;
        $('#' + trigControl).val(_val);
        textBoxChangeEvent(trigControl, $('#' + trigControl).attr('name'), $('#' + trigControl).val());
    });
}