const fs = require('fs');
const css = fs.readFileSync('ref_styles.css', 'utf8');

const fonts = css.match(/@font-face\s*\{[^}]+\}/g) || [];
fonts.forEach(f => console.log(f.replace(/\s+/g, ' ')));

console.log('\n--- FONT USAGE IN CSS ---');
const fontFamilies = css.match(/font-family:[^;]+/g) || [];
const uniqueFonts = [...new Set(fontFamilies)];
console.log(uniqueFonts);
