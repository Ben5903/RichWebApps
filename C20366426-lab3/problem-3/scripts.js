// import the fromEvent function from RxJS
const { fromEvent } = rxjs;

// get the DOM elements for the input, select, and buttons
const noteInput = document.getElementById("note-input");
const colourSelect = document.getElementById("colour-select");
const addButton = document.querySelector(".button-add");
const editButton = document.querySelector(".button-edit");
const deleteButton = document.querySelector(".button-delete");
const notesContainer = document.getElementById("notes-container");

// declare a variable to store the current selected note
let selectedNote = null;

// create streams from button clicks using fromEvent
const addClick$ = fromEvent(addButton, 'click');
const editClick$ = fromEvent(editButton, 'click');
const deleteClick$ = fromEvent(deleteButton, 'click');

// subscribe to the streams and call the corresponding functions
addClick$.subscribe(() => addNote());
editClick$.subscribe(() => editNote());
deleteClick$.subscribe(() => deleteNote());

// define a function to add a new note
function addNote() {
    // create a new Note instance with the input value, the select value, and the current note as parameters
    const newNote = new Note(noteInput.value, colourSelect.value, selectedNote);
    
    // check if the input is not empty
    if (noteInput.value.trim() !== "") {
        // append the new note element to the notes container
        notesContainer.appendChild(newNote.element);
        // clear the input value
        noteInput.value = "";
        // update the buttons state
        updateButtons();
    }
}

// define a function to edit the current note
function editNote() {
    if (selectedNote) {
        // prompt the user to enter the edited text, with the current note text as default
        const editedText = prompt("Edit note text", selectedNote.text);
        // check if the edited text is not null or empty
        if (editedText !== null && editedText.trim() !== "") {
            // call the edit method of the current note with the edited text and the select value as parameters
            selectedNote.edit(editedText, colourSelect.value);
        }
    }
}

// define a function to delete the current note
function deleteNote() {
    // check if there is a current note
    if (selectedNote) {
        // confirm with the user if they want to delete the selected note
        if (confirm("Delete selected note?")) {
            // call the delete method of the current note
            selectedNote.delete();
            // set the current note to null
            selectedNote = null;
            // update the buttons state
            updateButtons();
        }
    }
}

// define a function to update the buttons state
function updateButtons() {
    if (selectedNote) {
        // enable the edit and delete buttons
        editButton.disabled = !selectedNote;
        deleteButton.disabled = !selectedNote;
    }
}

// define a class to represent a note
class Note {
    constructor(text, colour, parent = null) {
        // assign the properties to the instance
        this.text = text;
        this.colour = colour;
        this.parent = parent;
        this.children = [];
        // create a new note element and assign it to the instance
        this.element = this.createNewNote();

        // add this child note to the parent if it exists
        if (parent) {
            parent.children.push(this);
        }

        // log the creation of the note and its parent
        console.log(`Created note: ${this.text}, Parent: ${parent ? parent.text : 'Top-level'}`);
    }

    // define a method to create a new note element
    createNewNote() {
        const newNote = document.createElement("div");
        // add the note class to it
        newNote.className = "note";
        // set the text content to the note text
        newNote.textContent = this.text;
        // set the background color to the note colour
        newNote.style.backgroundColor = this.colour;
        
        // create an observable from the click event on the new note
        const click$ = fromEvent(newNote, 'click');
        // subscribe to the observable and set the current note and update the buttons
        click$.subscribe(() => {
            selectedNote = this;
            updateButtons();
        });

        // return the new note element
        return newNote;
    }

    // define a method to delete the note
    delete() {
        // delete all child notes by calling their delete method
        for (let child of this.children) {
            child.delete();
        }

        // remove this note from the parent's children array if it exists
        if (this.parent) {
            const index = this.parent.children.indexOf(this);
            if (index !== -1) {
                this.parent.children.splice(index, 1);
            }
        }

        // remove the note element from the notes container
        notesContainer.removeChild(this.element);
    }

    // define a method to edit the note
    edit(editedText, editedColour) {
        // assign the edited text and colour to the instance properties
        this.text = editedText;
        this.element.innerHTML = this.text;
        this.element.style.backgroundColor = editedColour;
    }
}
