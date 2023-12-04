
// Element
const getElement = (by, elem) => {
    switch (by.toLowerCase()) {
        case "id":        return document.getElementById(elem);
        case "class":     return document.getElementsByClassName(elem);
        case "name":      return document.getElementsByName(elem);
        case "tagname":   return document.getElementsByTagName(elem);
        case "namespace": return document.getElementsByTagNameNS(elem);
    }
}

const getStyle = (elem, style) => {
    return (window.getComputedStyle(elem, null).getPropertyValue(style));
}

const hide  = (elem) => { elem.style["display"] = "none" ; }
const block = (elem) => { elem.style["display"] = "block"; }
const grid  = (elem) => { elem.style["display"] = "grid"; }

const toggle_shown = (elem, type=block) => {
    if (getStyle(elem, "display") == "none") {
        type();
    } else {
        hide();
    }
}

const fadeIn = (elem, delay=10) => {
    elem.style["opacity"] = "0";
    var opacity = 0;
    var intervalID = setInterval(() => {
        if (opacity < 1) {
            opacity = opacity + 0.1
            elem.style["opacity"] = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, delay);

    return intervalID;
}

const fadeOut = (elem, delay=10) => {
    elem.style["opacity"] = "1";
    var opacity = 1;
    var intervalID = setInterval(() => {
        if (opacity > 0) {
            opacity = opacity - 0.1
            elem.style["opacity"] = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, delay);

    return intervalID;
}

// Format
const str = (inp) => {
    return ("" + inp);
}

const mergeObjects = (...objs) => {
    return Object.assign({}, ...objs);
}


// Array
Object.defineProperties(Array.prototype, {
    count: {
        value: function (value) {
            return this.filter(x => x==value).length;
        }
    },
    removeAll: {
        value: function (elem) {
            while (this.count(elem)) {
                this.splice(this.indexOf(elem), 1)
            }
            return this;
        }
    },
});

// Other
const delay = (ms=0) => new Promise(res => setTimeout(res, ms));

const copy = (text) => { navigator.clipboard.writeText(text); }

const equalsIgnoringCase = (text1, text2) => {
    return text1.localeCompare(text2, undefined, { sensitivity: 'base' }) === 0;
}

// const addHotkey = (scope=document, key, modifier="", preventdefault=true) => {
//     scope.addEventListener("keydown", (e) => {
//         if (e.code==key) {
//              
//         }
//     });
// }
