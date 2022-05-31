// ==UserScript==
// @name        Neopets - Stock Market - Portfolio Highlighter
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/stockmarket.phtml?type=portfolio
// @grant       none
// @description Highlights stocks in your portfolio above or equal to x price
// @version     1.0
// ==/UserScript==
// 
//you can change these
const highlightMinValue = 30;
const highlightColor = "#AFE1AF"; 

const portfolio = document.querySelector("#postForm").querySelectorAll("tr");
for(let stock of portfolio){
    const stockPrice = parseInt(stock.querySelectorAll("td")[3].textContent);
    if(stockPrice >= highlightMinValue){
      makeColoredChildren(stock.querySelectorAll("td"), highlightColor);
    }
}

function makeColoredChildren(children, color){
  for(child of children){
    child.style.backgroundColor = color;
  }
}