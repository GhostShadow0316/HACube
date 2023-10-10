
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
            break;
        case ("3x3"):
            sc = sc333.getRandomScramble();
            break;
        case ("4x4"):
            scramble.innerHTML = "loading scramble";
            sc_display.style["display"] = "none";
            await delay(0);

            sc = sc444.getRandomScramble();
            sc_display.style["display"] = "grid";
            break;
        case ("Pyraminx"):
            sc = scPyra.getPyraWCAScramble();
            break;
    }

    if (sc.length > 59) { scramble.style["font-size"] = "1.5vw"; }
    else                { scramble.style["font-size"] = "2vw"; }

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
