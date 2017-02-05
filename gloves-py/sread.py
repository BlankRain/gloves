import time
import serial
ser = serial.Serial(  
  port='COM3',
  baudrate=9600,
  parity=serial.PARITY_ODD,
  stopbits=serial.STOPBITS_TWO,
  bytesize=serial.SEVENBITS
)

print("hi")
while ser.isOpen():
  print(ser.readline())

