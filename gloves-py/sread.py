import time
import serial
import rx
from rx.subjects import Subject
from rx import Observable, Observer
ser = serial.Serial(  
  port='COM3',
  baudrate=9600,
  parity=serial.PARITY_ODD,
  stopbits=serial.STOPBITS_TWO,
  bytesize=serial.SEVENBITS
)

# 暗夜守望者
class WatcherInNight(Observer):
    def on_next(self, x):
        print("Got: %s" % x)
        
    def on_error(self, e):
        print("Got error: %s" % e)
        
    def on_completed(self):
        print("Sequence completed")


print("hi,felix~")
# 坠入爱河
loveStream = Subject()
#d = stream.subscribe(lambda x: print("Got: %s" % x))

d= loveStream.subscribe(WatcherInNight())

while ser.isOpen():
  loveStream.on_next(ser.readline())
  
print("Complete~~")
d.dispose()

