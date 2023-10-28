
var cube_select = document.getElementById("cube-select");
var scramble    = document.getElementsByTagName("scramble")[0];
var top_div     = document.getElementById("top");
var next_sc     = document.getElementById("next-sc");
var sc_display  = document.getElementById("sc-display");
var title       = document.getElementById("title");


for (let i=0; i<cubes.length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cubes[i];
    if (cubes[i]=="3x3") { opt.toggleAttribute("selected"); }
    cube_select.add(opt);
}

const delay = (ms=0) => new Promise(res => setTimeout(res, ms));

var setScramble = async () => {
    var sc = ""
    cube = cubes[cube_select.value]
    switch (cube) {
        case ("2x2"):
            sc = sc222.getRandomScramble();
            scramble.style["font-size"] = "2vw";
            break;
        case ("3x3"):
            sc = sc333.getRandomScramble();
            scramble.style["font-size"] = "2vw";
            break;
        case ("4x4"):
            scramble.innerHTML = "loading scramble";
            sc_display.style["display"] = "none";
            await delay(0);

            sc = sc444.getRandomScramble();
            sc_display.style["display"] = "grid";
            scramble.style["font-size"] = "1.5vw";
            break;
        case ("5x5"):
            scramble.innerHTML = "loading scramble";
            sc_display.style["display"] = "none";
            await delay(0);

            sc = sc555.get555WCAScramble();
            sc_display.style["display"] = "grid";
            scramble.style["font-size"] = "1.1vw";
            break;
        case ("6x6"):
            scramble.innerHTML = "loading scramble";
            sc_display.style["display"] = "none";
            await delay(0);

            sc = sc666.get666WCAScramble();
            sc_display.style["display"] = "grid";
            scramble.style["font-size"] = "1vw";
            break;
        case ("7x7"):
            scramble.innerHTML = "loading scramble";
            sc_display.style["display"] = "none";
            await delay(0);

            sc = sc777.get777WCAScramble();
            sc_display.style["display"] = "grid";
            scramble.style["font-size"] = "0.9vw";
            break;

        case ("Pyraminx"):
            sc = scPyra.getPyraWCAScramble();
            scramble.style["font-size"] = "2vw";
            break;
        case ("Megaminx"):
            sc = scMega.getMegaminxWCAScramble();
            scramble.style["font-size"] = "1vw";
            break;
        case ("Skewb"):
            sc = scSkewb.getSkewbWCAScramble();
            scramble.style["font-size"] = "2vw";
            break;
        case ("Square-1"):
            sc = scSq1.getRandomScramble();
            scramble.style["font-size"] = "1.25vw";
            break;
    }

    scramble.innerHTML = sc;
    sc_display.setAttribute("puzzle", puzzles[cube]);
    sc_display.setAttribute("alg", sc);

    return sc;
}

cube_select.addEventListener("change", () => { setScramble() })
next_sc.addEventListener("click", () => { setScramble() })
window.addEventListener('keydown', function(e) {
    node = e.target.nodeName;
    if(e.code=="Space" && node!="TEXTAREA" && node!="INPUT") { e.preventDefault(); }
});

// title.addEventListener("mouseover", () => { title.innerHTML = "Config"; })
// title.addEventListener("mouseout", () => { title.innerHTML = "HAC CubeTimer"; })
