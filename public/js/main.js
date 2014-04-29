var map;

var populationLayer = L.geoJson(popTracts, {style: tractStyle});
var stopsLayer = L.geoJson(transitStops, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {color: 'black', fillOpacity: 1.0});
  }
});
var vetsLayer = L.geoJson(vets, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {color: 'red', fillOpacity: 1.0});
  }
});
var parksLayer = L.geoJson(pdxParks, {style: parksStyle});
var petstoreLayer = L.geoJson(petStores, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {color: 'purple', fillOpacity: 1.0});
  }
});

var overlayMaps = {
  "Number of People": populationLayer,
  "Bus Stops": stopsLayer,
  "Vets": vetsLayer,
  "Parks": parksLayer,
  "Pet Stores": petstoreLayer
};

/* Overlay Layers */

map = L.map("map", {
  zoom: 14,
  center: [45.518867, -122.665408]
});
var basemapTiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/codeforamerica.i3l4b022/{z}/{x}/{y}.png').addTo(map);
var layerControl = L.control.layers({}, overlayMaps).addTo(map);

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

function parksStyle(feature) {
  return {
    fillColor: "#18A866",
    weight: 1,
    opacity: 0.7,
    color: '#18A866',
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

(function(population_json, pet_store_json, vet_json, park_json, bus_stop_json){
  var adoptions = 0;
  var population = new PetProject.Collections.PopulationScorable();
  population.reset(population.parse(population_json));

  var pet_store_locations = new PetProject.Collections.DistanceScorable();
  pet_store_locations.reset(pet_store_locations.parse(pet_store_json));

  var vet_locations = new PetProject.Collections.DistanceScorable();
  vet_locations.reset(vet_locations.parse(vet_json));

  var park_locations = new PetProject.Collections.DistanceScorable();
  park_locations.reset(park_locations.parse(park_json));

  var bus_stop_locations = new PetProject.Collections.DistanceScorable();
  bus_stop_locations.reset(bus_stop_locations.parse(bus_stop_json));

  setInterval(function(){
    var petStore = drawnItems.toGeoJSON().features[0];
    if (petStore) {
      var shelter = new PetProject.Models.Feature(petStore);
      var populationBase = population.toMultiplier(shelter);

      var storeMultiplier = 1.15 * pet_store_locations.toMultiplier(shelter);
      var vetMultiplier = 1.5 * vet_locations.toMultiplier(shelter);
      var parkMultiplier = 1.1 * park_locations.toMultiplier(shelter);
      var busStopMultiplier = bus_stop_locations.toMultiplier(shelter);

      adoptions += (populationBase * storeMultiplier * vetMultiplier * parkMultiplier * busStopMultiplier);

      $('#population-adoption-count').text(Math.floor(populationBase));
      $('#pet-store-adoption-count').text(Math.floor(storeMultiplier * 100));
      $('#vet-adoption-count').text(Math.floor(vetMultiplier * 100));
      $('#park-adoption-count').text(Math.floor(parkMultiplier * 100));
      $('#bus-stop-adoption-count').text(Math.floor(busStopMultiplier * 100));
      $('#adoption-count').text(Math.floor(adoptions / 10000));
    }
  }, 250);
})(popTracts, petStores, vets, pdxParks, transitStops);
