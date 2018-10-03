/* ************ back feature script for BADAH document ************* */

'use strict'

/* --------------------------- constants --------------------------- */

const historyKey = `history_${BADAH_VIEWER_ID}`

/* ----------------------- DOM manipulation ------------------------ */

// back button creation
const backBtn = create('button',['button', 'action-btn'])
backBtn.title = 'last link'
const backIcon = create('i', ['fas', 'fa-backward'])
append(backBtn, backIcon)

// back button on click event
backBtn.addEventListener('click', () => {
  const history = JSON.parse(localStorage.getItem(historyKey))
  if (!history || !history.length) {
    alert('There is no last link to return to')
    return
  }

  const lastLink = history.pop()
  localStorage.setItem(historyKey, JSON.stringify(history))
  window.top.location.href = `${BADAH_VIEWER_PATH}?nav=${lastLink}`
})

// get last link from inner iframe page
window.addEventListener('message', e => {
  const { action, href } = JSON.parse(e.data)
  if (action !== 'last_link') {
    return
  }

  // ask BADAH_Viewer to main app url
  const data = JSON.stringify({ action: 'get_url' }) 
  window.top.postMessage(data, '*')

  // navigate to link via BADAH-Viewer
  sendOnNavigate(href)
}, false)

// get app url from BADAH-Viewer
window.addEventListener('message', e => {
  const { action, url } = JSON.parse(e.data)
  if (action !== 'get_url') {
    return
  }

  const link = url.split('?nav=')[1]
  const history = JSON.parse(localStorage.getItem(historyKey)) || []
  if (history[history.length - 1] !== link) {
    history.push(link)
    localStorage.setItem(historyKey, JSON.stringify(history))
  }
}, false)

// add new element to DOM
append(container, backBtn)