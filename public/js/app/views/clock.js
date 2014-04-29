PetProject.Views.Clock = Backbone.View.extend({
  el: '#clock-area',

  initialize: function(options){
    this.ticks = 0;
    this.gameDate = new Date("June 1, 2014");
    this.endDate = new Date("July 4, 2014");
  },

  advance: function(){
    this.ticks += 1;
    if (this.ticks % 5 == 0) {
      this.gameDate.setDate(this.gameDate.getDate() + 1);
    }

    if (this.gameDate >= this.endDate) {
      alert("Time's up!");
    }
  },

  render: function(){
    var template = _.template($('#clock-template').html(), {
      date: this.gameDate
    });
    this.$el.html(template);
    return this;
  }
});
