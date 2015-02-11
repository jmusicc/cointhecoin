var bet, addRow, curbet, hilo, target, seed, betResult, getResult,balancebefore, setParams, gameresult, basebet, wincount, firstbet=true;
var totalloss = 0,
totalwin=0,
wincount=0,
losscount=0,
swapcount=0;
curbet=10;
target=10;
hilo=0;
injectElement;
var injected= false;

setTimeout(function(){
var css='', lib='';
//lib += '<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>'; 
lib += '<style>.container{margin:0px auto !important;width:996px !important;min-width:996px !important;max-width:998px !important;overflow:hidden !important;z-index:1 !important;}</style><script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>';
//lib += '<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.3/jquery.slimscroll.min.js"></script>';	
lib += '<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/Flowtype.js/1.1.0/flowtype.min.js"></script>';
css += '<link type="text/css" rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1/themes/vader/jquery-ui.css"/>';
css += '<link type="text/css" rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>';
css += '<link type="text/css" rel="stylesheet" href="//cdn.rawgit.com/jmusicc/cointhecoin/master/src/css/ctc.css"/>';
css = css += lib;
$(css).appendTo('head');
},1000)
setTimeout(function(){
ctcUI=''; 
 ctcUI += '<div id="ctcBot" style="z-index:1000; position:absolute;"class="fullcontain container-fluid"><div id="innerContainer" class="bot-inner">';
 ctcUI += '<div id="betHistory" class="bHistory"><div id="bhTitle" class="bhTitle">';
 ctcUI += '<span class="bhTitle2">Bet History</span>';
 ctcUI += '<span class="bhTitle3"><a href="http://cointhecoin.com"><img src="http://i.imgur.com/OIoQpq6.png"/></a></span>';
 ctcUI += '</div>';
 ctcUI += '<div id="bhTable" class="bhTable table-responsive">';
 ctcUI += '<table style="width:100% !important" class="table-condensed"><thead>';
 ctcUI += '<tr class="bhRowTitle">';
 ctcUI += '<th>ID</th><th>Amount</th><th>Payout</th><th>Profit</th>';
 ctcUI += '</tr></thead></table>';
 ctcUI += '<div id="scroll"><table style="width:100% !important" class="table-condensed"><tbody>';
 ctcUI += '<tr id="bhRow" class="bhRowContainer"><div><td>12345678</td><td>0.00100000</td><td>10x</td><td class="loss">-0.00100000</td></div></tr>';
 ctcUI += '<tr id="bhRow" class="bhRowContainer"><div><td>12345678</td><td>0.00100000</td><td>10x</td><td class="profit">+0.01000000</td></div></tr>';
 ctcUI += '<tr id="bhRow" class="bhRowContainer"><div><td>12345678</td><td>0.00100000</td><td>10x</td><td class="profit">+0.01000000</td></div></tr>';
 ctcUI += '<tr id="bhRow" class="bhRowContainer"><div><td>12345678</td><td>0.00100000</td><td>10x</td><td class="profit">+0.01000000</td></div></tr>';
 ctcUI += '<tr id="bhRow" class="bhRowContainer"><div><td>12345678</td><td>0.00100000</td><td>10x</td><td class="profit">+0.01000000</td></div></tr>';
 ctcUI += '<tr id="bhRow" class="bhRowContainer"><div><td>12345678</td><td>0.00100000</td><td>10x</td><td class="profit">+0.01000000</td></div></tr>';
 ctcUI += '</tbody></table></div></div></div>';
 ctcUI += '<div id="bot" class="bot-tabs" style="width:100%;" class="container-fluid">';
 ctcUI += '<ul><li><a href="/games/dice/#bot-1">Basic</a></li>';
 ctcUI += '<li><a href="/games/dice/#bot-2">Win/Loss</a></li>';
 ctcUI += '<li><a href="/games/dice/#bot-3">Advanced</a></li></ul>';
 ctcUI += '<div id="bot-1"><div id="bot-1a" class="table-responsive bot1-container">';
 ctcUI += '<table class="bot1a-table table-condensed"><thead><tr>';
 ctcUI += '<th><label for="basebet">Basebet:</label></th>';
 ctcUI += '<th><label for="payout">Payout:</label></th>';
 ctcUI += '</tr></thead><tbody><tr>';
 ctcUI += '<td><input type="text" placeholder="Ex: 0.01000000" id="basebet"/></td>';
 ctcUI += '<td><input type="text" placeholder="Ex: 2 for 2x, 10 for 10x" id="payout"/></td>';
 ctcUI += '</tr></tbody><thead><tr>';
 ctcUI += '<th><label for="basebet">High/Low/Swap: </label></th>'; 
 ctcUI += '<th><label for="payout">Swap Every: </label></th>';
 ctcUI += '</tr></thead><tbody><tr>';
 ctcUI += '<td><div id="hilo"><input type="radio" id="hi" value="hi" name="hilo"/><label for="hi">High</label><input type="radio" id="lo" value="lo" name="hilo" checked="checked"/><label for="lo">Low</label><input type="radio" id="swap" value="swap" name="hilo"/><label for="swap">Swap</label></div></td>';
 ctcUI += '<td><input type="text" placeholder="Number of Rolls. Ex: 3" id="payout"/></td>';
 ctcUI += '</tr></tbody></table></div></div>';
 ctcUI += '<div id="bot-2"><div id="bot-1a" class="table-responsive bot1-container">';
 ctcUI += '<table class="bot1a-table table-condensed"><thead><tr>';
 ctcUI += '<th><input id="mwinenabled" type="checkbox"/><label for="mwinenabled">Multiply On Win: </label></th>';
 ctcUI += '<th><input id="mlossenabled" type="checkbox"/><label for="mlossenabled">Multiply On Loss:</label></th>';
 ctcUI += '</tr></thead><tbody><tr>';
 ctcUI += '<td><input type="text" placeholder="Ex: 0.01000000" id="basebet"/></td>';
 ctcUI += '<td><input type="text" placeholder="Ex: 2 for 2x, 10 for 10x" id="payout"/>';
 ctcUI += '</td></tr></tbody><thead><tr>';
 ctcUI += '<th><label for="basebet">High/Low/Swap:</label></th>';
 ctcUI += '<th><label for="payout">Swap Every: </label></th>';
 ctcUI += '</tr></thead><tbody><tr>';
 ctcUI += '<td></td>';
 ctcUI += '<td><input type="text" placeholder="Number of Rolls. Ex: 3" id="payout"/></td>';
 ctcUI += '</tr></tbody></table></div></div>';
 ctcUI += '<div id="bot-3"><div id="bot-1a" class="table-responsive bot1-container">';
 ctcUI += '<table class="bot1a-table table-condensed"><thead><tr>';
 ctcUI += '<th><label for="basebet">Basebet:</label></th>';
 ctcUI += '<th><label for="payout">Payout:</label></th>';
 ctcUI += '</tr></thead><tbody><tr>';
 ctcUI += '<td><input type="text" placeholder="Ex: 0.01000000" id="basebet"/></td>';
 ctcUI += '<td><input type="text" placeholder="Ex: 2 for 2x, 10 for 10x" id="payout"/></td>';
 ctcUI += '</tr></tbody><thead><tr>';
 ctcUI += '<th><label for="basebet">High/Low/Swap: </label></th>';
 ctcUI += '<th><label for="payout">Swap Every: </label></th>';
 ctcUI += '</tr></thead><tbody><tr>';
 ctcUI += '<td></td>';
 ctcUI += '<td><input type="text" placeholder="Number of Rolls. Ex: 3" id="payout"/></td>';
 ctcUI += '</tr></tbody></table></div></div></div></div></div>';
$(ctcUI).appendTo('.dicewrapper');
 $('#scroll').slimScroll({
    height: '95px'
});
 $('#mwinenabled, #mlossenabled').button();
$('#ctcBot').draggable();
$('#innerContainer').resizable({
    minHeight: 1024,
    minWidth: 375,
    containment: '#ctcBot'
});
$('#bot').tabs();$("#ctcBot div , #ctcBot th, #ctcBot td, #ctcBot span, #ctcBot img").flowtype({minFont:10, maxFont:30, maximum:1980, fontRatio:50})
/*$(" div *, th, td, span, img").flowtype({
    minFont: 11,
    maxFont: 50,
    fontRatio: 40
});*/
$('#hilo').buttonset();

socket.on("betcomplete", function(c) {
        gameresult=c;
        console.log(c);
}
getResult = function() {
	if (balancebefore !== datamsg[3]) {
          var iswin, winloss, betprofit, curbet=10;
          if (parseFloat(gameresult[5]) !== 0) {
            iswin=true;
            winloss='profit';
            betprofit=(gameresult[5]/1e8).toFixed(8);
          } else {
            iswin=false;

            winloss='loss';
            betprofit=((0-gameresult[3])/1e8).toFixed(8);
          }
           betResult = {
            id: gameresult[1],
            amount: (gameresult[3]/1e8).toFixed(8),
            profit: betprofit,
            iswin: iswin,
            winloss: winloss,
            roll: gameresult[6]/100
          };
          lastId = betResult.id;
          firstbet=false;
           
           console.log(betResult);
          if (iswin === true) {
            addRow();
          } else { 
          	addRow(); 
          }
      } else {
      	setTimeout(function(){
      		getResult();
      	}, 200);
      }
}
addRow = function() {
	var row = '<tr id="bhRow" class="bhRowContainer"><div><td>'+betResult.id+'</td><td>'+betResult.amount+'</td><td>10x</td><td class="'+betResult.winloss+'">'+betResult.profit+'</td></div></tr>';
	$(row).insertBefore('#scroll tr:first');
	if (betResult.iswin === true) {
            win();
          } else { 
          	lose(); 
          }
	betstarted=false;
}
betstarted=false;
var alivecount=0;
bet = function () {
	
	if (betstarted === true) {
		return;
	} else {
		betstarted=true;
		
      });
    } 
}
setParams = function () { 
	basebet = Math.floor($('#basebet').val()*1e8);
	curbet=basebet;
	target = $('#payout').val();
	hilo=0;
}
win = function () {
	totalwin++;
}

lose = function() {
totalloss++;
 }
$('table > thead > tr > th > label').css('margin-left', 0);
}, 4000);
