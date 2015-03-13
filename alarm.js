var schedule = require('node-schedule');
var EventEmitter = require('events').EventEmitter;

function Alarm() {
	EventEmitter.call(this);

	var alarm = this;

	var rule = new schedule.RecurrenceRule();
	rule.dayOfWeek = [0, new schedule.Range(0, 5)];
	rule.hour = 7;
	rule.minute = 0;

	schedule.scheduleJob(rule, function(){
		alarm.emit('alarm');
	});
}

Alarm.prototype.__proto__ = EventEmitter.prototype;

module.exports = Alarm;

