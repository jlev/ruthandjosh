//   SunriseSunset Class (2011-05-02)
//   http://prestonhunt.com/story/124
//
// OVERVIEW
//
//   Implementation of http://williams.best.vwh.net/sunrise_sunset_algorithm.htm
//
// LICENSE
//
//   Copyright 2011 Preston Hunt <me@prestonhunt.com>
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
// DESCRIPTION
//
//   Provides sunrise and sunset times for specified date and position.
//   All dates are UTC.  Year is 4-digit.  Month is 1-12.  Day is 1-31.
//   Longitude is positive for east, negative for west. Latitude is
//   positive for north, negative for south.
//
// SAMPLE USAGE
//
//   var tokyo = new SunriseSunset( 2011, 1, 19, 35+40/60, 139+45/60); 
//   tokyo.sunriseUtcHours()      --> 21.8199 = 21:49 GMT
//   tokyo.sunsetUtcHours()       --> 7.9070  = 07:54 GMT
//   tokyo.sunriseLocalHours(9)   --> 6.8199  = 06:49 at GMT+9
//   tokyo.sunsunsetLocalHours(9) --> 16.9070 = 16:54 at GMT+9
//   tokyo.isDaylight(1.5)        --> true
//
//   var losangeles = new SunriseSunset( 2011, 1, 19, 34.05, -118.233333333 );
//   etc.
function SunriseSunsetTest(){var e={"Los Angeles":{lat:34.05,lon:-118.23333333,tests:[{year:2011,month:1,day:22,utcHours:19.6666666,isDaylight:!0}]},Berlin:{lat:52.5,lon:13.366666667,tests:[{year:2011,month:1,day:25,utcHours:1.25,isDaylight:!1},{year:2011,month:2,day:22,utcHours:2.5,isDaylight:!1}]},Tokyo:{lat:35+40/60,lon:139.75,tests:[{year:2011,month:1,day:23,utcHours:1.5,isDaylight:!0},{year:2011,month:1,day:23,utcHours:22.5,isDaylight:!0}]},Seoul:{lat:37.55,lon:126.966666667,tests:[{year:2011,month:4,day:10,utcHours:15.5,isDaylight:!1}]},"New Delhi":{lat:35+40/60,lon:139.75,tests:[]},Sydney:{lat:-33.916666666666664,lon:151+17/60,tests:[{year:2011,month:5,day:1,utcHours:17+53/60,isDaylight:!1}]},Santiago:{lat:-33.43333333333333,lon:-70.66666666666667,tests:[{year:2011,month:5,day:1,utcHours:17.9,isDaylight:!0}]}},t=0,n=0;for(var r in e){var i=e[r];for(var s=0;s<i.tests.length;s++){var o=i.tests[s],u=new SunriseSunset(o.year,o.month,o.day,i.lat,i.lon),a=o.isDaylight,f=u.isDaylight(o.utcHours),l=f===a;t++;l||n++;print(r,o.year,o.month,o.day,o.utcHours,"passed:",l);l||print("sunriseUtcHours="+u.sunriseUtcHours()+", sunsetUtcHours="+u.sunsetUtcHours())}}print("tests: "+t,"failed: "+n)}var SunriseSunset=function(e,t,n,r,i){this.zenith=90+50/60;this.utcFullYear=e;this.utcMonth=t;this.utcDay=n;this.latitude=r;this.longitude=i;this.rising=!0;this.lngHour=this.longitude/15};SunriseSunset.prototype={sin:function(e){return Math.sin(e*Math.PI/180)},cos:function(e){return Math.cos(e*Math.PI/180)},tan:function(e){return Math.tan(e*Math.PI/180)},asin:function(e){return 180/Math.PI*Math.asin(e)},acos:function(e){return 180/Math.PI*Math.acos(e)},atan:function(e){return 180/Math.PI*Math.atan(e)},getDOY:function(){var e=this.utcMonth,t=this.utcFullYear,n=this.utcDay,r=Math.floor(275*e/9),i=Math.floor((e+9)/12),s=1+Math.floor((t-4*Math.floor(t/4)+2)/3),o=r-i*s+n-30;return o},approximateTime:function(){var e=this.getDOY();return this.rising?e+(6-this.lngHour)/24:e+(18-this.lngHour)/24},meanAnomaly:function(){var e=this.approximateTime();return.9856*e-3.289},trueLongitude:function(){var e=this.meanAnomaly(),t=e+1.916*this.sin(e)+.02*this.sin(2*e)+282.634;return t%360},rightAscension:function(){var e=this.trueLongitude(),t=this.atan(.91764*this.tan(e));t%=360;var n=Math.floor(e/90)*90,r=Math.floor(t/90)*90;t+=n-r;t/=15;return t},sinDec:function(){var e=this.trueLongitude(),t=.39782*this.sin(e);return t},cosDec:function(){return this.cos(this.asin(this.sinDec()))},localMeanTime:function(){var e=(this.cos(this.zenith)-this.sinDec()*this.sin(this.latitude))/(this.cosDec()*this.cos(this.latitude));if(e>1)return"the sun never rises on this location (on the specified date)";if(e<-1)return"the sun never sets on this location (on the specified date)";var t=this.rising?360-this.acos(e):this.acos(e);t/=15;var n=this.rightAscension(),r=this.approximateTime(),i=t+n-.06571*r-6.622;return i},hoursRange:function(e){return(e+24)%24},UTCTime:function(){var e=this.localMeanTime(),t=e-this.lngHour;return this.hoursRange(t)},sunriseUtcHours:function(){this.rising=!0;return this.UTCTime()},sunsetUtcHours:function(){this.rising=!1;return this.UTCTime()},sunriseLocalHours:function(e){return this.hoursRange(e+this.sunriseUtcHours())},sunsetLocalHours:function(e){return this.hoursRange(e+this.sunsetUtcHours())},isDaylight:function(e){var t=this.sunriseUtcHours(),n=this.sunsetUtcHours();return n<t?e>t?!0:e<n?!0:!1:e>=t?e<n:!1}};