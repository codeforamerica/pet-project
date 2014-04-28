describe("PetProject.Models.PopulationFeature", function(){
  beforeEach(function(){
    this.jsonFixture = loadJSONFixtures("population_feature.json");
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("instantiates", function() {
    expect(new PetProject.Models.PopulationFeature()).toBeTruthy();
  });

  describe("an instantiated copy", function(){
    beforeEach(function(){
      this.feature = new PetProject.Models.PopulationFeature(this.jsonFixture["population_feature.json"]);
    });

    describe("#toBounds", function(){
      it("returns bounds for the feature", function(){
        expect(this.feature.toBounds()._southWest.lng).toEqual(-122.688908);
        expect(this.feature.toBounds()._southWest.lat).toEqual(45.506422);
      });
    });

    describe("#toMultiplier", function(){
      describe("when the marker is inside the population feature", function(){
        it("returns a multiplier for the feature", function(){
          var inside = new PetProject.Models.Feature(this.jsonFixture["population_feature.json"]);
          expect(this.feature.toMultiplier(inside)).toEqual(1656);
        });
      });
    });
  });
});
