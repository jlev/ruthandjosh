var randomize = function(selector,images) {
	var x = images[Math.floor(Math.random() * images.length)];
	$(selector).attr('src','/images/'+x);
};

var randomize_ground = function() {
	return randomize('#ground.rando',
		['ground-1.png', 'ground-2.png', 'ground-3.png', 'ground-4.png']
	);
};
var randomize_dome = function() {
	return randomize('#dome.rando',
		['dome-with-hack-1.png', 'dome-with-hack-2.png',
		'dome-with-hack-3.png', 'dome-with-hack-4.png',
		'dome-with-no-hacks.png']
	);
};

$(document).ready(function() {
	setInterval(randomize_dome,5000);
	setInterval(randomize_ground,5000);
});