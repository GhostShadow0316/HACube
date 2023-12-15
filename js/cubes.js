// cubes.js

var cubes = [
    "2x2",
    "3x3",
    "4x4",
    "5x5",
    "6x6",
    "7x7",
    "Pyraminx",
    "Megaminx",
    "Skewb",
    "Square-1",
    "Clock",
]

var command_cubes = {
    "2x2": "2x2",
    "2": "2x2",
    "22": "2x2",

    "3x3": "3x3",
    "3": "3x3",
    "33": "3x3",

    "4x4": "4x4",
    "4": "4x4",
    "44": "4x4",

    "5x5": "5x5",
    "5": "5x5",
    "55": "5x5",

    "6x6": "6x6",
    "6": "6x6",
    "66": "6x6",

    "7x7": "7x7",
    "7": "7x7",
    "77": "7x7",

    "pyraminx": "Pyraminx",
    "py": "Pyraminx",
    "megaminx": "Megaminx",
    "mega": "Megaminx",

    "skewb": "Skewb",

    "square-1": "Square-1",
    "square1": "Square-1",
    "sq1": "Square-1",

    "clock": "Clock",
}

// https://github.com/cubing/cubing.js/blob/c90731a/src/cubing/puzzles/index.ts#L20
var puzzles = {
    "2x2": "2x2x2",
    "3x3": "3x3x3",
    "4x4": "4x4x4",
    "5x5": "5x5x5",
    "6x6": "6x6x6",
    "7x7": "7x7x7",
    "Pyraminx": "pyraminx",
    "Megaminx": "megaminx",
    "Skewb": "skewb",
    "Square-1": "square1",
    "Clock": "clock",
}

var sc2 = scramble_222;
var sc222 = {
    getRandomScramble:  () => { return sc2["getRandomScramble"] () },
    getOptimalScramble: () => { return sc2["getOptimalScramble"]() },
};
// for (let k in sc222) { console.log(k); }
// for (let k in sc222) { console.log(sc222[k]()); }

var sc3 = scramble_333;
var sc333 = {
    getRandomScramble:    () => { return sc3["getRandomScramble"]() },

    getEdgeScramble:      () => { return sc3["getEdgeScramble"]() },
    getCornerScramble:    () => { return sc3["getCornerScramble"]() },
    getLLScramble:        () => { return sc3["getLLScramble"]() },
    getLSLLScramble:      () => { return sc3["getLSLLScramble"]() },
    getZBLLScramble:      () => { return sc3["getZBLLScramble"]() },
    getZZLLScramble:      () => { return sc3["getZZLLScramble"]() },
    getF2LScramble:       () => { return sc3["getF2LScramble"]() },
    getLSEScramble:       () => { return sc3["getLSEScramble"]() },
    getCMLLScramble:      () => { return sc3["getCMLLScramble"]() },
    getCLLScramble:       () => { return sc3["getCLLScramble"]() },
    getELLScramble:       () => { return sc3["getELLScramble"]() },
    getAnyScramble:       () => { return sc3["getAnyScramble"]() },
    getEasyCrossScramble: () => { return sc3["getEasyCrossScramble"]() },

    getEOLineScramble:    () => { return sc3["getEOLineScramble"]() },
    getZBLSScramble:      () => { return sc3["getZBLSScramble"]() },
    get3BLDScramble:      () => { return sc3["getRandomOriScramble"]() },
};
// for (let k in sc333) { console.log(k); }
// for (let k in sc333) { console.log(sc333[k]()); }

var scBig = megaScrambler;

var sc444 = {
    getRandomScramble:   () => { return scramble_444["getRandomScramble"](40); },
    get444edgesScramble: () => { return megaScrambler["get444edgesScramble"](8); }
}
// for (let k in sc444) { console.log(k); }
// for (let k in sc444) { console.log(sc444[k]()); }

var sc555 = {
    get555WCAScramble:   () => { return scBig["get555WCAScramble"] (60); },
    get555SiGNScramble:  () => { return scBig["get555SiGNScramble"](60); },
    get555edgesScramble: () => { return scBig["get555edgesScramble"](8); },
}
// for (let k in sc555) { console.log(k); }
// for (let k in sc555) { console.log(sc555[k]()); }

var sc666 = {
    get666WCAScramble:   () => { return scBig["get666WCAScramble"] (80); },
    get666SiGNScramble:  () => { return scBig["get666SiGNScramble"](80); },
    get666edgesScramble: () => { return scBig["get666edgesScramble"](8); },
}
// for (let k in sc666) { console.log(k); }
// for (let k in sc666) { console.log(sc666[k]()); }

var sc777 = {
    get777WCAScramble:   () => { return scBig["get777WCAScramble"] (100) },
    get777SiGNScramble:  () => { return scBig["get777SiGNScramble"](100) },
    get777edgesScramble: () => { return scBig["get777edgesScramble"] (8) },
}
// for (let k in sc777) { console.log(k); }
// for (let k in sc777) { console.log(sc777[k]()); }

var scPyra_ = pyra_scrambler;
var scPyra = {
    getPyraWCAScramble:     () => { return scPyra_["getPyraWCAScramble"]    () },
    getPyraOptimalScramble: () => { return scPyra_["getPyraOptimalScramble"]() },
}
// for (let k in scPyra) { console.log(k); }
// for (let k in scPyra) { console.log(scPyra[k]()); }

var scUtil  = util_scramble;

var scMega = {
    getMegaminxWCAScramble:      () => { return scUtil["getMegaminxWCAScramble"]     (70) },
    getMegaminxCarrotScramble:   () => { return scUtil["getMegaminxCarrotScramble"]  (70) },
    getMegaminxOldStyleScramble: () => { return scUtil["getMegaminxOldStyleScramble"](70) },
}
// for (let k in scMega) { console.log(k); }
// for (let k in scMega) { console.log(scMega[k]()); }

var scSq1 = {
    getRandomScramble:               () => { return sql_scrambler["getRandomScramble"]() },
    getSquareOneTurnMetricScramble:  () => { return scUtil["getSquareOneTurnMetricScramble"] (40)},
    getSquareOneTwistMetricScramble: () => { return scUtil["getSquareOneTwistMetricScramble"](20)},
}
// for (let k in scSq1) { console.log(k); }
// for (let k in scSq1) { console.log(scSq1[k]()); }

var scSkewb = {
    getSkewbWCAScramble: skewb_scrambler["getSkewbWCAScramble"],
}
// for (let k in scSkewb) { console.log(k); }
// for (let k in scSkewb) { console.log(scSkewb[k]()); }

var scClock = {
    getClockWCAScramble: scUtil["getClockWCAScramble"],
    getClockJaapScramble: scUtil["getClockJaapScramble"],
    getClockConciseScramble: scUtil["getClockConciseScramble"],
    getClockEfficientPinOrderScramble: scUtil["getClockEfficientPinOrderScramble"],
}
