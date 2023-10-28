
var cube_select = document.getElementById("cube-select");
var scramble    = document.getElementsByTagName("scramble")[0];
var top_div     = document.getElementById("top");
var next_sc     = document.getElementById("next-sc");
var sc_display  = document.getElementById("sc-display");
var title       = document.getElementById("title");
var timeLogDiv  = document.getElementById("timeLogDiv");

for (let i=0; i<cubes.length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cubes[i];
    if (cubes[i]==(localStorage.getItem("selected_cube") || "3x3")) { opt.toggleAttribute("selected"); }
    cube_select.add(opt);
}

const delay = (ms=0) => new Promise(res => setTimeout(res, ms));

var hide_display = () => {
    sc_display.style["display"] = "none";
    timeLogDiv.style["height"] = "55vh";
}

var show_display = () => {
    sc_display.style["display"] = "grid";
    timeLogDiv.style["height"] = "30vh";
}

var setScramble = async () => {
    var sc = ""
    cube = cubes[cube_select.value];
    localStorage.setItem("selected_cube", cube);
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
            hide_display();
            await delay(0);

            sc = sc444.getRandomScramble();
            show_display();
            scramble.style["font-size"] = "1.5vw";
            break;
        case ("5x5"):
            sc = sc555.get555WCAScramble();
            scramble.style["font-size"] = "1.1vw";
            break;
        case ("6x6"):
            sc = sc666.get666WCAScramble();
            scramble.style["font-size"] = "1vw";
            break;
        case ("7x7"):
            sc = sc777.get777WCAScramble();
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
            scramble.style["font-size"] = "1.1vw";
            break;
        case ("Clock"):
            sc = scClock.getClockWCAScramble();
            scramble.style["font-size"] = "1.5vw";
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
