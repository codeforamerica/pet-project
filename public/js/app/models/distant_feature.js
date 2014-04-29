PetProject.Models.DistantFeature = PetProject.Models.Feature.extend({
  toBounds: function(){
    if (!this.bounds) { this.bounds = L.geoJson(this.attributes).getBounds(); }
    return this.bounds;
  },
  toMultiplier: function(other_feature){
    var other_bounds = other_feature.toBounds();
    var other_center = other_bounds.getCenter();
    var bounds = this.toBounds();
    var center = bounds.getCenter();
    var distance = center.distanceTo(other_center);
    return 1 / distance;
  }
});
