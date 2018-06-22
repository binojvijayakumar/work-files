function changeLength(controls) {
    var allControls = controls.split(',');
    $(allControls).each(function (count) {
        $("[name='" + allControls[count] + "']").attr("maxlength", "4000");
        $("[name='" + allControls[count] + "']").attr("onkeypress", $("[name='" + allControls[count] + "']").attr("onkeypress").replace("1000", "4000"));
        $("[name='" + allControls[count] + "']").attr("onpaste", $("[name='" + allControls[count] + "']").attr("onkeypress").replace("1000", "4000"));
    });
}