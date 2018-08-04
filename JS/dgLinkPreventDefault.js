function dgLinkPreventDefault(ctrlID, linkCol) {
    $('#' + ctrlID + '_parent_td').on('click', 'a[name="' + linkCol + '"]', function () {
        event.preventDefault();
    });
}