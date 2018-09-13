/* ************ home feature script for BADAH document ************* */

'use strict'

/* ----------------------- DOM manipulation ------------------------ */

// home button creation
const homeBtn = create('button', ['button', 'actionButton'], null, 'Home')

// home button on click event
homeBtn.addEventListener('click', () => {
  if (!location.hash) {
    alert('You are already on the home page')
    return
  }

  location.replace(location.pathname)
})

append(container, homeBtn)