const WebSocket = require('ws');
const open = require('open');

const ws = new WebSocket('wss://ResponsibleAwkwardScript.chewtzi.repl.co/ws');
const sound = require("sound-play");

ws.on('open', function open() {
  ws.send('chew connect');
});


ws.on('message', function incoming(data) {
  console.log(data);
  if(data){
    let { "class":className, subject, url } = JSON.parse(data)
    if(className != 'S3SY')return;
    if(subject == 'c_english'){
        console.log('human interaction required')
        console.log(url)
        return;
    }
    console.log('NOW IS '+subject)
    console.log(`opening link ${url} in 9 minutes`)
    setTimeout(()=> {          
        open(url, {app: 'msedge'})
        sound.play("notification-sound.mp3");
    },9*60*1000);
  }
});
