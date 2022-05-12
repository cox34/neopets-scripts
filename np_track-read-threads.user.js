// ==UserScript==
// @name        Neopets - Neoboards: Highlight and Filter
// @include     https://www.neopets.com/neoboards/boardlist.phtml?board=*
// @grant       none
// @version     1.0
// @run-at document-end
// ==/UserScript==

//you can customize these values
const colorRead = "#ffb3ba"; //light red
const colorHighlight = "#ffffba"; //light yellow
const colorHighlightButRead = "#ffdfba"; //light orange
//use lowercase only, remember to end each line with a comma
//it is okay for the last list item to have a comma
const highlightTitles = [
  "bd",
  "hsd",
  "stealthy",
];
//filterMode can be "remove" (removes it from view completely) 
//or "censor" (makes it black) if maybe you want to "spoiler" filtered threads instead
const filterMode = "remove";
const colorCensor = "#222"; //only used if mode is censor
const filterTitles = [
  "shuffle",
  "pah",
  "wonder",
  "w o n d e r",
  "surf",
  "oasis",
  "happiness, dreams",
  "rip purge",
  "lost and pound",
];
//end of customizable values

let openedThreads = JSON.parse((localStorage.getItem("openedThreads") || "[]"));

const currentPageThreads = document.getElementById("boardList").querySelectorAll("li:not(.boardNavTop)");

for (thread of currentPageThreads){
  
  const threadLink = thread.querySelector("a");
  const threadId = threadLink.href.split("topic=")[1];
  const threadTitle = thread.querySelector("span").textContent.toLowerCase();

  if(openedThreads.includes(threadId)){
    thread.style.backgroundColor = colorRead;
  }
  
  if(highlightTitles.some(titleContains => threadTitle.includes(titleContains))){
    thread.style.backgroundColor = colorHighlight;
    if(openedThreads.includes(threadId)){
      thread.style.backgroundColor = colorHighlightButRead;
    }
  }
  //only filter threads if they do not contain highlighted words
  else if(filterTitles.some(titleContains => threadTitle.includes(titleContains))){
    if(filterMode === "remove"){
      thread.remove();
    } 
    else if(filterMode === "censor") {
      thread.style.backgroundColor = colorCensor;
      for(img of threadLink.querySelectorAll("img")){
        img.remove();
      }
      for(child of thread.children){
        child.style.color = colorCensor;
      }
    }
  }
  
  threadLink.addEventListener("click", e => {
    openedThreads.push(threadId);
    localStorage.setItem("openedThreads", JSON.stringify(openedThreads));
  });
  
  //middle click
  threadLink.addEventListener("auxclick", e => { 
    openedThreads.push(threadId);
    localStorage.setItem("openedThreads", JSON.stringify(openedThreads));
  });
  
}

//add a button at top to clear read threads
const boardList = document.getElementById("boardList");
let clearButton = document.createElement("button");
clearButton.textContent = "Clear Read Threads";
clearButton.addEventListener("click",() => {
  localStorage.setItem("openedThreads", "[]");
  location.reload();
});
boardList.prepend(clearButton);
