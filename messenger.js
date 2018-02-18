browser.runtime.onMessage.addListener(handler)

function handler(req, sender, sendRes) {
    if (req.text != "show me the money")
        return
    sendRes({selection: getRefinedSelection()})
}

function getRefinedSelection() {
    let selection = document.getSelection().toString().trim()
    selection = selection.replace(/[\t||\r||\n}]/g, " ")
    while (selection.indexOf("  ") >= 0)
        selection = selection.replace(/  /, " ")
    return selection
}
