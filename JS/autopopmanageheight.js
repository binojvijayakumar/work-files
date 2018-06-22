// function setButtonClick(ctrlName) {
//     $(document).on('click', 'input[name="' + ctrlName + '"]', function () {
//         setCurrentFormHeight();
//     });


// $('input[name="' + ctrlName + '"]').click(function (e) {
//     var inFrameHeight = $('.innerframe').css('height');
//     parent.setIFrameHeight(window.frameElement.id, inFrameHeight);
// });
//}

function setCurrentFormHeight() {
    var frameid = window.frameElement.id;
    var formid = frameid.split('_')[0];
    var inFrameHeight = $('#' + formid + '>div>div>.innerframe').css('height');
    parent.setIFrameHeight(frameid, inFrameHeight);
}