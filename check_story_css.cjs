const fs = require('fs');

const css = fs.readFileSync('style.css', 'utf8');
const lines = css.split('\n');

lines.forEach((line, idx) => {
    if (line.includes('story-track') || line.includes('stories-scroll') || line.includes('stories-pin')) {
        console.log(`Line ${idx+1}: ${line}`);
    }
});
