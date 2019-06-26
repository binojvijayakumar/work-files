// var template1 = "{'MappingID':3,'Items':[{'FormField':'rbtnQuestion1','AcroField':'TestCheckBox','Value':'1'}]}";
// var template2 = "{'MappingID':3,'Items':[{'FormField':'rbtnQuestion1','AcroField':'TestCheckBox','Value':'2'}]}";
// var mappingID = 3;
var mergeTemplateStrings = function (mappingID, template1, template2) {
    if (!mappingID || !template1 || !template2) return;
    var regex = new RegExp(/\[(.*?)\]}$/)
    template1 = regex.exec(JSON.stringify(template1))[1].replace(/"/g, "'");
    template2 = regex.exec(JSON.stringify(template2))[1].replace(/"/g, "'");
    // console.log(template1);
    // console.log(template2);
    return "{'MappingID':" + mappingID + ",'Items':[" + template1 + "," + template2 + "]}";
}
// console.log(mergeTemplateStrings(mappingID, template1, template2));