// ==UserScript==
// @name        Neopets - Trading Post - Always newest
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/island/tradingpost.phtml
// @grant       none
// @version     1.0
// @description Selects 'newest' when searching in the TP
// ==/UserScript==

document.getElementById("tp_newest").checked = true;