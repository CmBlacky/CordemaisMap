/**
 * Marqueurs progressifs : un seul ping au départ, les suivants
 * apparaissent à la fermeture de la pop-up du point courant.
 */
export function initMarkers(map, pings, { onPingClick }) {
  const markers = [];
  let revealedCount = 1;
  let viewedIndex = null;

  const pingTotalEl = document.getElementById('ping-total');
  const pingProgressEl = document.getElementById('ping-progress');
  pingTotalEl.textContent = pings.length;

  function updateProgress() {
    pingProgressEl.textContent = revealedCount;
  }

  function buildWrapper(ping, { reveal = false } = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = `ping-wrapper ping-type-${ping.type}${reveal ? ' ping-reveal' : ''}`;
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('tabindex', '0');
    wrapper.setAttribute('aria-label', `Ping : ${ping.title}`);

    if (ping.label) {
      const label = document.createElement('span');
      label.className = 'ping-label';
      label.textContent = ping.label;
      wrapper.appendChild(label);
    }

    const pin = document.createElement('div');
    pin.className = 'ping-pin';
    pin.innerHTML = '<span class="pin-shadow" aria-hidden="true"></span><span class="pin-head" aria-hidden="true"></span>';
    wrapper.appendChild(pin);
    return wrapper;
  }

  function makeIcon(wrapper) {
    return L.divIcon({
      html: wrapper.outerHTML,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  }

  function addMarker(index, { animate = false } = {}) {
    const ping = pings[index];
    const wrapper = buildWrapper(ping, { reveal: animate });
    const marker = L.marker([ping.lat, ping.lng], {
      icon: makeIcon(wrapper),
      title: ping.title,
      keyboard: true,
      riseOnHover: true,
      riseOffset: 250,
    });

    marker.on('click', () => {
      if (index >= revealedCount) return;
      viewedIndex = index;
      onPingClick(ping, index);
    });

    marker.on('keydown', (e) => {
      if (index >= revealedCount) return;
      const key = e.originalEvent.key;
      if (key === 'Enter' || key === ' ') {
        e.originalEvent.preventDefault();
        viewedIndex = index;
        onPingClick(ping, index);
      }
    });

    marker.addTo(map);
    markers[index] = marker;
    return marker;
  }

  addMarker(0);
  updateProgress();

  function revealNext() {
    if (viewedIndex === null) return null;
    if (viewedIndex !== revealedCount - 1) {
      viewedIndex = null;
      return null;
    }
    if (revealedCount >= pings.length) {
      viewedIndex = null;
      return null;
    }

    const threadFromIndex = viewedIndex;
    const nextIndex = revealedCount;
    revealedCount += 1;
    addMarker(nextIndex, { animate: true });
    updateProgress();
    viewedIndex = null;
    return threadFromIndex;
  }

  function getRevealedCount() {
    return revealedCount;
  }

  return { revealNext, getRevealedCount };
}
