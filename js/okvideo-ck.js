/*
 * OKVideo by OKFocus v2.2.0
 * http://okfoc.us
 *
 * Copyright 2012, OKFocus
 * Licensed under the MIT license.
 *
 */function vimeoPlayerReady(){options=$(window).data("okoptions");var e=$("#okplayer")[0];player=$f(e);window.setTimeout($("#okplayer").css("visibility","visible"),2e3);player.addEvent("ready",function(){player.api("play");if(OKEvents.utils.isMobile())OKEvents.v.onPlay();else{player.addEvent("play",OKEvents.v.onPlay());player.addEvent("pause",OKEvents.v.onPause());player.addEvent("finish",OKEvents.v.onFinish())}})}function onYouTubePlayerAPIReady(){options=$(window).data("okoptions");player=new YT.Player("okplayer",{videoId:options.video?options.video.id:null,playerVars:{autohide:1,autoplay:1,disablekb:options.keyControls,cc_load_policy:options.captions,controls:0,enablejsapi:1,fs:0,modestbranding:1,iv_load_policy:options.annotations,loop:options.loop,showinfo:0,rel:0,wmode:"opaque",hd:options.hd},events:{onReady:OKEvents.yt.ready,onStateChange:OKEvents.yt.onStateChange,onError:OKEvents.yt.error}})}var player,OKEvents,options;(function(e){"use strict";e.okvideo=function(t){typeof t!="object"&&(t={video:t});var n=this;n.init=function(){n.options=e.extend({},e.okvideo.options,t);n.options.video===null&&(n.options.video=n.options.source);OKEvents.utils.isMobile()?e("body").append('<div id="okplayer" style="position:fixed;left:0;top:0;overflow:hidden;z-index:-999;height:100%;width:100%;"></div>'):n.options.adproof?e("body").append('<div style="position:fixed;left:0;top:0;overflow:hidden;z-index:-998;height:100%;width:100%;" id="okplayer-mask"></div><div id="okplayer" style="position:fixed;left:0;top:0;overflow:hidden;z-index:-999;height:110%;width:110%;"></div>'):e("body").append('<div style="position:fixed;left:0;top:0;overflow:hidden;z-index:-998;height:100%;width:100%;" id="okplayer-mask"></div><div id="okplayer" style="position:fixed;left:0;top:0;overflow:hidden;z-index:-999;height:100%;width:100%;"></div>');n.setOptions();if(n.options.playlist.list===null){if(n.options.video.provider==="youtube")n.loadYouTubeAPI();else if(n.options.video.provider==="vimeo"){n.options.volume/=100;n.loadVimeoAPI()}}else n.loadYouTubeAPI()};n.setOptions=function(){for(var t in this.options){this.options[t]==1&&(this.options[t]=1);this.options[t]==0&&(this.options[t]=3)}n.options.playlist.list===null&&(n.options.video=n.determineProvider());e(window).data("okoptions",n.options)};n.loadYouTubeAPI=function(e){n.insertJS("http://www.youtube.com/player_api")};n.loadYouTubePlaylist=function(){player.loadPlaylist(n.options.playlist.list,n.options.playlist.index,n.options.playlist.startSeconds,n.options.playlist.suggestedQuality)};n.loadVimeoAPI=function(){e("#okplayer").replaceWith(function(){return'<iframe src="http://player.vimeo.com/video/'+n.options.video.id+"?api=1&js_api=1&title=0&byline=0&portrait=0&playbar=0&loop="+n.options.loop+'&player_id=okplayer" frameborder="0" style="'+e(this).attr("style")+'visibility:hidden;background-color:black;" id="'+e(this).attr("id")+'"></iframe>'});n.insertJS("http://a.vimeocdn.com/js/froogaloop2.min.js",function(){vimeoPlayerReady()})};n.insertJS=function(e,t){var n=document.createElement("script");t&&(n.readyState?n.onreadystatechange=function(){if(n.readyState==="loaded"||n.readyState==="complete"){n.onreadystatechange=null;t()}}:n.onload=function(){t()});n.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r)};n.determineProvider=function(){var e=document.createElement("a");e.href=n.options.video;if(/youtube.com/.test(n.options.video))return{provider:"youtube",id:e.href.slice(e.href.indexOf("v=")+2).toString()};if(/vimeo.com/.test(n.options.video))return{provider:"vimeo",id:e.href.split("/")[3].toString()};if(/[A-Za-z0-9_]+/.test(n.options.video)){var t=new String(n.options.video.match(/[A-Za-z0-9_]+/));if(t.length==11)return{provider:"youtube",id:t.toString()};for(var r=0;r<n.options.video.length;r++)if(typeof parseInt(n.options.video[r])!="number")throw"not vimeo but thought it was for a sec";return{provider:"vimeo",id:n.options.video}}throw"OKVideo: Invalid video source"};n.init()};e.okvideo.options={source:null,video:null,playlist:{list:null,index:0,startSeconds:0,suggestedQuality:"default"},disableKeyControl:1,captions:0,loop:1,hd:1,volume:0,adproof:!1,unstarted:null,onFinished:null,onPlay:null,onPause:null,buffering:null,annotations:!0,cued:null};e.fn.okvideo=function(t){return this.each(function(){new e.okvideo(t)})}})(jQuery);OKEvents={yt:{ready:function(e){e.target.setVolume(options.volume);options.playlist.list?player.loadPlaylist(options.playlist.list,options.playlist.index,options.playlist.startSeconds,options.playlist.suggestedQuality):e.target.playVideo()},onStateChange:function(e){switch(e.data){case-1:OKEvents.utils.isFunction(options.unstarted)&&options.unstarted();break;case 0:OKEvents.utils.isFunction(options.onFinished)&&options.onFinished();options.loop&&e.target.playVideo();break;case 1:OKEvents.utils.isFunction(options.onPlay)&&options.onPlay();break;case 2:OKEvents.utils.isFunction(options.onPause)&&options.onPause();break;case 3:OKEvents.utils.isFunction(options.buffering)&&options.buffering();break;case 5:OKEvents.utils.isFunction(options.cued)&&options.cued();break;default:throw"OKVideo: received invalid data from YT player."}},error:function(e){throw e}},v:{onPlay:function(){OKEvents.utils.isMobile()||player.api("api_setVolume",options.volume);OKEvents.utils.isFunction(options.onPlay)&&options.onPlay()},onPause:function(){OKEvents.utils.isFunction(options.onPlay)&&options.onPause()},onFinish:function(){OKEvents.utils.isFunction(options.onPlay)&&options.onFinish()}},utils:{isFunction:function(e){if(typeof e=="function")return!0;e===1&&(e=!0);return!1},isMobile:function(){return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)?!0:!1}}};