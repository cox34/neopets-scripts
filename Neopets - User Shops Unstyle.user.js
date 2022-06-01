// ==UserScript==
// @name        Neopets - User Shops Unstyle
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/browseshop.phtml
// @grant       none
// @version     1.0
// @description Remove user styles from shops
// ==/UserScript==

document.querySelector(".content").querySelector("style").remove();
document.querySelector(".content").childNodes.forEach((node) => {
  if(node.nodeType === 8 && node.textContent === " desc start "){
    node.nextElementSibling.remove();
  }
});
