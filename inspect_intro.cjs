const fs = require('fs');

const html = fs.readFileSync('hauntedbouldercity.html', 'utf8');
const introMatch = html.match(/<section[^>]*id="about"[\s\S]*?<\/section>/i);
if (introMatch) {
    console.log('=== FULL INTRO SECTION MARKUP ===');
    console.log(introMatch[0]);
}
