
/* *************** global script for BADAH document **************** */

'use strict'

/* --------------------------- constants --------------------------- */

const { localStorage } = window
const body = document.querySelector('body')

/* ----------------------------- utils ----------------------------- */

// add class list to element
const setClass = (elem, classList) => {
  // set class 'badah' for every new feature element
  elem.classList.add('badah')
  if ((Array.isArray(classList))) {
    classList.forEach(className => {
      elem.classList.add(className)
    })
  } else if (classList) {
    elem.classList.add(classList)
  }
}

// set element inline style
const setStyle = (elem, style) => {
  for (let prop in style) {
    elem.style[prop] = style[prop]
  }
}

// create new element with style and text
const create = (
  tag = 'div', 
  classList = [],
  style = {}, 
  text = ''
) => {
  const elem = document.createElement(tag)
  setClass(elem, classList)
  setStyle(elem, style)
  elem.innerText = text
  return elem
}

const append = (parent, nodes) => {
  (Array.isArray(nodes) ? nodes : [nodes]).forEach(
    node => { parent.appendChild(node) }
  )
}

// formatting path
const clearHref = url => url.split('/').pop().replace('#', '')

// get page label
const getPageLabel = () => {
  const currentListItem = document.querySelector('.ww_skin_toc_entry_selected')
  if (currentListItem) {
    const currentLink = currentListItem.querySelector('a')
    if (currentLink && currentLink.innerText) {
      return currentLink.innerText
    }
  }

  return null
}

// close all modals
const closeAllModals = () => {
  document.querySelectorAll('.badah.modal').forEach(modal => {
    setStyle(modal, { display: 'none'})
  })
}

// close modal on click outside
const closeModalOnClickOutside = modal => {
  window.document.addEventListener('click', () => {
    setStyle(modal, { display: 'none' })
  })

  let iframeMouseOver = false
  window.addEventListener('blur', () => {
    if (iframeMouseOver) {
      setStyle(modal, { display: 'none' })
    }
  })

  const iframe = document.querySelector('#page_iframe')
  iframe.addEventListener('mouseover', () => {
    iframeMouseOver = true
  })

  iframe.addEventListener('mouseout', () => {
    iframeMouseOver = false
  })

  modal.addEventListener('click', e => {
    e.stopPropagation()
  })
}

/* ----------------------- DOM manipulation ------------------------ */

// new features container creation
const container = create('div', 'container')
append(body, container)