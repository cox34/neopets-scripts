// ==UserScript==
// @name        Neopets - Highlight stocks above x price
// @namespace   Violentmonkey Scripts
// @include       https://www.neopets.com/stockmarket.phtml?type=portfolio
// @grant       none
// @version     1.0
// @author      -
// @description 4/2/2022, 12:55:32 PM
// ==/UserScript==

const highlightMinValue = 29;

const portfolio = document.querySelector("#postForm").querySelectorAll("tr");
for(let stock of portfolio){
    const stockPrice = parseInt(stock.querySelectorAll("td")[3].textContent);
    if(stockPrice >= highlightMinValue){
      makeColoredChildren(stock.querySelectorAll("td"), "#AFE1AF");
    }
}

function makeColoredChildren(children, color){
  for(child of children){
    child.style.backgroundColor = color;
  }
}
