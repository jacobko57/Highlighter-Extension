// content.js
console.log("make it to content")

function extractText() {
    const paragraphs = document.querySelectorAll("p");
    let allText = "";
    for (let i = 0; i < paragraphs.length; i++) {
      allText += paragraphs[i].textContent + "\n";
    }
  
    console.log(allText)

    return allText;
  }
  
  // Send a message to the background script with the extracted text
  chrome.runtime.sendMessage({ text: extractText() });