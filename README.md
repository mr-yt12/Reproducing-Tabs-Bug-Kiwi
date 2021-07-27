# How to reproduce:

1. Go to Kiwi on Android, install this extension
2. Open `chrome://extensions/` tab (or leave it open after the previous step)
3. Click Inspect views `background page` (of the `reproduce tabs bug` extension)
4. Close all other tabs, except the `chrome://extensions/` and `background page` devtools
5. Open some website, for example `example.com`
6. Go to the three dots menu, go to the bottom, find `reproduce tabs bug`, click it.
7. Go to the `background page` devtools you opened earlier. 
8. Look at the console output. 

This is the code in `background.js` (and what it outputs if you do the above steps):
```
chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab); // this outputs the right tab, but says that it's not active (active: false) [this tab was active when you went to the three dots menu and clicked `reproduce tabs bug`]
  chrome.tabs.query({active: true, currentWindow: true}, (results) => {
    console.log(results); // outputs an array with one tab, which is `active: false`, even though you specifically requested to search for `active: true`, and it outputs either the `chrome://extensions/` or the `background page` devtools page
  })
  chrome.tabs.executeScript(null, {
    file: "script.js",
    runAt: "document_end",
  })
  // this gives the error `Cannot access a chrome:// URL`, because it thinks you are requesting to execute the script on a Chrome URL tab (null should default to the current active tab)
})
```

9. If you close all the Chrome tabs (including devtools), leaving only the website, and click `reproduce tabs bug` again, it will successfully execute the script. If you go the the background devtools again, you will see that it correctly determines the active tab, and executes the script without errors.
