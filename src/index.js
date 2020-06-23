const axios = require('axios');
const WebSocket = require('ws');
const cors = require('cors');

const wss = new WebSocket.Server({
  port: 3000
});
let websocketConnection;

const dataUrl = 'https://www.fireeye.com/content/dam/legacy/cyber-map/weekly_sanitized.min.js';

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  //websocketConnection = ws;
  async function getData() {
    const response = await axios.get(dataUrl);
    return response.data;
  }
  async function printAttack() {
    const maxDelayInSec = 5;
    const data = await getData();
    const {
      attacks,
    } = data;
    const randTime = Math.random() * 1000 * maxDelayInSec;
    const randItem = Math.floor(Math.random() * attacks.length);
    const attack = attacks[randItem];
    console.log('\n#################################################');
    console.log('T', randTime, 'A', randItem);
    console.log(attack);
    console.log(`Attack from ${attack.OriginCode} to ${attack.Destination}`);
    console.log('#################################################');
    ws.send(JSON.stringify(attack));
    setTimeout(printAttack, randTime);
  }
  printAttack();
});
