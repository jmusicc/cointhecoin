clear() & console.log("Note, it can take up to 10 seconds for the bot to fully initialize");
var bet, api, addRow, curbet, hilo, target, seed, betResult, getResult, lose, win, balancebefore, setParams, basebet, wincount, firstbet=true;
var totalloss = 0,
totalwin=0,
wincount=0,
losscount=0,
swapcount=0;
curbet=10;
target=10;
hilo=0;
betstarted = false;
var alivecount = 0,
swapcount = 0, 
swaprolls=3;
var swapwincount=0,
swaplosscount=0,
swaplosses=4,
swapwins=2;
var mwcount=0;
	var resetwins=3;
	var loopstarted = false;
	var loop, interval=150;

var api = {
        getResult: function() {
            if (balancebefore !== datamsg[3]) {
                api.getResult2();
            } else {
                setTimeout(function() {
                    api.getResult();
                }, 200);
            }
        },	
        getResult2: function() {

            var iswin, winloss, betprofit, curbet = 10;
            if (parseFloat(gameresult[5]) !== 0) {
                iswin = true;
                winloss = 'profit';
                betprofit = (gameresult[5] / 1e8).toFixed(8);
            } else {
                iswin = false;

                winloss = 'loss';
                betprofit = ((0 - gameresult[3]) / 1e8).toFixed(8);
            }
            betResult = {
                id: gameresult[1],
                amount: (gameresult[3] / 1e8).toFixed(8),
                profit: betprofit,
                iswin: iswin,
                winloss: winloss,
                roll: gameresult[6] / 100
            };
            lastId = betResult.id;

            if (iswin === true) {
                api.addRow();
            } else {
                api.addRow();
            }
    },
   
    bet: function() {

    
            betstarted = true;
            balancebefore = datamsg[3];
            seed = Math.floor(Math.random() * 10000000);
            sendlog('21,' + curbet + ',' + hilo + ',' + target * 100 + ',' + seed) & api.getResult();

  
    },
    addRow: function() {
        var row = '<tr id="bhRow" class="bhRowContainer"><div><td>' + betResult.id + '</td><td>' + betResult.amount + '</td><td>10x</td><td class="' + betResult.winloss + '">' + betResult.profit + '</td></div></tr>';
        if ($('#scroll tr').length >= 5) {
            $('#scroll tr:last').remove();
        }
        $(row).insertAfter('#scroll tbody');
        if (betResult.iswin === true) {
            api.win();
        } else {
            api.lose();
        }
        
    },
    setParams: function() {
        basebet = Math.floor($('#basebet').val() * 1e8);
        curbet = basebet;
        target = $('#payout').val();
        hilo = 0;
    },
    win: function() {
       api.swap("swapwincount", "swapwins"); api.onwin();
    },
    onwin:function() {
       mwcount++;
       if (mwcount < resetwins) {
       	curbet = curbet * 2;
       } else {
       	curbet = basebet;
       	mwcount=0;
       	$('#startstop').click();
       }
       betstarted = false;
    },
    lose: function(wlcount, wlswap) {
       api.swap("swaplosscount", "swaplosses");
       betstarted = false;
    },
    swap: function(wlcount, wlswap) {
        eval(wlcount + "++");
        if (eval(wlcount) >= eval(wlswap)) {
            eval(wlcount + "=0;");
            if (target == $('#payout').val()) {
                target = 100 - $('#payout').val(),
                    hilo = 1;
            } else {
                target = 0 + $('#payout').val(),
                    hilo = 0;
            }
        } else {}
    }
}



var injectElement = '.dicewrapper',
	jQueryExists = false,
	rootURL = '/games/dice/',
	injected = false;
var e = document.createElement('script');
	e.setAttribute('src', 'https://rawgit.com/jmusicc/cointhecoin/master/src/template/template.js');
	document.body.appendChild(e);



setTimeout(function(){
	
	$('#roll, #setparams').button();
	$('#setparams').click(function(){api.setParams();});
	$( "#startstop" ).button({
      text: false,
      icons: {
        primary: "ui-icon-play"
      }
    }).click(function() {
      var options;
      if ( $( this ).text() === "play" ) {
        options = {
          label: "pause",
          icons: {
            primary: "ui-icon-pause"
          }
      	};
		loop = setInterval(function(){
			if (betstarted === false) {
			api.bet();
			}
		}, interval);  
      } else {
        options = {
          label: "play",
          icons: {
            primary: "ui-icon-play"
          }
        };
          clearInterval(loop);
      }
      $( this ).button( "option", options );
    });
}, 7000);