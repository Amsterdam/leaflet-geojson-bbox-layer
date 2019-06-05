import L from 'leaflet';

import { fetchJson } from './apiCall';
import geojsonBboxLayer from '../src/geojsonBboxLayer.js';

const url = 'https://map.data.amsterdam.nl/maps/meetbouten?Typename=meetbouten_status&REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326';

const greenIcon = L.divIcon({html: '<div class="square"></div>', iconSize: [16, 16], className: 'divIcon gray'});

export const getLayer = () => fetchJson(url).then(data => {
   return L.geoJSON(data, {
       pointToLayer(feature, latlng) {
           return L.marker(latlng, {icon: greenIcon});
       },
   });
});
