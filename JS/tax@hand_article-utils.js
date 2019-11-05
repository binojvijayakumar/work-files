var taxathandExternalArticle = [];
var leftover_apiarticles_uuid = [];
var leftover_apiarticles = [];
var leftover_externalarticles_uuid = [];
var taxathand_addexternalarticle = function (extArticleObj) {
    if (extArticleObj) {
        var tempObj = typeof extArticleObj == 'string' ? JSON.parse(extArticleObj) : extArticleObj;
        if (taxathandExternalArticles && taxathandExternalArticles.length) {
            taxathandExternalArticle.push(...tempObj);
        }
    }
}

var taxathand_assignleftoverarticles = function (articles, articletype) {
    if (articles) {
        var articleArr = articles.split(',');
        if (articleArr.length != 0) {
            if (articletype == 'api') {
                leftover_apiarticles = [];
                leftover_apiarticles_uuid = articleArr;
                if (taxathandArticlesResponse && taxathandArticlesResponse.length) {
                    $.each(taxathandArticlesResponse, function (i, v) {
                        if ($.inArray(v.uuid, articleArr) > -1) {
                            leftover_apiarticles.push(v);
                        }
                    });
                }
            }
            else if (articletype == 'ext') {
                leftover_externalarticles_uuid = articleArr;
            }
        }
    }
}

var taxathand_modifystate_yescheckbox = function (state, excludeid) {
    $('.card input:checkbox[state="YES"]').not(`input:checkbox[uuid="${excludeid}"]`).prop('disabled', state == 'disabled');
}