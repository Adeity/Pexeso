(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./State", "./MyImage"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.PexesoCard = void 0;
    var State_1 = require("./State");
    var MyImage_1 = require("./MyImage");
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
//# sourceMappingURL=PexesoCard.js.map