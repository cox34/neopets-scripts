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
if(btnCollectInt.value === "Collect Interest"){
  for(const [index, el] of document.querySelectorAll(".bank-input-grid").entries()){
    el.style.visibility="hidden";
    const warning = document.createElement("div");
    warning.textContent = "You have uncollected interest. Click here to unhide the input."
    warning.style.fontFamily = "\"MuseoSansRounded700\", \'Arial\', sans-serif";
    warning.style.cursor = "pointer";
    warning.style.paddingTop = "10px";
    warning.style.textAlign = "center";
    warning.addEventListener("click", ()=>{
      document.querySelectorAll(".bank-input-grid")[index].style.visibility="visible";
      event.target.style.display = "none";
    });
    el.parentNode.prepend(warning);
  }
}
