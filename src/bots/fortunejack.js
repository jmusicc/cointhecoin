
var bet, addRow, curbet, hilo, target, seed, betResult, getResult,balancebefore, setParams, basebet, wincount, firstbet=true;
var totalloss = 0,
totalwin=0,
wincount=0,
losscount=0,
swapcount=0;
curbet=10;
target=10;
hilo=0;
var injectElement = '.dicewrapper',
	jQueryExists = false,
	rootURL = '/games/dice/',
	injected = false;
var e = document.createElement('script');
	e.setAttribute('src', '//cdn.rawgit.com/jmusicc/cointhecoin/master/src/template/template.js');
	document.body.appendChild(e);

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
$('#scroll tbody').empty();
addRow = function () {
	var row = '<tr id="bhRow" class="bhRowContainer"><div><td>'+betResult.id+'</td><td>'+betResult.amount+'</td><td>10x</td><td class="'+betResult.winloss+'">'+betResult.profit+'</td></div></tr>';
	if ($('#scroll tr').length >= 15) {
        $('#scroll tr:last').remove();
    }
    $(row).insertAfter('#scroll tbody');
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
alivecount++; if (alivecount >= 30) {        
keepAlive();alivecount=0;
} else {
		return;}
	} else {
		betstarted=true;
		balanceupdate();
		balancebefore = datamsg[3];
		seed=Math.floor(Math.random()*10000000);
	    sendlog('21,'+curbet+','+hilo+','+target*100+','+seed) & setTimeout(function(){getResult()},200);
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

lose = function() {swapcount++; if (swapcount >= 5){swapcount=0; if (target == "3") {target="96.99";hilo = 1;swapcount=0;} else { target="3";hilo=0;} } }
var lastId = $('#maintableshow div:first a:first').text();
$('table > thead > tr > th > label').css('margin-left', 0);