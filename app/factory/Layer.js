/**
 * [extend description]
 * @type {String}
 */
Ext.define('CpsiMapview.factory.Layer', {
    alternateClassName: 'LayerFactory',
    requires: [],

    singleton: true,

    /**
     * Creates an OpenLayer layer object from a JSON config
     *
     * @param  {Object} layerConf  The configuration object
     * @return {ol.layer.Base} OL layer object
     */
    createLayer: function(layerConf) {

        var layerType = layerConf.layerType;
        var mapLayer;

        switch (layerType) {
        case 'wms':
            mapLayer = LayerFactory.createWms(layerConf);
            break;
        case 'wfs':
            mapLayer = LayerFactory.createWfs(layerConf);
            break;
        case 'esrirest':
            mapLayer = LayerFactory.createEsriRest(layerConf);
            break;
        case 'osm':
            mapLayer = LayerFactory.createOsm(layerConf);
            break;
        case 'empty':
            mapLayer = LayerFactory.createEmptyLayer(layerConf);
            break;
        case 'bing_aerial':
            mapLayer = LayerFactory.createBing(layerConf, 'Aerial');
            break;
        case 'google_roadmap':
            mapLayer = LayerFactory.createGoogle(layerConf, 'google.maps.MapTypeId.ROADMAP');
            break;
        case 'google_terrain':
            mapLayer = LayerFactory.createGoogle(layerConf, 'google.maps.MapTypeId.TERRAIN');
            break;
        case 'google_hybrid':
            mapLayer = LayerFactory.createGoogle(layerConf, 'google.maps.MapTypeId.HYBRID');
            break;
        case 'google_satellite':
            mapLayer = LayerFactory.createGoogle(layerConf, 'google.maps.MapTypeId.SATELLITE');
            break;
        case 'nasa':
            mapLayer = LayerFactory.createNasa(layerConf);
            break;
        case 'os':
            mapLayer = LayerFactory.createOs(layerConf);
            break;
        case 'arcgiscache':
            mapLayer = LayerFactory.createArcGisCache(layerConf);
            break;
        case 'arcgisrest':
            mapLayer = LayerFactory.createArcGisRest(layerConf);
            break;
        case 'switchlayer':
            mapLayer = LayerFactory.createSwitchLayer(layerConf);
            break;
        default:
            Ext.log.warn('Layer type not known');
            //do nothing, and return empty layer
        }

        return mapLayer;
    },

    createEmptyLayer: function(layerConf) {
        Ext.log.info('Not implemented yet', layerConf);
    },

    createSwitchLayer: function(layerConf) {
        Ext.log.info('Not implemented yet', layerConf);
    },

    /**
     * Creates an OGC WMS layer
     *
     * @param  {Object} layerConf The configuration object for this layer
     * @return {ol.layer.Tile}    WMS layer
     */
    createWms: function(layerConf) {
        var layer;
        var singleTile = layerConf.openLayers.singleTile;

        if (singleTile) {
            layer = new ol.layer.Image({
                name: layerConf.text,
                source: new ol.source.ImageWMS({
                    url: layerConf.url,
                    params: {
                        'LAYERS': layerConf.serverOptions.layers,
                        'TRANSPARENT': true
                    },
                    ratio: 1,
                    crossOrigin: 'anonymous'
                }),
                visible: layerConf.openLayers.visibility,
                minResolution: layerConf.openLayers.minResolution,
                maxResolution: layerConf.openLayers.maxResolution,
                opacity: layerConf.openLayers.opacity
            });
        } else {
            layer = new ol.layer.Tile({
                name: layerConf.text,
                source: new ol.source.TileWMS({
                    url: layerConf.url,
                    params: {
                        'LAYERS': layerConf.serverOptions.layers,
                        'TILED': true,
                        'TRANSPARENT': true
                    },
                    crossOrigin: 'anonymous'
                }),
                visible: layerConf.openLayers.visibility,
                minResolution: layerConf.openLayers.minResolution,
                maxResolution: layerConf.openLayers.maxResolution,
                opacity: layerConf.openLayers.opacity
            });
        }

        return layer;
    },

    createWfs: function(layerConf) {

        Ext.log.info('Not implemented yet', layerConf);
    },

    createBing: function(layerConf, type) {

        Ext.log.info('Not implemented yet', layerConf, type);
    },

    /**
     * Creates an ESRI REST tile layer
     *
     * @param  {Object} layerConf  The configuration object for this layer
     * @return {ol.layer.Tile} ESRI REST tile layer
     */
    createEsriRest: function(layerConf) {
        return new ol.layer.Tile({
            name: layerConf.text,
            source: new ol.source.XYZ({
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                    'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url: layerConf.url + '{z}/{y}/{x}'
            }),
            visible: layerConf.openLayers.visibility,
            minResolution: layerConf.openLayers.minResolution,
            maxResolution: layerConf.openLayers.maxResolution,
            opacity: layerConf.openLayers.opacity
        });
    },

    /**
     * Creates an OSM layer
     *
     * @param  {Object} layerConf  The configuration object for this layer
     * @return {ol.layer.Tile} OSM layer
     */
    createOsm: function(layerConf) {
        // OSM based map tiles
        return new ol.layer.Tile({
            name: layerConf.text,
            source: new ol.source.OSM(),
            visible: layerConf.openLayers.visibility,
            minResolution: layerConf.openLayers.minResolution,
            maxResolution: layerConf.openLayers.maxResolution,
            opacity: layerConf.openLayers.opacity
        });
    },

    createGoogle: function(layerConf, layerType) {

        Ext.log.info('Not implemented yet', layerConf, layerType);
    },

    createNasa: function(layerConf) {

        Ext.log.info('Not implemented yet', layerConf);
    },

    createOs: function(layerConf) {
        Ext.log.info('Not implemented yet', layerConf);
    },

    createArcGisCache: function(layerConf) {
        Ext.log.info('Not implemented yet', layerConf);
    },

    createArcGisRest: function(layerConf) {
        Ext.log.info('Not implemented yet', layerConf);
    },

    createServerArray: function(path) {
        Ext.log.info('Not implemented yet', path);
    }

});
