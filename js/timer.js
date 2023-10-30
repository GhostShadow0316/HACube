
var num = (n, digit) => {
    if (("" + n).length < digit) {
        return ("0".repeat(digit - ("" + n).length) + n);
    } else {
        return ("" + n);
    }
}

const delay = (ms=0) => new Promise(res => setTimeout(res, ms));

var timer       = document.getElementById("timer");
var cube_select = document.getElementById("cube-select");
var staticLog   = document.getElementById("staticLog");
var timeLogDiv  = document.getElementById("timeLogDiv");
var timeLog     = document.getElementById("timeLog");
var solveCount  = document.getElementById("solveCount");

var static_time = document.getElementById("static-time");
var static_ao5  = document.getElementById("static-ao5");
var static_ao12 = document.getElementById("static-ao12");

var TMD          = document.getElementById("TMD");
var TMD_Close    = document.getElementById("TMD-Close");
var TMD_SolveN   = document.getElementById("TMD-SolveN");
var TMD_SolveT   = document.getElementById("TMD-SolveT");
var TMD_Cube     = document.getElementById("TMD-Cube");
var TMD_Scramble = document.getElementById("TMD-Scramble");
var TMD_Date     = document.getElementById("TMD-Date");
var TMD_Delete   = document.getElementById("TMD-Delete");
var TMD_idx;

var hold = false;
var started = false; // *timer
var startS;
var all_times = (JSON.parse(localStorage.getItem("all_times")) || []);
var sc;
var dialog_shown = false;

var cube_select = document.getElementById("cube-select");
var scramble    = document.getElementsByTagName("scramble")[0];
var top_div     = document.getElementById("top");
var next_sc     = document.getElementById("next-sc");
var sc_display  = document.getElementById("sc-display");
var title       = document.getElementById("title");

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
    sc_display.setAttribute("alg", sc.replaceAll("/", " / "));

    return sc;
}

var pressedKeys = { "Space": 0 };
window.onkeyup   = (e) => { if (!dialog_shown) { pressedKeys[e.code] = 0 } }
window.onkeydown = (e) => { if (!dialog_shown) { pressedKeys[e.code] += 1 } }

var detect = async function() {
    if (started) {
        var [resultStr, _] = getTime();

        timer.innerHTML = resultStr;
    }

    await delay(1)

    var spaceKey = pressedKeys["Space"]
    if (spaceKey==0) { timer.style["color"] = "#fff"; }
    else if (spaceKey==1) {
        if (started) {
            started = false;
            endTimer();
            return;
        }
        timer.style["color"] = "green";
    }
    else if (spaceKey>=5) {
        timer.innerHTML = `0:00.000`;
        hold = true;
        timer.style["color"] = "red";
    }

    if (hold && spaceKey==0) {
        started = true;
        startS = new Date().getTime();
        hold = false;
    }

    detect();
}
setTimeout(detect, 0);


var getTime = () => {
    var nowS      = new Date().getTime()
    var result    = (nowS-startS)/1000;
    var resultStr = formatTime(result);

    return [resultStr, result];
}

var formatTime = (time) => {
    var resultM  = Math.floor(time/60);
    var resultS  = Math.floor(time - resultM*60);
    var resultMS = (time - Math.floor(time)).toFixed(3)*1000;

    return `${num(resultM, 1)}:${num(resultS, 2)}.${num(resultMS, 3)}`;
}

var formatDate = (date=["2023", "10", "9", "16", "57", "56"]) => {
    return `${date[0]}/${date[1]}/${date[2]} ${date[3]}:${date[4]}:${date[5]}`;
}

var endTimer = () => {
    var [resultStr, result] = getTime();
    timer.innerHTML = resultStr;

    now = new Date();
    date = [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];

    all_times.push({"cube": cubes[cube_select.value], "scramble": sc, "time": result, "punish": null, "date": date});
    localStorage.setItem("all_times", JSON.stringify(all_times));
    logTime();

    setScramble().then(((result)=>{ sc = result }));

    setTimeout(detect, 0);
}

var time_to_list = (l=all_times) => { return l.map((x)=>{ return x["time"] }) }

var getBest = (l=all_times.map((x)=>{ return x["time"] })) =>  { return Math.min.apply(Math, l); }

var getMean  = (l=time_to_list()) => {
    sum = l.reduce((x, y)=>{return x+y}, 0).toFixed(3);
    return (sum/l.length).toFixed(3);
}

var getAvg  = (l=all_times) => {
    l = time_to_list(l);
    l.sort((a, b)=>{ return a - b });
    l.pop(); l.shift();
    return getMean(l);
}

var logTime = () => {
    timeLog.innerHTML = ``;
    for (let i=0; i<all_times.length; i++) {
        if (i>= 4) { ao5  = getAvg(all_times.slice(i- 4, i+1)); } else { ao5  = "-" }
        if (i>=11) { ao12 = getAvg(all_times.slice(i-11, i+1)); } else { ao12 = "-" }
        timeLog.innerHTML =
        `<tr>
            <td class="idx"> ${i+1}</td>
            <td class="px80">${formatTime(all_times[i]["time"])}</td>
            <td class="px80">${ao5}</td>
            <td class="px80">${ao12}</td>
        </tr>` + timeLog.innerHTML;
    }

    if (all_times.length>1) { static_time.innerHTML = getBest(); }
    all_times.reverse();
    if (all_times.length>= 5) { static_ao5 .innerHTML = getAvg(all_times.slice(0,  6)); }
    if (all_times.length>=12) { static_ao12.innerHTML = getAvg(all_times.slice(0, 13)); }
    all_times.reverse();

    solveCount.innerHTML = `<h1>Solves: ${all_times.length}</h1><br><h2>Mean: ${getMean()}</h2>`


    // add show TMD event to table
    var idxs = document.getElementsByClassName("idx");
    var len = idxs.length-1;
    for (let i=0; i<idxs.length; i++) {
        idxs[i].addEventListener("click", ()=>{ ShowTimeModifyDialog(len-i) })
    }
}

var ShowTimeModifyDialog = (idx) => {
    item = all_times[idx];

    TMD_idx                = idx;
    TMD_SolveN.innerHTML   = `No. ${TMD_idx+1}`;
    TMD_SolveT.innerHTML   = formatTime(item["time"]);
    TMD_Cube  .innerHTML   = `Cube: <a>${item["cube"]}</a>`;
    TMD_Scramble.innerHTML = `Scramble: <a>${item["scramble"]}</a>`;
    TMD_Date  .innerHTML   = `Date: <a>${formatDate(item["date"])}</a>`;

    TMD.style["display"] = "block";
    dialog_shown = true;
}

var close_dialog = (dialog) => {
    dialog.style["display"] = "none";
    dialog_shown = false;
}


// bind
TMD_Close.addEventListener("click", () => { close_dialog(TMD); })

TMD_Delete.addEventListener("click", () => {
    all_times.splice(TMD_idx, 1);
    localStorage.setItem("all_times", JSON.stringify(all_times));
    logTime();

    close_dialog(TMD);
});

cube_select.addEventListener("change", () => { setScramble() })
next_sc.addEventListener("click", () => { setScramble() })
window.addEventListener('keydown', function(e) {
    node = e.target.nodeName;
    if(e.code=="Space" && node!="TEXTAREA" && node!="INPUT") { e.preventDefault(); }
});

// main
for (let i=0; i<cubes.length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cubes[i];
    if (cubes[i]==(localStorage.getItem("selected_cube") || "3x3")) { opt.toggleAttribute("selected"); }
    cube_select.add(opt);
}

logTime();
setScramble().then(((result)=>{ sc = result; }));
