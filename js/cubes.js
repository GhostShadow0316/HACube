cubes = [
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

// https://github.com/cubing/cubing.js/blob/c90731a/src/cubing/puzzles/index.ts#L20
puzzles = {
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

var sc222 = scramble_222;
// for (let k in sc222) { console.log(k); }
// for (let k in sc222) { console.log(sc222[k]()); }

var sc333 = scramble_333;
// for (let k in sc333) { console.log(k); }
// for (let k in sc333) { console.log(sc333[k]()); }

var sc444 = scramble_444;
// for (let k in sc444) { console.log(k); }
// for (let k in sc444) { console.log(sc444[k]()); }

var scBig = megaScrambler;

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

var scPyra = pyra_scrambler;
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

var scSkewb = skewb_scrambler;
// for (let k in scSkewb) { console.log(k); }
// for (let k in scSkewb) { console.log(scSkewb[k]()); }

var scClock = {
    getClockWCAScramble: scUtil["getClockWCAScramble"],
    getClockJaapScramble: scUtil["getClockJaapScramble"],
    getClockConciseScramble: scUtil["getClockConciseScramble"],
    getClockEfficientPinOrderScramble: scUtil["getClockEfficientPinOrderScramble"],
}