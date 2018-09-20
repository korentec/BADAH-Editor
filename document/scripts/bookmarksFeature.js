/* ********** bookmarks feature script for BADAH document ********** */

'use strict'

/* --------------------------- constants --------------------------- */

const bookmarksKey = `bookmarks_${location.pathname}`

/* ----------------------------- utils ----------------------------- */

const renderBookmarksList = bookmarksList => {
  while (bookmarksList.firstChild) {
    bookmarksList.removeChild(bookmarksList.firstChild);
  }

  const bookmarks = JSON.parse(localStorage.getItem(bookmarksKey)) || []
  bookmarks.forEach(bookmark => {
    const item = create('li', 'bookmark-item')
    const bookmarkLink = create('a', 'link', null, bookmark.label || clearHref(bookmark.link))
    bookmarkLink.href = bookmark.link.replace('#page/', '')
    const deleteLink = create('span', 'delete-link', null, 'X')
    deleteLink.title = 'remove bookmark'
    deleteLink.addEventListener('click', () => {
      const newBookmarks = bookmarks.filter(b => b.link !== bookmark.link)
      localStorage.setItem(bookmarksKey, JSON.stringify(newBookmarks))
      renderBookmarksList(bookmarksList)
    })

    append(item, [bookmarkLink, deleteLink])
    append(bookmarksList, item)
  })
}

// add current page to bookmark
const bookmarkThisPage = () => {
  if (!location.hash) {
    alert('Can not add home page to bookmarks')
    return
  }

  const bookmarks = JSON.parse(localStorage.getItem(bookmarksKey)) || []
  const link = location.hash
  if (!bookmarks.some(b => b.link === link)) {
    const label = getPageLabel()
    bookmarks.push({ link, label })
    localStorage.setItem(bookmarksKey, JSON.stringify(bookmarks))
  } else {
    alert('This page already in bookmarks')
  }

  renderBookmarksList(bookmarksList)
}

/* ----------------------- DOM manipulation ------------------------ */

// bookmark this page button creation
const bookmarkBtn = create('button', ['button', 'action-btn'])
bookmarkBtn.title = 'bookmark this page'
const bookmarkIcon = create('i', ['fas', 'fa-bookmark'])
append(bookmarkBtn, bookmarkIcon)

// bookmarks list button creation
const bookmarksBtn = create('button', ['button', 'action-btn'])
bookmarksBtn.title = 'bookmarks list'
const bookmarksIcon = create('i', ['fas', 'fa-list-ul'])
append(bookmarksBtn, bookmarksIcon)

// bookmarks modal creation
const bookmarksModal = create('div', 'modal')
const bookmarksLabel = create('h2', 'modal-label', null, 'bookmarks')
const clearBookmarksBtn = create('button', [ 'button', 'modal-btn'])
clearBookmarksBtn.title = 'remove all bookmarks'
const clearBookmarksIcon = create('i', ['fas', 'fa-trash-alt'])
append(clearBookmarksBtn, clearBookmarksIcon)
const modalBookmarkBtn = create('button', [ 'button', 'modal-btn'])
modalBookmarkBtn.title = 'bookmark this page'
const modalBookmarkIcon = create('i', ['fas', 'fa-bookmark'])
append(modalBookmarkBtn, modalBookmarkIcon)
const bookmarksList = create('ol')
append(bookmarksModal, [bookmarksLabel, clearBookmarksBtn, modalBookmarkBtn, bookmarksList])

// bookmark this page button on click event
bookmarkBtn.addEventListener('click', e => {
  e.stopPropagation()
  bookmarkThisPage()
})

// modal - bookmark this page button on click event
modalBookmarkBtn.addEventListener('click', e => {
  e.stopPropagation()
  bookmarkThisPage()
})

// bookmarks button on click event
bookmarksBtn.addEventListener('click', e => {
  e.stopPropagation()
  closeAllModals()
  setStyle(bookmarksModal, { display: 'block' })
  renderBookmarksList(bookmarksList)
})

// clear bookmarks button on click event
clearBookmarksBtn.addEventListener('click', () => {
  const isOK = confirm('are you sure you want to remove all bookmarks?')
  if (isOK) {
    window.localStorage.setItem(bookmarksKey, JSON.stringify([]))
    renderBookmarksList(bookmarksList)
  }
})

// close modal on click outside
closeModalOnClickOutside(bookmarksModal)

// add new elements to DOM
append(container, [bookmarkBtn, bookmarksBtn])
append(body, bookmarksModal)