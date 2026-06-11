/**
 * Fils rouges courbes entre pings consécutifs (effet gravité).
 */
export function initThreads(map, pings) {
  map.createPane('threadsPane');
  map.getPane('threadsPane').classList.add('leaflet-threads-pane');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'threads-svg');
  svg.setAttribute('aria-hidden', 'true');
  map.getPane('threadsPane').appendChild(svg);

  const paths = [];

  function threadPathD(latlngA, latlngB) {
    const a = map.latLngToLayerPoint(latlngA);
    const b = map.latLngToLayerPoint(latlngB);
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const sag = Math.min(len * 0.22, 55) + 8;
    const ctrlX = midX - (dy / len) * sag * 0.15;
    const ctrlY = midY + sag;
    return `M ${a.x} ${a.y} Q ${ctrlX} ${ctrlY} ${b.x} ${b.y}`;
  }

  function resizeSvg() {
    const size = map.getSize();
    svg.setAttribute('width', size.x);
    svg.setAttribute('height', size.y);
    svg.style.width = `${size.x}px`;
    svg.style.height = `${size.y}px`;
  }

  function redraw() {
    resizeSvg();
    paths.forEach((pathEl, i) => {
      const from = pings[i];
      const to = pings[i + 1];
      pathEl.setAttribute(
        'd',
        threadPathD(L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng))
      );
    });
  }

  function addSegment(fromIndex, animate = true) {
    if (fromIndex >= pings.length - 1) return;
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('class', `thread-path${animate ? ' thread-new' : ''}`);
    svg.appendChild(pathEl);
    paths.push(pathEl);
    redraw();
  }

  map.on('move zoom resize viewreset', redraw);
  resizeSvg();

  return { addSegment, redraw };
}
