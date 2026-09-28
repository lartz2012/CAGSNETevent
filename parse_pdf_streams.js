const fs = require('fs');

const content = fs.readFileSync('decompressed_pdf_text.txt', 'utf8');
const streams = content.split('--- STREAM ---');
let output = '';

streams.forEach((st, idx) => {
    const btMatches = st.match(/BT[\s\S]*?ET/g);
    if (btMatches) {
        let streamText = [];
        for (let b of btMatches) {
            const words = [];
            const tRegex = /\(((?:\\\(|\\\)|[^\(\)])*)\)\s*(?:Tj|'|\")/g;
            let m;
            while ((m = tRegex.exec(b)) !== null) {
                let w = m[1].replace(/\\\(/g, '(').replace(/\\\)/g, ')').replace(/\\n/g, ' ');
                words.push(w);
            }
            const tjRegex = /\[(.*?)\]\s*TJ/g;
            while ((m = tjRegex.exec(b)) !== null) {
                const sub = m[1].match(/\(((?:\\\(|\\\)|[^\(\)])*)\)/g);
                if (sub) {
                    words.push(sub.map(s => s.slice(1, -1).replace(/\\\(/g, '(').replace(/\\\)/g, ')')).join(' '));
                }
            }
            if (words.length > 0) {
                let text = words.join('').replace(/[\u0080-\uffff]/g, ' ').replace(/\s+/g, ' ').trim();
                if (text.length > 2) streamText.push(text);
            }
        }
        if (streamText.length > 0) {
            output += `\n=== STREAM ${idx} (Text blocks: ${btMatches.length}) ===\n` + streamText.join('\n') + '\n';
        }
    }
});

fs.writeFileSync('all_streams_utf8.txt', output, 'utf8');
console.log('Saved all_streams_utf8.txt, size:', output.length);
