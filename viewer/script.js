/* ******************* BADAH-Viewer main script ******************** */

(() => {

  'use strict'

  /* --------------------------- constants --------------------------- */

  const iframe = document.querySelector('iframe')

  /* ----------------------------- utils ----------------------------- */

  // actions when url changed
  const onUrlChanged = () => {
    const query = location.href.split('?nav=')[1]
    if (!query) {
      return
    }

    const [ nav, doc ] = query.split('&doc=')
    if (nav) {
      iframe.src = nav
    }
  }

  /* ----------------------- DOM manipulation ------------------------ */

  // set first document for default
  iframe.src = BADAH_REVERBS[0].link

  // change iframe src when navigation from documents
  onUrlChanged()
  window.addEventListener("hashchange", () => {
    onUrlChanged()
  })

})()