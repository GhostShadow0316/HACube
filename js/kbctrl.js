// kbctrl.js

// define

const G = "#0f0";
const Y = "#ff0";
const R = "#f00";

const kbctrl   = document.getElementById("kbctrl");
const kbinput  = document.getElementById("kbinput");
const kbstatus = document.getElementById("kbstatus");

const setStatus = async (text, color) => {
    kbstatus.style["color"] = color;
    kbstatus.textContent = text;
    block(kbstatus);

    fadeIn(kbstatus);
    await delay(text.length*100);

    fadeOut(kbstatus);
}

const parse = (input) => { return input.trim().split(" "); }

const execute = (input, commands=$commands) => {
    const keys = Object.keys(commands).map((t)=>{ return t.toLowerCase(); })

    if (keys.includes(input[0].toLowerCase())) {
        const v = commands[input[0]];

        switch (typeof v) {
            case ("function"):
                v(...input.slice(1));
                break;
            case ("string"):
                commands[v](...input.slice(1));
                break;

            case ("object"):
                if (input.length === 1) { v[null](); }
                else { execute(input.slice(1), v); }
                break;
        }
    } else {
        const v = commands[null];
        switch (typeof v) {
            case ("function"): return v(...input);
            case ("string"): return commands[v](...input);
        }
    }
};

document.addEventListener("keydown", (e) => {
    const key = e.code;

    switch (key) {
        case ("Escape"): // esc -> hide kbctrl
            hide(kbctrl);
            break;
        case ("Enter"): // enter -> send command
            hide(kbctrl);
            execute(parse(kbinput.value));
            break;
        case ("KeyP"): // ^+p -> show kbctrl
            if (e.shiftKey && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                e.stopPropagation();

                kbctrl.style["display"] = ((getStyle(kbctrl, "display")==="none") ? "block" : "none");
                kbinput.value = "";
                kbinput.focus();
            }
            break;
    }
});

// click outside hide kbctrl
document.addEventListener("click", (e) => {
    (!kbctrl.contains(e.target)) ? hide(kbctrl) : ("");
});
