from flask import Flask
app = Flask(__name__)

import keyboard

#@keyboard.hook
def x(x):
    print(x.name)
    
def c():
    keyboard.unhook()
    
@app.route("/")
def hello():
    return "Hello World!"

@app.route('/event/<eventname>')
def action(eventname):   
    return eventname
        
if __name__ == "__main__":
    app.run()



