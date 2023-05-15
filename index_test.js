var expect = chai.expect;

describe("MyFunctions", function () {
    describe("#createShuffledDeck", function () {
        it("Should return an array with a length of 52.", function () {
            var deck = createShuffledDeck();
            expect(deck.length).to.equal(52);
        });

        it("Should return objects with image paths.", function () {
            var deck = createShuffledDeck();
            deck.forEach(c => expect(c.image).to.not.equal("" || undefined || null));
        });

        it("Should return objects that have a powerLevel property that is of type 'number'.", function () {
            var deck = createShuffledDeck();
            deck.forEach(c => expect(typeof (c.powerLevel)).to.equal("number"));
        });

        it("Should return an array of elements that have unique image paths.", function () {
            var deck = createShuffledDeck();
            expect(deck.length).to.equal([...new Set(deck.map(c => c.image))].length);
        });
    });
});