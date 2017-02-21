struct TouchSign{
    int type;
    const char *key;
    long value;   
    long timepassed;
    long timevalue;
    int barport;
    const char *barname;
};

struct TouchBar{
    const char *name;
    int barport;
    int watchport;
    int barState;
    long lastTime; //long lastTime;// 50天会溢出一次~
} allBars[]={
  {"A1",2,13,0},{"B1",4,13,0} // 嗯,所有键放这里.
  };

long maxSilentTime=8*100;//沉默时间.
void setup() {
  Serial.begin(9600);
   for(int i=0;i<sizeof(allBars)/sizeof(allBars[0]);i++){
    if(initTouchBar(&allBars[i])){
      readyInfo(allBars[i]);
     }   
    }
 
  //lastTime=millis();
}
void readyInfo(struct TouchBar tb){
    Serial.print("TouchBar Ready at: ");
    Serial.print(tb.barport);
    Serial.print("with WatchEye: ");
    Serial.print(tb.watchport);
    Serial.println();
  }
bool initTouchBar(struct TouchBar *tb){
    tb->lastTime=millis();
return setupTouchBar(tb->barport) && setupWatchEye(tb->watchport);
}
bool setupTouchBar(int x){
  pinMode(x,INPUT_PULLUP);
  return true;
}
bool setupWatchEye(int x){
  pinMode(x,OUTPUT);  
  return true;
}

void pushSigh(struct TouchSign sign){
        
        Serial.print(sign.type);
        Serial.print(",");
        Serial.print(sign.key);
        Serial.print(",");
        Serial.print(sign.timepassed);
        Serial.print(",");
        Serial.print(sign.value);
        Serial.print(",");
        Serial.print(sign.timevalue);
        Serial.print(",");
        Serial.print(sign.barport);
        Serial.print(",");
        Serial.print(sign.barname);
        Serial.println();
}

void loop() {
  for(int i=0;i<sizeof(allBars)/sizeof(allBars[0]);i++){
      int touchState=digitalRead(allBars[i].barport);
      watchBarState(allBars[i],touchState);
      pushEvent(&allBars[i],touchState);
    }

  
 
}
/**
 * 发送信号
 */
bool pushEvent(struct TouchBar *touchbar,int touchState){
   long now=millis();
   long timepassedby=now-touchbar->lastTime;
    if(touchbar->barState==touchState){
    //pass
      TouchSign sign={0x0001,"Continue",touchState,timepassedby,now,touchbar->barport,touchbar->name};
      if(timepassedby > maxSilentTime){
       pushSigh(sign);
       resetState(touchbar,touchState,now);
        }
    }else {
      TouchSign sign={0x0002,"Different",touchState,timepassedby,now,touchbar->barport,touchbar->name};
      pushSigh(sign);
      
      resetState(touchbar,touchState,now);
      }
  }
  
void resetState(struct TouchBar *touchbar, int touchState,long t){
  touchbar->barState=touchState;
  touchbar->lastTime=t;
  }
/**
控制监控灯
**/
bool watchBarState(struct TouchBar touchbar,int x){
  if(x==HIGH){
    digitalWrite(touchbar.watchport,HIGH);
    }else{
      digitalWrite(touchbar.watchport,LOW);
      }
   return true;
  }
