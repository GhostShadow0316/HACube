// commands.js

const punish_type = (type) => {
    if (["+2", "+", "2"].includes(type)) {
        return PLUS2;
    } else if (["DNF", "dnf", "D", "d"].includes(type)) {
        return DNF;
    } else if ([null, " "].includes(type)) {
        return null;
    } else {
        return null;
    }
}

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
        return punish(punish_type(type));
    },

    // view time log
    "view": (idx) => {
        if (isIdxValid(idx)) { ShowTimeModifyDialog(idx-1); }
        else { return [`Invalid index: ${idx}`, BAD]; }
    },

    // edit time log
    "edit": {
        "punish": (idx, type) => {
            if (isIdxValid(idx)) { return edit_punish(idx-1, punish_type(type)); }
            else { return [`Invalid index: ${idx}`, BAD]; }
        },
    },
    // remove time
    "remove": (idx) => {
        const removeSingleIndex = (index) => {
            all_times.splice(index-1, 1);
            logs();
            return [`Removed time on index ${index}`, PROB];
        };

        const removeNegativeIndex = (index) => {
            const positiveIndex = index * -1;
            if (isIdxValid(positiveIndex)) {
                all_times.splice(all_times.length+index, 1);
                logs();
                return [`Removed time on index ${all_times.length+2+index}`, PROB];
            } else {
                return [`Invalid index: ${idx}`, BAD];
            }
        };

        if (idx === "*") {
            const confirmation = confirm("Are you sure you want to remove all elements?");
            if (confirmation) {
                all_times = [];
                logs();
                return ["Removed all elements", PROB];
            } else {
                return ["Operation canceled", BAD];
            }
        }

        const rangeRegex = /^(\d+)~(\d+)$/;
        const isValidRange = (start, end) => { return isIdxValid(start) && isIdxValid(end); };

        const removeRange = (start, end) => {
            if (start>end) {
                _ = start;
                start = end;
                end = _;
            }
            all_times.splice(start-1, end-start+1);
            logs();
            return [`Removed elements from index ${start} to ${end}`, GOOD];
        };

        const rangeMatch = idx.toString().match(rangeRegex);
        if (rangeMatch) {
            const start = parseInt(rangeMatch[1]);
            const end = parseInt(rangeMatch[2]);
            return isValidRange(start, end) ? removeRange(start, end) : [`Invalid range: ${idx}`, BAD];
        }

        const index = parseInt(idx);
        if (!isNaN(index) && index < 0) { return removeNegativeIndex(index); }
        if (!isNaN(index) && isIdxValid(index)) { return removeSingleIndex(index); }
        else { return [`Invalid index: ${idx}`, BAD]; }
    },

    // copy
    "copy": {
        null: () => { return [`Copy what?`, PROB] },
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
        "add": (name=null) => {
            if (name===null) { return [`Session name?`, PROB]; }
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
            if (name===null) { return [`Session name?`, PROB]; }
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

        // rename a session
        // TODO
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
        localStorage.session_backup = localStorage.sessions;

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

                    set_status(`Imported!`, GOOD);

                } catch (E) {
                    set_status(`Invalid file!`, BAD);
                }
            }
        }
    },

    // restore sessions from backup
    "restore": async () => {
        localStorage.sessions = localStorage.session_backup;

        location.href = location.href;
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
       localStorage.clear();

        // refresh the page
        location.href = location.href;
    },

    "help": () => {
        window.open("help.html", "_blank");
    },

    "test": {
        null: () => { console.log("default") },
        "hi": () => { console.log("hello") },
    },
};

const $commands = mergeObjects($cube_commands, $other_commands);
