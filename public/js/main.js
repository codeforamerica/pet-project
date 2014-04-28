var map;

var populationLayer = L.geoJson(popTracts, {style: style});
//var stopsLayer = L.geoJson(trimetStops);

/* Overlay Layers */

map = L.map("map", {
  zoom: 14,
  center: [45.518867, -122.665408]
});
var basemapTiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/codeforamerica.i3l4b022/{z}/{x}/{y}.png').addTo(map);

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

function style(feature) {
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

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
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
  var shelter = new PetProject.Models.Feature({geometry: {coordinates: [45.518867, -122.665408]}});
  var population = new PetProject.Collections.PopulationScorable();
  population.reset(population.parse(tracts));

  setInterval(function(){
    adoptions += population.toMultiplier(shelter)
    console.log("adoptions: " + population.toMultiplier(shelter));
  }, 250);
})(popTracts);
