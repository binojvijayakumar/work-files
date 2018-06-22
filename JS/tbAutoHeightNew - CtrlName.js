var measurer = $('<span>', {
    style: "display:inline-block;word-break:break-word;visibility:hidden;white-space:pre-wrap;"
})
    .appendTo('body');

function initMeasurerFor(textarea) {
    if (textarea && !textarea[0].originalOverflowY) {
        textarea[0].originalOverflowY = textarea.css("overflow-y");
    }
    var maxWidth = textarea.css("max-width");
    measurer.text(textarea.text())
        .css("max-width", maxWidth == "none" ? textarea.width() + "px" : maxWidth)
        .css('font', textarea.css('font'))
        .css('overflow-y', textarea.css('overflow-y'))
        .css("max-height", textarea.css("max-height"))
        .css("min-height", textarea.css("min-height"))
        .css("min-width", textarea.css("min-width"))
        .css("padding", textarea.css("padding"))
        .css("border", textarea.css("border"))
        .css("box-sizing", textarea.css("box-sizing"))
}

function updateTextAreaSize(textarea) {
    textarea.height(measurer.height());
    var w = measurer.width();
    if (textarea[0].originalOverflowY == "auto") {
        var mw = textarea.css("max-width");
        if (mw != "none") {
            if (w == parseInt(mw)) {
                textarea.css("overflow-y", "auto");
            } else {
                textarea.css("overflow-y", "hidden");
            }
        }
    }
    // textarea.width(w + 2);
}

function HeightAutoCtrl(ctrlNames) {
    var ctrlNameArray = ctrlNames.split(',');
    $.each(ctrlNameArray, function (i, ctrlName) {
        var ctrlSelector = 'textarea[name="' + ctrlName + '"]';
        var ctrl = $(ctrlSelector);
        ctrl.css('min-height', ctrl.css('height'));
        ctrl.css('min-width', ctrl.css('width'));
        ctrl.css('max-width', ctrl.css('width'));
        ctrl.css('resize', 'none');


        $(document)
            .on('input', ctrlSelector, function () {
                initMeasurerFor(ctrl);
                invokechange(this);
            })
            .on('keypress', ctrlSelector, function (e) {
                if (e.which == 13 && $(this).attr("preventEnter") != undefined) {
                    e.preventDefault();
                }
            });

        // ctrl.on({
        //     input: function () {
        //         invokechange(this);
        //     },
        //     keypress: function (e) {
        //         if (e.which == 13 && $(this).attr("preventEnter") != undefined) {
        //             e.preventDefault();
        //         }
        //     }
        // });
    });
}

function invokechange(el) {
    var text = $(el).val();
    if ($(el).attr("preventEnter") == undefined) {
        text = text.replace(/[\n]/g, "<br>&#8203;");
    }
    measurer.html(text);
    updateTextAreaSize($(el));
}

function HeightAutoCtrlMT(ctrlNames) {
    var ctrlNameArray = ctrlNames.split(',');
    $.each(ctrlNameArray, function (i, ctrlName) {
        $('textarea[name="' + ctrlName + '"]').trigger('input');
    });
}