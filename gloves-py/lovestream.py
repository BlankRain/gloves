#coding=utf-8
"""
触摸信号处理
"""
import serial
from rx.subjects import Subject
from rx import  Observer
SER = serial.Serial(
    baudrate=9600,
    parity=serial.PARITY_ODD,
    port='COM3',
    stopbits=serial.STOPBITS_TWO,
    bytesize=serial.SEVENBITS
)


class WatcherInNight(Observer):
    """
    暗夜守望者
    """
    def on_next(self, x):
        print "Got: %s" % x
    def on_error(self, e):
        print "Got error: %s" % e
    def on_completed(self):
        print "Sequence completed"


print "hi,felix~"
# 坠入爱河
LOVE_STREAM = Subject()

LOVE = LOVE_STREAM.subscribe(WatcherInNight())

while SER.isOpen():
    LOVE_STREAM.on_next(SER.readline())
print "Complete~~"
LOVE.dispose()

