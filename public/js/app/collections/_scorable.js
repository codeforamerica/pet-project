PetProject.Collections.Scorable = Backbone.Collection.extend({
  model: PetProject.Models.Feature,

  parse: function(response) {
    return response.features;
  },
  toMultiplier: function(base){
    return this.reduce(function(memo, model){
      return memo * Math.max(1, model.toMultiplier(base));
    }, 1);
  }
});
