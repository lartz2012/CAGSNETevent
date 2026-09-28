const fs = require('fs');

const html = fs.readFileSync('hauntedbouldercity.html', 'utf8');
const heroMatch = html.match(/<section[^>]*class="hero"[\s\S]*?<\/section>/i);
if (heroMatch) {
    console.log('=== FULL HERO SECTION MARKUP ===');
    console.log(heroMatch[0]);
}
