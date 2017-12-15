/* (c)2010 R.Gritsulyak */
function u(a){return "<i>"+a+" </i>";};function q(){i();setTimeout("q()",1000);};function i()
{if (window.widget) {widget.setNavigationEnabled(false);menu.hideSoftkeys();   };
var sysinfo = document.embeds[0];ahtml=document.getElementById("main").innerHTML;try {ahtml="SysStat by R.Gritsulyak &copy 2010 :<hr>";ahtml+="battery:" + u(sysinfo.chargelevel) + "%<br>";ahtml+="gsm network name:" + u(sysinfo.networkname) + "<br>";
ahtml+="gsm network strength:" + u(sysinfo.signalbars) + "<br>";var a="unknown";try{ a=n(sysinfo);}catch(e){};ahtml+="gsm network:" + u(a) + "<br>";var ads = sysinfo.drivelist;var ds = ads.split(" ");
ahtml+="drives:" + u(ads) + "<br>";for (var i=0; i<ds.length; i++) {ahtml += (ds[i]+" total space:"+u(sysinfo.drivesize(ds[i])/1024)+"kB<br>");
ahtml +=(ds[i]+" free space:"+u(sysinfo.drivefree(ds[i])/1024)+"kB<br>");};ahtml+="total RAM size:" + u(sysinfo.totalram/1024) + "kB<br>";ahtml+="free RAM size:" + u(sysinfo.freeram/1024) + "kB<br>";
} catch (e) {};ahtml=document.getElementById("main").innerHTML=ahtml;};function k(){window.location = "http://www.tmopt.com/";}function _1(){window.close();};function n(si){var s = si.networkregistrationstatus;
s;switch (s) {case 0:s = "unknown";break;case 1:s = "no; not searching";break;
case 2:s= "no; emergency calls only";break;case 3:s = "no; searching for network";break;
case 4:s = "yes; busy network";break;case 6:s = "no; denied";break;case 5:s = "yes; home network";break;case 7:s = "yes; foregn network(roaming)";break;default:break;}return s;}
	






