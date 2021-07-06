const ALERT_SERVER_URL = 'wss://classlinkbot.chewtzi.repl.co/ws'
const TARGETCLASS = "S3SY"
const IGNORED_SUBJECTS = ['c_english']


const WebSocket = require('ws-reconnect');
const open = require('open');
const sound = require("sound-play");

const ws = new WebSocket(ALERT_SERVER_URL, {
    retryCount:99999999, 
    reconnectInterval: 1 
});

ws.start()
ws.on('open', function open() {
  ws.send('connected');
});

ws.on('message', function incoming(data) {
  console.log(data);
  if(data){
    let { "class":className, subject, url } = JSON.parse(data)
    if(className != TARGETCLASS)return;
    if(IGNORED_SUBJECTS.includes(subject)){
        console.log('human interaction required')
        console.log(url)
        return;
    }
    console.log('NOW IS '+subject)
    console.log(`opening link ${url} in 9 minutes`)
    setTimeout(()=> {          
        open(url, {app: 'msedge'})
        sound.play("notification-sound.mp3");
    },8*60*1000);
  }
});
