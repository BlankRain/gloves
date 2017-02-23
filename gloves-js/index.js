var stompit = require('stompit');
console.log("good Job")
var connectOptions = {
  'host': 'localhost',
  'port': 1883
  ,'connectHeaders':{
    // 'host': '/',
    // 'login': 'username',
    // 'passcode': 'password',
    // 'heart-beat': '5000,5000'
  }
};

stompit.connect(connectOptions, function(error, client) {

  if (error) {
    console.log('connect error ' + error.message);
    return;
  }


  var subscribeHeaders = {
    'destination': 'glove/touch/event',
    'ack': 'client-individual'
  };

  client.subscribe(subscribeHeaders, function(error, message) {

    if (error) {
      console.log('subscribe error ' + error.message);
      return;
    }

    message.readString('utf-8', function(error, body) {

      if (error) {
        console.log('read message error ' + error.message);
        return;
      }

      console.log('received message: ' + body);

      client.ack(message);

      client.disconnect();
    });
  });
});