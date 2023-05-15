var expect = chai.expect;

describe("MyFunctions", function () {
    describe("#doSomthing", function () {
        it("Should concatenate two parameters", function () {
            var x = doSomething("Hello", 5);
            expect(x).to.equal("Hello5");
        });

        it("Should throw an error if first paramter is not a string", function () {
            expect(function () {
                doSomething(5, 5);
            }).to.throw(Error);
        });
    });
});