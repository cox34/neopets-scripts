// ==UserScript==
// @name        Neopets - Your Shop Stock
// @namespace   Violentmonkey Scripts
// @include     https://www.neopets.com/market.phtml?*type=your*
// @include     https://www.neopets.com/market_your.phtml*
// @grant       none
// @version     2.0
// @author      -
// @description Highlight new stock and warn if Nerkmid price seems low
// ==/UserScript==
//v1.1 fixed it so if nerk price is 0 it wont warn
//v1.2 include https://www.neopets.com/market_your.phtml* 
//(this link seems to only appear when you click view stock after adding an item from inv)
//v2 auto price after ssw

const autoPriceAfterSSW = true;
const randomizeUndercutValue = true;
let undercutValue = Math.ceil(Math.random()*100); 
//enter your own value or use the random one
const userName = document.querySelector(".user.medText").querySelector("a").textContent;
//check username so you dont undercut your own shop

const highlightNewStock = true;
const removeZeroes = false;
const warnOnLowPriceNerk = true;
const nerkmidEstMinValue = 111111;

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
      if(itemPrice.value !== "0" && parseInt(itemPrice.value) < nerkmidEstMinValue){
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

function waitForResults(){
  return new Promise((resolve, reject)=>{
    const observer = new MutationObserver((mutations) => {
      console.log(mutations);
      if(document.getElementById("results_table") !== null){
        //observer.disconnect();
        return resolve();
      }
    });
    observer.observe(document.getElementById("results"), {
      childList: true, 
      subtree: true
    });
  });
}

function waitForSWResults(){
  waitForResults().then(function(){
    const searchedItem = document.getElementById("search_for").textContent.split("matching \'")[1].replace("\'...", "");
    const searchedItemPrice = parseInt(
      document.getElementById("results_table")
      .querySelectorAll("tr")[1]
      .querySelectorAll("td")[2]
      .textContent.replace(/,/g,"")
    );
    const searchedItemSeller =
      document.getElementById("results_table")
      .querySelectorAll("tr")[1]
      .querySelectorAll("td")[0]
      .textContent;
    console.log("Lowest price for "+searchedItem+" is "+searchedItemPrice);
    if(userName !== searchedItemSeller){
      updateItemPrice(searchedItem, searchedItemPrice);
      if(randomizeUndercutValue === true){
        undercutValue = Math.ceil(Math.random()*100);
      }
    }
    waitForSWResults();
  }).catch((e)=>{
    console.log(e);
  });
}

function updateItemPrice(itemName, itemPrice){
  for(let [i, item] of shopStockItems.entries()){
    const stockedItemName = item.querySelector("b");
    const stockedItemPriceInput = item.querySelector("input[name='cost_"+i+"']");
    if(stockedItemName && stockedItemName.textContent === itemName){
      stockedItemPriceInput.value = itemPrice-undercutValue;
    }
  }
}

if(autoPriceAfterSSW === true){
  waitForSWResults();
}
