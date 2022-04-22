// ==UserScript==
// @name        Neopets - Track Read Threads
// @namespace   Violentmonkey Scripts
// @include     https://www.neopets.com/neoboards/boardlist.phtml?board=*
// @grant       none
// @version     1.0
// @author      -
// @description 4/22/2022, 11:20:45 AM
// @run-at document-end
// ==/UserScript==

const colorThreadRead = "#f2d7d5";

let seenThreads = localStorage.getItem("seenThreads");
if(!seenThreads){
  seenThreads = [];
} else {
  seenThreads = JSON.parse(seenThreads);
}

const currentPageThreads = document.querySelectorAll(".boardTopicTitle");

for (thread of currentPageThreads){
  
  const threadLink = thread.querySelector("a");
  const threadId = threadLink.href.split("topic=")[1];
  
  if(seenThreads.includes(threadId)){
    thread.parentNode.style.backgroundColor = colorThreadRead;
  }
  
  threadLink.addEventListener("click", e => {
    seenThreads.push(threadId);
    localStorage.setItem("seenThreads", JSON.stringify(seenThreads));
  });  
  threadLink.addEventListener("auxclick", e => {
    seenThreads.push(threadId);
    localStorage.setItem("seenThreads", JSON.stringify(seenThreads));
  });
}

//add a button at top to clear read threads
const boardList = document.getElementById("boardList");
let clearButton = document.createElement("button");
clearButton.textContent = "Clear Read Threads";
clearButton.addEventListener("click",() => {
  localStorage.clear();
  location.reload();
});
boardList.prepend(clearButton);
