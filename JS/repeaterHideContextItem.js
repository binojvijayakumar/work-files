var repeaterHideContextItem = function (itemName, indexes) {
    indexes = indexes.split(',').map(function (index) { return parseInt(index, 10); }).filter(Boolean);
    var contextMenuSelectors = [];
    $('div[isrepeatedform="true"].clcontrol-externalform').each(function (i) {
        if ($.inArray(i + 1, indexes) > -1) {
            contextMenuSelectors.push('#extFormdiv_' + this.id);
        }
    });
    $('ul.context-menu-list.context-menu-root').each(function () {
        if (!!$(this).data() && $(this).data().hasOwnProperty('contextMenu')) {
            if ($.inArray($(this).data()['contextMenu']['selector'], contextMenuSelectors) > -1) {
                $(this).find('li').each(function () {
                    if ($(this).text() == itemName) {
                        $(this).css('display', 'none');
                        if ($(this).next().hasClass('context-menu-separator')) {
                            $(this).next().css('display', 'none');
                        }
                    }
                });
            }
        }
    });
}