const int touchBar=2; // 触摸板
int barState=0;
long lastTime;// 50天会溢出一次~
long maxSilentTime=10*1000;//沉默时间.
void setup() {
  Serial.begin(9600);
  if(setupTouchBar(touchBar) ,setupWatchEye(LED_BUILTIN)){
    Serial.print("TouchBar Ready at: ");
    Serial.print(touchBar);
    Serial.print("with WatchEye: ");
    Serial.print(LED_BUILTIN);
    Serial.println();
  }
  lastTime=millis();
}
bool setupTouchBar(int x){
  pinMode(x,INPUT_PULLUP);
  return true;
}
bool setupWatchEye(int x){
  pinMode(x,OUTPUT);  
  return true;
}

void loop() {
  int touchState=digitalRead(touchBar);
  watchBarState(touchState);
  pushEvent(barState,touchState);
}
bool pushEvent(int b,int n){
    if(b==n){
    //pass
      long now=millis();
      long timepassedby=now-lastTime;
      if(timepassedby > maxSilentTime){
        long now=millis();
         long timepassedby=now-lastTime;
        Serial.print(timepassedby);
      Serial.print(" silentTime has passed by. And now still is");
      Serial.print(n);
      Serial.println();
      resetState(n,now);
        }
    }else {
      long now=millis();
      long timepassedby=now-lastTime;
      Serial.print(timepassedby);
      Serial.print(" has passed by. And now is");
      Serial.print(n);
      Serial.println();
      resetState(n,now);
      }
  }
void resetState(int b,long t){
  barState=b;
  lastTime=t;
  }

bool watchBarState(int x){
  if(x==HIGH){
    digitalWrite(LED_BUILTIN,HIGH);
    }else{
      digitalWrite(LED_BUILTIN,LOW);
      }
   return true;
  }
