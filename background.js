chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab);
  chrome.tabs.query({active: true, currentWindow: true}, (results) => {
    console.log(results);
  })
  chrome.tabs.executeScript(null, {
    file: "script.js",
    runAt: "document_end",
  })
})



