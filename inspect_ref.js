const https = require('https');

https.get('https://www.hauntedbouldercity.com/', res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('Page length:', data.length);
        const scripts = data.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/g) || [];
        console.log('Scripts:', scripts.slice(0, 10));
        const css = data.match(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g) || [];
        console.log('CSS:', css.slice(0, 10));
        const fontMatches = data.match(/font-family:[^;]+/g) || [];
        console.log('Inline fonts:', fontMatches.slice(0, 10));
        const fontLinks = data.match(/fonts\.googleapis\.com[^\s"']+/g) || [];
        console.log('Google fonts:', fontLinks);
    });
});
