
/* *************** global script for BADAH document **************** */

'use strict'

/* --------------------------- constants --------------------------- */

// const { location, localStorage } = window
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
  (Array.isArray(nodes) ? nodes : [nodes]).forEach(node => { parent.appendChild(node) })
}

/* ----------------------- DOM manipulation ----------------------- */

// new features container creation
const container = create('div', 'container')
append(body, container)