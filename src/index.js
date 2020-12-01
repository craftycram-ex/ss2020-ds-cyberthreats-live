const axios = require('axios');
const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors);

// initialize a simple http server
const server = http.createServer(app);
const io = require('socket.io')(server);

const dataUrl = 'https://www.fireeye.com/content/dam/legacy/cyber-map/weekly_sanitized.min.js';

io.on('connection', (client) => {
  client.on('message', (message) => {
    console.log('received: %s', message);
  });

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
    client.emit('attack', attack);
    setTimeout(printAttack, randTime);
  }
  printAttack();
});

// start our server
server.listen(3001, () => {
  console.log('Server started on port 3001 :)');
});
