const { execSync } = require('child_process');
const fs = require('fs');

console.log('Building cinematic video with ffmpeg...');

const segments = [
  { img: 'public/assets/gem-valley.jpg', out: 'public/assets/seg1.mp4', filter: "scale=2160:-1,zoompan=z='min(zoom+0.0012,1.2)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30" },
  { img: 'public/assets/gem-shaft.jpg', out: 'public/assets/seg2.mp4', filter: "scale=2160:-1,zoompan=z='min(zoom+0.0010,1.18)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+ih/zoom*0.05':s=1920x1080:fps=30" },
  { img: 'public/assets/gem-washing.jpg', out: 'public/assets/seg3.mp4', filter: "scale=2160:-1,zoompan=z='min(zoom+0.0012,1.22)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30" },
  { img: 'public/assets/gem-loupe.jpg', out: 'public/assets/seg4.mp4', filter: "scale=2160:-1,zoompan=z='min(zoom+0.0010,1.18)':d=120:x='iw/2-(iw/zoom/2)+iw/zoom*0.03':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30" }
];

for (const seg of segments) {
  const cmd = `ffmpeg -y -loop 1 -i "${seg.img}" -vf "${seg.filter}" -t 4 -c:v libx264 -pix_fmt yuv420p "${seg.out}"`;
  console.log('Rendering segment:', seg.out);
  execSync(cmd, { stdio: 'inherit' });
}

console.log('Segments rendered. Now crossfading into seamless loop...');

const filterComplex = '[0:v][1:v]xfade=transition=fade:duration=0.8:offset=3.2[v01];[v01][2:v]xfade=transition=fade:duration=0.8:offset=6.4[v02];[v02][3:v]xfade=transition=fade:duration=0.8:offset=9.6[v03];[v03]format=yuv420p[vout]';

const joinCmd = `ffmpeg -y -i public/assets/seg1.mp4 -i public/assets/seg2.mp4 -i public/assets/seg3.mp4 -i public/assets/seg4.mp4 -filter_complex "${filterComplex}" -map "[vout]" -c:v libx264 -preset fast -crf 20 -movflags +faststart public/assets/island-of-gems.mp4`;

execSync(joinCmd, { stdio: 'inherit' });

// Also generate webm for broader browser support
const webmCmd = 'ffmpeg -y -i public/assets/island-of-gems.mp4 -c:v libvpx-vp9 -b:v 2M -crf 28 public/assets/island-of-gems.webm';
console.log('Rendering WebM version...');
execSync(webmCmd, { stdio: 'inherit' });

// Cleanup temp segments
for (const seg of segments) {
  if (fs.existsSync(seg.out)) fs.unlinkSync(seg.out);
}

const mp4Stats = fs.statSync('public/assets/island-of-gems.mp4');
const webmStats = fs.statSync('public/assets/island-of-gems.webm');
console.log('Created public/assets/island-of-gems.mp4:', mp4Stats.size, 'bytes');
console.log('Created public/assets/island-of-gems.webm:', webmStats.size, 'bytes');
