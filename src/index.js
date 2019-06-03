import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './main.css';
import geojsonBboxLayer from './layer/geojsonBboxLayer.js';

// const url = 'https://map.data.amsterdam.nl/maps/afval?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=plastic&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326';
const url = 'https://map.data.amsterdam.nl/maps/meetbouten?Typename=meetbouten_status&REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326';

const map = L.map('map');

map.setMaxZoom(20);
map.setView([
    52.3724724,
    4.9006668
], 18);

L.tileLayer('https://t1.data.amsterdam.nl/topo_wm/{z}/{x}/{y}.png').addTo(map);

const greenIcon = L.divIcon({className: 'divIcon green'});
const yellowIcon = L.divIcon({className: 'divIcon yellow'});
const redIcon = L.divIcon({className: 'divIcon red'});

const fetchRequest = (bbox_str) => {
    return fetch(`${url}&bbox=${bbox_str}`)
        .then(response => response.json())
        .then(json => {
            console.log('received: ', json); // eslint-disable-line no-console
            return json;
        })
        .catch((e) => {
            console.error('Error loading feature geojson', e); // eslint-disable-line no-console
        });
};

const bboxLayerOptions = {
    fetchRequest,
};
const geojsonLayerOptions = {
    zoomMin: 18,

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
                console.log(_layer.feature.properties)
            }
        });
    }
};

const customLayer = geojsonBboxLayer(bboxLayerOptions, geojsonLayerOptions);
customLayer.addTo(map);
