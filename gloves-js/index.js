
const Rx = require('rx');

function mqttSource(){
    const MQTT = require('mqtt');
    const client  = MQTT.connect('mqtt://localhost')

    client.on('connect', ()=> {client.subscribe('glove/touch/event')})
    return {source:client,onevent:"message",type:'mqtt'};
}

function hostPortSource(){
    const net = require('net');
    const readline = require('readline');
    const localClient = net.connect({host:"192.168.44.135",port: 3002}, () => {});
    const  rl = readline.createInterface({input:localClient, output:localClient});
    return {source:rl,onevent:"line",type:'hostport'};
}

const watchSource=process.argv[2] !='mqtt'? hostPortSource():mqttSource();
var source=Rx.Observable
    .fromEvent(watchSource['source'],watchSource['onevent'],(t,m)=>{
        if(watchSource['type']=='mqtt'){
            return { topic: t, message: m ,type:watchSource['type']};
        }else{
            return { topic: "glove/touch/event", message: t ,type:watchSource['type']};
        }
    });
    
source.subscribe(
    (x)=> {
        console.log('Topic Is:' + x.topic + ', Message Is:' + x.message);
        },
    (err)=> { console.log('Error: ' + err); },
    () =>{ console.log('Completed'); })

source.subscribe(
    (x)=> {
        console.log('OOO: foo -' + x.topic + ', bar -' + x.message);
        },
    (err)=> { console.log('Error: ' + err); },
    () =>{ console.log('Completed'); })

