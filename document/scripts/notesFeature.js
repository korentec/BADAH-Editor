/* ************ notes feature script for BADAH document ************ */

'use strict'

/* --------------------------- constants --------------------------- */

const notesKey = `notes_${BADAH_VIEWER_ID}`

/* ----------------------------- utils ----------------------------- */

// print note on textarea
const renderNote = noteInput => {
  const link = location.href
  const notes = JSON.parse(localStorage.getItem(notesKey)) || []
  const note = notes.find(n => n.link === link)
  noteInput.value = (note && note.text) || ''
}

// save note to local storage
const saveNote = noteInput => {
  const link = location.href
  const text = noteInput.value
  const notes = JSON.parse(localStorage.getItem(notesKey)) || []
  const existNoteIndex = notes.findIndex(n => n.link === link)
  if (existNoteIndex !== -1) {
    if (text) {
      notes[existNoteIndex].text = text
    } else {
      notes.splice(existNoteIndex, 1)
    }
  } else {
    if (text) {
      notes.push({ link, text })
    }
  }

  localStorage.setItem(notesKey, JSON.stringify(notes))
}

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

// note modal creation
const noteModal = create('div', 'modal')
const noteLabel = create('h2', 'modal-label', null, 'Note')
const discardNoteBtn = create('button', [ 'button', 'modal-btn'])
discardNoteBtn.title = 'discard changes'
const discardNoteIcon = create('i', ['fas', 'fa-undo'])
append(discardNoteBtn, discardNoteIcon)
const saveNoteBtn = create('button', [ 'button', 'modal-btn'])
saveNoteBtn.title = 'save changes'
const saveNoteIcon = create('i', ['fas', 'fa-save'])
append(saveNoteBtn, saveNoteIcon)
const noteInput = create('textarea', 'note-input')
noteInput.placeholder = 'There no note for this page...'
append(noteModal, [noteLabel, discardNoteBtn, saveNoteBtn, noteInput])

// notes modal creation
const notesModal = create('div', 'modal')
const notesLabel = create('h2', 'modal-label', null, 'Notes')
append(notesModal, [notesLabel])

// note this page on click event
noteBtn.addEventListener('click', e => {
  e.stopPropagation()
  closeAllModals()
  setStyle(noteModal, { display: 'block' })
  renderNote(noteInput)
})

// notes button on click event
notesBtn.addEventListener('click', e => {
  e.stopPropagation()
  closeAllModals()
  setStyle(notesModal, { display: 'block' })
})

 // note discard button on click event
discardNoteBtn.addEventListener('click', () => {
  renderNote(noteInput)
})

// note save button on click event
saveNoteBtn.addEventListener('click', () => {
  saveNote(noteInput)
})

// close note modal on click outside
closeModalOnClickOutside(noteModal)

// close notes modal on click outside
closeModalOnClickOutside(notesModal)

// add new elements to DOM
append(container, [noteBtn, notesBtn])
append(body, [noteModal, notesModal])