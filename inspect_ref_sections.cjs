const fs = require('fs');

const css = fs.readFileSync('ref_styles.css', 'utf8');

// Print main CSS structure and media queries
console.log('Total CSS length:', css.length);

// Extract all top-level selectors
const selectors = css.match(/(?:^|\})([^{]+)\{/g) || [];
console.log('Unique selector blocks:', selectors.length);

// Print first 40 selector blocks
console.log('First 40 blocks:');
for (let i = 0; i < Math.min(40, selectors.length); i++) {
    console.log(selectors[i].replace(/[{}'"]/g, '').trim());
}
