const siteUrl = 'https://www.fireeye.com/cyber-map/threat-map.html';
const axios = require('axios');
const cheerio = require('cheerio');

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

async function getHacks() {
  const result = await fetchData();
  // console.log(result.html());
  const filtered = result('div[id=log]').html();
  console.log(filtered);
}
// getHacks();

setInterval(async () => {
  const result = await fetchData();
  // console.log(result.html());
  const filtered = result('div[id=log]').html();
  console.log(filtered);
}, 100);
