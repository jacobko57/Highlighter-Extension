// popup.js

document.getElementById('runScriptButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({ action: 'getText', tabId: tabId });
    }
  });
  chrome.runtime.sendMessage({ action: 'runScript' });
});

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   if (tabs.length > 0) {
//     const tabId = tabs[0].id;
//     console.log(tabId)
//     runContentScript(tabId);
//   }
// });

// function extractText() {

//   console.log("Enter Extract")

//   const paragraphs = document.querySelectorAll("p");
//   let allText = "";
//   for (let i = 0; i < paragraphs.length; i++) {
//     allText += paragraphs[i].textContent + "\n";
//   }

//   console.log(allText)
//   return allText
// }

// // Function to execute the content script when the extension is loaded onto a page
// function runContentScript(tabId) {

//   console.log("Am running content script")

//   chrome.tabs.get(tabId, (tab) => {

//     if (tab.url && !tab.url.startsWith("chrome://")) {

//       chrome.scripting.executeScript({
//         target: { tabId: tabId },
//         func: extractText
//       });
//     }
//   });
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const message = 'Chewy is cute!';
//   const url = 'http://127.0.0.1:8000/extension/practice/';

//   console.log("Making POST request");


//   fetch(url, {
//       method: 'POST',
//       headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message: message }),
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log(data.result);
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
// });