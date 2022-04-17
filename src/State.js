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
//# sourceMappingURL=State.js.map