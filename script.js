// ==UserScript==
// @name        xkcd
// @namespace   *xkcd.com/*
// @include     *xkcd.com/*
// @version     1
// @grant       none
// ==/UserScript==
function doc_keyUp(e) {
    var query = window.location.href;
    query = query.substring(query.indexOf(".com/")+4).replace(/\//g,'');
    switch(e.code){
        case "KeyS":
            var subscript = $("#comic")["0"].firstElementChild.title;
            $("#comic").append("<br/>" + subscript);
            break;
        case "KeyH":
            window.location.href = "https://explainxkcd.com/"+query;
            break;
        case "KeyF":
            window.location.href = "https://xkcd.com/"+query;
            break;
        case "KeyR":
            window.location.href = "https://c.xkcd.com/random/comic/";
            break;
        case "KeyN":
            window.location.href = "https://xkcd.com/"+(parseInt(query)+1).toString();
            break;
        case "KeyP":
            window.location.href = "https://xkcd.com/"+(parseInt(query)-1).toString();
            break;
        case "KeyT":
            window.location.href = "https://xkcd.com";
            break;
        default:
            console.log(query);
    }
}
document.addEventListener('keyup', doc_keyUp, false);
