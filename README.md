# Leaflet Geojson bbox layer

Leaflet layer for drawing geojson data based current view bounding box.
This allows for easy interactive elements (e.g. click handlers) even with (very) large feature sets.

Layer is an extension of Leaflet's own GeoJSON layer 
([doc](https://leafletjs.com/reference-1.5.0.html#geojson) and [example](https://leafletjs.com/examples/geojson/)).

This new layer will handle calling the user provided `fetchRequest` function with a bounding box.
The string is of the form: `4.89,52.37,4.91,52.38` or `west,south,east,north`.
This function should return a geojson object. 

The main benefit of this layer is that only a subset of the data is displayed because the whole is to much of a performance hit.
Therefor you'll probably want to limit showing the layer for when zoomed out.
If you set a value `zoomMin` value on the geojson layer this value will both hide the layer and pause fetching new data. 

# Usage

```javascript
import L from 'leaflet';
import geojsonBboxLayer from '../src/geojsonBboxLayer.js';

const url = 'https://map.data.amsterdam.nl/maps/meetbouten?Typename=meetbouten_status&REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326';
const fetchRequest = (bbox_str) => fetch(`${url}&bbox=${bbox_str}`).then(response => response.json());

// Options specific to bbox geojson layer
const bboxLayerOptions = {
    fetchRequest, // function that returns geojson feature list for a given bounding box string
};

// Leaflet geojson layer options, see: https://leafletjs.com/reference-1.5.0.html#geojson-pointtolayer
const geojsonLayerOptions = {
    zoomMin: 16,

    // Use pointToLayer to create your own marker: https://leafletjs.com/reference-1.5.0.html#geojson-pointtolayer
    // See example code how to use feature to style marker


    // Use onEachFeature if you need a event listener: onEachFeature
    // See example how to add a click listener
};

const myLayer = geojsonBboxLayer(bboxLayerOptions, geojsonLayerOptions);

const mapContainer = document.querySelector('#map');
const map = L.map(mapContainer);
map.setView([52.3724724, 4.9006668], 18);
L.tileLayer('https://t1.data.amsterdam.nl/topo_wm/{z}/{x}/{y}.png', { minZoom: 1, maxZoom: 20, maxNativeZoom: 18 })
    .addTo(map);
myLayer.addTo(map);
```

# Development
## Install
```
npm install
```

## Run
```
npm start
```

Site available at http://localhost:8080

## Test

```
npm test
```

and

```
npm run lint
```
