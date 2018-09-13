/* ************ back feature script for BADAH document ************* */

'use strict'

/* ----------------------- DOM manipulation ------------------------ */

// back button creation
const backBtn = create('button',['button', 'actionButton'], null, 'Back')

// back button on click event
backBtn.addEventListener('click', () => {
  if (!location.hash) {
    alert('You are already on the home page')
    return
  }

  // TBD: back feature on click code
})

append(container, backBtn)