PetProject.Collections.PopulationScorable = PetProject.Collections.Scorable.extend({
  model: PetProject.Models.PopulationFeature,
  toMultiplier: function(base){
    return this.reduce(function(memo, model){
      var population = model.toMultiplier(base);
      return memo + population;
    }, 0);
  }
});
