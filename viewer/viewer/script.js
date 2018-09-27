/* ******************* BADAH-Viewer main script ******************** */

(() => {

  'use strict'

  /* --------------------------- constants --------------------------- */

  const iframe = document.querySelector('iframe')
  let currentDocUrl = null

  /* ----------------------------- utils ----------------------------- */

  // actions when url changed
  const onUrlChanged = () => {
    const nav = location.href.split('?nav=')[1]
    if (!nav) {
      const [ firstDoc ] = BADAH_DOCUMENTS
      location.href = `${location.pathname}#?nav=${firstDoc.link}`
      return
    }

    iframe.src = nav
    currentDocUrl = nav
    renderTabs()
  }

  // render tabs
  const renderTabs = () => {
    const nav = document.querySelector('nav')
    while (nav.firstChild) {
      nav.removeChild(nav.firstChild);
    }

    BADAH_DOCUMENTS.forEach((doc, i) => {
      const tab = document.createElement('div')
      tab.classList.remove('selected')
      tab.classList.add('tab')
      if (
        (currentDocUrl === null && i === 0) || 
        (currentDocUrl && doc.link === currentDocUrl.split('#')[0])
      ) {
        tab.classList.add('selected')
      }
  
      tab.innerText = doc.label
      // on select tab
      tab.addEventListener('click', () => {
        location.href = `${location.pathname}#?nav=${doc.link}`
      })
      
      nav.appendChild(tab)
    })
  }

  /* ----------------------- DOM manipulation ------------------------ */

  // change iframe src when navigation from documents
  onUrlChanged()
  window.addEventListener("hashchange", () => {
    onUrlChanged()
  })

  // create tabs
  renderTabs()

})()