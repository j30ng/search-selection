browser.contextMenus.create({
    "id": "search-selction",
    "title": "Search on Google",
    "contexts": ["selection", "link"]
})

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "search-selction") {
        sendSelectionRequest()
    }
})

function sendSelectionRequest() {
    const tabQueryOptions = { active: true, currentWindow: true }
    function tabsQueryCallback(tabs) {
        const message = { "text": "show me the money" }
        browser.tabs.sendMessage(tabs[0].id, message, onSelectionReceived)
    }
    browser.tabs.query(tabQueryOptions, tabsQueryCallback)
}

function onSelectionReceived(response) {
    if (!response || !response.selection)
        return
    const options = { "url": getGoogleSearchUri(response.selection) }
    browser.tabs.create(options)
}

function getGoogleSearchUri(query) {
    const baseUrl = "https://www.google.com/search"
    const encodedQuery = encodeURIComponent(query)
    return baseUrl + "?query=" + encodedQuery
}
