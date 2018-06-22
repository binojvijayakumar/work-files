function extRepeaterMenuRename() {
    $(document).on('click', '.extFormDiv', function () {
        $('.context-menu-list.context-menu-root').each(function (i, e) {
            $(this).find('li.context-menu-item.icon.icon-edit > span').each(function (i, e) {
                if (i == 0)
                    $(this).text('Add');
                if (i == 1)
                    $(this).text('Remove');
            });
        });
    });
}