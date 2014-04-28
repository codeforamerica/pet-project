PetProject.Collections.Scorable = Backbone.Collection.extend({
  model: PetProject.Models.Feature,
  parse: function(response) {
    return response.features;
  },
  toMultiplier: function(){
    return this.reduce(function(memo, model){
      return memo * model.toMultiplier();
    }, 1);
  }
});
