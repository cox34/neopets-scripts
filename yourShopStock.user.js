// ==UserScript==
// @name        Neopets - Your Shop Stock
// @namespace   Violentmonkey Scripts
// @include     https://www.neopets.com/market.phtml?*type=your*
// @grant       none
// @version     1.0
// @author      -
// @description Highlight new stock and warn if Nerkmid price seems low
// ==/UserScript==

const highlightNewStock = true;
const removeZeroes = false;
const warnOnLowPriceNerk = true;
const nerkmidEstMinValue = 89999;

const shopStock = document.querySelector("form[action='process_market.phtml']");
const shopStockItems = shopStock.querySelectorAll("tr");
const updateButton = document.querySelector("input[value='Update']");

const warning = document.createElement("tr");
warning.id = "pricewarning";
warning.style.backgroundColor = "#e1afaf";
warning.style.fontSize = "24";
warning.style.fontWeight = "bold";
warning.style.visibility = "hidden";
warning.textContent = "Update button hidden while pricing Nerkmids, click here to remove focus from price input"
shopStock.appendChild(warning);

for(let [i, item] of shopStockItems.entries()){
  const itemName = item.querySelector("b");
  const itemPrice = item.querySelector("input[name='cost_"+i+"']");
  if(itemPrice && itemPrice.value === "0"){
    if(removeZeroes){
      itemPrice.value = "";
    }
    if(highlightNewStock){
      makeColoredChildren(item.querySelectorAll("td"), "#afafe1");
    }
  }
  if(warnOnLowPriceNerk && itemName && itemName.textContent.match("Nerkmid")){
    itemPrice.addEventListener("input", event => {
      if(parseInt(itemPrice.value) < nerkmidEstMinValue){
        makeColoredChildren(item.querySelectorAll("td"), "yellow");
        toggleUpdateButton(true);
      } else {
        makeColoredChildren(item.querySelectorAll("td"), "#AFE1AF");
        toggleUpdateButton(false);
      }
    });
    itemPrice.addEventListener("focusout", event => {
      if(parseInt(itemPrice.value) < nerkmidEstMinValue){
        makeColoredChildren(item.querySelectorAll("td"), "#e1afaf");
        toggleUpdateButton(false);
        alert("That Nerkmid price seems low. Double check!");
      }
    });
  }
}

function makeColoredChildren(children, color){
  for(child of children){
    //setting bg for the tr just went around the item image
    child.style.backgroundColor = color;
  }
}

function toggleUpdateButton(removeButton){
  if(removeButton){
    warning.style.visibility = "visible";
    updateButton.style.display = "none";
  } else {
    warning.style.visibility = "hidden";
    updateButton.style.display = "inline";
  }
}
