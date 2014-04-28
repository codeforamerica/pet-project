describe("PetProject.Models.Feature", function(){
  beforeEach(function(){
    this.jsonFixture = loadJSONFixtures('feature.json');
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("instantiates", function() {
    expect(new PetProject.Models.Feature()).toBeTruthy();
  });

  describe("an instantiated copy", function(){
    beforeEach(function(){
      this.feature = new PetProject.Models.Feature(this.jsonFixture["feature.json"]);
    });

    describe("#toMultiplier", function(){
      it("returns a multiplier for the feature", function(){
        expect(this.feature.toMultiplier()).toEqual(1);
      });
    });

    describe("#toBounds", function(){
      it("returns bounds for the feature", function(){
        expect(this.feature.toBounds()._southWest.lng).toEqual(-122.686434);
        expect(this.feature.toBounds()._southWest.lat).toEqual(45.512014);
      });
    });
  });
});
