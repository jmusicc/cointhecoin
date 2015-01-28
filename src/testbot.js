setTimeout(function(){
var loop, currentloss, betspeed, dialog, swapwincount, incrementwincount, swaplosscount, curbet, basebet, seedcount, prebet, prerollsenabled, profit, prerollson, prerollcount, betval, currentwin, target2, condition2, wincount, xhr, tstatus, seedlength, counter, charset, everyxrolls, wins, losses, data1, data2, swapenabled, betstarted, wmultcount, lmultcount, storebet, manualenabled;
var balancebefore;var chart='';
betspeed=500;
seedcount = 0;
currentloss = 0;
lmultcount = 0;
wmultcount = 0;
prerollcount = 0;
wins = 0;
losses = 0;
profit = 0;
swaplosscount = 0;
swapwincount = 0;
incrementwincount = 0;
loopenabled = false;
manualenabled = false;
loopcount = 0;
seedlength = 5;
counter = 0;
charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123';
everyxrolls = 3;
var JSINJ = '';
JSINJ += '<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.js"></script>';
JSINJ += '<link rel="stylesheet" type="text/css" href="https://jquery-ui.googlecode.com/svn/tags/latest/themes/dot-luv/jquery-ui.css">';
JSINJ += '<script src="https://code.highcharts.com/highcharts.js"></script>';
JSINJ += '<script src="https://code.highcharts.com/modules/exporting.js"></script>';
$(JSINJ).appendTo('head');
 
 
function initializeUI() {
    // Begin UI
    $('.hero__main').empty();
    var UI = '';
    UI += '<div id="result">';
    UI += '<ul>';
    UI += '<li><a href="/play#result-1">Last Bets: </a></li>';
    UI += '<li><a href="/play#result-2">Bet History: </a></li>';
    UI += '<li><a href="/play#result-1" id="lagfix">Browser Lag?: Click Here </a></li>';
    UI += '</ul>';
    UI += '<div id="result-1">';
    UI += '<table id="lastbet">';
    UI += '<tr><th>Bet</th><th>Payout</th><th>Game</th><th>Roll</th><th>Profit</th></tr></table>';
    UI += '<table id="lastbet2">';
    UI += '</table>';
    UI += '<table id="lastbet">';
    UI += '<tr><th>Balance</th><th>Loss Streak</th><th>Total Wins</th><th>Total Losses</th><th>Total Profit</th></tr></table>';
    UI += '<table id="lastbet3">';
    UI += '</table>';
    UI += '</div>';
    UI += '<div  id="result-2">';
    UI += '<table id="lastbet">';
    UI += '<tr><th>Bet</th><th>Payout</th><th>Game</th><th>Roll</th><th>Profit</th></tr></table>';
    UI += '<div style="max-height:84px !important;overflow-y: scroll;overflow-x: hidden;"id="historycontainer">';
    UI += '<table id="lastbet2">';
    UI += '</table>';
    UI += '</div>';
    UI += '</div>';
    UI += '</div>';
    UI += '<div id="params">';
    UI += '<h3>Basic Settings</h3>';
    UI += '<div>';
    UI += '<table id="params1">';
    UI += '<tr><th>Basebet:</th><th>Multiplier:</th><th>Hi/Lo/Swap</th></tr>';
    UI += '<tr><td><input id="basebet" type="text" placeholder="Basebet"/><br><div id="basebetslider"></div></td><td><input id="payout" type="text" placeholder="ex. 10, 90"/><br><div id="payoutslider"></div></td>';
    UI += '<td><div id="hilo"><input type="radio" id="hi" value="hi" name="hilo"><label for="hi">Hi</label><input type="radio" id="lo" value="lo" name="hilo" checked="checked"><label for="lo">Lo</label><input type="radio" id="swap" value="swap" name="hilo"><label for="swap">Swap</label></div></td></tr>';
    UI += '<tr><th></th><th># of Prerolls</th><th>Preroll Bet</th></tr>';
    UI += '<tr><td> Prerolls: <input id="prerollsenabled" type="checkbox"/><label style="width: auto !important;" for="prerollsenabled">Off</label></td><td><input id="numprerolls" type="text" /></td><td><input type="text" id="prerollbet"/></td></tr>';
    UI += '<tr><th><label>Loss Preroll: <input id="lossprerollenabled" type="checkbox"><label style="width: auto !important;" for="lossprerollenabled">Off</label></label></th><th><label>After # Losses: <input style="width:85px;" id="prerollafterlosses" type="text" placeholder="After # of losses"/></th><th># of Prerolls After Loss: <input style="width:85px;" type="text" id="numlossprerolls" placeholder="# of prerolls"/></th></tr>';
    UI += '</table>';
    UI += '</div>';
    UI += '<h3>Win/Loss Settings</h3>';
    UI += '<div>';
    UI += '<table id="params1">';
    UI += '<tr><th>Multiply On Loss: <input id="lossmultenabled" type="checkbox"/><label style="width: auto !important;" for="lossmultenabled">Off</label></th><th>Multiply on Win: <input id="winmultenabled" type="checkbox"/><label style="width: auto !important;" for="winmultenabled">Off</label></th><th>Multiplier on W/L</th></tr>';
    UI += '<tr><td><label for="multloss">Mutiply After X Losses:</label><br><input id="multloss" placeholder="Multiply Every X Rolls"/></td><td><label for="multwin">Reset After X Wins:</label><br><input id="resetwin" placeholder="Reset After X Wins"/></td>';
    UI += '<td><input id="winlossmultiplier" placeholder="2 (2x), 1.5 (1.5x) etc"/></tr>';
    UI += '<tr><td><label>Increment Basebet by: <input id="incrementbaseenabled" style="padding: 2px !important;" type="checkbox"/><label style="width: auto !important;" for="incrementbaseenabled">Off</label></label></td><td><input placeholder="ex 0.00000100" id="incrementwin"> BTC </td><td><input placeholder="after #wins" id="incrementafterwins"></td></tr>';
    UI += '<tr><td>Reset base after base reaches: <input placeholder="ex 0.00000500"id="resetincrementbasebet"> </td><td> Reset to Base After Profit: <input type="checkbox" id="resetprofitenabled"><label style="width: auto !important;" for="resetprofitenabled">Off</label> </td><td><input placeholder="ex. reset after profit=0.00100000" id="resetprofit"></td></tr>';
    UI += '</table>';
    UI += '</div>';
    UI += '<h3>Advanced Settings</h3>';
    UI += '<div>';
    UI += '<table id="params1">';
    UI += '<tr><th><label>Stop After: <input id="stoplossenabled" type="checkbox"><label style="width: auto !important;" for="stoplossenabled">Off</label></label></th><th><label>Stop On Win: <input id="stopwinenabled" type="checkbox"><label style="width: auto !important;" for="stopwinenabled">Off</label></label></th><th>Swap After: <input id="swaprollsenabled" type="checkbox"><label style="width: auto !important;" for="swaprollsenabled">Off</label></th></tr>';
    UI += '<tr><td><input style="width:85px;" id="stoplosses" placeholder="# of losses"/></td><td></td>';
    UI += '<td><input id="swaprolls" type="text" placeholder="# of rolls"></tr>';
    UI += '<tr><th>Stop on Profit:<input id="stopprofitenabled" type="checkbox"><label style="width: auto !important;" for="stopprofitenabled">Off</label></th><th>Stop on Loss: <input id="stoploss2enabled" type="checkbox"><label style="width: auto !important;" for="stoploss2enabled">Off</label></th><th>Reset After: <input id="resetlossenabled" type="checkbox"><label style="width: auto !important;" for="resetlossenabled">Off</label></th></tr>';
    UI += '<tr><td><input id="stopprofitamount" type="text"/> </td><td>-<input id="stoplossamount" type="text"/></td><td><input id="resetlosses" placeholder="# Losses" type="text"/></td></tr>';
    UI += '<tr><th>Swap On Loss: <input id="swaponlossenabled" type="checkbox"><label style="width: auto !important;" for="swaponlossenabled">Off</label></th><th></th><th>Swap On Win:<input id="swaponwinenabled" type="checkbox"><label style="width: auto !important;"for="swaponwinenabled">Off</label></th></tr>';
    UI += '<tr><th><label for="swapafterlosses">Swap After X Losses</label></th><th></th><th><label for="swapafterwins">Swap After X Wins</label></th></tr>';
    UI += '<tr><td><input id="swapafterlosses"></td><td></td><td><input id="swapafterwins"></td></tr>';
    UI += '<tr><p>Note: Use Total Profit as your reference for stop loss/profit. Do NOT enter a balance.</p></tr>';
    UI += '</table>';
    UI += '</div>';
    UI += '<h3>Seed Settings</h3>';
    UI += '<div>';
    UI += '<table id="params1">';
    UI += '<tr><th>Current Seed:</th><th>Charset:</th><th>Change Every #: <input id="seedchangeon" type="checkbox"/><label style="width: auto !important;" for="seedchangeon">Off</label></th></tr>';
    UI += '<tr><td><input style="color:red;text-align:center;"id="currentseed"/></td><td><input id="charset" placeholder="Optional"/></td>';
    UI += '<td><input id="seedxrolls" placeholder="ex. 1, 10, 20"/></tr>';
    UI += '<tr><td>Change on Win: <input style="width: auto !important;" id="seedchangeonwin" type="checkbox"/><label style="width: auto !important;" for="seedchangeonloss">Off</label> </td><td>Change on Loss: <input id="seedchangeonloss" type="checkbox"/><label for="seedchangeonloss">Off</label></td></tr>';
    UI += '</table>';
    UI += '</div>';
    UI += '</div>';
    UI += '<div id="manual" style="display:none;">';
    UI += '<div style = "padding: 0 !important; z-index: 1000 !important;width:450px !important;height:350px !important;"id="dialog-form" title="Profit Over Time"><div  id="chartContainer"></div></div>';
    //Manual Mode HTML
    UI += '<table id="params1"><tr>';
    UI += '<th><label for="manualamount">Bet Amount: </label></th><th><label for="manualttarget">Multiplier: </label></th><th><label for="manualthilo">High/Low: </label></th></tr>';
    UI += '<tr><td><input id="manualamount"><td><input id="manualtarget"></td><td><div id="manualhilo"><input type="radio" id="manualhi" value="High" name="manualhilo"><label for="manualhi">Hi</label><input type="radio" id="manuallow"  name="manualhilo" checked="checked"><label for="manuallow">Low</label></td></tr></table></div>';
   
 
 
    UI += '</div><center><div id="toolbar" class="ui-widget-header ui-corner-all"><div id="buttonz"><span id="startstop"><button id="start">Start</button><button id="stop">Stop</button></span><span id="setsavereset"><button id="setparams">Set Params</button><button id="saveparams">Save Params</button><button id="resetstats">Reset Stats</button></span><span id="themeseed"><button id="seedchange">Change Seed</button><button id="darktheme">Theme - On/Off</button></span><button id="openChart">Show Chart</button><button style="padding:2px;font-size:10px;"id="manualmode">Manual Mode</button></div></div></center><br><center><button class="btn btn--primary btn--huge btn--limited btn--block text--center" id="spinner2">Roll</button></center>';
    //<label for="numrolls">Number of Rolls: <input id="numrollsenabled" type="checkbox"></label><input style="width:85px;" id="numrolls"/>
    $(UI).appendTo('.hero__main');
    $(function(){
        Highcharts.createElement('link',{href:'http://fonts.googleapis.com/css?family=Unica+One',rel:'stylesheet',type:'text/css'},null,document.getElementsByTagName('head')[0]);Highcharts.theme={colors:["#2b908f","#90ee7e","#f45b5b","#7798BF","#aaeeee","#ff0066","#eeaaee","#55BF3B","#DF5353","#7798BF","#aaeeee"],chart:{backgroundColor:{linearGradient:{x1:0,y1:0,x2:1,y2:1},stops:[[0,'#2a2a2b'],[1,'#3e3e40']]},style:{fontFamily:"'Unica One', sans-serif"},plotBorderColor:'#606063'},title:{style:{color:'#E0E0E3',textTransform:'uppercase',fontSize:'20px'}},subtitle:{style:{color:'#E0E0E3',textTransform:'uppercase'}},xAxis:{gridLineColor:'#707073',labels:{style:{color:'#E0E0E3'}},lineColor:'#707073',minorGridLineColor:'#505053',tickColor:'#707073',title:{style:{color:'#A0A0A3'}}},yAxis:{gridLineColor:'#707073',labels:{style:{color:'#E0E0E3'}},lineColor:'#707073',minorGridLineColor:'#505053',tickColor:'#707073',tickWidth:1,title:{style:{color:'#A0A0A3'}}},tooltip:{backgroundColor:'rgba(0, 0, 0, 0.85)',style:{color:'#F0F0F0'}},plotOptions:{series:{dataLabels:{color:'#B0B0B3'},marker:{lineColor:'#333'}},boxplot:{fillColor:'#505053'},candlestick:{lineColor:'white'},errorbar:{color:'white'}},legend:{itemStyle:{color:'#E0E0E3'},itemHoverStyle:{color:'#FFF'},itemHiddenStyle:{color:'#606063'}},credits:{style:{color:'#666'}},labels:{style:{color:'#707073'}},drilldown:{activeAxisLabelStyle:{color:'#F0F0F3'},activeDataLabelStyle:{color:'#F0F0F3'}},navigation:{buttonOptions:{symbolStroke:'#DDDDDD',theme:{fill:'#505053'}}},rangeSelector:{buttonTheme:{fill:'#505053',stroke:'#000000',style:{color:'#CCC'},states:{hover:{fill:'#707073',stroke:'#000000',style:{color:'white'}},select:{fill:'#000003',stroke:'#000000',style:{color:'white'}}}},inputBoxBorderColor:'#505053',inputStyle:{backgroundColor:'#333',color:'silver'},labelStyle:{color:'silver'}},navigator:{handles:{backgroundColor:'#666',borderColor:'#AAA'},outlineColor:'#CCC',maskFill:'rgba(255,255,255,0.1)',series:{color:'#7798BF',lineColor:'#A6C7ED'},xAxis:{gridLineColor:'#505053'}},scrollbar:{barBackgroundColor:'#808083',barBorderColor:'#808083',buttonArrowColor:'#CCC',buttonBackgroundColor:'#606063',buttonBorderColor:'#606063',rifleColor:'#FFF',trackBackgroundColor:'#404043',trackBorderColor:'#404043'},legendBackgroundColor:'rgba(0, 0, 0, 0.5)',background2:'#505053',dataLabelsColor:'#B0B0B3',textColor:'#C0C0C0',contrastTextColor:'#F0F0F3',maskColor:'rgba(255,255,255,0.3)'};Highcharts.setOptions(Highcharts.theme);
    });
    //jQ-UI Settings
    jQSettings = '';
    jQSettings += '<script>';
    // Settings Here
    jQSettings += '';
    jQSettings += '$(function(){';
    jQSettings += 'dialog = $( "#dialog-form" ).dialog({autoOpen: false,height: 350,width: 450,modal: true, buttons: {Close: function() {dialog.dialog( "close" )}}});';
    jQSettings += 'chart = $("#chartContainer").highcharts({chart: {height: 350, width: 450},credits: { enabled: false }, title:{text:"Total Profit vs. # of Bets",x:-20}, subtitle:{text: "Bet Profit vs. # Bets"},yAxis:{title:{text:"Profit/Total Profit"},data:[0]},xAxis:{title:{text:"# of Bets"},data:[0]},series:[{name:"Total Profit",data:[0]},{name: "Bet Profit",data: [0]}]});';
    jQSettings += '$("#basebetslider").slider({value:0.00000000,min: 0.00000000,max: 0.00020001,step: 0.0000000010, slide: function( event, ui ) {$( "#basebet" ).val( ui.value );}});';
    jQSettings += '$("#payoutslider").slider({value:5.0,min: 1,max: 100,step: 1, slide: function( event, ui ) {$( "#payout" ).val( ui.value );}});';
    jQSettings += '$("#buttonz button").button();$("input:checkbox").button();$("div#hilo").buttonset();';
    jQSettings += '$("#themeseed").buttonset();$("#setsavereset").buttonset();$("#startstop").buttonset();';
    jQSettings += '$("#result").tabs();$("#manualhilo").buttonset(); $( "#params" ).accordion({collapsible: true});});';
 
    jQSettings += '</script>';
    $(jQSettings).appendTo('head');
    var UICSS = '';
    UICSS += '<style>';
    UICSS += 'span.ui-slider-handle { width: 12px !important; }';
    UICSS += '#basebetslider , #basebet, #payoutslider, #payout { width: 100% !important; }';
    UICSS += '#params h3 { padding: 5px; }';
    UICSS += '#params label { width: auto !important; }';
    UICSS += 'span.ui-button-text { font-size: 9px; }';
    UICSS += '#params, #result { border-radius: 0px; width: auto !important; }';
    UICSS += '.hero__main { padding: 2px; margin: 5px; }';
    UICSS += '.hero__main {font-size: 10px !important;}';
    UICSS += '.ui-accordion-content { height: auto !important; padding: 5px !important;}';
    UICSS += '.ui-accordion .ui-accordion-content {margin-left: 3px !important; margin-right: 3px;margin-top: 0.5px;}';
    UICSS += 'table#params1 input:text { width: auto; height: auto; }';
    UICSS += 'table#params1 th, table#params1 td, table#params1 label { width: 33% !important; padding:5px !important; }';
    UICSS += '#buttonz { margin:2px; padding: 1px; text-align: center; font-size: 12px;}';
    UICSS += '#toolbar { width:100%;display: inline-block; padding: 0px; margin-top:3px; }';
    UICSS += '#params *, #result * { font-size: 10px;}';
    UICSS += '#toolbar button { margin: 1px; }';
    UICSS += 'label.ui-button span, label .ui-button { padding: 2px !important; }';
    UICSS += '#manual { margin: 10px 0px 10px 60px;}';
    UICSS += 'body > div.ui-widget-overlay.ui-front { display: none !important; }';
    UICSS += '.ui-button-icon-primary { top: 0 !important; left: 0 !important;}';
    UICSS += '</style>';
    setTimeout(function () {
        $(UICSS).appendTo('head');
    }, 3000);
}
setTimeout(function () {
    initializeUI();
}, 1000);
 
function darkTheme() {
    var css = '',
        backgroundurl = 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/01/HD-backgrounds-3.jpg';
    css += '<style id="paraDark">';
    css += 'header, .tabs, .slideout__content__inside, .chat__you *, .btn, .hero__main, .rollrow-dark, .rollbox--prominent, .chat__input-holder{background-color:#121212 !important;color:#ccc !important;}';
    css += 'time{color:#ccc !important;}';
    css += 'div.tabs > div > div.live-data-header > div{background-color:#111111;border-top:1px solid #777; border-bottom:1px solid #777;}';
    css += '.btn,.btn--secondary.btn--active,.btn--secondary.btn--selector, .btn--submit:last-child{border:1px solid #777 !important;background-color:#242130 !important;color:#ccc!important;}';
    css += '.btn:hover,.btn--secondary.btn--active:hover,.btn--secondary.btn--selector:hover{border:1px solid #777 !important;background-color:#322E47 !important;color:#ccc!important;}';
    css += '.hero{margin-bottom:0px;background:url("' + backgroundurl + '") no-repeat 50% 50%;}';
    css += '.slideout *{color:#ccc;}';
    css += '.tabs{padding-top:20px;border-top:1px solid #777 !important;}';
    css += 'header{border: 1px solid #777 !important;border-left:none !important;border-right:none !important;}';
    css += '.rollrow-thin, .rollrow-dark .chat__input-holder {background-color:#212121;}';
    css += '.input{background-color:#323232 !important;color:#ccc;}';
    css += '.action-open-slideout{background-color:#121212 !important;}';
    css += 'span.admin{color:red !important}';
 
    css += '</style>';
    $(css).appendTo('head');
}
darkTheme();
var mixcount = 0;
betstarted = false;
var swapswap = 2,
    swapcount = 0,
    lossprerollcount = 0,
    lossprerollson;
var curbalance = $('div.hero > div.hero__content > div > div.grid__item.S--one-whole.M--one-whole.custom--one-whole > aside > div.grid.grid--bottom.grid--reversed > div:nth-child(2) > span.btn.btn--tertiary.btn--large.btn--limited.btn--block > span.btn__text.select div').text() * 100000000;
 
function bet() {
    if (betstarted === true) {} else {
        betstarted = true;
        if (manualenabled === true) {
            manualamount = Math.floor($('#manualamount').val() * 100000000);
            if ($('#manualhi').is(':checked') === true) {
                manualcondition = '>';
                manualtarget = (99.99 - (99 / $('#manualtarget').val())).toFixed(2);
            } else if ($('#manuallow').is(':checked') === true) {
                manualcondition = '<';
                manualtarget = (99 / $('#manualtarget').val()).toFixed(2);
            }
            var betData = {
                    amount: manualamount,
                    condition: manualcondition,
                    target: manualtarget,
                },
                url = 'https://api.primedice.com/api/bet?access_token=' + localStorage.token;
        } else {
                if ($('#resetprofitenabled').is(':checked') === true) {
                if (parseFloat(profit) >= $('#resetprofit').val()) {
                        betval = basebet;
                        curbet = betval;
                        profit = 0;
                       
                        wmultcount = 0;
                        /*betval = basebet;
                        wmultcount = 0;
                        profit = 0;
                        if ($('#payout').val() == '5') {
                            $('#payout').val(10);
                        } else {
                            $('#payout').val(5);
                        }
                        if (condition2 == '>') {
                           
                            target2 = (99.99 - (99 / $('#payout').val())).toFixed(2);
                        } else if (condition2 == '<') {
                           
                        target2 = (99 / $('#payout').val()).toFixed(2);
                        }*/
                    }
                }
            if ($('#stopprofitenabled').is(':checked') === true) {
                if (profit >= $('#stopprofitamount').val()) {
                    clearInterval(loop);
                    loopenabled = false;
                    loopcount = 0;
                }
            }
           
           
            if ($('#resetlossenabled').is(':checked') === true && prerollsenabled === false) {
                if ($('#resetlosses').val() <= currentloss) {
                   
                    betval = basebet;
                    lmultcount = 0;
                    wmultcount = 0;
                    currentloss = 0;
 
                }
            }
            if ($('#stoploss2enabled').is(':checked') === true) {
                if (profit <= (-1 * $('#stoplossamount').val())) {
                    clearInterval(loop);
                    loopenabled = false;
                    loopcount = 0;
                }
            }
            if (prerollsenabled === true) {
                prebet = Math.floor($('#prerollbet').val() * 100000000);
                curbet = prebet;
            } else {
                curbet = betval;
            }
            if ($('#lossprerollenabled').is(':checked') === true) {
                if (lossprerollson === true) {
 
                    curbet = prebet;
                } else {
                    curbet = betval;
                }
            }
 
            var betData = {
                    amount: curbet,
                    condition: condition2,
                    target: target2,
                },
                url = 'https://api.primedice.com/api/bet?access_token=' + localStorage.token;
        }
        if (curbet > curbalance) {
            clearInterval(loop);
            loopenabled = false;
            loopcount = 0;
        }
 
        $.ajax({
            url: url,
            type: 'POST',
            data: betData,
            datatype: 'json',
            async: true,
            success: function (data, textStatus, jqXHR) {
               
                if ($('#seedchangeon').is(':checked') === true) {
                    if ($('#charset').val() !== '') {
                        charset = $('#charset').val();
                    }
                    if ($('#seedxrolls').val() === '') {} else {
                        seedcount++;
                        if (seedcount >= $('#seedxrolls').val()) {
                            seedchange();
                            seedcount = 0;
                        }
                    }
                }
                data1 = data;
                profit = profit = (parseFloat(profit) + parseFloat((data1.bet.profit / 100000000))).toFixed(8);
                curbalance = data1.user.balance;
                addRow();
 
                if (loopenabled === true) {
                    loopcount++;
                }
                if ($('input:radio[name=hilo]:checked').val() == 'swap') {
                    if ($('#swaprollsenabled').is(':checked') === true) {
                        swapswap = $('#swaprolls').val();
                        swapcount++;
                        if (swapcount >= swapswap) {
                            swap();
                            swapcount = 0;
                        }
                    } else {
                        swap();
                    }
                }
                $('.btn__text.select div').text((data1.user.balance / 100000000).toFixed(8));
                if (data.bet.win === true) {
                    win();
 
                    if (prerollson === true) {
                        if (prerollsenabled === false) {
                            prerollsenabled = true;
                            prerollcount = 0;
                        }
                    }
                    $('.btn__text.select div').attr('style', 'color:green;');
 
                } else {
                    lose();
                    $('.btn__text.select div').attr('style', 'color:red;');
                }
 
 
                if (data.bet.win === true) {
                    $('#result-1 #proff:nth(0), #result-2 #proff:nth(0)').attr('style', 'text-align: center; width: 20%; padding: 5px;color:green;');
                } else {
                    $('#result-1 #proff:nth(0), #result-2 #proff:nth(0)').attr('style', 'text-align: center; width: 20%; padding: 5px;color:red;');
                }
                betstarted = false;
 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                betstarted = false;
 
            }
 
        });
    }
}
 
function seedchange() {
    function seedgen() {
        var seed = '';
 
        for (var i = 0; i <= seedlength; i++)
 
            seed += charset.charAt(Math.floor(Math.random() * charset.length));
 
        return seed;
    }
    var s = seedgen(),
        url = 'https://api.primedice.com/api/seed?access_token=' + localStorage.token,
        sData = {
            seed: s
        };
 
    $.ajax({
        url: url,
        type: 'POST',
        data: sData,
        datatype: 'json',
        success: function (data, textStatus, jqXHR) {
            data2 = data;
            $('#currentseed').val(data2.seeds.client);
 
 
        },
        error: function (jqXHR, textStatus, errorThrown) {
            return false;
        }
    });
}
 
function addRow() {
        // Update Chart
        chart.addPoint([parseFloat(wins+losses), parseFloat(profit)]);
        chart2.addPoint([parseFloat(wins+losses), parseFloat((data1.bet.profit/100000000).toFixed(8))]);
    $('#lastID').text('Last Bet ID: ' + data1.bet.id);
    var bettable = '',
        bettab = '#result-1 #lastbet2';
    var bettab2 = '#result-2 #lastbet2';
    bettable += '<tr><td>' + (data1.bet.amount / 100000000).toFixed(8) + '</td>';
    bettable += '<td>' + data1.bet.multiplier + 'x' + '</td>'; /* return bet payout */
    bettable += '<td>' + (data1.bet.target).toFixed(2) + '</td>'; /* return target*/
    bettable += '<td>' + data1.bet.roll + '</td>'; /* return roll */
    bettable += '<td id="proff">' + (data1.bet.profit / 100000000).toFixed(8) + '</td></tr>';
 
    var stattable = '',
        stattab = '#lastbet3';
    stattable += '<tr><td style="color:green;">' + (data1.user.balance / 100000000).toFixed(8) + '</td><td style="color:red;">' + currentloss + '</td><td style="color:green;">' + wins + '</td><td style="color:red;">' + losses + '</td><td id="profit">' + profit + '</td></tr>';
    $(stattab).empty();
    $(stattab).prepend(stattable);
    stattable = '';
    $(bettab2).prepend(bettable);
    if ($(bettab + ' tbody tr').length >= 3) {
        $(bettab + ' tr').last().remove();
        $(bettab).prepend(bettable);
        bettable = '';
    } else if ($(bettab).length < 3) {
        $(bettab).prepend(bettable);
        bettable = '';
    }
 
    $('#lastbet2 *, #lastbet3 *, #lastbet *, #proff').css('text-align', 'center');
    $('#lastbet2 *, #lastbet3 *, #lastbet *').css('width', '20%');
    $('#lastbet *').css('padding', '5px');
    $('#lastbet *').css('border-bottom', '1px solid #ccc');
    $('#result-1').css('padding', '5px');
    $('#lastbet2 *, #lastbet3 *, #proff').css('padding', '5px');
    $('#lastbet > tbody > tr > th:nth-child(2)').css('border-top', '1px solid #ddd');
    if (profit >= 0) {
        $('#profit').css('color', 'green');
    } else {
        $('#profit').css('color', 'red');
    }
}
 
function win() {
    if ($('#incrementbaseenabled').is(':checked') === true) {
        incrementwincount++;
        if (incrementwincount >= $('#incrementafterwins').val()) {
            incrementwincount = 0;
            basebet = Math.floor(basebet + ($('#incrementwin').val() * 100000000));
            if (basebet >= Math.floor($('#resetincrementbasebet').val() * 100000000)) {
                basebet = Math.floor($('#basebet').val() * 100000000)
            }
        }
    }
    if ($('#swaponlossenabled').is(':checked') === true) {
        swaplosscount = 0;
    }
    if ($('#swaponwinenabled').is(':checked') === true) {
        swapwincount++;
        if (swapwincount >= $('#swapafterwins').val()) {
            swapwincount = 0;
            swap();
 
        }
    }
    if ($('#stopwinenabled').is(':checked') === true && prerollsenabled === false) {
        clearInterval(loop);
        currentloss = 0;
        loopcount = 0;
        loopenabled = false;
    }
    if (prerollson === true) {
        if (prerollsenabled === true) {
            prerollcount = 0;
        }
    }
    if ($('#seedchangeonwin').is(':checked') === true) {
        seedchange();
    }
    wins++;
    currentloss = 0;
 
    if ($('#winmultenabled').is(':checked') === true) {
        if (prerollsenabled === true) {} else {
 
            if (prerollson === true && prerollsenabled === false) {
                prerollsenabled = true;
                prerollcount = 0;
            }
           if (lossprerollson === true) {} else {
                wmultcount++;
                if (wmultcount < $('#resetwin').val()) {
                   
                        betval = betval * $('#winlossmultiplier').val();
                 
                } else if (wmultcount >= $('#resetwin').val()) {
                    betval = basebet;
                    wmultcount = 0;
 
 
 
                }
            }
 
        }
        if ($('#lossprerollenabled').is(':checked') === true) {
            if (lossprerollson === true) {
                lossprerollcount = $('#prerollafterlosses').val();
                lossprerollson = true;
 
            } else {
                lossprerollcount = 0;
                lossprerollson = false;
            }
        }
    }
    if ($('#lossmultenabled').is(':checked') === true) {
        if (prerollsenabled === true) {
            prerollcount = 0;
        } else {
            if (prerollson === true && prerollsenabled === false) {
                prerollsenabled = true;
                prerollcount = 0;
            }
            if (lossprerollson === true) {
                lmultcount = 0;
                lossprerollcount = $('#prerollafterlosses').val();
            } else {
                betval = basebet;
                lmultcount = 0;
                lossprerollcount = 0;
            }
        }
    }
 
}
 
function lose() {
    if ($('#swaponlossenabled').is(':checked') === true) {
        swaplosscount++;
        if (swaplosscount >= $('#swapafterlosses').val()) {
            swap();
            swaplosscount = 0;
        }
    }
    if ($('#lossprerollenabled').is(':checked') === true) {
        lossprerollcount++;
        if (lossprerollcount == $('#prerollafterlosses').val()) {
            lossprerollson = true;
        }
        if (lossprerollcount >= (parseFloat($('#numlossprerolls').val()) + parseFloat($('#prerollafterlosses').val()))) {
            curbet = betval;
            lossprerollson = false;
            lossprerollcount = 0;
        }
    }
 
    if ($('#seedchangeonloss').is(':checked') === true) {
        seedcount = 0;
        seedchange();
    }
 
    currentloss++;
 
    if ($('#stoplossenabled').is(':checked') === true) {
        if ($('#stoplosses').val() <= currentloss) {
           
            clearInterval(loop);
            currentloss = 0;
            loopcount = 0;
            loopenabled = false;
       
        }
    }
 
    if (prerollson === true) {
        if (prerollsenabled === true) {
            prerollcount++;
            if (prerollcount >= $('#numprerolls').val()) {
                prerollsenabled = false;
            }
        }
 
    }
    losses++;
 
    if ($('#lossmultenabled').is(':checked') === true) {
        if (prerollsenabled === true) {} else {
            if (lossprerollson === true) {} else {
                lmultcount++;
                if (lmultcount >= $('#multloss').val()) {
                    betval = betval * $('#winlossmultiplier').val();
                    lmultcount = 0;
                }
            }
        }
    }
}
 
function swap() {
    if (condition2 == '<') {
        condition2 = '>';
        target2 = (99.99 - (99 / $('#payout').val())).toFixed(2);
    } else if (condition2 == '>') {
        condition2 = '<';
        target2 = (99 / $('#payout').val()).toFixed(2);
    }
}
var themeoff = false;
// Click Funcs
function init2() {
    $('#darktheme').click(function () {
        if (themeoff === true) {
            darkTheme();
            $('#smoothness').remove();
            var jqCSS = document.createElement('link');
                jqCSS.href = 'https://jquery-ui.googlecode.com/svn/tags/latest/themes/dot-luv/jquery-ui.css';
                jqCSS.type = 'text/css';
                jqCSS.rel = 'stylesheet';
                jqCSS.id = 'dark';
document.getElementsByTagName('head')[0].appendChild(jqCSS);
            themeoff = false;
        } else if (themeoff === false) {
            removeTheme();
            $('#dark').remove();
            var jqCSS = document.createElement('link');
            jqCSS.href = 'https://jquery-ui.googlecode.com/svn/tags/latest/themes/smoothness/jquery-ui.css';
            jqCSS.type = 'text/css';
            jqCSS.rel = 'stylesheet';
            jqCSS.id = 'smoothness';
            document.getElementsByTagName('head')[0].appendChild(jqCSS);
            themeoff = true;
        }
    });
    $('#spinner2').click(function () {
        bet();
    });
    if ($('#params label.ui-button').prev().is(':checked') === false && $('#params label.ui-button').prev().attr('type') != 'radio') {
        $('#params label.ui-button').text('On');
    } else {
        if ($('#params label.ui-button').prev().attr('type') != 'radio') {
            $('#params label.ui-button').text('Off');
        }
    }
    $('#params label.ui-button').click(function () {
        if ($(this).prev().is(':checked') === false && $(this).prev().attr('type') != 'radio') {
            $(this).text('On');
        } else {
            if ($(this).prev().attr('type') != 'radio') {
                $(this).text('Off');
            }
        }
    })
    $('#seedchange').click(function () {
        seedchange();
    });
    $('#detach').click(function () {
        $('#result').draggable();
    });
    $('#manualmode').click(function () {
        if ($(this).text() == 'Manual Mode') {
            manualenabled = true;
            $('#params').hide();
            $('#manual').show();
            $(this).text('Auto Mode');
            return;
        } else if ($(this).text() == 'Auto Mode') {
            manualenabled = false;
            $('#params').show();
            $('#manual').hide();
            $(this).text('Manual Mode');
            return;
        }
    })
    $('#setparams').click(function () {
        if ($('#lossprerollenabled').is(':checked') === false) {
            lossprerollson = false;
        }
        lmultcount = 0;
        currentloss = 0;
        wmultcount = 0;
        loopcount = 0;
        if ($('#prerollbet').val() !== "") {
            prebet = $('#prerollbet').val();
        } else {
            prebet = 0;
        }
        if ($('#prerollsenabled').is(':checked') === true) {
 
            prerollson = true;
            prerollcount = 0;
            prerollsenabled = true;
            prebet = Math.floor($('#prerollbet').val() * 100000000);
            basebet = Math.floor($('#basebet').val() * 100000000);
            betval = basebet;
 
        } else if ($('#prerollsenabled').is(':checked') === false) {
            prerollson = false;
            prerollsenabled = false;
            basebet = Math.floor($('#basebet').val() * 100000000);
            betval = basebet;
        }
 
        if ($('input:radio[name=hilo]:checked').val() == 'hi') {
            condition2 = '>';
            target2 = (99.99 - (99 / $('#payout').val())).toFixed(2);
        } else if ($('input:radio[name=hilo]:checked').val() == 'lo') {
            condition2 = '<';
            target2 = (99 / $('#payout').val()).toFixed(2);
        } else if ($('input:radio[name=hilo]:checked').val() == 'swap') {
            condition2 = '<';
            target2 = 0 + (99 / $('#payout').val()).toFixed(2);
            swapenabled = true;
        }
    });
    $('#lagfix').click(function () {
        $('#result-2 table:nth(1)').empty();
        chart.setData([]);chart2.setData([]);
    });
    $('#saveparams').click(function () {
        localStorage.setItem('params-stored', true);
        localStorage.setItem('basebet', $('#basebet').val());
        localStorage.setItem('payout', $('#payout').val());
        localStorage.setItem('prerollbet', $('#prerollbet').val());
        localStorage.setItem('prerollenabled', $('#prerollsenabled').is(':checked'));
        localStorage.setItem('numprerolls', $('#numprerolls').val());
        localStorage.setItem('lossenabled', $('#lossmultenabled').is(':checked'));
        localStorage.setItem('winenabled', $('#winmultenabled').is(':checked'));
        localStorage.setItem('resetwin', $('#resetwin').val());
        localStorage.setItem('xlosses', $('#multloss').val());
        localStorage.setItem('wlmult', $('#winlossmultiplier').val());
        localStorage.setItem('seedchangeon', $('#seedchangeon').is(':checked'));
        localStorage.setItem('seedxrolls', $('#seedxrolls').val());
        localStorage.setItem('swapxrolls', $('#swaprolls').val());
        localStorage.setItem('swapenabled', $('#swaprollsenabled').is(':checked'));
 
    });
$('#openChart').click(function(){
    $('#dialog-form').dialog("open");
})
    if (localStorage.getItem('params-stored') === 'true') {
        $('#basebet').val(localStorage.getItem('basebet'));
        $('#payout').val(localStorage.getItem('payout'));
        $('#prerollbet').val(localStorage.getItem('prerollbet'));
        if (localStorage.getItem('prerollenabled') === 'true') {
            $('#prerollsenabled').click();
        } else {
            $('#prerollsenabled').prop('checked', false);
        }
        $('#numprerolls').val(localStorage.getItem('numprerolls'));
        if (localStorage.getItem('lossenabled') === 'true') {
            $('#lossmultenabled').click();
            $('#lossmultenabled').prop('checked', false);
        }
        if (localStorage.getItem('winenabled') === 'true') {
            $('#winmultenabled').click();
        } else {
            $('#winmultenabled').prop('checked', false);
        }
        $('#resetwin').val(localStorage.getItem('resetwin'));
        $('#multloss').val(localStorage.getItem('xlosses'));
        $('#winlossmultiplier').val(localStorage.getItem('wlmult'));
        if (localStorage.getItem('seedchangeon') === 'true') {
            $('#seedchangeon').click();
        } else {
            $('#seedchangeon').prop('checked', false);
        }
        $('#seedxrolls').val(localStorage.getItem('seedxrolls'));
        if (localStorage.getItem('swapenabled') === 'true') {
            $('#swaprollsenabled').click();
        } else {
            $('#swaprollsenabled').prop('checked', false);
        }
        $('#swaprolls').val(localStorage.getItem('swapxrolls'));
 
    }
    chart = Highcharts.charts[0].series[0];
    chart2 = Highcharts.charts[0].series[1];
    loopenabled = false;
    loopcount = 0;
    $('#start').click(function () {
 
        if ($('#numrollsenabled').is(':checked') === true) {
            looptimes = $('#numrolls').val();
        } else {
 
            looptimes = 999999999;
        }
 
        if (loopenabled === false) {
            loopenabled = true;
 
            loop = setInterval(function () {
 
                if (loopcount >= looptimes) {
                    clearInterval(loop);
                    loopcount = 0;
                    loopenabled = false;
                } else {
                    if (betstarted === true) {} else {
                        bet();
                    }
                }
            }, betspeed);
 
        }
 
    });
 
    function removeTheme() {
        $('#paraDark').remove();
    }
 
    $('#stop').click(function () {
        clearInterval(loop);
        loopenabled = false;
        loopcount = 0;
    });
    $('#resetstats').click(function () {
        wins = 0;
        chart.setData([]);
         chart2.setData([]);
        losses = 0;
        profit = 0;
        currentloss = 0;
        addRow();
        wmultcount = 0;
        lmultcount = 0;
    });
}
setTimeout(function () {
    init2();
}, 2000);
}, 2000);