const fs = require('fs');

const js = fs.readFileSync('ref_app.js', 'utf8');

// Let's print the entire event listeners and scroll handler from ref_app.js
console.log('JS total characters:', js.length);

// Extract the main scroll/render loop
const renderIdx = js.indexOf('function render(');
if (renderIdx !== -1) {
    console.log('=== RENDER FUNCTION ===');
    console.log(js.slice(renderIdx, renderIdx + 1500));
}

// Extract the highlights logic
const highIdx = js.indexOf('function renderHighlights(');
if (highIdx !== -1) {
    console.log('=== HIGHLIGHTS FUNCTION ===');
    console.log(js.slice(highIdx, highIdx + 1000));
}
