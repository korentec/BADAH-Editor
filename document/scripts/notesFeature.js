/* ************ notes feature script for BADAH document ************ */

'use strict'

/* --------------------------- constants --------------------------- */

const notesKey = `notes_${BADAH_VIEWER_ID}`
let currentNoteLink = ''

/* ----------------------------- utils ----------------------------- */

// print note on textarea
const renderNote = noteInput => {
  const link = currentNoteLink
  const notes = JSON.parse(localStorage.getItem(notesKey)) || []
  const note = notes.find(n => n.link === link)
  noteInput.value = (note && note.text) || ''
}

// save note to local storage
const saveNote = noteInput => {
  const link = currentNoteLink
  const label = getPageLabel()
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
      notes.push({ link, label, text })
    }
  }

  localStorage.setItem(notesKey, JSON.stringify(notes))
}

// open note modal
const openNoteModal = link => {
  closeAllModals()      
  setStyle(noteModal, { display: 'block' })
  currentNoteLink = link
  renderNote(noteInput)
}

// open notes modal
const openNotesModal = () => {
  closeAllModals()
  setStyle(notesModal, { display: 'block' })
  renderNotesList(notesList)
}

// render notes list
const renderNotesList = notesList => {
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }

  const notes = JSON.parse(localStorage.getItem(notesKey)) || []
  if (!notes.length) {
    const noItemsMsg = create('p', 'no-items', null, 'There no notes to show...')
    append(notesList, noItemsMsg)
  }

  notes.forEach(note => {
    const item = create('li', 'item')
    const { label, link } = note
    const noteLink = create('p', 'link', null, label || clearHref(link))
    noteLink.addEventListener('click', () => {
      openNoteModal(link)
    })

    const deleteItem = create('span', 'delete-item')
    deleteItem.title = 'remove note'
    const deleteItemIcon = create('i', ['fas', 'fa-times'])
    append(deleteItem, deleteItemIcon)
    deleteItem.addEventListener('click', () => {
      const newNotes = notes.filter(n => n.link !== link)
      localStorage.setItem(notesKey, JSON.stringify(newNotes))
      renderNotesList(notesList)
    })

    append(item, [noteLink, deleteItem])
    append(notesList, item)
  })
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
const modalNotesBtn = create('button', [ 'button', 'modal-btn'])
modalNotesBtn.title = 'notes list'
const modalNotesIcon = create('i', ['fas', 'fa-book-open'])
append(modalNotesBtn, modalNotesIcon)
const noteInput = create('textarea', 'note-input')
noteInput.placeholder = 'There no note for this page...'
append(noteModal, [noteLabel, discardNoteBtn, saveNoteBtn, modalNotesBtn, noteInput])

// notes modal creation
const notesModal = create('div', 'modal')
const notesLabel = create('h2', 'modal-label', null, 'Notes')
const clearNotesBtn = create('button', [ 'button', 'modal-btn'])
clearNotesBtn.title = 'remove all notes'
const clearNotesIcon = create('i', ['fas', 'fa-trash-alt'])
append(clearNotesBtn, clearNotesIcon)
const modalNoteBtn = create('button', [ 'button', 'modal-btn'])
modalNoteBtn.title = 'add a note to this page'
const modalNoteIcon = create('i', ['fas', 'fa-sticky-note'])
append(modalNoteBtn, modalNoteIcon)
const notesList = create('ol', 'list')
append(notesModal, [notesLabel, clearNotesBtn, modalNoteBtn, notesList])

// note this page on click event
noteBtn.addEventListener('click', e => {
  e.stopPropagation()
  openNoteModal(location.href)
})

// modal - note this page button on click event
modalNoteBtn.addEventListener('click', e => {
  e.stopPropagation()
  openNoteModal(location.href)
})

// notes button on click event
notesBtn.addEventListener('click', e => {
  e.stopPropagation()
  openNotesModal()
})

// modal - notes button on click event
modalNotesBtn.addEventListener('click', e => {
  e.stopPropagation()
  openNotesModal()
})

 // note discard button on click event
discardNoteBtn.addEventListener('click', () => {
  renderNote(noteInput)
})

// note save button on click event
saveNoteBtn.addEventListener('click', () => {
  saveNote(noteInput)
})

// clear notes button on click event
clearNotesBtn.addEventListener('click', () => {
  const notes = JSON.parse(localStorage.getItem(notesKey)) || []
  if (!notes.length) {
    return alert('There no bookmarks to remove...')
  }

  const isOK = confirm('Are you sure you want to remove all notes?')
  if (isOK) {
    window.localStorage.setItem(notesKey, JSON.stringify([]))
    renderBookmarksList(notesList)
  }
})

// close note modal on click outside
closeModalOnClickOutside(noteModal)

// close notes modal on click outside
closeModalOnClickOutside(notesModal)

// add new elements to DOM
append(container, [noteBtn, notesBtn])
append(body, [noteModal, notesModal])