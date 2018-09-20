/* ************ notes feature script for BADAH document ************ */

'use strict'

/* ----------------------- DOM manipulation ------------------------ */

// note this page button creation
const noteBtn = create('button', ['button', 'actionButton'])
noteBtn.title = 'add a note to this page'
const noteIcon = create('i', ['fas', 'fa-sticky-note'])
append(noteBtn, noteIcon)

// notes list button creation
const notesBtn = create('button', ['button', 'actionButton'])
notesBtn.title = 'notes list'
const notesIcon = create('i', ['fas', 'fa-book-open'])
append(notesBtn, notesIcon)

// TBD: add notes logic

// add new elements to DOM
append(container, [noteBtn, notesBtn])