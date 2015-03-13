
var Buttons = require('./buttons');
var Music = require('./music');
var Alarm = require('./alarm');
var clock = require('./clock');

var buttons = new Buttons();
var music = new Music();
var alarm = new Alarm();

clock.setStatus('stopped');

function updateView(state) {
	clock.setStatus(state.status);
	clock.setNowPlaying(state.nowPlaying);
};

function updateState() {
	music.current().then(updateView);
};

buttons.on('button1', function() {
	music.toggle();
	updateState();
});

buttons.on('button2', function() {
	music.next();
	updateState();
});

buttons.on('button3', function() {
});

alarm.on('alarm', function() {
	music.play();
});



console.log('running');


(function wait() {
	updateState();
	setTimeout(wait, 5000);
})();

