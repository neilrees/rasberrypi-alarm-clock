var events = require('events');
var spawn = require('child_process').spawn;
var q = require('q');
var sudo = require('sudo');

function Music() { 
	events.EventEmitter.call(this);

	var service = this;

	var ympd = sudo(['./ympd', '--webport', '80']);

	ympd.stdout.on('data', function(data) { console.log(data.toString()); });
	ympd.stderr.on('data', function(data) { console.log(data.toString()); });

	this.play = function() {
		spawn('mpc', ['play']);
	};

	this.toggle = function() {
		spawn('mpc', ['toggle']);
	};

	this.next = function() {
		spawn('mpc', ['next']);
	};

	this.current = function() {
		var mpc = spawn('mpc', ['status']);
		var deferred = q.defer();

		mpc.stdout.on('data', function(data) {
			var parts = data.toString().split('\n');

			var nowPlaying = parts[0];
			var status = parts[1].split(']')[0].substring(1);

			var state = {
				status: status, 
				nowPlaying: nowPlaying
			};

			deferred.resolve(state);

		});

		return deferred.promise;
	};

}

Music.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = Music;
