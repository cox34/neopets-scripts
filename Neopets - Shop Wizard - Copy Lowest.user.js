// ==UserScript==
// @name        Neopets - Shop Wizard - Copy Lowest
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/shops/wizard.phtml*
// @grant       none
// @version     1.0
// @description Copy lowest price -1 from normal SW whenever search results are shown/resumbit is clicked
// ==/UserScript==

function waitForResults(){
  return new Promise((resolve, reject)=>{
    const observer = new MutationObserver((mutations) => {
      console.log(mutations);
      if(document.querySelectorAll(".wizard-results-grid")[0].offsetParent !== null){
        //observer.disconnect();
        return resolve();
      }
    });
    observer.observe(document.getElementById("shopWizardFormResults"), {
      childList: true, 
      subtree: true
    });
  });
}

let lowestPrice = 999999;

function waitForResultsLoop(){
  waitForResults().then(function(){
    let searchedItemPrice = parseInt(
      document.querySelector("#shopWizardFormResults").querySelectorAll(".wizard-results-price")[0]
      .textContent.replace(/,/g,"")
    );
    if(lowestPrice >= searchedItemPrice){
      lowestPrice = searchedItemPrice;
      navigator.clipboard.writeText(searchedItemPrice-1);
    }
    console.log("Current results lowest price: "+searchedItemPrice, "Total results lowest price: "+lowestPrice);
    waitForResultsLoop();
  }).catch((e)=>{
    console.log(e);
  });
}

waitForResultsLoop();

