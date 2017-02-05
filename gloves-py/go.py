import keyboard
def cb(x):
    print(x.name)


keyboard.hook(cb)
