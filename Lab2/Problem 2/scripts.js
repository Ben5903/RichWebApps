const notesContainer = document.getElementById('notes-container');
const noteInput = document.getElementById('note-input');
const colourSelect = document.getElementById('colour-select');

function addNote() {
  const noteText = noteInput.value.trim();
  const colour = colourSelect.value;

  if (noteText === '') {
    alert('Please enter a note.');
    return;
  }

  const noteElement = document.createElement('div');
  noteElement.classList.add('note', colour);
  noteElement.textContent = noteText;

  notesContainer.appendChild(noteElement);

  // Clear input
  noteInput.value = '';
}


function editNote() {
    const selectedNote = notesContainer.querySelector('.selected');
    if (!selectedNote) {
      alert('Please select a note to edit.');
      return;
    }

    const noteText = noteInput.value.trim();
    const colour = colourSelect.value;

    if (noteText === '') {
      alert('Please enter a new note text.');
      return;
    }

    selectedNote.textContent = noteText;
    selectedNote.className = 'note ' + colour;

    // Clear input
    noteInput.value = '';
}

function deleteNote() {
    const selectedNote = notesContainer.querySelector('.selected');
    if (!selectedNote) {
      alert('Please select a note to delete.');
      return;
    }

    notesContainer.removeChild(selectedNote);
    noteInput.value = '';
}


    // Event listeners to select notes
notesContainer.addEventListener('click', (event) => {
    const clickedNote = event.target;
    if (clickedNote.classList.contains('note')) {
        // Deselect all notes
        const notes = notesContainer.querySelectorAll('.note');
        notes.forEach((note) => {
            note.classList.remove('selected');
        });
  
          // Select the clicked note
        clickedNote.classList.add('selected');
    }
});

