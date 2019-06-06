# Leaflet Geojson bbox layer

[![Netlify Status](https://api.netlify.com/api/v1/badges/c2e0da1e-9aa0-4fd3-a498-16a32dc981bc/deploy-status)](https://app.netlify.com/sites/leaflet-geojson-bbox-layer/deploys)

Leaflet layer for drawing GeoJSON data based on the current view bounding box.
This allows for easy interactive elements (e.g. click handlers) even with (very) large feature sets.

Layer is an extension of Leaflet's own GeoJSON layer 
([doc](https://leafletjs.com/reference-1.5.0.html#geojson) and [example](https://leafletjs.com/examples/geojson/)).

This new layer will handle calling the user provided `fetchRequest` function with a bounding box.
The string is of the form: `4.89,52.37,4.91,52.38` or `west,south,east,north` in the WGS84 coordinate system (latitude, longitude).
This function should return a GeoJSON object. 

The main benefit of this layer is that only a subset of the data is displayed because the whole is to much of a performance hit.
At a certain zoom level however the current bounding box will encompass to many features.
If you set a value `zoomMin` value on the GeoJSON layer this value will both hide the layer and pause fetching new data.

See example: https://leaflet-geojson-bbox-layer.netlify.com/

# Usage

```javascript
import L from 'leaflet';
import geojsonBboxLayer from '@datapunt/leaflet-geojson-bbox-layer';

const url = 'https://map.data.amsterdam.nl/maps/meetbouten?Typename=meetbouten_status&REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326';
const fetchRequest = (bbox_str) => fetch(`${url}&bbox=${bbox_str}`).then(response => response.json());

// Options specific to bbox geojson layer
const bboxLayerOptions = {
    fetchRequest, // function that returns GeoJSON feature list for a given bounding box string
};

// Leaflet GeoJSON layer options, see: https://leafletjs.com/reference-1.5.0.html#geojson-pointtolayer
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
```bash
npm install
```

## Run

The example can be build with:

```bash
npm start
```

Site available at http://localhost:8080.

Build the library and example distribution using:

```bash
npm run build
```

## Test

```bash
npm test
```

and

```bash
npm run lint
```

## Linking

If you wish to make changes to this package and see the results directly in another package you can use `npm link` or `npm pack`.

The `npm pack` workflow works as follows, for each change you want to test in the external project:

* In this package:
  * run: `npm build:library`
  * and run: `npm pack`
* In the project using this library:
  * run `npm install <path_to_library>/leaflet-geojson-bbox-layer-<version>.tgz`
  

## Publish

After making changes:
```
npm version major/minor/patch
```

To actually publish package you'll need to login:
```
npm login
```
User/pass is in Datapunt password vault. 

Then publish the package
```
npm publish --access public
```
