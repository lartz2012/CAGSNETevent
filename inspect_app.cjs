const fs = require('fs');

const js = fs.readFileSync('ref_app.js', 'utf8');

// Look for functions, scroll handlers, observers
console.log('--- JS HIGHLIGHTS ---');
const functionMatches = js.match(/function\s+([a-zA-Z0-9_]+)\s*\(/g) || [];
console.log('Functions:', functionMatches);

// Search for stories scroll logic
const storiesIndex = js.indexOf('stories');
if (storiesIndex !== -1) {
    console.log('\n--- STORIES LOGIC SNIPPET ---');
    console.log(js.slice(storiesIndex, storiesIndex + 1200));
}

// Search for menu toggle logic
const menuIndex = js.indexOf('menu-toggle');
if (menuIndex !== -1) {
    console.log('\n--- MENU TOGGLE LOGIC SNIPPET ---');
    console.log(js.slice(menuIndex - 100, menuIndex + 800));
}
