describe("PetProject.Collections.Scorable", function(){
  beforeEach(function(){
    this.jsonFixture = loadJSONFixtures('feature.json');
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("instantiates", function() {
    expect(new PetProject.Collections.Scorable()).toBeTruthy();
  });

  describe("an instantiated copy", function(){
    beforeEach(function(){
      var Scored = Backbone.Model.extend({ toMultiplier: function(){ return this.get('score'); }})
      this.scorable = new PetProject.Collections.Scorable();
      this.scorable.add(new Scored({score: 1.0}));
      this.scorable.add(new Scored({score: 2.0}));
    });

    describe("#toMultiplier", function(){
      it("returns a multiplier for the whole scorable collection", function(){
        expect(this.scorable.toMultiplier()).toEqual(2.0);
      });
    });
  });
});
