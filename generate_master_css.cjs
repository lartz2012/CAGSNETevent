const fs = require('fs');

let css = fs.readFileSync('ref_styles.css', 'utf8');

// Replace :root definitions
css = css.replace(/:root\{[^}]+\}/, `:root{
  --ink: #050a12;
  --accent: #d4af37;
  --paper: #edf2f7;
  --muted: #94a3b8;
  --line: #1c2738;
  --amber: #d4af37;
  --sapphire: #1a4cd2;
  --padparadscha: #f4a261;
  --mist: #c5d4ea;
  --surface: #0a1322;
  --pad: clamp(24px, 4.6vw, 88px);
  --display: Display, Impact, 'Arial Narrow', sans-serif;
}`);

// Replace haunted greens with sapphire obsidian & gold
css = css.replace(/#090f0ef0/g, '#050a12f0');
css = css.replace(/#090f0e/g, '#050a12');
css = css.replace(/#0c1713/g, '#070f1e');
css = css.replace(/#192a23/g, '#0b172a');
css = css.replace(/#070e0a/g, '#03070f');
css = css.replace(/#243c3099/g, '#0d224299');
css = css.replace(/#35463d/g, '#1e2d42');
css = css.replace(/#dfe4d5/g, '#e2e8f0');
css = css.replace(/#b3c0ab/g, '#94a3b8');

// Add styles for the box office modal, ticket generation, and audio toggle
const additionalCSS = `
/* Additional bespoke modal & audio controls matching exact reference aesthetic */
.site-modal {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: rgba(3, 7, 15, 0.94);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--pad);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.site-modal.is-active {
  opacity: 1;
  pointer-events: auto;
}
.modal-dialog {
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--paper);
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: transparent;
  border: 0;
  color: var(--muted);
  font-family: SpaceMono, monospace;
  font-size: 14px;
  cursor: pointer;
}
.modal-close:hover {
  color: var(--accent);
}
.ticket-form input, .ticket-form select {
  width: 100%;
  padding: 14px 16px;
  background: #050a12;
  border: 1px solid var(--line);
  color: var(--paper);
  font-family: SpaceMono, monospace;
  font-size: 13px;
  margin-top: 6px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.ticket-form input:focus, .ticket-form select:focus {
  outline: 1px solid var(--accent);
  border-color: var(--accent);
}
.ticket-form label {
  font-family: SpaceMono, monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .11em;
  color: var(--muted);
  display: block;
}
.hologram-badge {
  border: 1px dashed var(--accent);
  background: linear-gradient(135deg, rgba(212,175,55,0.08), rgba(26,76,210,0.08));
  padding: 30px;
  margin-top: 25px;
  text-align: left;
}
.hologram-badge h4 {
  font-family: var(--display);
  font-size: 32px;
  line-height: 1;
  color: var(--paper);
  margin-bottom: 8px;
}
.audio-toggle-compact {
  position: fixed;
  bottom: 25px;
  right: var(--pad);
  z-index: 45;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--paper);
  padding: 10px 18px;
  font-family: SpaceMono, monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .11em;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.audio-toggle-compact:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.audio-bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
}
.audio-bars i {
  width: 2px;
  height: 3px;
  background: currentColor;
  display: block;
}
.audio-bars.is-playing i:nth-child(1) { animation: soundwave 1s ease-in-out infinite; }
.audio-bars.is-playing i:nth-child(2) { animation: soundwave 0.8s ease-in-out infinite 0.2s; }
.audio-bars.is-playing i:nth-child(3) { animation: soundwave 1.2s ease-in-out infinite 0.1s; }
.audio-bars.is-playing i:nth-child(4) { animation: soundwave 0.9s ease-in-out infinite 0.3s; }
@keyframes soundwave {
  0%, 100% { height: 3px; }
  50% { height: 12px; }
}
`;

css += additionalCSS;

fs.writeFileSync('style.css', css);
console.log('Successfully written master style.css (size:', css.length, 'bytes)');
