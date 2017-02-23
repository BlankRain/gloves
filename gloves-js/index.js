var MQTT = require('mqtt');
var EventEmitter = require('events').EventEmitter,
    Rx = require('rx');
var client  = MQTT.connect('mqtt://localhost')
var eventEmitter = new EventEmitter();

client.on('connect', function () {
  client.subscribe('glove/touch/event')
})
/**
 * 就是这么蛋疼,直接fromEvent 会掉参数~ 需要自己搞个eventEmitter提交一下~
 */
client.on('message',function(topic,message){
    eventEmitter.emit('message', topic,message);
})

var source = Rx.Observable.fromEvent(
    eventEmitter,
    'message',
    function (first, second) {
        return { foo: first, bar: second };
    });

var subscription = source.subscribe(
    function (x) {
        console.log('Next: foo -' + x.foo + ', bar -' + x.bar);
    },
    function (err) { console.log('Error: ' + err); },
    function () { console.log('Completed'); });

