var label_margin_top = '1px';
var label_margin_left = '-0.5px';

function modifyLabelsinBorder(brdrCtrl, formCtrl) {
    var borderControlChildren = $('#' + brdrCtrl).parent('.clcontainer').siblings().children();
    borderControlChildren.css({
        'margin-top': label_margin_top
    });
    if ($.browser.webkit) {
        borderControlChildren.css({
            'margin-left': label_margin_left
        });
    } else {
        borderControlChildren.css({
            'margin-left': '0px'
        });
    }
    $('#' + formCtrl)
        .find('input')
        .css('border-width', '0px');
    $('#' + formCtrl)
        .find('select')
        .css('border-width', '0px');
    $('#' + formCtrl + ' tr:nth-child(2)')
        .find('.clcontainer')
        .not(':first')
        .not(':last')
        .css({
            'border-right': '1px solid #eaeaea',
            'border-bottom': '1px solid #eaeaea'
        });
    $('#' + formCtrl + ' tr:nth-child(2)')
        .find('.clcontainer:last')
        .css({
            'border-bottom': '1px solid #eaeaea'
        });
    $('#' + formCtrl)
        .closest('.parentRow')
        .css('margin-bottom', '-3px');
}