function hideSearchHeader(ctrlid) {
   $('<style>div#' + ctrlid + '_fixedHead{display:none}</style>').appendTo('head');;
}