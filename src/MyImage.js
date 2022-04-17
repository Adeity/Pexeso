(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
//# sourceMappingURL=MyImage.js.map