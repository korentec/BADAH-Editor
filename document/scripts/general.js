
/* *************** global script for BADAH document **************** */

'use strict'

/* --------------------------- constants --------------------------- */

const { localStorage } = window
const body = document.querySelector('body')
const iframe = document.querySelector('#page_iframe')

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

// send link to BADAH-Viewer when navigate
const sendOnNavigate = (href = window.location.href) => {
  const splitHref = href.split('/')
  if (splitHref[splitHref.length - 1].indexOf('index.html') !== -1) {
    return
  }

  const nav = `${splitHref[splitHref.length - 2]}/${splitHref[splitHref.length - 1]}`
  const data = JSON.stringify({ action: 'navigate', nav })
  window.top.postMessage(data, '*')
}

/* ----------------------- DOM manipulation ------------------------ */

// custom header container creation
const header = create('div', 'header')

// new features container creation
const container = create('div', 'container')

let rightHeader = null

// add custom logo if needed
if (typeof LOGO_PATH !== 'undefined') {
  const leftHeader = create('div', 'header-box')
  const logo = create('img', 'logo')
  logo.src = LOGO_PATH
  append(header, leftHeader)
  append(leftHeader, logo)
}

// add custom classification if needed
if (typeof CLASSIFICATION !== 'undefined') {
  rightHeader = create('div', 'header-box')
  const classification = create('p', 'classification', null, CLASSIFICATION)
  append(header, rightHeader)
  append(rightHeader, classification)
}

// add custom label if needed
if (typeof LABEL !== 'undefined') {
  if (!rightHeader) {
    rightHeader = create('div', 'header-box')
    append(header, rightHeader)
  }

  const label = create('h1', 'label', null, LABEL)
  label.title = LABEL
  append(rightHeader, label)
}

// add new elements to DOM
append(body, [header, container])

// remove unnecessary original reverb features
document.querySelectorAll(
  '.ww_behavior_home, .ww_skin_company_logo, .ww_skin_company_name'
).forEach(elem => elem.remove())

// change BADAH-Viewer url every document navigation
setTimeout(() => {
  document.querySelectorAll('.ww_skin_toc_entry').forEach(elem => {
    elem.addEventListener('click', () => {
      const a = elem.querySelector('a')
      if (a) {
        const { href } = a
        sendOnNavigate(href)
      }
    })
  })

  document.querySelectorAll('a.WebWorks_TOC_Link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      const { href } = e.target
      sendOnNavigate(href)
    })
  })

  document.querySelectorAll('.ww_behavior_prev, .ww_behavior_next').forEach(elem => {
      elem.addEventListener('click', () => {
      sendOnNavigate()
    })
  })
}, 1000)

window.addEventListener("hashchange", () => {
  sendOnNavigate()
})
