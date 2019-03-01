if (typeof jQuery == 'undefined') {
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = '/_layouts/15/Claysys_html/Scripts/jquery_1.11.3.min.js';
    jqTag.onload = loadjQueryUI;
    headTag.appendChild(jqTag);
}

function loadjQueryUI() {
    console.log('Sapien: JQuery "' + jQuery.fn.jquery + '" loaded...');
    if (typeof jQuery.ui == 'undefined') {
        var headTag = document.getElementsByTagName("head")[0];
        var jqTag = document.createElement('script');
        jqTag.type = 'text/javascript';
        jqTag.src = '/_layouts/15/Claysys_html/Scripts/jquery_ui_1.11.3.min.js';
        jqTag.onload = function(){console.log('Sapien: JQuery UI "' + jQuery.ui.version + '" loaded...');};
        headTag.appendChild(jqTag);
    }
}