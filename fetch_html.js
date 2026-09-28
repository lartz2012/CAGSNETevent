const https = require('https');
const fs = require('fs');

https.get('https://www.hauntedbouldercity.com/', res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('hauntedbouldercity.html', data);
        console.log('Saved hauntedbouldercity.html, size:', data.length);
    });
});
