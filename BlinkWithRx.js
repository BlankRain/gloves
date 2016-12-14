var Rx=require('Rx').Rx || require('Rx') || Rx;// That's iotjs-wrt-rx package. 顺带适配一下其他环境
var signal=[0,1,0,1,0,0,0,1,1,1,0,0,1,1,0,0,0,0,1,1,1,1];// blink signal

// import gpio module
var gpio = require("gpio");
var pins = require("arduino101_pins");

// pin 8 is one of the onboard LEDs on the Arduino 101
// 'out' direction is default, could be left out
var pin = gpio.open({
    pin: pins.LED0,
    direction: 'out'
});
const oneSecond=1000
Rx.Observable.interval(oneSecond)
  .map((x)=>{return signal[x % signal.length];})
  .subscribe((x)=>{
    pin.write(x);
  });
