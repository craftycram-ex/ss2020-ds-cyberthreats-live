const axios = require('axios');

const dataUrl = 'https://www.fireeye.com/content/dam/legacy/cyber-map/weekly_sanitized.min.js';

async function getData() {
  const response = await axios.get(dataUrl);
  return response.data;
}

async function startUp() {
  const maxDelayInSec = 5;
  const data = await getData();
  const { attacks } = data;
  while (true) {
    const randTime = Math.random() * 1000 * maxDelayInSec;
    const randItem = Math.floor(Math.random() * attacks.length);
    const attack = attacks[randItem];
    console.log('\n#################################################');
    console.log('T', randTime, 'A', randItem);
    console.log(attack);
    console.log(`Attack from ${attack.OriginCode} to ${attack.Destination}`);
    console.log('#################################################');
    await new Promise((r) => setTimeout(r, randTime));
  }
}
startUp();
