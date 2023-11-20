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
