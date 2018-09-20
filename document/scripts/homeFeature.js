/* ************ home feature script for BADAH document ************* */

'use strict'

/* ----------------------- DOM manipulation ------------------------ */

// home button creation
const homeBtn = create('button', ['button', 'action-btn'])
homeBtn.title = 'home page'
const homeIcon = create('i', ['fas', 'fa-home'])
append(homeBtn, homeIcon)

// home button on click event
homeBtn.addEventListener('click', () => {
  if (!location.hash) {
    alert('You are already on the home page')
    return
  }

  location.replace(location.pathname)
})

// add new element to DOM
append(container, homeBtn)