var taxathand_article_generator_resultCtrl;
function taxathand_article_generator(ctrlid, resultCtrl, itemsPerRow, actionedYESItemsCtrl, actionedNOItemsCtrl, showArticlesFilterIDCtrl, hideArticlesFilterIDCtrl, filterStartDate, filterEndDate, externalBannerColour) {
    if (taxathandArticlesResponse && taxathandArticlesResponse.length &&
        itemsPerRow &&
        ctrlid && ctrlid.split('_').length == 3 &&
        resultCtrl && resultCtrl.split('_').length == 3) {
        if (!$('#taxathand-article-styles').length) {
            $('<style id="taxathand-article-styles">table.articles_container .card{border:1px solid #000;-webkit-box-shadow:3px 3px 10px -1px rgba(0,0,0,.75);-moz-box-shadow:3px 3px 10px -1px rgba(0,0,0,.75);box-shadow:3px 3px 10px -1px rgba(0,0,0,.75);position:relative;display:inline-block;width:200px;height:250px;margin:10px;font-family:"Open Sans",sans-serif}table.articles_container .upper{position:absolute;background-color:#00f;top:0;bottom:60%;left:0;right:0;background:url(https://wallpaper-house.com/data/out/10/wallpaper2you_393149.jpg) 0 0 no-repeat;background-size:cover}table.articles_container .upper-banner{position:absolute;bottom:0;left:0;right:0;background-color:#0075e0;color:#fff;opacity:.8}table.articles_container .upper-banner.external{background-color:' + (externalBannerColour || '#ff0000') + '}table.articles_container .middle{position:absolute;top:40%;bottom:10%;left:0;right:0;overflow:auto}table.articles_container .lower{position:absolute;top:90%;bottom:0;left:0;right:0;text-align:right;font-size:small}table.articles_container .text-container{font-size:.7rem;padding-top:2px;padding-left:10px;padding-right:10px;padding-bottom:2px}table.articles_container .upper-text{font-size:small;line-height:1.4}table.articles_container .middle-text{line-height:1.2}table.articles_container .upper a{text-decoration:none;color:inherit}</style>').appendTo('head');
        }

        var taxathandArticlesResponseConcat = taxathandArticlesResponse.concat(taxathandExternalArticle, leftover_apiarticles);
        var articlesToDisplay, showArticlesFilterIDs;
        if (showArticlesFilterIDCtrl && showArticlesFilterIDCtrl.split('_').length == 3) {
            showArticlesFilterIDs = $('#' + showArticlesFilterIDCtrl).val().split(',');
            articlesToDisplay = $.grep(taxathandArticlesResponseConcat, function (v, i) {
                return ($.inArray(v.uuid, showArticlesFilterIDs) !== -1);
            });
        }
        if (articlesToDisplay && showArticlesFilterIDs && articlesToDisplay.length && showArticlesFilterIDs.length) {
            var tempArr = [];
            $.each(showArticlesFilterIDs, function (i, filterArritem) {
                var articleItem = $.grep(articlesToDisplay, function (articlesArritem, j) {
                    return articlesArritem.uuid == filterArritem;
                });
                if (articleItem && articleItem.length)
                    tempArr.push(articleItem[0]);
            });
            if (tempArr.length);
            articlesToDisplay = tempArr;
        }
        var hideArticlesFilterIDs;
        if (hideArticlesFilterIDCtrl && hideArticlesFilterIDCtrl.split('_').length == 3) {
            hideArticlesFilterIDs = $('#' + hideArticlesFilterIDCtrl).val().split(',');
        }
        if (filterStartDate) {
            filterStartDate = filterStartDate.split('/');
        }
        if (filterEndDate) {
            filterEndDate = filterEndDate.split('/');
        }

        articlesToDisplay = $.grep(articlesToDisplay || taxathandArticlesResponseConcat, function (v, i) {
            var _filterID, _filterStartDate, _filterEndDate;
            _filterID = _filterStartDate = _filterEndDate = true
            if (hideArticlesFilterIDs && hideArticlesFilterIDs.length) {
                _filterID = !($.inArray(v.uuid, hideArticlesFilterIDs) !== -1);
            }
            if (filterStartDate && filterStartDate.length) {
                _filterStartDate = new Date(v.publishDateTime) <= new Date(filterStartDate[2], filterStartDate[0] - 1, filterStartDate[2]);
            }
            if (filterEndDate && filterEndDate.length) {
                _filterEndDate = new Date(v.publishDateTime) >= new Date(filterEndDate[2], filterEndDate[0] - 1, filterEndDate[2]);
            }
            return _filterID && _filterStartDate && _filterEndDate;
        });

        taxathand_article_generator_resultCtrl = resultCtrl;
        var node = '<table class="articles_container"><tbody>';
        var k = 0;
        var actionedYESItems = [];
        if (actionedYESItemsCtrl && actionedYESItemsCtrl.split('_').length == 3) {
            actionedYESItems = $('#' + actionedYESItemsCtrl).val().split(',');
        }
        var actionedNOItems = [];
        if (actionedNOItemsCtrl && actionedNOItemsCtrl.split('_').length == 3) {
            actionedNOItems = $('#' + actionedNOItemsCtrl).val().split(',');
        }
        for (var i = 0; i < Math.ceil(articlesToDisplay.length / itemsPerRow); i++) {
            node += '<tr>';
            for (var j = 0; j < itemsPerRow; j++) {
                var article = articlesToDisplay[k++];
                if (article) {
                    var isCheckedYES = $.inArray(article.uuid, actionedYESItems) !== -1 ? 'checked' : '';
                    var isCheckedNO = $.inArray(article.uuid, actionedNOItems) !== -1 ? 'checked' : '';
                    node += '<td><div class="card"> <div class="upper" style="background-image:url(' + article.imagePath + ')"> <div class="upper-banner ' + (article.source != 'api' ? 'external' : '') + ' text-container"><a target="_blank" href="' + article.sharingWebURL + '"> <p class="upper-text">' + article.title + '</p></a> </div> </div> <div class="middle"> <div class="text-container"> <p class="middle-text"> ' + article.teaserText + ' </p> </div> </div> <div class="lower"> <div class="text-container"> <label>Follow up needed ?</label><label><input name="followUp_' + k + '" state="YES" type="checkbox" uuid="' + article.uuid + '" ' + isCheckedYES + '/>YES</label><label><input name="followUp_' + k + '" type="checkbox" state="NO" uuid="' + article.uuid + '" ' + isCheckedNO + '/>NO</label></div> </div> </div></td>';
                }
            }
            node += '</tr>';
        }
        node += '</tbody></table>';
        if ($('#' + ctrlid)) {
            $('#' + ctrlid + ' table').remove();
            $('#' + ctrlid).append(node);
        }
    }
}

$(function () {
    $(document).on('change', 'table.articles_container .card input:checkbox', function () {
        var $box = $(this);
        if ($box.is(":checked")) {
            var group = "table.articles_container .card input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
        var result = $box.attr('uuid') + '#;' + ($box.prop('checked') ? $box.attr('state') : 'NULL');
        $('#' + taxathand_article_generator_resultCtrl).val(result);
        textBoxChangeEvent(taxathand_article_generator_resultCtrl, $('#' + taxathand_article_generator_resultCtrl).attr('name'), result, '', '');
    });
});