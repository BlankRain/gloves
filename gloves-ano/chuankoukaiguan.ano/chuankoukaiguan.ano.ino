const int buttonPin= 2;
int buttonState=0;
void setup() {
  // put your setup code here, to run once:
   pinMode(LED_BUILTIN, OUTPUT);
   Serial.begin(9600);
    pinMode(buttonPin,INPUT_PULLUP);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()>0){
    char ch=Serial.read();
    Serial.println(ch);
    if(ch=='a'){
      digitalWrite(LED_BUILTIN,HIGH);
      Serial.println("Turn High");
      }else if(ch == 'b'){
        digitalWrite(LED_BUILTIN,LOW);
      Serial.println("Turn Low");
        }
    }
    buttonState=digitalRead(buttonPin);
    Serial.println(buttonState);
    if(buttonState== HIGH){
       digitalWrite(LED_BUILTIN,HIGH);
     // Serial.println("Put High" );
      }else{
        digitalWrite(LED_BUILTIN,LOW);
       // Serial.println("Put Low");
        }
}
