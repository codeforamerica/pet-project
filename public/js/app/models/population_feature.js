PetProject.Models.PopulationFeature = PetProject.Models.Feature.extend({
  toBounds: function(){
    if (!this.bounds) { this.bounds = L.geoJson(this.attributes).getBounds(); }
    return this.bounds;
  },
  toMultiplier: function(other_feature){
    var other_bounds = other_feature.toBounds();
    if (this.toBounds().contains(other_bounds)) {
      return this.get('properties')['DEC_10_SF1_P1_with_ann_D001'];
    } else {
      return 0;
    }
  }
});
