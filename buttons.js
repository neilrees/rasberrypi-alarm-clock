var events = require('events');
var spawn = require('child_process').spawn;
var sudo = require('sudo');

function Buttons() {
	events.EventEmitter.call(this);

	var proc = sudo(["python", '-u', 'gpio.py']);

	proc.stdout.on('data', function(data) {

		var line = data.toString().trim();

		if (line === '1') this.emit('button1');
		if (line === '2') this.emit('button2');
		if (line === '3') this.emit('button3');

	}.bind(this));

	proc.stdout.on('end', function() { 
		console.log('python ended');
	});

	proc.stderr.on('data', function (data) {
		console.log(data.toString());
	});

	proc.on('exit', function() { console.log('exit'); });
	proc.on('error', function() { console.log('error'); });

}

Buttons.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = Buttons;
