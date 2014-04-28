PetProject.Collections.Scorable = Backbone.Collection.extend({
  model: PetProject.Models.Feature,

  parse: function(response) {
    return response.features;
  },
  toMultiplier: function(base){
    return this.reduce(function(memo, model){
      return memo * model.toMultiplier(base);
    }, 1);
  }
});

PetProject.Collections.PopulationScorable = PetProject.Collections.Scorable.extend({
  model: PetProject.Models.PopulationFeature
});
