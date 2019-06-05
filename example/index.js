import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './main.css';
import vanillaLayerPromise from './vanillaLayer';
import pointsLayer from './pointsLayer';
import polygonLayer from './polygonLayer';

const zoomLevelEl = document.querySelector('.zoom-level');
const map = L.map('map');

map.setMaxZoom(20);
map.setView([
    52.3724724,
    4.9006668
], 18);

L.tileLayer('https://t1.data.amsterdam.nl/topo_wm/{z}/{x}/{y}.png', { minZoom: 1, maxZoom: 20, maxNativeZoom: 18 }).addTo(map);

const updateZoomLevel = () => {
    const zoom = map.getZoom();
    zoomLevelEl.innerHTML = zoom;
};
updateZoomLevel();
map.addEventListener('zoomend', updateZoomLevel);

const layersConfig = {
    'bbox_points': {
        layer: pointsLayer,
        isVisible: true
    },
    'bbox_polygons': {
        layer: polygonLayer,
        isVisible: true
    },
};

const updateMapLayers = () => {
    for (const { isVisible, layer } of Object.values(layersConfig)) {
        if (isVisible) {
            layer.addTo(map)
        } else {
            layer.remove();
        }
    }
};
updateMapLayers();

const layerCheckboxes = document.querySelectorAll('.layers-control');
layerCheckboxes.forEach(checkbox => checkbox.addEventListener('change', () => {
    layersConfig[checkbox.value].isVisible = checkbox.checked;
    updateMapLayers();
}));


vanillaLayerPromise.then(vanillaLayer => {
    const checkbox = document.querySelector('input[value="vanilla"]');
    checkbox.disabled = false;
    checkbox.closest('.control').classList.remove('disabled');
    layersConfig['vanilla'] = {
        layer: vanillaLayer,
        isVisible: false
    };
    updateMapLayers();
});
