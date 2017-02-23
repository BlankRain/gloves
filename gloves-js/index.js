var MQTT = require('mqtt');
var Rx = require('rx');
var client  = MQTT.connect('mqtt://localhost')

client.on('connect', function () {
  client.subscribe('glove/touch/event')
})


var source=Rx.Observable
    .fromEvent(client,'message',(t,m)=>{
        return { topic: t, message: m };
    });
    
source.subscribe(
    (x)=> {
        console.log('Next: foo -' + x.topic + ', bar -' + x.message);
        },
    (err)=> { console.log('Error: ' + err); },
    () =>{ console.log('Completed'); })

source.subscribe(
    (x)=> {
        console.log('OOO: foo -' + x.topic + ', bar -' + x.message);
        },
    (err)=> { console.log('Error: ' + err); },
    () =>{ console.log('Completed'); })
