// CAGSNet 26 Animation & Interaction Engine
// Strictly following Haunted Boulder City scrolly-telling, horizontal tracking, and micro-motion

(() => {
  'use strict';

  // -------------------------------------------------------------
  // 1. SELECTORS & ELEMENT CACHE
  // -------------------------------------------------------------
  const progressBar = document.querySelector('.scroll-progress');
  const hero = document.querySelector('.hero');
  const heroMedia = document.querySelector('.hero-media img');
  const heroTitle = document.querySelector('#hero-title');
  const siteLoader = document.getElementById('site-loader');
  
  // Menu
  const menuButton = document.querySelector('.menu-toggle');
  const menuText = document.querySelector('.menu-toggle-text');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.site-nav-list a');

  // Stories Pin & Track (Horizontal Scrollytelling)
  const stories = document.querySelector('.stories-scroll');
  const storiesPin = document.querySelector('.stories-pin');
  const track = document.querySelector('.story-track');
  const storyScenes = [...document.querySelectorAll('.story')];
  const storyTabs = [...document.querySelectorAll('.story-tabs button')];
  const storyCountCurrent = document.querySelector('.story-count-current');

  // Highlights Atmosphere
  const highlights = document.querySelector('.tour-highlights');
  const topics = [...document.querySelectorAll('.topic')];
  const topicImages = [...document.querySelectorAll('.highlights-atmosphere img')];

  // Modals
  const boxOfficeModal = document.getElementById('box-office-modal');
  const openBoxOfficeBtn = document.getElementById('open-box-office-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const accreditationForm = document.getElementById('accreditation-form');
  const badgeDisplay = document.getElementById('badge-display');
  const passName = document.getElementById('pass-name');
  const passSector = document.getElementById('pass-sector');
  const tierTriggers = document.querySelectorAll('.tier-trigger');

  // Calendar
  const downloadIcsLink = document.getElementById('download-ics-link');

  // Audio
  const audioToggle = document.getElementById('audio-toggle');
  const audioBars = document.getElementById('audio-bars');
  const audioStateLabel = document.getElementById('audio-state');

  let activeTopic = -1;
  let scheduled = false;
  let heroHeight = 800;

  const clamp = (val, min = 0, max = 1) => Math.min(max, Math.max(min, val));

  // -------------------------------------------------------------
  // 2. PRELOADER DISMISSAL
  // -------------------------------------------------------------
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (siteLoader) {
        siteLoader.style.opacity = '0';
        siteLoader.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
          siteLoader.style.display = 'none';
        }, 600);
      }
    }, 450);
  });

  // -------------------------------------------------------------
  // 3. MENU TOGGLE (EXACT REFERENCE PATTERN)
  // -------------------------------------------------------------
  let menuTimer = 0;
  const menuOpen = () => siteNav?.classList.contains('is-open');

  const closeMenu = () => {
    if (!menuOpen()) return;
    siteNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuText) menuText.textContent = 'Menu';
    document.documentElement.classList.remove('menu-open');
    clearTimeout(menuTimer);
    menuTimer = setTimeout(() => {
      if (siteNav) siteNav.hidden = true;
    }, 500);
  };

  const openMenu = () => {
    clearTimeout(menuTimer);
    if (siteNav) siteNav.hidden = false;
    requestAnimationFrame(() => {
      siteNav?.classList.add('is-open');
      menuButton?.setAttribute('aria-expanded', 'true');
      if (menuText) menuText.textContent = 'Close';
      document.documentElement.classList.add('menu-open');
    });
  };

  menuButton?.addEventListener('click', () => {
    if (menuOpen()) closeMenu();
    else openMenu();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // -------------------------------------------------------------
  // 4. HIGHLIGHTS ATMOSPHERE RENDERER
  // -------------------------------------------------------------
  function renderHighlights() {
    if (!highlights || topics.length === 0) return;
    const bounds = highlights.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;

    const focus = window.innerHeight * 0.52;
    let nearest = 0;
    let minDistance = Infinity;

    topics.forEach((topic, i) => {
      const rect = topic.getBoundingClientRect();
      const delta = Math.abs(rect.top + rect.height * 0.4 - focus);
      if (delta < minDistance) {
        minDistance = delta;
        nearest = i;
      }
    });

    if (nearest !== activeTopic) {
      activeTopic = nearest;
      topics.forEach((topic, i) => topic.classList.toggle('is-current', i === nearest));
      const targetTopic = topics[nearest].getAttribute('data-topic');
      topicImages.forEach(image => {
        image.classList.toggle('is-active', image.getAttribute('data-topic-image') === targetTopic);
      });
    }
  }

  // -------------------------------------------------------------
  // 5. MAIN SCROLL / RENDER LOOP
  // -------------------------------------------------------------
  function render() {
    scheduled = false;
    const y = Math.max(0, window.scrollY);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Top Progress bar
    if (progressBar && docHeight > 0) {
      progressBar.style.transform = `scaleX(${clamp(y / docHeight)})`;
    }

    // Hero media subtle parallax
    if (heroMedia && hero && y < heroHeight + 150) {
      heroMedia.style.transform = `translate3d(0, ${y * 0.22}px, 0) scale(${1 + y * 0.00008})`;
      if (heroTitle) {
        heroTitle.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
        heroTitle.style.opacity = String(clamp(1 - y / (heroHeight * 0.85)));
      }
    }

    // Horizontal Stories Scroll Track (Exact Haunted Boulder City Reference Physics)
    if (stories && track && storiesPin && storyScenes.length > 0) {
      const rect = stories.getBoundingClientRect();
      const storyTop = window.scrollY + rect.top;
      const storyTravel = Math.max(1, stories.offsetHeight - window.innerHeight);
      
      const p = clamp((y - storyTop) / storyTravel);
      const numPanels = storyScenes.length;
      const maxStage = Math.max(1, numPanels - 1);
      const stage = p * maxStage;
      const segment = Math.min(maxStage - 1, Math.floor(stage));
      const fraction = stage - segment;
      
      // Hold for reading, then smooth cubic ease
      const transition = clamp((fraction - 0.16) / 0.68);
      const ease = transition * transition * (3 - 2 * transition);
      const position = segment + ease;
      
      const panelWidth = storiesPin.clientWidth || window.innerWidth;
      track.style.transform = `translate3d(${-position * panelWidth}px, 0, 0)`;
      
      // Counter-travel on story backgrounds for subtle parallax depth
      storyScenes.forEach((scene, i) => {
        const bg = scene.querySelector('.story-background');
        if (bg) {
          const shift = clamp(position - i, -1, 1) * panelWidth * 0.40;
          bg.style.transform = `translate3d(${shift}px, 0, 0)`;
        }
      });

      // Update active tab and counter indicator
      const activeIdx = Math.round(position);
      storyTabs.forEach((tab, i) => {
        tab.classList.toggle('is-active', i === activeIdx);
      });
      if (storyCountCurrent) {
        storyCountCurrent.textContent = `0${activeIdx + 1}`;
      }
    }

    // Highlights Atmosphere Image cross-fade
    renderHighlights();
  }

  function requestTick() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', () => {
    if (hero) heroHeight = hero.offsetHeight;
    requestTick();
  });

  if (hero) heroHeight = hero.offsetHeight;
  requestTick();

  // Story Tabs Click Navigation
  storyTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      if (!stories) return;
      const rect = stories.getBoundingClientRect();
      const storyTop = window.scrollY + rect.top;
      const storyTravel = Math.max(1, stories.offsetHeight - window.innerHeight);
      const maxStage = Math.max(1, storyScenes.length - 1);
      const targetY = storyTop + (index / maxStage) * storyTravel;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  // -------------------------------------------------------------
  // 6. ACCREDITATION BOX OFFICE MODAL
  // -------------------------------------------------------------
  function openModal() {
    if (boxOfficeModal) {
      boxOfficeModal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (boxOfficeModal) {
      boxOfficeModal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  openBoxOfficeBtn?.addEventListener('click', openModal);
  closeModalBtn?.addEventListener('click', closeModal);

  boxOfficeModal?.addEventListener('click', (e) => {
    if (e.target === boxOfficeModal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  tierTriggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  accreditationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('delegate-name').value;
    const sector = document.getElementById('delegate-sector').value;

    if (passName) passName.textContent = name.toUpperCase();
    if (passSector) passSector.textContent = `SECTOR: ${sector.toUpperCase()}`;
    if (badgeDisplay) badgeDisplay.style.display = 'block';

    playTone(528);
  });

  // -------------------------------------------------------------
  // 7. CALENDAR (.ICS) EVENT GENERATOR
  // -------------------------------------------------------------
  function downloadIcs() {
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ceylon Academy of Gemmological Science//CAGSNet 26//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:CAGSNet 26 | VVIP Gemmological Networking Gala
DESCRIPTION:Ceylon Academy of Gemmological Science presents CAGSNet 26: The premier networking gala and launch of the CAGSNET digital ecosystem. Uniting 2,000+ alumni, miners, lapidarists, and global stakeholders.
LOCATION:Grand Ballroom, Waters Edge, Battaramulla, Sri Lanka
DTSTART:20261029T123000Z
DTEND:20261029T173000Z
STATUS:CONFIRMED
CATEGORIES:NETWORKING,GEMMOLOGY,GALA
URL:https://cagsnet.com
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'CAGSNet26-WatersEdge.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  downloadIcsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    downloadIcs();
  });

  // -------------------------------------------------------------
  // 8. WEB AUDIO API SYNTHESIZED SOUNDSCAPE
  // -------------------------------------------------------------
  let audioCtx = null;
  let isPlaying = false;
  let osc1 = null, osc2 = null, masterGain = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function startAudio() {
    initAudio();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 2.5);
    masterGain.connect(audioCtx.destination);

    // 108Hz Sacred gem resonance
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(108, audioCtx.currentTime);

    // 432Hz Quartz crystal harmonic
    osc2 = audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(432, audioCtx.currentTime);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, audioCtx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);

    osc1.start();
    osc2.start();

    isPlaying = true;
    if (audioStateLabel) audioStateLabel.textContent = 'ON';
    audioBars?.classList.add('is-playing');
  }

  function stopAudio() {
    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        try {
          osc1?.stop();
          osc2?.stop();
        } catch (e) {}
      }, 800);
    }
    isPlaying = false;
    if (audioStateLabel) audioStateLabel.textContent = 'OFF';
    audioBars?.classList.remove('is-playing');
  }

  audioToggle?.addEventListener('click', () => {
    if (!isPlaying) startAudio();
    else stopAudio();
  });

  function playTone(freq = 432) {
    if (!isPlaying || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {}
  }

  document.querySelectorAll('.button, .topic, .tier-trigger').forEach(el => {
    el.addEventListener('mouseenter', () => playTone(Math.floor(380 + Math.random() * 240)));
  });

})();
