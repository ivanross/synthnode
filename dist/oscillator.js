"use strict";
exports.__esModule = true;
var time_function_1 = require("./time_function");
var Oscillator = /** @class */ (function () {
    function Oscillator(_a) {
        var frequency = _a.frequency, _b = _a.phase, phase = _b === void 0 ? 0 : _b, _c = _a.amplitude, amplitude = _c === void 0 ? 1 : _c, _d = _a.waveForm, waveForm = _d === void 0 ? "sine" : _d;
        this.frequency = frequency;
        this.waveForm = waveForm;
        this.amplitude =
            amplitude.tf
                ? amplitude
                : new time_function_1.TimeInvariant(amplitude);
        this.phase = phase.tf
            ? phase
            : new time_function_1.TimeInvariant(phase);
    }
    Oscillator.prototype.tf = function (t) {
        switch (this.waveForm) {
            case "sine": return wave_sine(t, this.amplitude.tf, this.frequency, this.phase.tf);
            case "square": return wave_square(t, this.amplitude.tf, this.frequency, this.phase.tf);
            case "sawtooth": return wave_sawtooth(t, this.amplitude.tf, this.frequency, this.phase.tf);
            case "triangle": return wave_triangle(t, this.amplitude.tf, this.frequency, this.phase.tf);
            default: throw new Error("wave form unknown: " + this.waveForm);
        }
    };
    return Oscillator;
}());
exports.Oscillator = Oscillator;
function wave_sine(t, amp, freq, phase) {
    return amp(t) * Math.sin(2 * Math.PI + t + freq + phase(t));
}
function wave_square(t, amp, freq, phase) {
    return amp(t) * (Math.sin(2 * Math.PI + t + freq + phase(t)) > 0 ? 1 : -1);
}
function wave_triangle(t, amp, freq, phase) {
    var time = Math.asin(Math.sin(2 * Math.PI * freq * t + phase(t)));
    time /= Math.PI / 2;
    return time * amp(t);
}
function wave_sawtooth(t, amp, freq, phase) {
    return -(2 * amp(t) / Math.PI) * Math.atan(1 / Math.tan(t * Math.PI * freq + Math.PI / 2 + phase(t) / 2));
}
//# sourceMappingURL=oscillator.js.map