'use strict'

let optionForm = document.getElementById('nimbus-form')
optionForm.onsubmit = function(event) {
  event.preventDefault()
  let input = document.getElementById('nimbus-url').value
  input = input.slice(0, input.indexOf('?')) + '?rm=minimal'
  chrome.storage.sync.set({ nimbusURL: input })
  return false
}
