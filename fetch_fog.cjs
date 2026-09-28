const https = require('https');
const fs = require('fs');
const path = require('path');

const files = ['fog.webp', 'spirit.webp'];
const destDir = path.join(__dirname, 'public', 'assets');

files.forEach(f => {
    const file = fs.createWriteStream(path.join(destDir, f));
    https.get('https://www.hauntedbouldercity.com/assets/' + f, res => {
        if (res.statusCode === 200) {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Downloaded asset:', f);
            });
        } else {
            console.log('File status:', f, res.statusCode);
        }
    }).on('error', err => console.error(err));
});
