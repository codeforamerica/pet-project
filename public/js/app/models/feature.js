PetProject.Models.Feature = Backbone.Model.extend({
  toMultiplier: function(){
    return 1.0;
  },
  toBounds: function() {
    if (!this.bounds) {
      this.bounds = L.latLngBounds(
        this.get('geometry').coordinates,
        this.get('geometry').coordinates
      );
    }
    return this.bounds;
  }
});
