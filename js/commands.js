// commands.js

const $cube_commands = {
    // set cube
    "cube": (cube) => {
        if (Object.keys(command_cubes).includes(cube)) {
            cube_select.value = cubes.indexOf(command_cubes[cube]);
            setScramble().then(((result)=>{ sc = result }));
            return [`Cube selected to ${command_cubes[cube]}!`, GOOD]
        } else {
            return [`Invalid Cube: ${cube}`, BAD];
        }
    },

    // next scramble
    "next": () => { setScramble().then(((result)=>{ sc = result; })) },

    // punish
    "punish": (type=null) => {
        if ([PLUS2, DNF, null].includes(type)) { return punish(type); }
        else { return [`Invalid punishment: ${type}`, BAD]; }
    },

    // view time log
    "view": (idx) => {
        if (isIdxValid(idx)) { ShowTimeModifyDialog(idx-1); }
        else { return [`Invalid index: ${idx}`, BAD]; }
    },
    // // "close": () => { close_dialog(TMD); },
    // edit time log
    "edit": {
        "punish": (idx, type) => {
            if (isIdxValid(idx)) { return edit_punish(idx-1, type); }
            else { return [`Invalid index: ${idx}`, BAD]; }
        },
    },
    // remove time
    "remove": (idx) => {
        if (isIdxValid(idx)) {
            all_times.splice(idx-1, 1);
            logLocalStorage();
            logTime();
            return [`Removed time on index ${idx}`, PROB];
        } else {
            return [`Invalid index: ${idx}`, BAD];
        }
    },

    // copy
    "copy": {
        "sc": "scramble",
        "scramble": () => {
            copy(scramble.value);
            return [`Copied Scramble!`, GOOD];
        },
        "time": () => {
            copy(timer.value || "0:00.000")
            return [`Copied Solve Time!`, GOOD];
        },
    },

    // session controls
    "session": {
        // change current session
        "=": "change",
        "change": (idx) => {
            if (!((idx-1 <session_length) && (0 <= idx-1))) {
                return [`Invalid Session: ${idx}`, BAD];
            }
            sessionSelect.value = idx-1;

            current_session = sessionSelect.value;
            localStorage.setItem("current_session", current_session);
            if (typeof(sessions[current_session])=="string") {
                all_times = (JSON.parse(sessions[current_session]) || []);
            } else {
                all_times = (sessions[current_session]);
            }
            logLocalStorage();
            logTime();

            return [`Session ${idx} Selected`, GOOD];
        }
    }
};

const $other_commands = {
    "refresh": () => { location.href = location.href },
    "reload": "refresh",

    "fix": () => {
        localStorage.setItem("sessions", JSON.stringify({"0": localStorage.getItem("all_times"), "1": `"[]"`, "2": `"[]"`}));
        localStorage.setItem("current_session", 0);
    }
};

const $commands = mergeObjects($cube_commands, $other_commands);
