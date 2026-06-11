import { formatLat, formatLng, formatTime } from '../utils/format.js';

export function initOverlay(map, { onClosed }) {
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayCategory = document.getElementById('overlay-category');
  const overlayCoords = document.getElementById('overlay-coords');
  const overlayImageWrap = document.getElementById('overlay-image-wrap');
  const overlayImage = document.getElementById('overlay-image');
  const overlayImageCap = document.getElementById('overlay-image-caption');
  const overlayText = document.getElementById('overlay-text');
  const audioElement = document.getElementById('audio-element');
  const overlayClose = document.getElementById('overlay-close');
  const overlayBackdrop = document.getElementById('overlay-backdrop');
  const overlayPanel = document.getElementById('overlay-panel');
  let fadeTimer = null;
  const fadeDuration = 400;
  const fadeStep = 40;

  function clearFade() {
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
  }

  function fadeTo(targetVolume, onComplete) {
    clearFade();
    const startVolume = audioElement.volume;
    const delta = targetVolume - startVolume;
    if (delta === 0) {
      if (onComplete) onComplete();
      return;
    }
    const steps = Math.max(1, Math.ceil(fadeDuration / fadeStep));
    let currentStep = 0;
    fadeTimer = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / steps;
      audioElement.volume = Math.min(1, Math.max(0, startVolume + delta * progress));
      if (currentStep >= steps) {
        clearFade();
        audioElement.volume = targetVolume;
        if (onComplete) onComplete();
      }
    }, fadeStep);
  }

  function stopAudio({ fade = false } = {}) {
    clearFade();
    if (!audioElement.src || audioElement.paused) {
      audioElement.volume = 1;
      return;
    }

    if (fade) {
      fadeTo(0, () => {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.volume = 1;
      });
    } else {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.volume = 1;
    }
  }

  function open(ping) {
    stopAudio();

    overlayTitle.textContent = ping.title;
    overlayCategory.textContent = ping.category || '';
    overlayCoords.textContent = `${formatLat(ping.lat)}  ${formatLng(ping.lng)}`;

    if (ping.image?.src) {
      overlayImageWrap.classList.remove('overlay-section-hidden');
      overlayImage.src = ping.image.src;
      overlayImage.alt = ping.image.alt || '';
      overlayImageCap.textContent = ping.image.caption || '';
    } else {
      overlayImageWrap.classList.add('overlay-section-hidden');
      overlayImage.src = '';
      overlayImage.alt = '';
    }

    if (ping.description) {
      overlayText.classList.remove('overlay-section-hidden');
      overlayText.innerHTML = ping.description;
    } else {
      overlayText.classList.add('overlay-section-hidden');
      overlayText.innerHTML = '';
    }

    if (ping.audio?.src) {
      audioElement.src = ping.audio.src;
      audioElement.load();
      audioElement.volume = 0;
      audioElement.play().then(() => {
        fadeTo(1);
      }).catch(() => {
        // Ignore playback failure silently.
      });
    } else {
      audioElement.src = '';
    }

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    overlayClose.focus();
    map.scrollWheelZoom.disable();
    map.dragging.disable();
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    stopAudio({ fade: true });
    onClosed();

    setTimeout(() => {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
    }, 200);
  }

  overlayClose.addEventListener('click', close);
  overlayBackdrop.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      close();
    }
  });

  overlayPanel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      overlayPanel.querySelectorAll('button:not([disabled])')
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  return { open, close };
}
