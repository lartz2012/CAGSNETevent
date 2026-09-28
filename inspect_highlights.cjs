const fs = require('fs');

const html = fs.readFileSync('hauntedbouldercity.html', 'utf8');
const highSec = html.match(/<section[^>]*class="tour-highlights"[\s\S]*?<\/section>/i);
if (highSec) {
    console.log('=== TOUR HIGHLIGHTS STRUCTURE ===');
    console.log(highSec[0].slice(0, 2500));
}

const css = fs.readFileSync('ref_styles.css', 'utf8');
const highMatches = css.match(/(?:\.tour-highlights|\.highlights)[^{]*\{[^{}]*\}/g) || [];
console.log('\n=== CSS FOR HIGHLIGHTS ===');
highMatches.slice(0, 15).forEach(m => console.log(m.replace(/\s+/g, ' ')));
