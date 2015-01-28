var cSite, 
    sList = ["primedice.com", "fortunejack.com", "prcdice.eu", "bikinidice.com", "coinichiwa.com", "bitdice.me", "safedice.com", "satoshidice.com", "win88.me", "777coin.com"];

// Get Site
getSite = function () {
    url = window.location.hostname.replace('www.', '');
    for (i = 0; i < sList.length; i++) {
        if (url == sList[i]) { 
          cSite = sList[i].replace('.com', '');
        } else {}
    }
};
getSite();
function inject() {
 	var boturl = '//cdn.rawgit.com/jmusicc/cointhecoin/master/src/' +cSite+ '.js';
	var script = '<script src="' + boturl + '"></script>';
	$(script).appendTo('head');
} 
// check if site has jQuery
if (cSite == sList[1] || sList[3] || sList[5]) {
	// Inject jQuery using JS syntax
  	var e = document.createElement('script');
	e.setAttribute('src', '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js');
	document.body.appendChild(e);
  setTimeout(function(){
  	inject();
  }, 1000);
} else {
	inject();	  
}
