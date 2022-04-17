(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./PexesoBoard"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var PexesoBoard_1 = require("./PexesoBoard");
    var pexesoBoard = new PexesoBoard_1.PexesoBoard(4);
    pexesoBoard.revealCard(0);
    pexesoBoard.revealCard(1);
    pexesoBoard.printBoard();
    var pexeso_board = document.querySelector("#pexesoboard");
    console.log(pexeso_board);
    pexeso_board.innerHTML = pexesoBoard.toString();
});
//# sourceMappingURL=index.js.map