// ==UserScript==
// @name        xkcd
// @namespace   www.xkcd.com/
// @include     /^https?:\/\/(www\.)?(explain)?xkcd\.com.*$/
// @version     1.07
// @grant       none
// @require     https://code.jquery.com/jquery-3.1.1.min.js
// @require     https://rawgit.com/kswedberg/jquery-smooth-scroll/master/jquery.smooth-scroll.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/chance/1.0.10/chance.min.js
// @updateURL   https://cdn.rawgit.com/SkorohodAlex/easyxkcd/08f76b29/script.js
// ==/UserScript==
var subscriptSet=0;
var maxXKCD=1885;

function doc_keyUp(e) {
    if(e.ctrlKey) return;
    var query= window.location.href;
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
            if($(".mw-redirect").length){
                window.location.href=$("#mw-content-text .plainlinks a")[0].href.replace(/^http:/i,"https:");
            }
            break;
        case "KeyG":
            if(!$("ul.comicNav").length)
                break;
            var name="a";
            var err=false;
            $.ajax ( {
                type:       'GET',
                url:        '/',
                dataType:   'html',
                crossDomain: true,
                success:    function (apihtml) {
                    var resultObj = jQuery(apihtml).find('a[rel="prev"]')[0].href;
                    maxXKCD = parseInt(resultObj.substring(resultObj.indexOf(".com/")+4).replace(/\//g,'')) + 1;
                    while(Math.floor(name)!=name || name<1 || name>maxXKCD){
                        if(name===null){
                            break;
                        }
                        if(err) window.alert("Input must be a positive number lower or equal than " + maxXKCD);
                        err=true;
                        name=prompt("Enter xkcd number","1786");
                    }
                    if(name===null){
                        abort();
                    }
                    window.location.href = "https://xkcd.com/"+Math.floor(name);
                }
            } );
            break;
        case "KeyH":
            if($("ul.comicNav").length)
            {
                window.location.href = "https://explainxkcd.com/"+query;
            }
            break;
        case "KeyN":
            if($("ul.comicNav").length)
            {
                window.location.href = $('a[rel="next"]')[0].href;
            }
            if($(".mw-redirect").length>2){
                window.location.href = $(".no-link-underline .mw-redirect").filter(":contains('Next')")[0].href;
            }
            break;
        case "KeyP":
            if($("ul.comicNav").length)
            {
                window.location.href = $('a[rel="prev"]')[0].href;
            }
            else if($(".mw-redirect").length){
                window.location.href = $(".no-link-underline .mw-redirect").filter(":contains('Prev')")[0].href;
            }
            break;
        case "KeyR":
            if(!$("ul.comicNav").length)
                break;
            $.ajax ( {
                type:       'GET',
                url:        '/',
                dataType:   'html',
                success:    function (apihtml) {
                    var resultObj = jQuery(apihtml).find('a[rel="prev"]')[0].href;
                    maxXKCD = parseInt(resultObj.substring(resultObj.indexOf(".com/")+4).replace(/\//g,'')) + 1;
                    var ncomic = chance.integer({min: 1, max: maxXKCD});
                    window.location.href = "https://www.xkcd.com/" + ncomic;
                }
            } );
            break;
        case "KeyS":
            if(subscriptSet) break;
            subscriptSet = 1;
            var cssfortext=`
<style>@font-face {
font-family: 'xkcd-Regular';
src: url('/fonts/xkcd-Regular.eot?') format('eot'), url('/fonts/xkcd-Regular.otf') format('opentype');
}</style>`;
            $("head").prepend(cssfortext);
            var subscript = $("#comic img")[0].title;
            $("#comic").append($('<div>',{css: {'font-family':'xkcd-Regular'}}).text(subscript));
            break;
        case "KeyT":
            window.location.href = "https://xkcd.com";
            break;
        default:
            break;
    }
}
document.addEventListener('keyup', doc_keyUp, false);
