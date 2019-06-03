import L from 'leaflet';

const GeojsonBboxLayer = L.GeoJSON.extend({
    options: {
        zoomMin: 0,
        zoomMax: 99
    }, // Default options

    //
    // Leaflet layer methods
    //
    initialize(extraOptions, options) {
        L.GeoJSON.prototype.initialize.call(this, undefined, options);
        L.Util.setOptions(this, extraOptions);

        // istanbul ignore next
        if (!this.options.fetchRequest) {
            throw new Error('missing fetchRequest option');
        }
    },

    onAdd(map) {
        this._map = map;

        map.on('moveend', this._onMoveEnd, this);
        map.on('zoomend', this._onZoomEnd, this);
        map.on('refresh', this._onRefresh, this);

        this._fetchNewData();
    },

    onRemove(map) {
        map.off('moveend', this._onMoveEnd, this);
        map.off('zoomend', this._onZoomEnd, this);
        map.off('refresh', this._onRefresh, this);

        // Remove any geometry on this layer
        L.LayerGroup.prototype.onRemove.call(this, map);

        this._map = null;
    },

    //
    // Custom methods
    //
    _zoomInRange() {
        const zoom = this._map.getZoom();
        return zoom >= this.options.zoomMin && zoom <= this.options.zoomMax;
    },

    _fetchNewData() {
        if (!this._zoomInRange()) {
            // Outside zoom range, not fetching new data
            return;
        }

        this.isLoading = true;
        this.fire('loading');

        const bounds = this._map.getBounds();
        this.options.fetchRequest(bounds.toBBoxString())
            .then((geoData) => {
                this.clearLayers(); // Remove previous geometry
                this.addData(geoData);  // Adds geojson object to this layer

                this.isLoading = false;
                this.fire('load');
            })
            .catch(() => {
                this.isLoading = false;
                this.fire('error');
            });
    },

    _onMoveEnd() {
        // Fired after dragging AND zooming!
        this._fetchNewData();
    },

    _onZoomEnd() {
        if (!this._zoomInRange()) {
            this.clearLayers(); // Remove previous geometry, new data is fetched by onMoveEnd
        }
    },

    _onRefresh() {
        this._fetchNewData();
    },
});

export default function (extraOptions, options) {
    return new GeojsonBboxLayer(extraOptions, options);
}
