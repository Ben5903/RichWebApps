const { fromEvent, Observable } = rxjs;
const notesContainer = document.getElementById('notes-container');
const noteInput = document.getElementById('note-input');
const colourSelect = document.getElementById('colour-select');

// Move function declarations to the top
const createNote = (text, colour) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note', colour);
    noteElement.textContent = text;

    // Add click event to select the note
    fromEventObservable(noteElement, 'click').subscribe(() => selectNote(noteElement));

    return noteElement;
};

const selectNote = (noteElement) => {
    const notes = notesContainer.querySelectorAll('.note');
    notes.forEach((note) => note.classList.remove('selected'));

    noteElement.classList.add('selected');
};

const fromEventObservable = (element, eventName) => {
    return new Observable((observer) => {
        const handler = (event) => observer.next(event);
        element.addEventListener(eventName, handler);

        return () => {
            element.removeEventListener(eventName, handler);
        };
    });
};

// Function to add note
function addNote() {
    const noteText = noteInput.value.trim();
    const colour = colourSelect.value;

    if (noteText === '') {
        alert('Please enter a note.');
        return;
    }

    const noteElement = createNote(noteText, colour);
    notesContainer.appendChild(noteElement);

    // Clear input
    noteInput.value = '';
}

// Function to edit note
function editNote() {
    const selectedNote = notesContainer.querySelector('.selected');
    if (!selectedNote) {
        alert('Please select a note to edit.');
        return;
    }

    const noteText = noteInput.value.trim();
    const colour = colourSelect.value;

    // validation if a text contains no input
    if (noteText === '') {
        alert('Please enter a new note text.');
        return;
    }

    selectedNote.textContent = noteText;
    selectedNote.className = 'note ' + colour;

    // Clear input
    noteInput.value = '';
}

// Function to delete a note
function deleteNote() {
    // checks for a note to be selected
    const selectedNote = notesContainer.querySelector('.selected');

    // validation if no note is selected
    if (!selectedNote) {
        alert('Please select a note to delete.');
        return;
    }

    notesContainer.removeChild(selectedNote);
    noteInput.value = '';
}

// Event listeners to handle button clicks using RxJS
fromEventObservable(document.querySelector('.button-add'), 'click').subscribe(addNote);
fromEventObservable(document.querySelector('.button-edit'), 'click').subscribe(editNote);
fromEventObservable(document.querySelector('.button-delete'), 'click').subscribe(deleteNote);
