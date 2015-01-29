var css='', lib='';
//lib += '<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>'; 
lib += '<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>';
lib += '<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.3/jquery.slimscroll.min.js"></script>';	
lib += '<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/Flowtype.js/1.1.0/flowtype.min.js"></script>';
css += '<link type="text/css" rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1/themes/vader/jquery-ui.css"/>';
css += '<link type="text/css" rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>';
css += '<link type="text/css" rel="stylesheet" href="//cdn.rawgit.com/jmusicc/cointhecoin/master/src/css/ctc.css"/>';
css = css += lib;
$(css).appendTo('head');
ctcUI='';
 ctcUI += '<div id="ctcBot" class="fullcontain container-fluid"><div id="innerContainer" class="bot-inner">';
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
 ctcUI += '<ul><li><a href="./#bot-1">Basic</a></li>';
 ctcUI += '<li><a href="./#bot-2">Win/Loss</a></li>';
 ctcUI += '<li><a href="./#bot-3">Advanced</a></li></ul>';
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
$(ctcUI).appendTo('.hero__main');
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
$('#bot').tabs();$(" div , th, td, span, img").flowtype({minFont:10, maxFont:30, maximum:1980, fontRatio:50})
/*$(" div *, th, td, span, img").flowtype({
    minFont: 11,
    maxFont: 50,
    fontRatio: 40
});*/
$('#hilo').buttonset();