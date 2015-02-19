var WidgetCurrency = function(base, amount){
    this.base = base || "foo";
    this.amount = amount || 0;
    this.display = function(){
        return this.base + " | " + this.amount;
    }
}

WidgetCurrency.prototype.display = function(){
    return this.base + " | " + this.amount;
};

describe("WidgetCurrency", function(){
    it("is defined", function(){
        expect(WidgetCurrency).toBeDefined;
    });
    
    describe("defaults", function() {
        var currency;
        
        beforeEach(function(){
            currency = new WidgetCurrency();
        })
        
        it("base is foo", function() {
            var currency = new WidgetCurrency();
            console.log(currency)
            expect(currency.base).toEqual("foo");
        });
        it("amount is 0", function(){
            var currency = new WidgetCurrency();
            expect(currency.amount).toEqual(0);
        });
    });
    
    describe("setting svalues with constructor", function() {
        var currency;
        
        beforeEach(function(){
            currency = new WidgetCurrency("bar")
        })
        // because we now set this before, we no longer need the new instance of WidgetCurrency
        it("base can be set to bar", function() {
            // var currency = new WidgetCurrency("bar");
            expect(currency.base).toEqual("bar");
        });
    
    });
    
    describe("display", function() {
        describe("when base is buzz and amount is 10", function() {
            it("is 'buzz | 10'", function() {
                var currency = new WidgetCurrency("buzz", 10);
                expect(currency.display()).toEqual('buzz | 10')
            })
        })
    })
});