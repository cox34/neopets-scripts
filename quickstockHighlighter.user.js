// ==UserScript==
// @name        Neopets - Quickstock Highlighter
// @namespace   Violentmonkey Scripts
// @include       https://www.neopets.com/quickstock.phtml
// @grant       none
// @version     1.0
// @author      -
// @description Highlights items in quickstock
// ==/UserScript==

const highlightColor1 = "gold";
const highlightedItems1 = [
  
  "Nerkmid"
  
];
const highlightColor2 = "tan";
const highlightedItems2 = [
  
  "Codestone",
  "Bubbling Fungus"
  
];

const quickstockItems = document.querySelector("form[name='quickstock']").querySelectorAll("td");

for(let row of quickstockItems){
  if(highlightedItems1.some(e => row.textContent.includes(e))) {
    row.parentElement.style.backgroundColor = highlightColor1;
  }
}
for(let row of quickstockItems){
  if(highlightedItems2.some(e => row.textContent.includes(e))) {
    row.parentElement.style.backgroundColor = highlightColor2;
  }
}
