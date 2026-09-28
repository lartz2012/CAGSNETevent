const fs = require('fs');
const js = fs.readFileSync('ref_app.js', 'utf8');

const lines = js.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('track') || line.includes('stories')) {
        console.log(`Line ${idx+1}: ${line.slice(0, 200)}`);
    }
});
