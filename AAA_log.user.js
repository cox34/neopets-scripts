// ==UserScript==
// @name        Neopets - Log Attic Stocks
// @namespace   Violentmonkey Scripts
// @match       https://www.neopets.com/halloween/garage.phtml*
// ==/UserScript==

let stockHistory = JSON.parse(localStorage.getItem("AAA_stock.log")) || {};
let itemsInShop = [];

if(document.querySelector("#items")){
  itemsInShop = document.querySelector("#items").querySelectorAll("li");
  
  if(itemsInShop.length >= 22){ //we probably caught a new stock if >=22
    let stockedItemsList = [];
    let stockTime = new Date();
    //unique id every 100 seconds and only when 22+ items in case 2 were bought really fast
    //we dont want to log on every rf but we want to be sure we catch when it does stock
    let stockId = stockTime.getTime().toString().substr(0,8);
    
    if(!stockHistory[stockId]){
      for(shopItem of itemsInShop) {
        stockedItemsList.push(shopItem.getAttribute("oname"));
      }
      stockHistory[stockId] = {
        "realTime": stockTime.toUTCString(),
        "items": stockedItemsList
      };
     localStorage.setItem("AAA_stock.log", JSON.stringify(stockHistory));
    }
  }
}

let lastStock = stockHistory[Object.keys(stockHistory)[Object.keys(stockHistory).length - 1]];
let lastStockTime = new Date(lastStock.realTime).getTime();
let missedItems = 24 - lastStock.items.length;

let copyLink = document.createElement("span");
copyLink.textContent = "Click here to copy last stock info.";
copyLink.style.padding = "50px";
document.body.append(copyLink);

copyLink.addEventListener("click",() => {
  navigator.clipboard.writeText(
    "```"+lastStock.items.join("\n")
    +(missedItems > 0 ? "\n(missed "+missedItems+" item"+(missedItems === 1 ? ")" : "s)") : "")
    +"```"
    +"\n@ "+lastStock.realTime.substr(19,6) + ", next potential stocks:"
    +"\n"+(new Date(lastStockTime+2*420000).toUTCString().substr(19,6))
    +"\n"+(new Date(lastStockTime+3*420000).toUTCString().substr(19,6))
    +"\n"+(new Date(lastStockTime+4*420000).toUTCString().substr(19,6))
    +"\n"+(new Date(lastStockTime+5*420000).toUTCString().substr(19,6))
    +"\n"+(new Date(lastStockTime+6*420000).toUTCString().substr(19,6))
    +"\n"+(new Date(lastStockTime+7*420000).toUTCString().substr(19,6))
    +"\n"+(new Date(lastStockTime+8*420000).toUTCString().substr(19,6))
  );
  alert("copied stock info to clipboard");
});
