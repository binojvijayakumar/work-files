var taxathand_article_generator_resultCtrl;
function taxathand_article_generator(ctrlid, resultCtrl, filterIDs, filterStartDate, filterEndDate) {
    if (taxathandArticlesResponse && taxathandArticlesResponse.length && ctrlid && resultCtrl && ctrlid.split('_').length == 3 && resultCtrl.split('_').length == 3) {
        if (!$('#taxathand-article-styles').length) {
            $('<style id="taxathand-article-styles"> .card { border: 1px solid black; -webkit-box-shadow: 3px 3px 10px -1px rgba(0, 0, 0, 0.75); -moz-box-shadow: 3px 3px 10px -1px rgba(0, 0, 0, 0.75); box-shadow: 3px 3px 10px -1px rgba(0, 0, 0, 0.75); position: relative; display: inline-block; width: 250px; height: 250px; margin: 10px; font-family: "Open Sans", sans-serif; } .upper { position: absolute; background-color: blue; top: 0; bottom: 60%; left: 0; right: 0; background: url(https://wallpaper-house.com/data/out/10/wallpaper2you_393149.jpg) 0 0 no-repeat; background-size: cover; } .upper-banner { position: absolute; bottom: 0; left: 0; right: 0; background-color: #0075e0; color: white; opacity: 0.8; } .middle { position: absolute; top: 40%; bottom: 10%; left: 0; right: 0; overflow: auto; } .lower { position: absolute; top: 90%; bottom: 0; left: 0; right: 0; text-align: right; font-size: small; } .text-container { padding-top: 2px; padding-left: 10px; padding-right: 10px; padding-bottom: 2px; } .upper-text { font-size: small; line-height: 1.4; } .middle-text { line-height: 1.2; } .upper a{text-decoration: none;color: inherit;} </style>').appendTo('head');
        }
        var articlesToDisplay = $.grep(taxathandArticlesResponse, function (v, i) {
            var _filterID, _filterStartDate, _filterEndDate = true;
            if (filterIDs) {
                filterIDs = filterIDs.split(',');
                _filterID = !$.inArray(v.uuid, filterIDs) !== -1;
            }
            if (filterStartDate) {
                filterStartDate = filterStartDate.split('/');
                _filterStartDate = new Date(v.publishDateTime) <= new Date(filterStartDate[2], filterStartDate[0] - 1, filterStartDate[2]);
            }
            if (filterEndDate) {
                filterEndDate = filterEndDate.split('/');
                _filterEndDate = new Date(v.publishDateTime) >= new Date(filterEndDate[2], filterEndDate[0] - 1, filterEndDate[2]);
            }
            return _filterID && _filterStartDate && _filterEndDate;
        });

        taxathand_article_generator_resultCtrl = resultCtrl;
        var node = '<table><tbody>';
        var k = 0;
        for (var i = 0; i < Math.ceil(articlesToDisplay.length / 2); i++) {
            node += '<tr>';
            for (var j = 0; j < 2; j++) {
                var article = articlesToDisplay[k++];
                if (article) {
                    node += '<td><div class="card"> <div class="upper" style="background-image:url(' + article.imagePath + ')"> <div class="upper-banner text-container"><a target="_blank" href="' + article.sharingWebURL + '"> <p class="upper-text">' + article.title + '</p></a> </div> </div> <div class="middle"> <div class="text-container"> <p class="middle-text"> ' + article.teaserText + ' </p> </div> </div> <div class="lower"> <div class="text-container"> <label for="followUp">Follow up needed ? Yes/No</label> <input name="followUp" id="followUp" type="checkbox" uuid="' + article.uuid + '" /> </div> </div> </div></td>';
                }
            }
            node += '</tr>';
        }
        node += '</tbody></table>';
        if ($('#' + ctrlid)) $('#' + ctrlid).append(node);
    }
}

$(function () {
    $(document).on('change', '.card input[name="followUp"]', function () {
        var result = $(this).attr('uuid') + '#;' + ($(this).attr('checked') ? 'YES' : 'NO');
        $('#' + taxathand_article_generator_resultCtrl).val(result);
        textBoxChangeEvent(taxathand_article_generator_resultCtrl, $('#' + taxathand_article_generator_resultCtrl).attr('name'), result, '', '');
    });
});