function setButtonCircle(ctrlids) {
    var ids = ctrlids.split(',');
    $.each(ids, function (i, v) { 
        $('#'+v).css({'borderRadius':'50%'}) ;
    });
}