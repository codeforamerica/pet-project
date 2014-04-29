PetProject.Collections.DistanceScorable = PetProject.Collections.Scorable.extend({
  model: PetProject.Models.DistantFeature,
  toMultiplier: function(base){
    return this.reduce(function(memo, model){
      var distance = 1 + model.toMultiplier(base);
      return memo * distance;
    }, 1);
  }
});
