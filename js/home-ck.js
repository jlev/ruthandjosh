//functions for home image on ruthandjosh.net
function currentTimeInTz(e){var t=new Date,n=t.getTime()+t.getTimezoneOffset()*60*1e3,r=new Date(n+36e5*e);return r}function getSkyPhase(e,t,n){return e<t-1?phases[0]:e<t?phases[1]:e<t+1?phases[2]:e<n-1?phases[3]:e<n?phases[4]:e<n+1?phases[5]:"night"}function setSky(e){$("#sky").attr("class",e);if(e==="night"){$(".bird").removeClass("awake").addClass("asleep");$("#home .background").addClass("dark");$("#home #house").addClass("shade")}else{$("#home .background").removeClass("dark");$("#home #house").removeClass("shade")}e==="day"&&$(".bird").removeClass("awake").addClass("asleep")}function advanceSky(){var e=phases.indexOf(currentPhase),t=(e+1)%phases.length,n=phases[t];setSky(n);currentPhase=n}function fogOn(){console.log("fog on");$("#home").addClass("fog")}function fogOff(){console.log("fog off");$("#home").removeClass("fog")}var phases=["night","dawn","sunrise","day","sunset","dusk"],currentPhase="";$(document).ready(function(){var e=currentTimeInTz(-8),t=new SunriseSunset(e.getFullYear(),e.getMonth()+1,e.getDate(),37.894234,-122.497238),n=e.getHours()+e.getMinutes()/60;currentPhase=getSkyPhase(n,t.sunriseLocalHours(-8),t.sunsetLocalHours(-8));setSky(currentPhase);$("#clock").click(function(){$("#clock").animate({rotate:"+=60deg"},500);setTimeout("advanceSky()",500)})});