(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./PexesoCard"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.PexesoBoard = void 0;
    var PexesoCard_1 = require("./PexesoCard");
    var PexesoBoard = (function () {
        function PexesoBoard(size) {
            this.nDimension = size % 2 == 0 ? size : size + 1;
            this.numOfCards = this.nDimension * this.nDimension;
            this.cards = new Array(this.numOfCards);
            this.openedCards = new Array(this.numOfCards);
            this.revealedCardOne = null;
            this.revealedCardTwo = null;
            this.initializeCards();
            this.shuffleBoard();
        }
        PexesoBoard.prototype.initializeCards = function () {
            var imageCode = 0;
            for (var i = 0; i < this.numOfCards; i++) {
                this.cards[i] = new PexesoCard_1.PexesoCard(i, imageCode);
                i++;
                this.cards[i] = new PexesoCard_1.PexesoCard(i, imageCode);
                imageCode++;
            }
        };
        PexesoBoard.prototype.isGameOver = function () {
            return this.openedCards.length == this.numOfCards;
        };
        PexesoBoard.prototype.shuffleBoard = function () {
            var _a;
            for (var i = this.cards.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
            }
            return this.cards;
        };
        PexesoBoard.prototype.printBoard = function () {
            var row = "";
            for (var i = 0; i < this.numOfCards; i++) {
                if (i % this.nDimension == 0) {
                    console.log(row);
                    row = "";
                    console.log("\n");
                }
                row += this.cards[i].toString() + " ";
            }
            console.log(row);
            row = "";
            console.log("\n");
        };
        PexesoBoard.prototype.toString = function () {
            var row = "";
            for (var i = 0; i < this.numOfCards; i++) {
                if (i % this.nDimension == 0) {
                    row += "\n";
                }
                row += this.cards[i].toString() + " ";
            }
            row += "\n";
            return row;
        };
        PexesoBoard.prototype.getPositionOfCard = function (id) {
            for (var i = 0; i < this.numOfCards; i++) {
                var currentCard = this.cards[i];
                if (currentCard.getId() == id) {
                    return i;
                }
            }
            return null;
        };
        PexesoBoard.prototype.getCardAtPosition = function (position) {
            return this.cards[position];
        };
        PexesoBoard.prototype.isFirstCardRevealed = function () {
            return this.revealedCardOne != null;
        };
        PexesoBoard.prototype.isSecondCardRevealed = function () {
            return this.revealedCardTwo != null;
        };
        PexesoBoard.prototype.revealCard = function (position) {
            if (this.isSecondCardRevealed()) {
                return null;
            }
            var cardAtPosition = this.cards[position];
            cardAtPosition.setState("revealed");
            if (this.isFirstCardRevealed()) {
                this.revealedCardTwo = cardAtPosition;
            }
            else {
                this.revealedCardOne = cardAtPosition;
            }
            return cardAtPosition;
        };
        PexesoBoard.prototype.unrevealCard = function (position) {
            var cardAtPosition = this.cards[position];
            cardAtPosition.setState("closed");
            if (cardAtPosition == this.revealedCardOne)
                this.revealedCardOne = null;
            else if (cardAtPosition == this.revealedCardTwo)
                this.revealedCardTwo = null;
        };
        PexesoBoard.prototype.openCard = function (position) {
            var cardAtPosition = this.cards[position];
            cardAtPosition.setState("opened");
            this.openedCards.push(cardAtPosition);
        };
        PexesoBoard.prototype.getOpenedCards = function () {
            return this.openedCards;
        };
        PexesoBoard.prototype.openRevealedCards = function () {
            this.openedCards.push(this.revealedCardOne);
            this.openedCards.push(this.revealedCardTwo);
            this.revealedCardOne.setState("opened");
            this.revealedCardTwo.setState("opened");
            this.revealedCardOne = null;
            this.revealedCardTwo = null;
        };
        return PexesoBoard;
    }());
    exports.PexesoBoard = PexesoBoard;
});
//# sourceMappingURL=PexesoBoard.js.map