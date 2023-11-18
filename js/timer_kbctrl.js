// timer_kbctrl.js

// function
const isIdxValid = (idx) => { return (idx>0)&&(idx<=all_times.length); };

var toggle = () => {
    if (getStyle(kbctrl, "display")=="none") {
        kbinput.value = "";
        kbctrl.style["display"] = "block";
    } else {
        kbctrl.style["display"] = "none";
    }
};

// status
const GOOD = "#0f0";
const PROB = "#ff0";
const BAD  = "#f00";

const set_status = async (text, color) => {
    kbstatus.style["color"] = color;
    kbstatus.innerHTML = text;
    block(kbstatus);
    fadeIn(kbstatus);
    await delay(text.length*100);
    if (getStyle(kbstatus, "display")) {
        fadeOut(kbstatus);
        hide(kbstatus);
    }
};

const kbctrl   = getElement("class", "kbctrl")[0];
const kbinput  = getElement("class", "kbinput")[0];
const kbstatus = getElement("class", "kbstatus")[0];

const parse = (input) => { return input.trim().split(" "); };

const execute = (input, commands=$commands) => {
    // get keys
    const command_keys = Object.keys(commands).map( (t)=>{ return t.toLowerCase(); } )

    // execute
    if (command_keys.includes(input[0].toLowerCase())) {
        for (let [k, v] of Object.entries(commands)) {
            if (input[0].toLowerCase() == k.toLowerCase()) {
                if (typeof(v) == "function") {
                    x = v(...input.slice(1));
                    if (x != null) { set_status(x[0], x[1]) }
                }
                if (typeof(v)=="object") {
                    if (input.length == 1) { return; }
                    else { execute(input.slice(1), v) }
                }
                if (typeof(v)=="string") {
                    x = commands[v](...input.slice(1));
                    if (x != null) { set_status(x[0], x[1]) }
                }
            }
        }
    } else {
        set_status(`Invalid Command: ${input[0]}`, BAD);
    }
};

// ^+p -> show kbctrl
// esc -> hide kbctrl
document.addEventListener("keydown", (e) => {
    if (e.code == "KeyP" && e.shiftKey && (e.ctrlKey || e.metaKey)) {
    // if (e.code == "KeyP" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();

        // show kbctrl
        toggle();
        kbinput.focus();
    }
    if (e.code == "Escape") { hide(kbctrl); }
});

// click outside to hide kbctrl
document.addEventListener("click", (e) => {
    if (!kbctrl.contains(e.target)) { hide(kbctrl); }
});

// enter to send command
kbinput.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        hide(kbctrl);
        execute(parse(kbinput.value));
    }
});
