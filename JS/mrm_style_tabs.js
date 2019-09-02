function mrm_styleTabs_top(ctrlid, activeColor, borderColor) {
    if (ctrlid && ctrlid.split('_').length && ctrlid.split('_').length == 3) {
        $('#mrm_style_Tabs_top_' + ctrlid).remove();
        $(`<style id="mrm_style_Tabs_top_` + ctrlid + `">
        #` + ctrlid + `_TabHead>ul>li,#` + ctrlid + `_TabHead>ul>li>a{background-color:transparent!important;border:none;}
        #` + ctrlid + `_TabHead>ul>li>a{padding:0;}
        #` + ctrlid + `_TabHead .ui-tabs-active{border-bottom: 3px solid ` + activeColor + ` !important;box-sizing:border-box;}
        #` + ctrlid + `_tabItems>div{border:none!important;border-top:1px solid ` + borderColor + `!important;box-shadow: none!important;}
        #` + ctrlid + ` div.clcontrol-form{margin-left:-2px!important;}
        </style>`).appendTo('head');
    }
    // $(document).on('click', '#' + ctrlid + '_TabHead a', function (event) {

    //     // Stop default browser action which would likely return to the top of the page
    //     event.preventDefault();
    // });
}