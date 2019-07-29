var taxathandArticlesResponse;
function taxathand_response_modifier(responseCtrl, outputCtrl) {
    if (responseCtrl && outputCtrl && responseCtrl.split('_').length == 3 && outputCtrl.split('_').length == 3) {
        var result = [];
        var parsedJSON;
        var response = $('#' + responseCtrl).val();
        if (response) parsedJSON = JSON.parse(response);
        if (parsedJSON && parsedJSON.length) {
            $.each(parsedJSON, function (i, v) {
                result.push({
                    "uuid": v.uuid,
                    "title": v.title,
                    "teaserText": v.teaserText,
                    "relatedCountry": v.relatedCountry.displayName,
                    "relatedCountries": $.map(v.relatedCountries, function (cty) { return cty.displayName }).join(', '),
                    "publishDateTime": new Date(v.publishDateTime).toLocaleDateString('en-US'),
                    "sharingWebURL": v.sharingWebURL,
                    "imagePath": v.imagePath
                })
            });
            if (result.length) {
                taxathandArticlesResponse = result;
                $('#' + outputCtrl).val(JSON.stringify(result));
                textBoxChangeEvent(outputCtrl, $('#' + outputCtrl).attr('name'), $('#' + outputCtrl).val());
            }
        }
    }
}