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
            logs();
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
        null: "change",
        "=": "change",
        "change": (name) => {
            if (!(s_idxs.includes(name))) {
                return [`Invalid Session: ${name}`, BAD];
            }

            current_session = s_idxs.indexOf(name);
            sessionSelect.value = current_session;
            localStorage.setItem("current_session", current_session);

            all_times = getSession();

            logs();

            return [`Session "${name}" Selected`, GOOD];
        },

        // add new session
        "+": "add",
        "add": (name) => {
            sessions[name] = [];
            s_idxs.push(name);

            // session select
            s_length = s_idxs.length;
            sessionSelect.innerHTML = "";
            createSelect(s_length, s_idxs, sessionSelect,
                (i, opt) => { return i==(current_session) });

            logs();

            return [`Added new session: ${name}`, GOOD];
        },

        // remove a session
        "-": "remove",
        "remove": (name) => {
            if (!(s_idxs.includes(name))) {
                return [`Invalid Session: ${name}`, BAD];
            }

            current_session = 0;
            all_times = getSession();

            delete sessions[name];
            s_idxs[s_idxs.indexOf(name)] = null;
            s_idxs = s_idxs.filter(i => i);


            // session select
            s_length = s_idxs.length;
            sessionSelect.innerHTML = "";
            createSelect(s_length, s_idxs, sessionSelect,
                (i, opt) => { return i==(current_session) });

            logs();

            return [`Removed session: ${name}`, PROB];
        },
    },
};

const $other_commands = {
    "refresh": () => { location.href = location.href; },
    "reload": "refresh",

    "fix": () => {
        localStorage.setItem("sessions", JSON.stringify({"default": localStorage.getItem("all_times"), "second": `[]`, "third": `[]`}));
        localStorage.setItem("session_idxs", JSON.stringify(["default", "second", "third"]));
        localStorage.setItem("current_session", 0);

        // refresh the page
        location.href = location.href;
    },

    "test": {
        null: () => { console.log("default") },
        "hi": () => { console.log("hello") },
    },
};

const $commands = mergeObjects($cube_commands, $other_commands);
