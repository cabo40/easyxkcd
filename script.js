// ==UserScript==
// @name        xkcd
// @namespace   *xkcd.com/*
// @include     *xkcd.com/*
// @version     1
// @grant       none
// ==/UserScript==
var subscriptSet=0;
var maxXKCD=1801;
$.getScript( "https://rawgit.com/kswedberg/jquery-smooth-scroll/master/jquery.smooth-scroll.js" );
function doc_keyUp(e) {
    if(e.ctrlKey) return;
    var query = window.location.href;
    query = query.substring(query.indexOf(".com/")+4).replace(/\//g,'');
    switch(e.code){
        case "KeyC":
            var el = $("#comic");
            var elOffset = el.offset().top;
            var elHeight = el.height();
            var windowHeight = $(window).height();
            var offset;

            if (elHeight < windowHeight) {
                offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
            }
            else {
                offset = elOffset;
            }
            $.smoothScroll({ speed: 700 }, offset);
            break;
        case "KeyF":
            window.location.href = "https://xkcd.com/"+query;
            break;
        case "KeyG":
            var name="a";
            var err=false;
            while(Math.floor(name)!=name || name<1 || name>maxXKCD){
                if(err) window.alert("Input must be a positive number lower than "+maxXKCD);
                err=true;
                name=prompt("Enter xkcd number","1786");
            }
            window.location.href = "https://xkcd.com/"+name;
            break;
        case "KeyH":
            window.location.href = "https://explainxkcd.com/"+query;
            break;
        case "KeyN":
            window.location.href = $("ul.comicNav")[0].children[3].children["0"].href;
            break;
        case "KeyP":
            window.location.href = $("ul.comicNav")[0].children[1].children["0"].href;
            break;
        case "KeyR":
            window.location.href = "https://c.xkcd.com/random/comic/";
            break;
        case "KeyS":
            if(subscriptSet) break;
            subscriptSet = 1;
            var subscript = $("img")[1].title;
            var cssfortext=`
<style>@font-face {
font-family: 'xkcd-Regular';
src: url('/fonts/xkcd-Regular.eot?') format('eot'), url('/fonts/xkcd-Regular.otf') format('opentype');
}</style>`;
            $("#comic").append("<br/><p style=\"font-family:xkcd-Regular;\">" + subscript + "</p>");
            break;
        case "KeyT":
            window.location.href = "https://xkcd.com";
            break;
        default:
            break;
    }
}
document.addEventListener('keyup', doc_keyUp, false);
