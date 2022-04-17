define("MyImage", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.MyImage = void 0;
    var MyImage = (function () {
        function MyImage(imageCode) {
            this.imageCode = imageCode;
        }
        MyImage.prototype.getImageCode = function () {
            return this.imageCode;
        };
        return MyImage;
    }());
    exports.MyImage = MyImage;
});
define("State", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.State = void 0;
    var State = (function () {
        function State(state) {
            this.state = state;
        }
        State.prototype.getStateCode = function () {
            switch (this.state) {
                case "closed": return "C";
                case "opened": return "O";
                case "revealed": return "R";
                default: return "N";
            }
        };
        return State;
    }());
    exports.State = State;
});
define("PexesoCard", ["require", "exports", "State", "MyImage"], function (require, exports, State_1, MyImage_1) {
    "use strict";
    exports.__esModule = true;
    exports.PexesoCard = void 0;
    var PexesoCard = (function () {
        function PexesoCard(id, imageCode) {
            this.state = new State_1.State("closed");
            this.image = new MyImage_1.MyImage(imageCode);
        }
        PexesoCard.prototype.getId = function () {
            return this.id;
        };
        PexesoCard.prototype.getState = function () {
            return this.state;
        };
        PexesoCard.prototype.getImage = function () {
            return this.image;
        };
        PexesoCard.prototype.setState = function (state) {
            this.state = new State_1.State(state);
        };
        PexesoCard.prototype.toString = function () {
            return "|S" + this.state.getStateCode() + " I" + this.image.getImageCode() + "|";
        };
        return PexesoCard;
    }());
    exports.PexesoCard = PexesoCard;
});
define("PexesoBoard", ["require", "exports", "PexesoCard"], function (require, exports, PexesoCard_1) {
    "use strict";
    exports.__esModule = true;
    exports.PexesoBoard = void 0;
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
define("index", ["require", "exports", "PexesoBoard"], function (require, exports, PexesoBoard_1) {
    "use strict";
    exports.__esModule = true;
    var pexesoBoard = new PexesoBoard_1.PexesoBoard(4);
    pexesoBoard.revealCard(0);
    pexesoBoard.revealCard(1);
    pexesoBoard.printBoard();
    var pexeso_board = document.querySelector("#pexesoboard");
    console.log(pexeso_board);
    pexeso_board.innerHTML = pexesoBoard.toString();
});
//# sourceMappingURL=tsc.js.map