const axios = require('axios');

const dataUrl = 'https://www.fireeye.com/content/dam/legacy/cyber-map/weekly_sanitized.min.js';

async function getData() {
  const response = await axios.get(dataUrl);
  return response.data;
}

async function startUp() {
  const data = await getData();
  const { attacks } = data;
  let randTime = Math.random() * 1000;
  while (true) {
    randTime = Math.random() * 10000;
    const randItem = Math.floor(Math.random() * attacks.length);
    const attack = attacks[randItem];
    console.log('T', randTime, 'A', randItem);
    console.log(attack);
    console.log(`#############################\nAttack from ${attack.OriginCode} to ${attack.Destination}\n#############################`);
    await new Promise((r) => setTimeout(r, randTime));
  }
}
startUp();
