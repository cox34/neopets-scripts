// ==UserScript==
// @name        Neopets - Wise Old King
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/medieval/wiseking.phtml
// @grant       none
// @description Randomizes Wise Old King input
// @version     1.0
// ==/UserScript==

for(let i=1; i<8; i++){
  const q = document.getElementById("qp"+i);
  const qOpt = q.querySelectorAll("option");
  q.value = qOpt[(Math.floor(Math.random()*qOpt.length-1)+1)].value;
}
