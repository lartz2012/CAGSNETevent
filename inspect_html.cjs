const fs = require('fs');

const html = fs.readFileSync('hauntedbouldercity.html', 'utf8');

// Print main sections
const sectionMatches = html.match(/<section[^>]*>[\s\S]*?<\/section>/gi) || [];
console.log('Total sections:', sectionMatches.length);

sectionMatches.forEach((sec, idx) => {
    const classMatch = sec.match(/class="([^"]+)"/);
    const idMatch = sec.match(/id="([^"]+)"/);
    const h1Match = sec.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h2Match = sec.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    console.log(`\n--- SECTION ${idx+1} [id: ${idMatch ? idMatch[1] : 'none'}, class: ${classMatch ? classMatch[1] : 'none'}] ---`);
    if (h1Match) console.log('H1:', h1Match[1].replace(/\s+/g, ' ').trim());
    if (h2Match) console.log('H2:', h2Match[1].replace(/\s+/g, ' ').trim());
    console.log('Snippet:', sec.slice(0, 350).replace(/\s+/g, ' '));
});

// Print header markup
const headerMatch = html.match(/<header[^>]*>[\s\S]*?<\/header>/i);
if (headerMatch) {
    console.log('\n=== HEADER MARKUP ===');
    console.log(headerMatch[0]);
}

// Print nav markup
const navMatch = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
if (navMatch) {
    console.log('\n=== NAV MARKUP ===');
    console.log(navMatch[0].slice(0, 800));
}
