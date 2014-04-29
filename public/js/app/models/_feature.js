PetProject.Models.Feature = Backbone.Model.extend({
  toMultiplier: function(){
    return 1.0;
  },
  toBounds: function() {
    if (!this.bounds) {
      this.bounds = L.geoJson(this.attributes).getBounds();
    }
    return this.bounds;
  }
});
