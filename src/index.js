import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './main.css';

const map = L.map('map');

map.setView([
    52.3724724,
    4.9006668
], 13);

L.tileLayer('https://t1.data.amsterdam.nl/topo_wm/{z}/{x}/{y}.png').addTo(map);
