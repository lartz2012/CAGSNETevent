const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = ['display.ttf', 'manticore.woff2', 'space-mono-400.woff2'];
const destDir = path.join(__dirname, 'public', 'assets');

fonts.forEach(f => {
    const file = fs.createWriteStream(path.join(destDir, f));
    https.get('https://www.hauntedbouldercity.com/assets/' + f, res => {
        if (res.statusCode === 200) {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Downloaded font:', f);
            });
        } else {
            console.log('Failed font:', f, res.statusCode);
        }
    }).on('error', err => console.error(err));
});
