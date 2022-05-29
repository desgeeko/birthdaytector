"use strict";

let ms2Seconds = ms => ms / 1000;
let ms2Minutes = ms => ms2Seconds(ms) / 60;
let ms2Hours = ms => ms2Minutes(ms) / 60;
let ms2Days = ms => ms2Hours(ms) / 24;
let ms2Weeks = ms => ms2Days(ms) / 7;

let seconds2ms = seconds => seconds * 1000;
let minutes2ms = minutes => seconds2ms(minutes * 60);
let hours2ms = hours => minutes2ms(hours * 60);
let days2ms = days => hours2ms(days * 24);
let weeks2ms = weeks => days2ms(weeks * 7);

function calcNext(nb) {
    nb = Math.ceil(nb);
    let exp = Math.floor(Math.log10(nb)) || 1;
    if (exp > 3) exp = 3 * Math.floor(exp / 3);
    let q = Math.pow(10, exp);
    return Math.ceil(nb / q) * q;
} 

function displayResults(results) {
    results.sort((a, b) => a.next - b.next);
    let output = "<p>Next notable birthdays are:</p>\n";
    output += "<table>\n";
    for (let i = 0; i < results.length; i++) {
        output += "<tr>\n";
        output += "<td> &#x1F389 " + results[i]["nb"].toLocaleString() + " " + results[i]["unit"] + "</td>\n";
        output += "<td> &#x2192 </td>\n";
        output += "<td>" + results[i]["next"].toLocaleDateString() + " &#x1F5D3 </td>\n";
        output += "</tr>\n";
    }
    output += "</table>\n";
    return output;    
}

window.onload = function() {
    let params = new URLSearchParams(document.location.search);
    let q = params.get("q");
    if (q == null) return;
    document.getElementById("bd").value = q;
}

function reset(placeholder) {
    placeholder.innerHTML = "";
}

function detect(placeholder, bdate) {
    let res = [];
    let before = new Date(bdate);
    before.setHours(0, 0, 0, 0)
    let now = new Date();   
    now.setHours(0, 0, 0, 0)
    let d = now - before;
    let nbS = calcNext(ms2Seconds(d));
    let nextS = new Date(before.getTime() + seconds2ms(nbS));
    res.push({"unit": "sec.", "delay": ms2Seconds(d), "nb": nbS, "next": nextS});
    let nbM = calcNext(ms2Minutes(d));
    let nextM = new Date(before.getTime() + minutes2ms(nbM));
    res.push({"unit": "min.", "delay": ms2Minutes(d), "nb": nbM, "next": nextM});
    let nbH = calcNext(ms2Hours(d));
    let nextH = new Date(before.getTime() + hours2ms(nbH));
    res.push({"unit": "hours", "delay": ms2Hours(d), "nb": nbH, "next": nextH});
    let nbD = calcNext(ms2Days(d));
    let nextD = new Date(before.getTime() + days2ms(nbD));
    res.push({"unit": "days", "delay": ms2Days(d), "nb": nbD, "next": nextD});
    let nbW = calcNext(ms2Weeks(d));
    let nextW = new Date(before.getTime() + weeks2ms(nbW));
    res.push({"unit": "weeks", "delay": ms2Weeks(d), "nb": nbW, "next": nextW});
    placeholder.innerHTML = displayResults(res);
}
