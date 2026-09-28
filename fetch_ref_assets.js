const https = require('https');
const fs = require('fs');

function fetchFile(path, outfile) {
    https.get('https://www.hauntedbouldercity.com' + path, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            fs.writeFileSync(outfile, data);
            console.log(`Saved ${path} to ${outfile} (${data.length} bytes)`);
        });
    });
}

fetchFile('/styles.css', 'ref_styles.css');
fetchFile('/app.js', 'ref_app.js');
