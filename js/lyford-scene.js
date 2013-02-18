//functions for lyford scene on ruthandjosh.net

function currentTimeInTz(offset) {
    var d = new Date();
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60*1000);
	var nd = new Date(utc + (60*60*1000*offset));
    return nd;
}

//keep these in an array so we can cycle through them in order
var phases = ["night","dawn","sunrise","day","sunset","dusk"];
var currentPhase = ""; //tracks current phase, set in document.ready and advanceSky

function getSkyPhase(time,sunrise,sunset) {
	//given current time, sunrise and sunet, calculate sky phase
	if (time < sunrise-1) { return phases[0]; }
	if (time < sunrise) { return phases[1]; }
	if (time < sunrise+1) { return phases[2]; }
	if (time < sunset-1) { return phases[3]; }
	if (time < sunset) { return phases[4]; }
	if (time < sunset+1) { return phases[5]; }
	return "night";
}

function setSky(phase) {
	//set the sky to the given phase

	$('#sky').attr('class',phase);
	if (phase === "night") {
		$('.bird').removeClass('awake').addClass('asleep');

		$('#home .background').addClass('dark');
		$('#home #house').addClass('shade');
		$('#home .text').addClass('light');
	} else {
		$('#home .background').removeClass('dark');
		$('#home #house').removeClass('shade');
		$('#home .text').removeClass('light');
	}

	if (phase === "day") {
		$('.bird').removeClass('awake').addClass('asleep');
	}
}

function advanceSky() {
	var idx = phases.indexOf(currentPhase);
	var nextIdx = (idx+1) % (phases.length);
	var nextPhase = phases[nextIdx];
	setSky(nextPhase);
	currentPhase = nextPhase
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
	var time24 = datePST.getHours() + datePST.getMinutes()/60;
	currentPhase = getSkyPhase(time24,sf.sunriseLocalHours(-8),sf.sunsetLocalHours(-8));
	setSky(currentPhase);

	$('#clock').click(function(){
		$('#clock').animate({rotate: '+=60deg'}, 500);
		setTimeout('advanceSky()',500);
	});
});