const fs = require('fs');

const buf = fs.readFileSync('D:/CAGSNETEVENT26/SPONSORSHIP PROPOSAL .pdf');

// Look for image objects: /Subtype /Image
// Usually stream followed by image data (JPEG / DCTDecode or Flate)
let pos = 0;
let imgCount = 0;
while ((pos = buf.indexOf('/Subtype /Image', pos)) !== -1) {
    imgCount++;
    console.log(`Image ${imgCount} found around offset ${pos}`);
    // find nearest stream after pos
    let streamPos = buf.indexOf('stream', pos);
    let endStreamPos = buf.indexOf('endstream', streamPos);
    // check filter
    let header = buf.slice(pos, streamPos).toString('latin1');
    console.log(`Image ${imgCount} header snippet:`, header.slice(0, 200).replace(/\s+/g, ' '));
    if (header.includes('/DCTDecode')) {
        // It is a JPEG!
        let sStart = streamPos + 6;
        if (buf[sStart] === 0x0d && buf[sStart+1] === 0x0a) sStart += 2;
        else if (buf[sStart] === 0x0a || buf[sStart] === 0x0d) sStart += 1;
        const jpgData = buf.slice(sStart, endStreamPos);
        fs.writeFileSync(`extracted_pdf_img_${imgCount}.jpg`, jpgData);
        console.log(`Saved extracted_pdf_img_${imgCount}.jpg (${jpgData.length} bytes)`);
    }
    pos = endStreamPos + 9;
}
console.log('Total images found:', imgCount);
