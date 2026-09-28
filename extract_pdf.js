const fs = require('fs');

const content = fs.readFileSync('decompressed_pdf_text.txt', 'utf8');

const lines = [];
const regex = /BT([\s\S]*?)ET/g;
let match;
while ((match = regex.exec(content)) !== null) {
    const block = match[1];
    const subLines = [];
    const tRegex = /\(((?:\\\(|\\\)|[^\(\)])*)\)\s*(?:Tj|'|\")/g;
    let tMatch;
    while ((tMatch = tRegex.exec(block)) !== null) {
        subLines.push(tMatch[1].replace(/\\\(/g, '(').replace(/\\\)/g, ')').replace(/\\n/g, ' '));
    }
    const tjRegex = /\[(.*?)\]\s*TJ/g;
    let tjMatch;
    while ((tjMatch = tjRegex.exec(block)) !== null) {
        const parts = tjMatch[1].match(/\(((?:\\\(|\\\)|[^\(\)])*)\)/g);
        if (parts) {
            subLines.push(parts.map(p => p.slice(1, -1).replace(/\\\(/g, '(').replace(/\\\)/g, ')')).join(' '));
        }
    }
    if (subLines.length > 0) {
        lines.push(subLines.join(' '));
    }
}
fs.writeFileSync('extracted_full_readable.txt', lines.join('\n'));
console.log('Extracted lines count:', lines.length);
console.log(lines.slice(0, 100).join('\n'));
