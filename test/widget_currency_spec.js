/* global describe it expect */

var widgetcurrency = function(){
    this.base = "foo";
    this.amount = 0;
};

describe("widgetcurrency", function () {
    it("is definied", function(){
        expect(widgetcurrency).toBeDefined();
    });
    describe("defaults", function(){
       it("base is foo", function(){
          var currency = new widgetcurrency();
          console.log(currency);
          expect(currency.base).toEqual("foo");
       });
       it("amount is 0", function(){
          var currency = new widgetcurrency();
          expect(currency.amount).toEqual(0);
       });
    });
});