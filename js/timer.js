// timer.js

const num = (n, digit, replacement="") => {
    if (("" + n).length < digit) {
        return (replacement.repeat(digit - ("" + n).length) + n);
    } else {
        return ("" + n);
    }
}

const logLocalStorage = () => { localStorage.setItem("all_times", JSON.stringify(all_times)); }

const clearAllTimes = () => { localStorage.setItem("all_times", "[]"); }

var cube_select = document.getElementById("cube-select");
var scramble    = document.getElementsByTagName("scramble")[0];
var top_div     = document.getElementById("top");
var next_sc     = document.getElementById("next-sc");
var sc_display  = document.getElementById("sc-display");
var title       = document.getElementById("title");

var timer       = document.getElementById("timer");
var punish_2    = document.getElementById("+2");
var punish_DNF  = document.getElementById("DNF");

var staticLog   = document.getElementById("staticLog");
var timeLogDiv  = document.getElementById("timeLogDiv");
var timeLog     = document.getElementById("timeLog");
var solveCount  = document.getElementById("solveCount");
var static_time = document.getElementById("static-time");
var static_ao5  = document.getElementById("static-ao5");
var static_ao12 = document.getElementById("static-ao12");

var TMD            = document.getElementById("TMD");
var TMD_Close      = document.getElementById("TMD-Close");
var TMD_SolveN     = document.getElementById("TMD-SolveN");
var TMD_SolveT     = document.getElementById("TMD-SolveT");
var TMD_punish_2   = document.getElementById("TMD-+2");
var TMD_punish_DNF = document.getElementById("TMD-DNF");
var TMD_Cube       = document.getElementById("TMD-Cube");
var TMD_Scramble   = document.getElementById("TMD-Scramble");
var TMD_Date       = document.getElementById("TMD-Date");
var TMD_Delete     = document.getElementById("TMD-Delete");
var TMD_idx;

var hold = false;
var started = false; // *timer
var startS;
var all_times = (JSON.parse(localStorage.getItem("all_times")) || []);
var sc;
var dialog_shown = false;

const PLUS2 = "+2";
const DNF   = "DNF";

const hide_display = () => {
    sc_display.style["display"] = "none";
    // timeLogDiv.style["height"] = "55vh";
}

const show_display = () => {
    sc_display.style["display"] = "grid";
    // timeLogDiv.style["height"] = "28vh";
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
            scramble.style["font-size"] = "1.8vw";
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

    scramble.innerHTML = `<a>${sc}</a>`;
    scramble.value = sc;
    sc_display.setAttribute("puzzle", puzzles[cube]);
    sc_display.setAttribute("alg", sc.replaceAll("/", " / "));

    return sc;
}

const not_focused = () => {
    return (
        !dialog_shown &&
        getStyle(kbctrl, "display") == "none"
    );
}

var pressedKeys = { "Space": 0, "Escape": 0 };
window.onkeyup   = (e) => { if (not_focused()) { pressedKeys[e.code] = 0 } }
window.onkeydown = (e) => { if (not_focused()) { pressedKeys[e.code] += 1 } }

var detect = async function() {
    if (started) {
        var [resultStr, _] = getTime();

        timer.innerHTML = resultStr;
    }

    await delay(1)

    var spaceKey = pressedKeys["Space"];
    var escKey = pressedKeys["Escape"];
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

    if (escKey>0) {
        hold = false;
        timer.style["color"] = "white";
        setTimeout(detect, 0);
        return;
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

var add_punish = (time, punish) => {
    switch (punish) {
        case null:
            return `${time}`
        case PLUS2:
            return `${time}+`
        case DNF:
            return `${time} (DNF)`
    }
}

var formatTime = (time, punish=null) => {
    let resultM  = num(Math.floor(time/60), 1);
    let resultMS = num((time - Math.floor(time)).toFixed(3)*1000, 3);

    let resultS;
    if (punish!=PLUS2) { resultS  = num(Math.floor(time - resultM*60), 2); }
    else { resultS  = num(Math.floor(time - resultM*60)+2, 2); }

    let result;
    if (resultM==0) {
        if (resultS==0) {
            result = `0.${resultMS}`;
        } else {
            result = `${resultS}.${resultMS}`;
        }
    } else {
        result = `${resultM}:${resultS}.${resultMS}`;
    }

    return add_punish(result, punish);
}

var formatDate = (date=["2023", "10", "09", "16", "57", "56"]) => {
    return `${date[0]}/${date[1]}/${date[2]} ` +
           `${num(date[3], 2, "0")}:${num(date[4], 2, "0")}:${num(date[5], 2, "0")}`;
}

var endTimer = () => {
    var [resultStr, result] = getTime();
    timer.innerHTML = resultStr;
    timer.value = resultStr;

    now = new Date();
    date = [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];

    all_times.push({"cube": cubes[cube_select.value], "scramble": sc, "time": result, "punish": null, "date": date, "comment": ""});
    logLocalStorage();
    logTime();

    setScramble().then(((result)=>{ sc = result }));

    setTimeout(detect, 0);
}

var time_to_list = (l=all_times) => {
    return l.map((x) => {
        if (x["punish"]==null)  { return x["time"] }
        if (x["punish"]==PLUS2) { return x["time"]+2 }
        if (x["punish"]==DNF)   { return DNF }
    })
}

var getBest = (l=all_times.map((x)=>{ return x["time"] })) =>  { return Math.min.apply(Math, l); }

var getMean  = (l=time_to_list()) => {
    l.removeAll(DNF);
    sum = l.reduce((x, y)=>{return x+y}, 0).toFixed(3);
    return (sum/l.length).toFixed(3);
}

var getAvg  = (l=all_times) => {
    l = time_to_list(l);
    // let DNFs = l.count(DNF);
    // if (DNFs>1) { return DNF; }
    l.removeAll(DNF);
    l.sort((a, b)=>{ return a - b });
    // if (DNFs==1) { l.push(DNF) };
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
            <td class="px80">${formatTime(all_times[i]["time"], all_times[i]["punish"])}</td>
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
    let idxs = document.getElementsByClassName("idx");
    const len = idxs.length-1;
    for (let i=0; i<idxs.length; i++) {
        idxs[i].addEventListener("click", ()=>{ ShowTimeModifyDialog(len-i) })
    }
}

var punish = (type) => {
    if (timer.innerHTML!=formatTime(all_times[all_times.length-1].time)) {
        return [`Start a solve first!`, BAD];
    }

    if (all_times[all_times.length-1].punish!=type) {
        all_times[all_times.length-1].punish = type
    } else {
        all_times[all_times.length-1].punish = null
    }

    logLocalStorage();
    logTime();

    if (type != null) { return [`Punish set to ${type}!`, GOOD]; }
    else { return [`Punish cleared!`, GOOD]; }
}

var edit_punish = (idx, type) => {
    item = all_times[idx] || all_times[TMD_idx];

    if (item.punish!=type) { item.punish = type }
    else { item.punish = null }

    logLocalStorage();
    logTime();
    TMD_SolveT.innerHTML = formatTime(item["time"], item["punish"]);

    if (type != null) { return [`Punish of index ${idx+1} set to ${type}!`, GOOD]; }
    else { return [`Punish of index ${idx+1} cleared!`, GOOD]; }
}

var ShowTimeModifyDialog = (idx) => {
    item = all_times[idx];

    TMD_idx                = idx;
    TMD_SolveN.innerHTML   = `No. ${Number(TMD_idx)+1}`;

    TMD_SolveT.innerHTML   = `<a>${formatTime(item["time"], item["punish"])}</a>`;
    TMD_SolveT.value       = formatTime(item["time"], item["punish"]);

    TMD_Cube  .innerHTML   = `Cube: <a>${item["cube"]}</a>`;
    TMD_Cube  .value       = `${item["cube"]}`;

    TMD_Scramble.innerHTML = `Scramble: <a>${item["scramble"]}</a>`;
    TMD_Scramble.value     = `${item["scramble"]}`;

    TMD_Date  .innerHTML   = `Date: <a>${formatDate(item["date"])}</a>`;
    TMD_Date  .value       = `${formatDate(item["date"])}`;

    TMD.style["display"] = "block";
    dialog_shown = true;
}

var close_dialog = (dialog) => {
    dialog.style["display"] = "none";
    dialog_shown = false;
}


// bind
window.addEventListener('keydown', function(e) {
    node = e.target.nodeName;
    if (e.code=="Space" && node!="TEXTAREA" && node!="INPUT") { e.preventDefault(); }
});

punish_2.addEventListener("click"  , () => { punish(PLUS2) })
punish_DNF.addEventListener("click", () => { punish(DNF) })
TMD_punish_2.addEventListener("click"  , () => { edit_punish(PLUS2) })
TMD_punish_DNF.addEventListener("click", () => { edit_punish(DNF) })

cube_select.addEventListener("change", () => { setScramble().then(((result)=>{ sc = result; })) })
next_sc.addEventListener("click"     , () => { setScramble().then(((result)=>{ sc = result; })) })

TMD_Close.addEventListener("click", () => { close_dialog(TMD); })
document.addEventListener("keydown", (e) => { if (e.code == "Escape") { close_dialog(TMD); } })
TMD_Delete.addEventListener("click", () => {
    all_times.splice(TMD_idx, 1);
    logLocalStorage();
    logTime();

    close_dialog(TMD);
});


// copy
scramble.addEventListener("click", ()=> { copy(scramble.value) })
timer.addEventListener("click", ()=> { copy(timer.value || "0:00.000") })

TMD_SolveT.addEventListener("click", ()=> { copy(TMD_SolveT.value) })
TMD_Cube.addEventListener("click", ()=> { copy(TMD_Cube.value) })
TMD_Scramble.addEventListener("click", ()=> { copy(TMD_Scramble.value) })
TMD_Date.addEventListener("click", ()=> { copy(TMD_Date.value) })

// main
for (let i=0; i<cubes.length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cubes[i];
    if (cubes[i]==(localStorage.getItem("selected_cube") || "3x3")) { opt.toggleAttribute("selected"); }
    cube_select.add(opt);
}

const main = async() => {
    logTime();
    if (cubes[cube_select.value]=="4x4") {
        scramble.innerHTML = "loading scramble";
        hide_display();
        await delay(200);
    }
    setScramble().then(((result)=>{ sc = result; }));
}

main();
