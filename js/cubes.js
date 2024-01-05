// cubes.js

const cubes = [
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

const commandCubes = {
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
    "sk": "Skewb",

    "square-1": "Square-1",
    "square1": "Square-1",
    "sq1": "Square-1",

    "clock": "Clock",
}
const commandCubeKeys = Object.keys(commandCubes);


// https://github.com/cubing/cubing.js/blob/c90731a/src/cubing/puzzles/index.ts#L20
const puzzles = {
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

const sc2 = scramble_222;
const sc222 = {
    "getRandomScramble":  () => { return sc2["getRandomScramble"] () },
    "getOptimalScramble": () => { return sc2["getOptimalScramble"]() },
};

const sc3 = scramble_333;
const sc333 = {
    "getRandomScramble":    () => { return sc3["getRandomScramble"]   () },

    "getEdgeScramble":      () => { return sc3["getEdgeScramble"]     () },
    "getCornerScramble":    () => { return sc3["getCornerScramble"]   () },
    "getLLScramble":        () => { return sc3["getLLScramble"]       () },
    "getLSLLScramble":      () => { return sc3["getLSLLScramble"]     () },
    "getZBLLScramble":      () => { return sc3["getZBLLScramble"]     () },
    "getZZLLScramble":      () => { return sc3["getZZLLScramble"]     () },
    "getF2LScramble":       () => { return sc3["getF2LScramble"]      () },
    "getLSEScramble":       () => { return sc3["getLSEScramble"]      () },
    "getCMLLScramble":      () => { return sc3["getCMLLScramble"]     () },
    "getCLLScramble":       () => { return sc3["getCLLScramble"]      () },
    "getELLScramble":       () => { return sc3["getELLScramble"]      () },
    "getAnyScramble":       () => { return sc3["getAnyScramble"]      () },
    "getEasyCrossScramble": () => { return sc3["getEasyCrossScramble"]() },

    "getEOLineScramble":    () => { return sc3["getEOLineScramble"]   () },
    "getZBLSScramble":      () => { return sc3["getZBLSScramble"]     () },
    "get3BLDScramble":      () => { return sc3["getRandomOriScramble"]() },
};

const scBig = megaScrambler;

const sc444 = {
    "getRandomScramble":   () => { return scramble_444["getRandomScramble"](40); },
    "get444edgesScramble": () => { return megaScrambler["get444edgesScramble"](8); }
}

const sc555 = {
    "get555WCAScramble":   () => { return scBig["get555WCAScramble"] (60); },
    "get555SiGNScramble":  () => { return scBig["get555SiGNScramble"](60); },
    "get555edgesScramble": () => { return scBig["get555edgesScramble"](8); },
}

const sc666 = {
    "get666WCAScramble":   () => { return scBig["get666WCAScramble"] (80); },
    "get666SiGNScramble":  () => { return scBig["get666SiGNScramble"](80); },
    "get666edgesScramble": () => { return scBig["get666edgesScramble"](8); },
}

const sc777 = {
    "get777WCAScramble":   () => { return scBig["get777WCAScramble"] (100) },
    "get777SiGNScramble":  () => { return scBig["get777SiGNScramble"](100) },
    "get777edgesScramble": () => { return scBig["get777edgesScramble"] (8) },
}

const scPyra_ = pyra_scrambler;
const scPyra = {
    "getPyraWCAScramble":     () => { return scPyra_["getPyraWCAScramble"]    () },
    "getPyraOptimalScramble": () => { return scPyra_["getPyraOptimalScramble"]() },
}

const scUtil  = util_scramble;

const scMega = {
    "getMegaminxWCAScramble":      () => { return scUtil["getMegaminxWCAScramble"]     (70) },
    "getMegaminxCarrotScramble":   () => { return scUtil["getMegaminxCarrotScramble"]  (70) },
    "getMegaminxOldStyleScramble": () => { return scUtil["getMegaminxOldStyleScramble"](70) },
}

const scSq1 = {
    "getRandomScramble":               () => { return sql_scrambler["getRandomScramble"]() },
    "getSquareOneTurnMetricScramble":  () => { return scUtil["getSquareOneTurnMetricScramble"] (40)},
    "getSquareOneTwistMetricScramble": () => { return scUtil["getSquareOneTwistMetricScramble"](20)},
}

const scSkewb = {
    "getSkewbWCAScramble": () => { return skewb_scrambler["getSkewbWCAScramble"]() },
}

const scClock = {
    "getClockWCAScramble":               () => { return scUtil["getClockWCAScramble"]              () },
    "getClockJaapScramble":              () => { return scUtil["getClockJaapScramble"]             () },
    "getClockConciseScramble":           () => { return scUtil["getClockConciseScramble"]          () },
    "getClockEfficientPinOrderScramble": () => { return scUtil["getClockEfficientPinOrderScramble"]() },
}
