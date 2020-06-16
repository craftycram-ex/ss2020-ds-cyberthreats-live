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
  setInterval(() => {
    randTime = Math.random() * 10000;
    const randItem = Math.floor(Math.random() * attacks.length);
    console.log(randTime, randItem);
    console.log(attacks[randItem]);
  }, randTime);
}
startUp();
