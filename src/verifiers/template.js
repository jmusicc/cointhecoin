var e = document.createElement('script');
    e.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
    document.body.appendChild(e);
setTimeout(function(){
var lib = '<link href="//code.jquery.com/ui/1.9.2/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css"/><script src="//cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.3/jquery.slimscroll.min.js"></script><script src="//cdnjs.cloudflare.com/ajax/libs/jsSHA/1.5.0/sha.js"></script><script src="//code.jquery.com/ui/1.9.2/jquery-ui.js"></script>';
$(lib).appendTo('head');
},1000);
setTimeout(function(){
var html = '<div id="verifyContainer"><div style="position:absolute;color:#ccc !important;z-index:1000;"id="vContainer"> <div id="title"><a href="http://www.cointhecoin.com/"><img style=";float:right;margin:8px;" src="http://i.imgur.com/OIoQpq6.png"/></a> </div><div id="calcForm"> <table> <thead> <th>Server Seed:</th> </thead> <tbody> <td> <input id="serverseed" placeholder=""/> </td></tbody> <thead> <th>Server Seed Hash:</th> </thead> <tbody> <td> <input id="serverseedhash" placeholder=""/> </td></tbody> <thead> <th>Client Seed:</th> </thead> <tbody> <td> <input id="clientseed" placeholder=""/> </td></tbody> </table> <table style="width:100%"> <thead> <th style="padding:5px;width:50%;">Start Nonce:</th> <th style="style=" text-align:center;width:50%; "width:50%;">End Nonce:</th> </thead> <tbody> <td style="padding:5px;width:50%;"> <input id="startnonce" style="width:100%;"/> </td><td style="padding:5px;width:50%;"> <input id="endnonce"/> </td></tbody> </table> <span id="calcC"> <button id="calc">Calculate</button> </span> </div></div><div id="outputcontainer"><table id="outputhead"> <thead> <tr> <th>Seed:</th> <th>Nonce:</th> <th>Roll:</th> </tr></thead> </table> <div id="output"> <table> <tbody> <tr> <td>abcdefg</td><td>12345</td><td>97.6</td></tr><tr> <td>abcdefg</td><td>12346</td><td>23.05</td></tr><tr> <td>abcdefg</td><td>12347</td><td>66.55</td></tr><tr> <td>abcdefg</td><td>12347</td><td>66.55</td></tr><tr> <td>abcdefg</td><td>12347</td><td>66.55</td></tr><tr> <td>abcdefg</td><td>12347</td><td>66.55</td></tr><tr> <td>abcdefg</td><td>12347</td><td>66.55</td></tr><tr> <td>abcdefg</td><td>12347</td><td>66.55</td></tr></tbody> </table> </div></div></div>';
$(html).appendTo('.dicewrapper');
var css = '<style>#verifyContainer{max-width:680px;}#vContainer{width:50% !important} #outputcontainer {width:50% !important;float:right;}body{background:#232323;}#calcForm th{text-align:left; padding:5px;}#vContainer{border: 1px solid #777; color:#ccc !important;padding-bottom:10px !important; max-width: 480px !important; width:auto !important; background: #121212; color:#fff; font-size:12px; padding:0px; font-family:verdana; border-radius:5px;}div#title{width: 99.5%; height:35px; margin:0px; padding:0; border-top-left-radius:5px; border-top-right-radius:5px; border-bottom: 1px solid #666 !important;}#output tr{}#outputhead th, #output td{width:33%;}#outputhead{background:#232323; border-top:1px solid #ccc; border-bottom:1px solid #ccc;}tbody, table, thead{width: 100%; text-align:center; padding-left:0;}#calcForm th, #calcForm td{width:100%;}input{padding:5px; padding-right:0; margin-right:0; width:100%;}#calc{width:100%; border-radius:1px;}#calcForm{padding:5px;}#calcC{height:auto;}#nonce td, #nonce th, #nonce input{width:50% !important; text-align:center;}</style>';
$(css).appendTo('head');
},2500);

var hmac, roll, calculated_roll;
setTimeout(function(){$(function(){
$('#calc').button();
$('#verifyContainer').draggable();
$(function () {
    $("#output").slimScroll({
        color: '#aaa',
        height: "100%",
        railVisible: true,
        alwaysVisible: true
    });
});
});}, 3000);

function calcRow() {
    var row = "<tr><td>abcdefghij</td><td>12345</td><td>97.6</td></tr>";
    $('#output table tbody').prepend(row);
}
calcRow();

function calcHash(server, client, nonce) {
    // Set Seed Format
    var message = nonce + ":" + client + ":" + nonce;
    var key = nonce + ":" + server + ":" + nonce;
    // HMAC The Message & Key
    var shaObj = new jsSHA(message, "TEXT");
    var hash = shaObj.getHash("SHA-512", "HEX");
    hmac = shaObj.getHMAC(key, "TEXT", "SHA-512", "HEX");
    for (i = 0; i < 25; i++) {
        calculated_roll = parseInt(hmac.substring(5 * i, 5 + 5 * i), 16);
        if (calculated_roll < 1000000) {
            roll = (calculated_roll / 10000);
            break;
        }
    }
    if (roll == -1) {
        roll = parseInt(roll_hash.substring(125, 128), 16) / 10000;
    }
    $('#serverseed').val(roll);
}
var serverhash = '7E53EF00E15AC75D1B45113CA8685E1691883353D8D9194E7CC4FEE41DA993B2205A0C61CD92A6AA855A3AFA8BB57F1BBFAB04176FAC74E5E39F7844C0395D98';
var serverseed = 'Wg/VFcQQWN/UDOfc2RN7HoaWR1d+jeBD3kLYjR/MoYTGdnVSIZQnmkopbYFFFyARwhUg9wgUKPpUfkrvUvRWETs=';
var clientseed = '0';
nonce = 2;

function fairCheck(serverseed) {
    var shaObj = new jsSHA(serverseed, "TEXT");
    var hash = shaObj.getHash("SHA-512", "HEX");
    $('#serverseed').val(hash.toString().toUpperCase());
}
fairCheck(serverseed);
//calcHash(serverseed, clientseed, nonce);
