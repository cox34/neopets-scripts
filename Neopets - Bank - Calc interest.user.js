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
const interestWeekly = interestDaily*7;
const interestMonthly = interestDaily*30;

const dailyInterestContainer = document.createElement("div");
dailyInterestContainer.textContent = "Daily Interest: "+interestDaily.toLocaleString("en-US")+" NP";
dailyInterestContainer.style.fontFamily = "\"MuseoSansRounded700\", \'Arial\', sans-serif";
dailyInterestContainer.style.textAlign = "center";
document.querySelector(".bank-grid2").parentNode.insertBefore(dailyInterestContainer, document.querySelector(".bank-grid2").nextSibling);

const weeklyInterestContainer = document.createElement("div");
weeklyInterestContainer.textContent = "7 Days Interest: "+interestWeekly.toLocaleString("en-US")+" NP";
weeklyInterestContainer.style.fontFamily = "\"MuseoSansRounded700\", \'Arial\', sans-serif";
weeklyInterestContainer.style.textAlign = "center";
document.querySelector(".bank-grid2").parentNode.insertBefore(weeklyInterestContainer, document.querySelector(".bank-grid2").nextSibling);

const monthlyInterestContainer = document.createElement("div");
monthlyInterestContainer.textContent = "30 Days Interest: "+interestMonthly.toLocaleString("en-US")+" NP";
monthlyInterestContainer.style.fontFamily = "\"MuseoSansRounded700\", \'Arial\', sans-serif";
monthlyInterestContainer.style.textAlign = "center";
document.querySelector(".bank-grid2").parentNode.insertBefore(monthlyInterestContainer, document.querySelector(".bank-grid2").nextSibling);
