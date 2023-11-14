chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

function injectedFunction(list, bgColor, wordColor, highlightColor) {
  // document.body.style.backgroundColor = bgColor;
  const paragraphs = document.querySelectorAll("p");
  for (let i = 0; i < paragraphs.length; i++) {
    let line = paragraphs[i];
    // line.style.backgroundColor = wordColor;
    for (let j = 0; j < list.length; j++) {
      let word = list[j]

      if (line.textContent.includes(word)) {
        // Replace the word with a span containing the word with a background color
        let highlightedContent = line.innerHTML.replace(new RegExp(word, 'g'), '<span style="background-color: ' + highlightColor + ';">' + word + '</span>');
      
        // Update the content of the current line with the highlighted content
        line.innerHTML = highlightedContent;
      }
    }
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "ON") {
    // Insert the CSS file when the user turns the extension on
    await chrome.scripting.executeScript({
      target : {tabId : tab.id},
      func : injectedFunction,
      args : [["the", "from"], "orange", "red", "yellow"],
    });
  } else if (nextState === "OFF") {
    // Remove the CSS file when the user turns the extension off
    await chrome.scripting.executeScript({
      target : {tabId : tab.id},
      func : injectedFunction,
      args : [["the", "from"], "transparent", "transparent", "white"],
    });
  }
});