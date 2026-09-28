const fs = require('fs');

const html = fs.readFileSync('hauntedbouldercity.html', 'utf8');
const storiesSec = html.match(/<section[^>]*class="stories-scroll"[\s\S]*?<\/section>/i);
if (storiesSec) {
    console.log('=== STORIES SCROLL SECTION STRUCTURE ===');
    console.log(storiesSec[0].slice(0, 2000));
}

const css = fs.readFileSync('ref_styles.css', 'utf8');
const storyMatches = css.match(/(?:\.stories|\.story)[^{]*\{[^{}]*\}/g) || [];
console.log('\n=== CSS FOR STORIES ===');
storyMatches.slice(0, 15).forEach(m => console.log(m.replace(/\s+/g, ' ')));
