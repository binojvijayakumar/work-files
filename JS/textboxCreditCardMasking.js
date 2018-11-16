function textboxCreditCardMasking(sourceCtrl, destinationCtrl, showLastN, focusColour) {
    showLastN = parent(showLastN || 4);
    focusColour = focusColour || 'orange';
    if (!(sourceCtrl && sourceCtrl.split('_').length == 3 && destinationCtrl && destinationCtrl.split('_').length == 3)) return;

    destinationCtrl = $('#' + destinationCtrl);
    sourceCtrl = $('#' + sourceCtrl);
    appendManualFocusClass(focusColour);
    sourceCtrl.css('opacity', 0);

    destinationCtrl.on('focus', function () {
        $('.manualFocusMaskTB').removeClass('manualFocusMaskTB');
        destinationCtrl.addClass('manualFocusMaskTB');
        setTimeout(function () {
            sourceCtrl.focus();
        }, 10);
    });

    sourceCtrl.on('keyup change', function () {
        destinationCtrl.val(sourceCtrl.val().replace(new RegExp('(\\d{' + (sourceCtrl.val().length - showLastN) + '})(\\d{' + showLastN + '})'), function (match, maskVal, endVal) { return '*'.repeat(maskVal.length) + endVal; }));
    });

    $(document).on('keyup mouseup', function () {
        if (sourceCtrl && $(document.activeElement).attr('id') != sourceCtrl.attr('id')) {
            destinationCtrl.removeClass('manualFocusMaskTB');
        }
    });

}

var appendManualFocusClassApplied = false;
function appendManualFocusClass(focusColour) {
    if (!appendManualFocusClassApplied) {
        $('<style>.manualFocusMaskTB{box-shadow:inset 0px 0px 0px 1px ' + focusColour + ' !important;}</style>').appendTo('head');
        appendManualFocusClassApplied = true;
    }
}

if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var maxCount = str.length * count;
        count = Math.floor(Math.log(count) / Math.log(2));
        while (count) {
            str += str;
            count--;
        }
        str += str.substring(0, maxCount - str.length);
        return str;
    }
}