// commands.js

const $cube_commands = {
    // set cube
    "cube": (cube) => {
        if (Object.keys(command_cubes).includes(cube)) {
            cubeSelect.value = cubes.indexOf(command_cubes[cube]);
            setScramble().then(((result)=>{ sc = result }));
            return [`Cube selected to ${command_cubes[cube]}!`, GOOD];
        } else {
            if (cube==undefined) { return [`Invalid Cube`, BAD]; }
            return [`Invalid Cube: ${cube}`, BAD];
        }
    },

    // next scramble
    "next": () => { setScramble().then(((result)=>{ sc = result; })) },

    // punish
    "punish": (type=null) => {
        if (["+2", "+", "2"].includes(type)) {
            return punish(PLUS2);
        } else if (["DNF", "D"].includes(type)) {
            return punish(DNF);
        } else if ([null, " "].includes(type)) {
            return punish(null);
        } else {
            return [`Invalid punishment: ${type}`, BAD];
        }
    },

    // view time log
    "view": (idx) => {
        if (isIdxValid(idx)) { ShowTimeModifyDialog(idx-1); }
        else { return [`Invalid index: ${idx}`, BAD]; }
    },

    // edit time log
    "edit": {
        "punish": (idx, type) => {
            if (isIdxValid(idx)) {
                if (["+2", "+", "2"].includes(type)) {
                    return edit_punish(idx-1, PLUS2);
                } else if (["DNF", "dnf", "D", "d"].includes(type)) {
                    return edit_punish(idx-1, DNF);
                } else if ([null, " "].includes(type)) {
                    return edit_punish(idx-1, null);
                } else {
                    return [`Invalid punishment: ${type}`, BAD];
                }
            }
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
            if (s_idxs.includes(name)) {
                return [`Session "${name}" exist`, BAD];
            }
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
                return [`Session "${name}" not found`, BAD];
            }
            if (s_idxs.length <= 1) {
                return [`There has to be AT LEAST one session!`, PROB];
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

    // export session
    "export": () => {
        var now = new Date();
        var time = `${now.getFullYear()}${now.getMonth()+1}${now.getDate()}_` +
                  `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

        download("application/json", JSON.stringify(sessions), `sessions_${time}`);

        return [`Downloaded all sessions as "sessions_${time}.json"`, GOOD];
    },

    // import session
    "import": () => {
        let status = "";
        var input = upload();

        input.onchange = (e) => {
            let file = e.target.files[0];

            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = (readerEvent) => {
                content = readerEvent.target.result;

                try {
                    json = JSON.parse(content);
                    console.log(json);

                    sessions = json;
                    s_idxs = Object.keys(sessions);
                    s_length = s_idxs.length;
                    current_session = 0;

                    all_times = getSession();

                    logs();

                    status = [`Imported!`, GOOD];

                } catch (E) {
                    status = [`Invalid file!`, BAD];
                }
            }
        }
    },
};

const unknown = "unknown";
var list     = ["cube", "scramble", "time", "punish", "date", "comment", "tags"];
var defaults = [unknown, "freedom", unknown, null, unknown, "",  []];

const $other_commands = {
    "version": () => { return [`last update: ${last_update}`, GOOD] },
    "refresh": () => { location.href = location.href; },
    "reload": "refresh",

    "update": () => {
        s_idxs.forEach((name) => {
            console.log(name);
            JSON.parse(sessions[name]).forEach((item, idx, arr) => {
                console.log(item);

                list.forEach((elem, i) => {
                    if (!item[elem]) {
                        item[elem] = defaults[i];
                    }
                });

                arr[idx] = item;
            })
        })
    },

    "reset": () => {
        localStorage.setItem("sessions", JSON.stringify({"default": `[]`, "second": `[]`, "third": `[]`}));
        localStorage.setItem("session_idxs", JSON.stringify(Object.keys(sessions)));
        localStorage.setItem("current_session", '0');

        // refresh the page
        location.href = location.href;
    },

    "help": () => {
        window.open("help.html", "_blank")
    },

    "test": {
        null: () => { console.log("default") },
        "hi": () => { console.log("hello") },
        "return": () => {
            localStorage.sessions = localStorage.session_backup;
            sessions = localStorage.sessions;
            s_idxs = Object.keys(sessions);
        }
    },
};

const $commands = mergeObjects($cube_commands, $other_commands);
