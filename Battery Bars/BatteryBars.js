/*
 * Graphics enabled version of Battery.
 * Supports main screen view, and widget view.
 * (c) Roman Gritsulyak, 2010
 */

var homeMode=false;
var BAT_thr1=30; // %
var BAT_thr2=70; // %
var HOME_TIME=1000; //
var sysinfo;
var isSettings=false;
	
function q(){
	try {
		wir();
		i();
	} catch(e){
		alert (e);
		};
	
	if (homeMode) {
		setTimeout("q()", HOME_TIME);
	} else
	{
		setTimeout("q()", 3000);
	}
};

function wir() {
    //  1) detect screen size 
	try {
		if (window.innerHeight < 150) {
			homeMode = true;
			document.getElementById("hs").className = "clsHome";
			document.getElementById("mv").className = "invis";
			document.getElementById("btn_pan").className = "invis";
		}
		else {
			homeMode = false;
			if (isSettings) {
				document.getElementById("hs").className = "invis";
				document.getElementById("mv").className = "clsMain";
			}
			else {
				document.getElementById("hs").className = "clsMain";
				document.getElementById("mv").className = "invis";
			}
			document.getElementById("btn_pan").className = "vis";
		}
	}catch(e){alert(1);}
}

// entrance point
function q_()
{
	if (window.widget) {
        widget.setNavigationEnabled(false);
        menu.hideSoftkeys();
    }
	
	if(widget.preferenceForKey("initialized")==undefined)
	{save_initialThres();}
	
	load_thresholds();
	window.onresize = wir;
	q();
}

// Logic
function i(){
    try {
		var ahtml="";
        var a = "";
		sysinfo = document.embeds[0];
        var aba= sysinfo.chargelevel+0;
		if (aba < 0 || aba > 100) {
			document.getElementById("hs").innerHTML ="waiting for battery data";
			return;
		}
		HOME_TIME=20000;
        ahtml +="<div style='float:left;font: normal 39px Arial, sans-serif;'>" + bat_colors(aba,BAT_thr1,BAT_thr2); 
		var str = "<b>" + aba + "</b>" + "% ";
        str = wrap_color(str, aba, BAT_thr1, BAT_thr2);
		ahtml += str;
		str = color_bars(aba / 100, BAT_thr1, BAT_thr2);
		ahtml += str +"</div><br><br><br>";
		
		ahtml += "<hr>Legend: Each bar=10% of battery charge. Red and yellow ";
		ahtml += "limits are in settings.<font color='blue'>";
		ahtml += "Blue</font> bars for empty battery slots.";
		ahtml += "<font color='lightgreen'>Green</font> when battery over threshold limit.";
		ahtml += "<font color='yellow'>Yellow</font> when battery below yellow limit";
		ahtml += ", and not under red limit.";
		ahtml += "<font color='red'>Red</font> when battery less than red limit.";
    } 
    catch (e) {
        alert(e);
    }
	
    document.getElementById("hs").innerHTML = ahtml;
}

// load value
function load_thresholds()
{
	try {
		var rBAT_val = widget.preferenceForKey("rBAT");
		document.getElementById("BAT_red").value = rBAT_val + " %";
		BAT_thr1 = rBAT_val;
		
		var yBAT_val = widget.preferenceForKey("yBAT");
		document.getElementById("BAT_yellow").value = yBAT_val + " %";
		BAT_thr2 = yBAT_val;
	}
	catch(e)
	{alert(e);}
}

function save_initialThres()
{
	try {
	widget.setPreferenceForKey(1,"initialized");
	widget.setPreferenceForKey(BAT_thr1,"rBAT");
	widget.setPreferenceForKey(BAT_thr2,"yBAT");
} catch (e) {alert(e);}
	
}

function change_thresholds()
{	
try {
		var rBAT_val = document.getElementById("BAT_red").value.split(" ")[0];
	BAT_thr1 = rBAT_val;
	widget.setPreferenceForKey(rBAT_val,"rBAT");
	
	var yBAT_val = document.getElementById("BAT_yellow").value.split(" ")[0];
	BAT_thr2 = yBAT_val;
	widget.setPreferenceForKey(yBAT_val,"yBAT");
	
} catch (e) {alert(e);}
}

function color_bars(ratio, a1, a2)
{
	var c_bars=Math.floor(ratio*10);	
	var blue_bars=10-c_bars;
	var ret="";
	
	if(ratio < a1/100)
	   ret+="<b><font color=red>";
	else if(ratio < a2/100) 
	   ret+="<font color=yellow>";
	 else 
	   ret+="<font color=lightgreen>";
	
	for(var i=0;i<c_bars;i++)
		ret+="|";
	
	ret+="</font>";
	
	ret+="<font color='blue'>";
	
	for(var i=0;i<blue_bars;i++)
		ret+="|";
		
	ret+="</font></b>";
	
	
	return ret;
}

function bat_colors(b, a1, a2)
{
    var ret;
    if (b < a1) {
        ret = "<img src='Bat_red.png'>";
    }
    else 
        if (b < a2) {
        ret = "<img src='Bat_yel.png'>";
        }
        else {
        ret = "<img src='bat_green.png'>";
        }
    return ret;
}

function wrap_color(strng,b,a1,a2)
{	
	if(b < a1)
	{
	   strng="<font color=red>"+ strng + "</font>";
	} else if(b < a2) 
	{
	   strng="<font color=yellow>" + strng + "</font>"; 
	} else 
	{
	   strng="<font color=lightgreen>" + strng + "</font>";
	}
	return strng;
}

function u(a)
{return "<i>"+a+" </i>";}

function k()
{
	isSettings=!isSettings;
	
if(!isSettings)
	document.getElementById("Settings").innerHTML = "Settings";
else
	document.getElementById("Settings").innerHTML = "Main";
	
	wir();
}

function ko(){
       widget.openApplication(0x10008D39,"http://tmopt.com/s/");
}

function _1()
{window.close();
}

