// ==UserScript==
// @name        xkcd_everywhere
// @namespace   www.xkcd.com
// @match      *://*/*
// @version     0.02
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// @grant       GM_openInTab
// @require     https://code.jquery.com/jquery-3.1.1.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/chance/1.0.10/chance.min.js
// @resource    html https://www.xkcd.com/
// @connect     www.xkcd.com
// @updateURL   https://raw.githubusercontent.com/cabo40/easyxkcd/master/xkcd_everywhere.js
// ==/UserScript==

function doc_keyUp(e) {
    if(e.ctrlKey && e.shiftKey && e.altKey && e.code=="KeyG"){
        var name="a";
        var err=false;
        GM_xmlhttpRequest( {
            method:       'GET',
            url:        'https://www.xkcd.com/',
            onload:    function (apihtml) {
                var resultObj = $(apihtml.responseText).find('a[rel="prev"]')[0].href;
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
                GM_openInTab("https://xkcd.com/"+Math.floor(name), '_blank');
            }
        } );
    }
}
document.addEventListener('keydown', doc_keyUp, false);
