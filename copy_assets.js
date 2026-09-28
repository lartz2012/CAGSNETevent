const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Lakshan\\.gemini\\antigravity-ide\\brain\\7db3de6b-ece8-4ce7-8ac8-f537bee0265e';
const destDir = path.join(__dirname, 'public', 'assets');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const images = [
    { src: 'cags_hero_gem_1790575661101.jpg', dest: 'hero-gem.jpg' },
    { src: 'cags_origin_mining_1790575687981.jpg', dest: 'origin-mining.jpg' },
    { src: 'cags_cutting_craft_1790575708740.jpg', dest: 'cutting-craft.jpg' },
    { src: 'cags_global_trade_1790575724838.jpg', dest: 'global-trade.jpg' },
    { src: 'cags_venue_watersedge_1790575743238.jpg', dest: 'venue-watersedge.jpg' },
    { src: 'cags_digital_platform_1790575766540.jpg', dest: 'digital-platform.jpg' },
    { src: 'cags_jewelry_craft_1790575792302.jpg', dest: 'jewelry-craft.jpg' },
    { src: 'cags_insignia_seal_1790575818025.jpg', dest: 'cags-seal.jpg' },
];

images.forEach(img => {
    const s = path.join(srcDir, img.src);
    const d = path.join(destDir, img.dest);
    if (fs.existsSync(s)) {
        fs.copyFileSync(s, d);
        console.log(`Copied ${img.src} -> ${img.dest}`);
    } else {
        console.warn(`File not found: ${s}`);
    }
});
