// ==UserScript==
// @name        Neopets - SDB Highlighter
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/safetydeposit.phtml
// @grant       none
// @version     1.0
// @description Highlights items in SDB
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
    color: "#d3a3a2",
    items: [
      "seaweed",
      "rotten left",
    ]
  },
  
];

const sdbitems = document.querySelector(".content").querySelectorAll("table")[3].querySelectorAll("tr[bgcolor^='#F']");

highlightLists.forEach((list) => {
  for(let sdbitem of sdbitems){
    if(list.items.some(e => sdbitem.querySelector("td[align='left']").textContent.toLowerCase().includes(e.toLowerCase()))){
      sdbitem.style.backgroundColor = list.color;
    }
  } 
});
