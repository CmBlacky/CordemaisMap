import { MAP_CENTER, MAP_ZOOM, TILE_FILTER, TILE_URL, TILE_ATTRIBUTION } from '../config.js';
import { formatLat, formatLng } from '../utils/format.js';

export function initMap() {
  const map = L.map('map', {
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    zoomControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    boxZoom: false,
    keyboard: true,
    attributionControl: true,
  });

  L.tileLayer(TILE_URL, {
    maxZoom: 19,
    attribution: TILE_ATTRIBUTION,
  }).addTo(map);

  map.getContainer().querySelectorAll('.leaflet-tile-pane').forEach((el) => {
    el.style.filter = TILE_FILTER;
  });

  const coordLatEl = document.getElementById('coord-lat');
  const coordLngEl = document.getElementById('coord-lng');

  function updateCoordsDisplay() {
    const c = map.getCenter();
    coordLatEl.textContent = formatLat(c.lat);
    coordLngEl.textContent = formatLng(c.lng);
  }

  map.on('move', updateCoordsDisplay);
  updateCoordsDisplay();

  return map;
}
