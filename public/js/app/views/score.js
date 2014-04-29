PetProject.Views.Score = Backbone.View.extend({
  el: '#score-area',

  initialize: function(options){
    this.drawnItems = options.drawnItems;
    this.adoptions = 0;
    this.population = options.population;
    this.pet_store_locations = options.pet_store_locations;
    this.vet_locations = options.vet_locations;
    this.park_locations = options.park_locations;
    this.bus_stop_locations = options.bus_stop_locations;
  },

  toPetStore: function(){
    return this.drawnItems.toGeoJSON().features[0];
  },

  toScore: function(){
    var petStore = this.toPetStore();
    if (petStore) {
      var shelter = new PetProject.Models.Feature(petStore);
      var populationBase = this.population.toMultiplier(shelter);

      var storeMultiplier = 1.15 * this.pet_store_locations.toMultiplier(shelter);
      var vetMultiplier = 1.5 * this.vet_locations.toMultiplier(shelter);
      var parkMultiplier = 1.1 * this.park_locations.toMultiplier(shelter);
      var busStopMultiplier = this.bus_stop_locations.toMultiplier(shelter);

      this.adoptions += (populationBase * storeMultiplier * vetMultiplier * parkMultiplier * busStopMultiplier);

      return {
        population: Math.floor(populationBase),
        pet_store: Math.floor(storeMultiplier * 100),
        vet: Math.floor(vetMultiplier * 100),
        park: Math.floor(parkMultiplier * 100),
        bus_stop: Math.floor(busStopMultiplier * 100),
        total: Math.floor(this.adoptions / 10000)
      }
    }
  },

  render: function(){
    var petStore = this.toPetStore();
    if (petStore) {
      var template = _.template($('#score-template').html(), this.toScore());
      this.$el.html(template);
    }
    return this;
  }
});
