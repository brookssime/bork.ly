'use strict'
let spreadsheet = document.getElementById('nimbus')
let delay = 250
let timeout = false
document.body.style.height = '300px'
document.body.style.width = '400px'
chrome.storage.sync.get('nimbusURL', function(data) {
  let spreadsheetURL = data.nimbusURL
  spreadsheet.src = spreadsheetURL
})

window.addEventListener('resize', function() {
  console.log('dumb')
  // clear the timeout
  clearTimeout(timeout)
  // start timing for event "completion"
  timeout = setTimeout(storeSize, delay)
})

function storeSize() {
  chrome.storage.sync.set({ nimbusHeight: window.innerHeight + 'px' })
  chrome.storage.sync.set({ nimbusWidth: window.innerWidth + 'px' })
}
chrome.storage.sync.get('nimbusHeight', function(data) {
  let height = data && data.nimbusHeight
  if (height) {
    document.body.style.height = height
  }
})
chrome.storage.sync.get('nimbusWidth', function(data) {
  let width = data && data.nimbusWidth
  if (width) {
    document.body.style.width = width
  }
})
