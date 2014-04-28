var map;

var populationLayer = L.geoJson(popTracts, {style: tractStyle});
var stopsLayer = L.geoJson(trimetStops);
//var vetsLayer = L.geoJson(vets);
var parksLayer = L.geoJson(pdxParks);
var petstoreLayer = L.geoJson(petStores);

var overlayMaps = {
  "Number of People": populationLayer,
  "Bus Stops": stopsLayer,
  //"Animal Doctors": vetsLayer,
  "Parks": parksLayer,
  "Pet Stores": petstoreLayer
};

/* Overlay Layers */

map = L.map("map", {
  zoom: 14,
  center: [45.518867, -122.665408]
});
var basemapTiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/codeforamerica.i3l4b022/{z}/{x}/{y}.png').addTo(map);
var layerControl = L.control.layers(overlayMaps).addTo(map);

function getColor(d) {
    return d > 5000 ? '#800026' :
           d > 4000  ? '#BD0026' :
           d > 3000  ? '#E31A1C' :
           d > 2000  ? '#FC4E2A' :
           d > 1000   ? '#FD8D3C' :
           d > 500   ? '#FEB24C' :
           d > 5   ? '#FED976' :
                      '#FFEDA0';
}

function tractStyle(feature) {
    return {
        fillColor: getColor(feature.properties.DEC_10_SF1_P1_with_ann_D001),
        weight: 1,
        opacity: 0.6,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.6
    };
}

// L.geoJson(populationLayer, {style: style}).addTo(map);
populationLayer.addTo(map);
//stopsLayer.addTo(map);

/* Larger screens get expanded layer control */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var overlays = {
};

/* Add overlay layers to map after defining layer control to preserver order */
//map.addLayer(boroughs).addLayer(theaters);

var sidebar = L.control.sidebar("sidebar", {
  closeButton: true,
  position: "left"
}).addTo(map);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    rectangle: false,
    circle: false,
    marker: { zIndexOffset: 9000 }
  },
});
map.addControl(drawControl);

// Leaflet Draw.
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

map.on('draw:created', function (e) {
  var type = e.layerType,
    layer = e.layer;
  drawnItems.addLayer(layer);
});

map.on('draw:drawstart', function(e) {
  drawnItems.clearLayers();
});

/* Placeholder hack for IE */
if (navigator.appName == "Microsoft Internet Explorer") {
  $("input").each(function () {
    if ($(this).val() === "" && $(this).attr("placeholder") !== "") {
      $(this).val($(this).attr("placeholder"));
      $(this).focus(function () {
        if ($(this).val() === $(this).attr("placeholder")) $(this).val("");
      });
      $(this).blur(function () {
        if ($(this).val() === "") $(this).val($(this).attr("placeholder"));
      });
    }
  });
}

(function(tracts){
  var adoptions = 0;
  var population = new PetProject.Collections.PopulationScorable();
  population.reset(population.parse(tracts));

  setInterval(function(){
    var petStore = drawnItems.toGeoJSON().features[0];
    if (petStore) {
      var shelter = new PetProject.Models.Feature(petStore);
      adoptions += population.toMultiplier(shelter);
      $('#adoption-count').text(Math.floor(adoptions / 10000));
    }
  }, 250);
})(popTracts);
