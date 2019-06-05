import geojsonBboxLayer from '../src/geojsonBboxLayer.js';

import { fetchJson } from './apiCall';

const url = 'https://map.data.amsterdam.nl/maps/afval?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=plastic&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326';
const fetchRequest = (bbox_str) => fetchJson(`${url}&bbox=${bbox_str}`);

const bboxLayerOptions = {
    fetchRequest,
};

const geojsonLayerOptions = {
    zoomMin: 18,

    onEachFeature(feature, layer) {
        layer.on({
            click: (e) => {
                const _layer = e.target;
                console.log('clicked feature: ', _layer.feature) // eslint-disable-line no-console
            }
        });
    }
};

export default geojsonBboxLayer(bboxLayerOptions, geojsonLayerOptions);
