//functions for home image on ruthandjosh.net

function currentTimeInTz(offset) {
    var d = new Date();
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60*1000);
	var nd = new Date(utc + (60*60*1000*offset));
    return nd;
}

function getSkyPhase(time,sunrise,sunset) {
	//given current time, sunrise and sunet, calculate sky phase
	//one of [night,twilight,sunrise,day,sunset]
	if (time < sunrise-1) { return "night"; }
	if (time < sunrise) { return "twilight"; }
	if (time < sunrise+1) { return "sunrise"; }
	if (time < sunset-1) { return "day"; }
	if (time < sunset) { return "sunset"; }
	if (time < sunset+1) { return "twilight"; }
	return "night";
}

function setSky(phase) {
	$('#sky').attr('class',phase);
	console.log('set sky '+phase);

	if (phase === "night") {
		console.log('birds to sleep');
		$('.bird').removeClass('awake').addClass('asleep');

		console.log('darken scene');
		$('#home .background').addClass('dark');
	} else {
		$('#home .background').removeClass('dark');
	}

	if (phase === "day") {
		console.log('wake birds');
		$('.bird').removeClass('awake').addClass('asleep');
	}
}

function fogOn() {
	console.log('fog on');
	$('#home').addClass('fog');
}
function fogOff() {
	console.log('fog off');
	$('#home').removeClass('fog');
}

$(document).ready(function() {
	var datePST = currentTimeInTz(-8);
	var sf = new SunriseSunset( datePST.getFullYear(), datePST.getMonth()+1, datePST.getDate(), 37.894234,-122.497238);
	var time_24 = datePST.getHours() + datePST.getMinutes()/60;
	var phase = getSkyPhase(time_24,sf.sunriseLocalHours(-8),sf.sunsetLocalHours(-8));
	setSky(phase);
});