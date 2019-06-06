import { fetchJson } from './apiCall';
import geojsonBboxLayer from '../src/geojsonBboxLayer.js';

const url = 'https://map.data.amsterdam.nl/maps/parkeervakken?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=fiscaal_parkeervakken&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326';

const fetchRequest = (bbox_str) => fetchJson(`${url}&bbox=${bbox_str}`);

const selection = new Set([]);

const bboxLayerOptions = {
    fetchRequest,
};

const baseStyle = {
    "weight": 5,
    "opacity": 0.65
};

const getStyle = (isSelected) => {
    const color = isSelected ? "#ff00ff" : "#4de1ff";
    return {
        ...baseStyle,
        color,
    }
};

const geojsonLayerOptions = {
    zoomMin: 18,

    style(feature) {
        const { id } = feature.properties;
        return getStyle(selection.has(id));
    },

    onEachFeature(feature, layer) {
        const { id } = feature.properties;

        layer.on({
            click: (e) => {
                const _layer = e.target;

                if (selection.has(id))
                    selection.delete(id);
                else
                    selection.add(id);

                _layer.setStyle(getStyle(selection.has(id)))
            }
        });
    }
};

export default geojsonBboxLayer(bboxLayerOptions, geojsonLayerOptions);
