function dgtextboxCreditCardMasking(dgctrlID, sourceCtrlName, destinationCtrlName, showLastN, focusColour) {
    showLastN = parseInt(showLastN || 4);
    focusColour = focusColour || 'orange';
    var sourceCtrl, destinationCtrl;
    if (!(dgctrlID && dgctrlID.split('_').length == 3 && sourceCtrlName && destinationCtrlName)) return;

    appendManualFocusClass(focusColour);
    hideColinDG(dgctrlID, sourceCtrlName);

    $(document).on('keyup mouseup', function () {
        if (sourceCtrl && $(document.activeElement).attr('id') != sourceCtrl.attr('id')) {
            destinationCtrl.removeClass('manualFocusMaskTB');
        }
    });


    $('#' + dgctrlID + '_parent_td').on('focus', '[name="' + destinationCtrlName + '"]', function () {
        destinationCtrl = $(this);
        $('.manualFocusMaskTB').removeClass('manualFocusMaskTB');
        sourceCtrl = $(this).closest('tr').find('[name="' + sourceCtrlName + '"]');
        if (sourceCtrl) {
            destinationCtrl.addClass('manualFocusMaskTB');

            sourceCtrl.on('keyup change', function () {
                destinationCtrl.val(sourceCtrl.val().replace(new RegExp('(\\d{' + (sourceCtrl.val().length - showLastN) + '})(\\d{' + showLastN + '})'), function (match, maskVal, endVal) { return '*'.repeat(maskVal.length) + endVal; }));
            });
            setTimeout(function () {
                sourceCtrl.focus();
            }, 10);
        }
    });
}

function activeElementChanged(sourceCtrl, destinationCtrl) {
    if (sourceCtrl && $(document.activeElement).attr('id') != sourceCtrl.attr('id')) {
        destinationCtrl.removeClass('manualFocusMaskTB');
    }
}

var hideColinDGInitialised = false;
function hideColinDG(dgctrlID, ctrlName) {
    if (!hideColinDGInitialised) {
        var hideIndex = $('#' + dgctrlID + '_parent_td [name="' + ctrlName + '"]').closest('.clcontainer').index() + 1;
        $('<style>#' + dgctrlID + '_parent_td .mainTable_div .clcontainer:nth-of-type(' + hideIndex + '), #' + dgctrlID + '_parent_td #fixedHead>.mainTable th:nth-of-type(' + hideIndex + '){opacity:0}#' + dgctrlID + '_parent_td #fixedHead>.mainTable th:nth-of-type(' + hideIndex + '){display:none}</style>').appendTo('head');
        hideColinDGInitialised = true;
    }
}

var appendManualFocusClassApplied = false;
function appendManualFocusClass(focusColour) {
    if (!appendManualFocusClassApplied) {
        $('<style>.clcontrol-dynamicgrid table.mainTable>tbody>tr>td input[type="text"].manualFocusMaskTB{box-shadow:inset 0px 0px 0px 1px ' + focusColour + ' !important;border-radius:0 !important;}</style>').appendTo('head');
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