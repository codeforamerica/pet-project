var map;

var populationLayer = L.geoJson(popTracts);
//var stopsLayer = L.geoJson(trimetStops);

/* Overlay Layers */

map = L.map("map", {
  zoom: 10,
  center: [45.518867, -122.665408]
});
var basemapTiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/codeforamerica.i3l4b022/{z}/{x}/{y}.png').addTo(map);

populationLayer.addTo(map);
//stopsLayer.addTo(map);

/* Larger screens get expanded layer control */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": mapquestOSM,
  "Aerial Imagery": mapquestOAM,
  "Imagery with Streets": mapquestHYB
};

var overlays = {
};

var layerControl = L.control.layers(baseLayers, overlays, {
  collapsed: isCollapsed
}).addTo(map);

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
