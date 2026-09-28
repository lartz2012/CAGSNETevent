const fs = require('fs');

const css = fs.readFileSync('ref_styles.css', 'utf8');
const js = fs.readFileSync('ref_app.js', 'utf8');

console.log('CSS fonts defined:');
const fontFaces = css.match(/@font-face\s*\{[^}]+\}/g) || [];
for (let ff of fontFaces) {
    console.log(ff.replace(/\s+/g, ' '));
}

console.log('\nKey CSS selectors & animations:');
const keyframes = css.match(/@keyframes\s+([a-zA-Z0-9_-]+)/g) || [];
console.log('Keyframes:', keyframes.slice(0, 15));

console.log('\nJS libraries/patterns:');
if (js.includes('gsap') || js.includes('ScrollTrigger')) console.log('Uses GSAP / ScrollTrigger');
if (js.includes('Lenis') || js.includes('lenis')) console.log('Uses Lenis smooth scroll');
if (js.includes('IntersectionObserver')) console.log('Uses IntersectionObserver');
if (js.includes('requestAnimationFrame')) console.log('Uses rAF');
console.log('JS length:', js.length);
console.log('JS start snippet:', js.slice(0, 300));
