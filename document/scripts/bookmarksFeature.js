/* ********** bookmarks feature script for BADAH document ********** */

'use strict'

/* ----------------------- DOM manipulation ------------------------ */

// bookmark this page button creation
const bookmarkBtn = create('button', ['button', 'actionButton'])
bookmarkBtn.title = 'bookmark this page'
const bookmarkIcon = create('i', ['fas', 'fa-bookmark'])
append(bookmarkBtn, bookmarkIcon)

// bookmarks list button creation
const bookmarksBtn = create('button', ['button', 'actionButton'])
bookmarksBtn.title = 'bookmarks list'
const bookmarksIcon = create('i', ['fas', 'fa-list-ul'])
append(bookmarksBtn, bookmarksIcon)

// TBD: add bookmarks logic

// add new elements to DOM
append(container, [bookmarkBtn, bookmarksBtn])