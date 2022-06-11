// ==UserScript==
// @name        Neopets - Bank - Calc interest
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/bank.phtml
// @grant       none
// @version     1.0
// @description Shows daily, 7-day, and 30-day interest
// ==/UserScript==

const interestYearly = parseInt(document.querySelector("#txtAnnualInterest").textContent.replace(/,/g,""));
const interestDaily = Math.ceil(interestYearly/365);

for(const [index, int] of [interestDaily, interestDaily*7, interestDaily*30].entries()){
  const div = document.createElement("div");
  div.textContent = ["Daily", "7-day", "30-day"][index]+" Interest: "+int.toLocaleString("en-US")+" NP";
  div.style.fontFamily = "\"MuseoSansRounded700\", \'Arial\', sans-serif";
  div.style.textAlign = "center";
  document.querySelector(".bank-grid2").parentNode.insertBefore(
    div, document.querySelector(".bank-grid2").nextSibling
  );
}
