// ==UserScript==
// @name        Neopets - Stock Market - Input 1000
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/stockmarket.phtml?type=buy&ticker=*
// @grant       none
// @version     1.0
// @description Input 1000 when buying shares
// ==/UserScript==

document.querySelector("input[name='amount_shares']").value = 1000;