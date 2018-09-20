/* ************ notes feature script for BADAH document ************ */

'use strict'

/* ----------------------- DOM manipulation ------------------------ */

// note this page button creation
const noteBtn = create('button', ['button', 'action-btn'])
noteBtn.title = 'add a note to this page'
const noteIcon = create('i', ['fas', 'fa-sticky-note'])
append(noteBtn, noteIcon)

// notes list button creation
const notesBtn = create('button', ['button', 'action-btn'])
notesBtn.title = 'notes list'
const notesIcon = create('i', ['fas', 'fa-book-open'])
append(notesBtn, notesIcon)

// TBD: add notes logic

// add new elements to DOM
append(container, [noteBtn, notesBtn])