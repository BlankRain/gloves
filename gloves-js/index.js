
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

const fiveGods ="紫薇我爱你"
const PORT={2:0,3:1,4:2,5:3,6:4}
source.subscribe(
    (x)=> {
        const m=x.message.split(",")
        // console.log(m)  ==>[ '1', 'Continue', '801', '0', '418233', '6', 'Ni' ]
        const whatIsay=fiveGods[PORT[m[5]]]
        console.info(`${whatIsay} ${m[6]}`);
        },
    (err)=> { console.log('Error: ' + err); },
    () =>{ console.log('Completed'); })

source.subscribe(
    (x)=> {
        // console.log('OOO: foo -' + x.topic + ', bar -' + x.message);
        },
    (err)=> { console.log('Error: ' + err); },
    () =>{ console.log('Completed'); })



