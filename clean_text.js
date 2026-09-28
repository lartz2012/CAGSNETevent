const fs = require('fs');

const raw = fs.readFileSync('extracted_full_readable.txt', 'utf8');
const lines = raw.split('\n');

const cleanLines = [];
for (let line of lines) {
    // remove high unicode binary noise
    let cleaned = line.replace(/[\u0080-\uffff]/g, '').trim();
    // collapse multiple spaces
    cleaned = cleaned.replace(/\s+/g, ' ');
    if (cleaned.length > 2) {
        cleanLines.push(cleaned);
    }
}

fs.writeFileSync('proposal_cleaned_text.txt', cleanLines.join('\n'));
console.log('Clean lines:', cleanLines.length);
console.log('Sample 80 lines:');
console.log(cleanLines.slice(0, 80).join('\n'));
