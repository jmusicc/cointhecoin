var cSite, 
    sList = ["primedice.com", "fortunejack.com", "coinichiwa.com", "bitdice.me"];

// Get Site
getSite = function () {
    url = window.location.hostname.replace('www.', '').replace('.com', '');
    for (i = 0; i < sList.length; i++) {
        if (url == sList[i]) { 
          cSite = sList[i];
        } else {}
    }
};
getSite();
   
var boturl = '//cdn.rawgit.com/jmusicc/cointhecoin/master/src/' +cSite+ '.js';
var script = '<script src="' + boturl + '"></script>';
$(script).appendTo('head');
