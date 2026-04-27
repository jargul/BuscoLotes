const https = require('https');
const fs = require('fs');

https.get('https://www.remotes.com.uy/feed/publicados/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('remotes_feed.xml', data);
    console.log('Saved to remotes_feed.xml. Total length:', data.length);
  });
});
