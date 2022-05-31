// ==UserScript==
// @name        Neopets - Quickstock Highlighter
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/quickstock.phtml
// @grant       none
// @version     1.0
// @description Highlights items in quickstock
// ==/UserScript==

//add your own lists in this format
//item names are not exact, all items containing the item name will be highlighted
//upper or lowercase is fine
//remember your commas
/*
  {
    color: "hex_or_color_name",
    items: [
      "item_name_contains",
      "item_name_contains",
      "item_name_contains",
    ]
  },
*/
const highlightLists = [
  
  {
    color: "gold",
    items: [
      "nerkmid",
      "morphing potion",
    ]
  },
  
  {
    color: "tan",
    items: [
      "codestone",
    ]
  },
  
  {
    color: "green",
    items: [
      "bubbling fungus",
      "negg",
    ]
  },
  
];

const quickstockItems = document.querySelector("form[name='quickstock']").querySelectorAll("td");

highlightLists.forEach((list) => {
  for(let row of quickstockItems){
    if(list.items.some(e => row.textContent.toLowerCase().includes(e.toLowerCase()))){
      row.parentElement.style.backgroundColor = list.color;
    }
  } 
});
