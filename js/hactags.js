// hactags.js
var HACTAGS_VERSION = "0.0.1";

var styleSheet = document.createElement("style");
styleSheet.setAttribute("id", "hactags");
document.head.appendChild(styleSheet);

// functions
const addStyle = (attribute, selector="", style, value) => {
    let styles = new Set();

    for (let elem of document.querySelectorAll(`[${attribute}]`)) {
        let after = elem.getAttribute(`${attribute}`);
        styles.add(`[${attribute}="${after}"]${(selector!=="") ? ":" + selector : ""} { ${style}: ${value || after}; }`);
    }

    styleSheet.innerText += [...styles].join(" ");
}

const addUserStyle = (attribute, selector="", style, value) => {
    let styles = new Set();

    for (let elem of document.querySelectorAll(`[${attribute}]`)) {
        let after = elem.getAttribute(`${attribute}`);
        styles.add(`[${attribute}="${after}"]${(selector!=="") ? ":" : ""}${selector} { ${style}: ${value} ${after}; }`);
    }

    styleSheet.innerText += [...styles].join(" ");
}

// [ HOVER ]

// hoverT
for (let elem of document.querySelectorAll('[hoverT]')) {
    let before = elem.innerHTML;
    let after  = elem.getAttribute("hoverT");

    elem.addEventListener("mouseover" , () => { elem.textContent = after ; });
    elem.addEventListener("mouseleave", () => { elem.textContent = before; });
}

// hoverC (color)
for (let elem of document.querySelectorAll(`[hoverC]`)) {
    let after = elem.getAttribute(`hoverC`).split(" ");
    elem.setAttribute("hoverF", after[0]);
    elem.setAttribute("hoverB", after[1]);
}

// hoverF (foreground)
addStyle("hoverF", "hover", "color");

// hoverB (background color)
addStyle("hoverB", "hover", "background-color");

// hoverA (action)
for (let hover of document.querySelectorAll('[hoverA]')) {
    let action  = hover.getAttribute("hoverA");

    hover.addEventListener("mouseover" , () => { eval(action); });
}

// [ CLICK ]

// clickT
for (let elem of document.querySelectorAll('[clickT]')) {
    let before = elem.innerHTML;
    let after  = elem.getAttribute("clickT");

    elem.addEventListener("mousedown" , () => { elem.textContent = after ; });
    elem.addEventListener("mouseup", () => { elem.textContent = before; });
}

// clickC (color)
for (let elem of document.querySelectorAll(`[clickC]`)) {
    let after = elem.getAttribute(`clickC`).split(" ");
    elem.setAttribute("clickF", after[0]);
    elem.setAttribute("clickB", after[1]);
}

// clickF (foreground)
addStyle("clickF", "active", "color");

// clickB (background color)
addStyle("clickB", "active", "background-color");

// clickA (action)
for (let elem of document.querySelectorAll('[clickA]')) {
    let action  = elem.getAttribute("clickA");

    elem.addEventListener("click" , () => { eval(action); });
}

// [ Abbr ]

// <abbr_> (abbreviation tag to assign variable)
let All_Abbr = {};

for (let tag of document.getElementsByTagName("abbr_")) {
    let attrName = tag.textContent;
    let attrs = {};
    for (let attr of tag.attributes) { attrs[attr.nodeName] = attr.nodeValue; }
    tag.style["display"] = "none";
    All_Abbr[attrName] = attrs;
}

// abbrV (abbreviation by variable)
for (let elem of document.querySelectorAll('[abbrV]')) {
    let abbr = All_Abbr[elem.getAttribute("abbrV")];
    let abbr_set = new Set();
    for (let a in abbr) { abbr_set.add(`${a}=${abbr[a]}`); }

    elem.setAttribute("abbr_", [...abbr_set].join(";"));
}

// abbr_ (abbreviation)
for (let elem of document.querySelectorAll('[abbr_]')) {
    let abbr_s = elem.getAttribute("abbr_")
                   .split(";")
                   .map((case_) => {
                        return case_.split("=").map(x => x.trim());
                   });

    let innerHTML = elem.innerHTML;

    for (let abbr of abbr_s) { innerHTML = innerHTML.replace(...abbr); }
    elem.innerHTML = innerHTML;
}

// [ FONT STYLE ]

// bold
styleSheet.innerText += "[B] { font-weight: bold; }";

// italic
styleSheet.innerText += "[I] { font-style: italic; }";

// small caps
styleSheet.innerText += "[SC] { font-variant: small-caps; }";

// uppercase
styleSheet.innerText += "[UPPER] { text-transform: uppercase; }";

// lowercase
styleSheet.innerText += "[LOWER] { text-transform: lowercase; }";

// capitalize
styleSheet.innerText += "[TITLE] { text-transform: capitalize; }";

// [ TEXT DECORATION ]

// underline
addUserStyle("underline", "", "text-decoration", "underline");

// [ OTHER ]

// cursor
addStyle("cursor", "", "cursor");
