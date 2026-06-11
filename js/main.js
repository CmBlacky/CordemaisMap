import { PINGS } from './data/pings.js';
import { initMap } from './map/initMap.js';
import { initThreads } from './map/threads.js';
import { initMarkers } from './map/markers.js';
import { initOverlay } from './ui/overlay.js';

const map = initMap();
const threads = initThreads(map, PINGS);

let overlay;

const markers = initMarkers(map, PINGS, {
  onPingClick(ping) {
    overlay.open(ping);
  },
});

overlay = initOverlay(map, {
  onClosed() {
    const threadFrom = markers.revealNext();
    if (threadFrom !== null) {
      threads.addSegment(threadFrom, true);
    }
  },
});
