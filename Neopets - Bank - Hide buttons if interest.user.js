// ==UserScript==
// @name        Neopets - Bank - Hide buttons if interest
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/bank.phtml
// @grant       none
// @version     1.0
// @description Removes withdraw and deposit options until interest is collected
// ==/UserScript==

const btnCollectInt = document.querySelector(".bank-interest-btn");
if(btnCollectInt.value = "Collect Interest"){
  document.querySelectorAll(".bank-input-grid")[0].style.visibility="hidden";
  document.querySelectorAll(".bank-input-grid")[1].style.visibility="hidden";
}