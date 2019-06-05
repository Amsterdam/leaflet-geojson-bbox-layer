import L from 'leaflet';

import { fetchJson } from './apiCall';
import geojsonBboxLayer from '../src/geojsonBboxLayer.js';

const url = 'https://map.data.amsterdam.nl/maps/meetbouten?Typename=meetbouten_status&REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326';

const greenIcon = L.divIcon({html: '<div class="square"></div>', iconSize: [16, 16], className: 'divIcon green'});
const yellowIcon = L.divIcon({html: '<div class="square"></div>', iconSize: [16, 16], className: 'divIcon yellow'});
const redIcon = L.divIcon({html: '<div class="square"></div>', iconSize: [16, 16], className: 'divIcon red'});

const fetchRequest = (bbox_str) => fetchJson(`${url}&bbox=${bbox_str}`);

const bboxLayerOptions = {
    fetchRequest,
};
const geojsonLayerOptions = {
    zoomMin: 16,

    pointToLayer(feature, latlng) {
        let icon;
        const speed = feature.properties.zakkingssnelheid;
        if (speed < 0.5) icon = greenIcon;
        else if (speed < 2.0) icon = yellowIcon;
        else icon = redIcon;

        return L.marker(latlng, {icon: icon});
    },

    onEachFeature(feature, layer) {
        layer.on({
            click: (e) => {
                const _layer = e.target;
                const icon = _layer._icon;

                L.DomUtil.addClass(icon, 'animate');
                icon.addEventListener('animationend', () => {
                    L.DomUtil.removeClass(icon, 'animate');
                }, { once: true });

                console.log('clicked feature: ', _layer.feature) // eslint-disable-line no-console
            }
        });
    }
};

export default geojsonBboxLayer(bboxLayerOptions, geojsonLayerOptions);
