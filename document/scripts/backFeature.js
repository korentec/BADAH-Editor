/* ************ back feature script for BADAH document ************* */

'use strict'

/* ----------------------- DOM manipulation ------------------------ */

// back button creation
const backBtn = create('button',['button', 'action-btn'])
backBtn.title = 'last link'
const backIcon = create('i', ['fas', 'fa-backward'])
append(backBtn, backIcon)

// back button on click event
backBtn.addEventListener('click', () => {
  // TBD: back feature on click code
})

// get last link from iframe page
window.addEventListener('message', data => { 
  // TBD: back feature on add link message code
  console.log(data)
} , false)

// add new element to DOM
append(container, backBtn)