const fs = require('fs');

const html = fs.readFileSync('hauntedbouldercity.html', 'utf8');

// Match sections by id
const ids = ['home', 'about', 'stories', 'highlights-title', 'zombies', 'plan', 'local', 'tickets'];
ids.forEach(id => {
    const reg = new RegExp('<section[^>]*id="' + id + '"[\\s\\S]*?<\\/section>', 'i');
    const m = html.match(reg);
    if (m) {
        console.log(`\n================ ID: ${id} ================`);
        console.log(m[0].slice(0, 1800));
    }
});
