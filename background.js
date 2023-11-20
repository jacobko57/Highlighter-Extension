// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "runScript") {
    runScript();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

function injectedFunction(list, bgColor, wordColor, highlightColor, extensionState) {
  const paragraphs = document.querySelectorAll("p");
  for (let i = 0; i < paragraphs.length; i++) {
    let line = paragraphs[i];
    for (let j = 0; j < list.length; j++) {
      let word = list[j];

      if (line.textContent.includes(word)) {
        // Replace the word with a span containing the word with a background color
        let highlightedContent = line.innerHTML.replace(
          new RegExp(word, "g"),
          `<span style="background-color: ${highlightColor};">${word}</span>`
        );

        line.innerHTML = highlightedContent;
      }
    }
  }

  // Adjust other actions based on extensionState
  if (extensionState === "ON") {
    // Additional actions when the extension is ON
    document.body.style.backgroundColor = bgColor;
  } else if (extensionState === "OFF") {
    // Additional actions when the extension is OFF
    document.body.style.backgroundColor = "initial";
  }
}

function runScript() {
  // Retrieve the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tab = tabs[0];

      // Make an AJAX request to the Django endpoint
      fetch('http://127.0.0.1:8000/extension/predict_disease')
        .then(response => response.json())
        .then(data => {
          const entities = data.entities;

          // Now you can use 'entities' in your background script
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              const tab = tabs[0];
              chrome.action.getBadgeText({ tabId: tab.id }).then((prevState) => {
                // Next state will always be the opposite
                const nextState = prevState === "ON" ? "OFF" : "ON";

                // Set the action badge to the next state
                chrome.action.setBadgeText({
                  tabId: tab.id,
                  text: nextState,
                });

                if (nextState == "ON") {
                  chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: injectedFunction,
                    args: [entities, "transparent", "red", "yellow", nextState],
                  });
                } else {
                  chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: injectedFunction,
                    args: [entities, "transparent", "transparent", "white", nextState],
                  });
                }
              });
            }
          });
        })
        .catch(error => {
          console.error('Error fetching entities:', error);
        });
    }
  });
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.text) {
      const message = request.text;
      const url = 'http://127.0.0.1:8000/extension/practice/';

      console.log("Making POST request");

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
);