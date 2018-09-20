/* ************ back feature script for BADAH document ************* */

'use strict'

/* ----------------------- DOM manipulation ------------------------ */

// back button creation
const backBtn = create('button',['button', 'actionButton'])
backBtn.title = 'last link'
const backIcon = create('i', ['fas', 'fa-backward'])
append(backBtn, backIcon)

// back button on click event
backBtn.addEventListener('click', () => {
  if (!location.hash) {
    alert('You are already on the home page')
    return
  }

  // TBD: back feature on click code
})

// add new element to DOM
append(container, backBtn)