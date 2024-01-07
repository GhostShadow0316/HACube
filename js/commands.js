// commands.js

// define
const PLUS2_TYPES = ["+2", "+", "2"];
const DNF_TYPES   = ["DNF", "dnf", "D", "d"];

const rangeRegex = /^(\d+)~(\d+)$/;

const getPunishType = (type) => {
    if (!type || type === " ") { return null; }
    if (PLUS2_TYPES.includes(type)) { return PLUS2; }
    if (DNF_TYPES  .includes(type)) { return DNF; }
}

const absIdx = (idx) => {
    idx = Number(idx);
    return (idx > 0) ? (idx - 1) : (all_times.length + idx);
}

const isIdxValid = (idx) => {
    return (
        ( (isInteger(Number(idx))) && (idx > 0) && ( idx <= all_times.length) )
     || ( (isInteger(Number(idx))) && (idx < 0) && (-idx <= all_times.length) )
    );
}

const isRangeValid = (start, end) => {
    return ( isIdxValid(start) && isIdxValid(end) );
}

const removeRange = (start, end) => {
    if (start > end) { [start, end] = [end, start]; }
    all_times.splice(start - 1, end - start + 1);
}

// commands

const $cube_commands = {
    null: (input) => { setStatus(`Invalid Command: ${input || `" "`}`, R); },

    "cube": (cube) => { // set cube
        if (cube === undefined) { return setStatus(`What cube?`, Y); }

        if (commandCubeKeys.includes(cube)) {
            cubeSelect.value = cubes.indexOf(commandCubes[cube]);
            setScramble().then(((result)=>{ sc = result }));
            return setStatus(`Cube selected to ${commandCubes[cube]}`, G);
        } else {
            return setStatus(`Invalid Cube: ${commandCubes[cube]}`, R);
        }
    },

    "next": () => { // next scramble
        setScramble()
    },

    "punish": (type) => { // punish current time
        if (type === undefined) { return setStatus(`What punish?`, Y); }

        let p = getPunishType(type);
        if (p === undefined) { return setStatus(`Unknown punish: ${type}`, Y); }
        p = punish(p, "command");

        if (p === null) {
            return setStatus(`Punish cleared`, G);
        } else if (!p) {
            return setStatus(`Start a solve first`, Y);
        } else {
            return setStatus(`Punish set to ${p}!`, G);
        }
    },

    "view": (idx) => { // view time log
        if (idx === undefined) { return setStatus(`View what?`, Y); }

        if (isIdxValid(idx)) {
            idx = absIdx();
            ShowTimeModifyDialog(idx);
        } else {
            return setStatus(`Invalid index: ${idx}`, R);
        }
    },

    "edit": { // edit times
        null: () => { setStatus(`Edit what?`, Y); },
        "punish": (idx, type) => { // edit punish
            if (idx  === undefined) { return setStatus(`Punish which time?`, Y); }
            if (type === undefined) { return setStatus(`What punish?` , Y); }

            if (isIdxValid(idx)) {
                idx = absIdx();

                let p = getPunishType(type);
                if (p === undefined) { return setStatus(`Unknown punish: ${type}`, Y); }

                p = edit_punish(idx, p);
                if (p === null) {
                    return setStatus(`Punish at cleared`, G);
                } else {
                    return setStatus(`Punish at ${idx} set to ${p}!`, G);
                }
            }
            else { return setStatus(`Invalid index: ${idx}`, R); }
        }
    },

    "remove": (idx) => { // remove time
        if (idx === undefined) { return setStatus(`Remove what?`, Y); }

        const rangeMatch = idx.match(rangeRegex);
        if (rangeMatch) {
            const [_, start, end] = rangeMatch.map(Number);
            if (isRangeValid(start, end)) {
                removeRange(start, end);
                setStatus(`Removed times from ${start} to ${end}`, G);
            }
            else {
                setStatus(`Invalid range: ${idx}`, R);
            }
        } else if (idx === "*") {
            if (confirm("Are you sure you want to remove all elements?")) {
                all_times = [];
                setStatus(`Removed all elements`, G);
            } else {
                setStatus(`Operation canceled`, R);
            }
        } else {
            if (isIdxValid(idx)) {
                idx = absIdx(idx);
                all_times.splice(idx, 1);
                setStatus(`Removed time on index: ${idx}`, G);
            } else {
                setStatus(`Invalid index: ${idx}`, R);
            }
        }

        logs();
    },

    "copy": { // copy
        null: () => { setStatus(`Copy what?`, Y); },
        "sc": "scramble",
        "scramble": () => { // copy scramble
            copy(scramble.value);
            return setStatus(`Copied Scramble`, G);
        },
        "tm": "time",
        "time": () => { // copy time
            copy(timer.value || "0:00.000");
            return setStatus(`Copied current time`, G);
        }
    },

    "session": { // session control
        null: () => { setStatus(`What do you want to do?`, Y); },
        "=": "change",
        "change": (name) => { // change session
            if (name === undefined) { return setStatus(`What session?`, Y); }

            if (!(s_idxs.includes(name))) {
                return setStatus(`Session "${name}" not found`, Y);
            }

            current_session = s_idxs.indexOf(name);
            sessionSelect.value = current_session;
            localStorage.current_session = current_session;

            all_times = getSession();
            logs();

            return setStatus(`Session "${name}" selected`, G);
        },

        "+": "add",
        "add": (name) => { // add new session
            if (name === undefined) { return setStatus(`Session name?`, Y); }
            if (s_idxs.includes(name)) { return setStatus(`Session "${name}" exist`, Y); }

            sessions[name] = [];
            s_idxs.push(name);
            s_length = s_idxs.length;

            // session select
            sessionSelect.innerHTML = "";
            createSelect(s_length, s_idxs, sessionSelect, (i => i === (current_session)) );

            logs();

            return setStatus(`Added new session: ${name}`, G);
        },

        "-": "remove",
        "remove": (name) => { // remove session
            if (name === undefined) { return setStatus(`Session name?`, Y); }
            if (!(s_idxs.includes(name))) { return setStatus(`Session "${name}" not exist`, Y); }
            if (s_length <= 1) { return setStatus(`There has to be AT LEAST one session`, Y); }

            current_session = 0;
            all_times = getSession();

            delete sessions[name];
            s_idxs[s_idxs.indexOf(name)] = null;
            s_idxs = s_idxs.filter(i => i);
            s_length = s_idxs.length;

            // session select
            sessionSelect.innerHTML = "";
            createSelect(s_length, s_idxs, sessionSelect, (i => i === (current_session)) );

            logs();

            return setStatus(`Removed session: ${name}`, G);
        },
    },

    "export": { // export sessions
        null: () => {
            const now = new Date();
            const time = `${now.getFullYear()}${now.getMonth()+1}${now.getDate()}_` +
                         `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

            download("application/json", JSON.stringify(sessions), `sessions_${time}`);

            return setStatus(`Downloaded all sessions as "sessions_${time}.json"`, G);
        }
    },

    "import": { // import sessions
        null: () => {
            localStorage.session_backup = localStorage.sessions;

            let input = upload();

            input.onchange = (e) => {
                const reader = new FileReader();
                reader.readAsText(e.target.files[0], "UTF-8");

                reader.onload = (re) => {
                    const content = re.target.result;

                    try {
                        const json = JSON.parse(content);

                        sessions = json;
                        s_idxs = Object.keys(sessions);
                        s_length = s_idxs.length;
                        current_session = 0;
                        all_times = getSession();

                        logs();

                        // session select
                        sessionSelect.innerHTML = "";
                        createSelect(s_length, s_idxs, sessionSelect, (i => i === (current_session)) );

                        setStatus(`Imported`, G);
                    } catch (E) {
                        setStatus(`Invalid file`, R);
                    }
                }
            }
        }
    },

    "restore": () => { // restore from last import backup
        localStorage.sessions = localStorage.session_backup;

        location.href = location.href;
    },
}

const $other_commands = {
    // get now version
    "version": () => { setStatus(`last update: ${last_update}`, G) },

    // refresh the page
    "refresh": () => { location.href = location.href; },
    "reload": "refresh",

    "reset": () => { // reset everything
        localStorage.clear();

        location.href = location.href;
    },

    "help": () => { // open help page
        window.open("help.html", "_blank");
    },
}

const $commands = Object.assign({}, $cube_commands, $other_commands);
