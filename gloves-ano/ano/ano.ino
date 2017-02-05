String inputString = "Nice to meet you,Felicia~ Let's Count Number "; 
int i=0;
void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  i++;
Serial.println(inputString+i);
delay(2000);
}
