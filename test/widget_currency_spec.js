/* global describe it expect beforeEach */

var WidgetCurrency = function(base, amount){
    this.base = base || 'foo';
    this.amount = amount || 0;
};
WidgetCurrency.prototype = {
    display: function(){
        return [this.base, "|", this.amount].join(" ");
    }, 
    convert : function(toBase,exchangeRateFinder, cb){
        var that = this;
        exchangeRateFinder.getRates(function(exchangeRates){
            console.log(that);
            var ratio = exchangeRates[that.base]/exchangeRates[toBase]; 
            that.amount = that.amount*ratio;
            that.base = toBase;
            cb();
        });
    },
    callApi: function(cb){
        var message = this.base.toUpperCase();
        setTimeout(function(){
            cb("hello world " + message); 
        }, 500);
    }
};

describe("WidgetCurrency", function(){
    describe("call api", function(){
       var result;
       beforeEach(function(done){
           var currency = new WidgetCurrency();
           currency.callApi(function(msg){
              result = msg;
              done();
           });
       });
       it("result is hello world FOO", function(){
           expect(result).toEqual("hello world FOO");
       });
    });
    it("is defined", function(){
        expect(WidgetCurrency).toBeDefined();
    });
    
    describe("defaults", function(){
        var currency;
        
        beforeEach(function(){
            currency = new WidgetCurrency();
        });
        
        it("base is foo", function(){
            expect(currency.base).toEqual("foo");
            currency.amount = 100;
        });
        it("amount is 0", function(){
            expect(currency.amount).toEqual(0);
        });
    });
    describe("setting values with constructor", function(){
        var currency;
        beforeEach(function(){
            currency = new WidgetCurrency("bar", 18);
        });
        describe("setting base to bar", function(){
            it("base returns bar", function(){
                expect(currency.base).toEqual("bar");
            });
        });
        describe("setting amount to 18", function(){
            it("amount is 18", function(){
                expect(currency.amount).toEqual(18);
            });
        });
    });
    describe("display", function(){
       describe("when base is buzz and amount 10", function(){
           it("is 'buzz | 10", function(){
               var currency = new WidgetCurrency("buzz", 10);
               expect(currency.display()).toEqual('buzz | 10');
           });
       }); 
    });
    
    describe("convert", function(){
        var currency;
        beforeEach(function(done){
            var exchangeRates = {
                foo: 5,
                bar: 10,
                buzz: 100
            };
            var exchangeFinder = {
                getRates : function(cb){
                   cb(exchangeRates) 
                }
            };
            currency = new WidgetCurrency("foo", 20);
            currency.convert("bar", exchangeFinder, function(){
               done(); 
            });
        });
       describe("converting 20 foo to bar", function(){
           it("base should be bar", function(){
               expect(currency.base).toEqual("bar");
           });
           it("amount should be 10", function(){
               expect(currency.amount).toEqual(10);
           });
       }); 
    });
    
});


