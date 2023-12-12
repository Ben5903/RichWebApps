
import React, { useState } from 'react';
import './App.css';
import Synonyms from './Synonyms';


function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [colour, setColour] = useState('red');
  const [wordForSynonyms, setWordForSynonyms] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  const addNote = () => {
    if (noteText.trim() === '') {
      alert('Please enter a note.');
      return;
    }

    const newNote = { text: noteText, colour };
    setNotes([...notes, newNote]);
    setNoteText('');
  };

  const editNote = () => {
    if (!selectedNote) {
      alert('Please select a note to edit.');
      return;
    }

    if (noteText.trim() === '') {
      alert('Please enter a new note text.');
      return;
    }

    const updatedNotes = notes.map((note) =>
      note === selectedNote ? { ...note, text: noteText, colour } : note
    );
    setNotes(updatedNotes);
    setSelectedNote(null);
    setNoteText('');
  };

  const deleteNote = () => {
    if (!selectedNote) {
      alert('Please select a note to delete.');
      return;
    }

    const updatedNotes = notes.filter((note) => note !== selectedNote);
    setNotes(updatedNotes);
    setSelectedNote(null);
    setNoteText('');
  };

  const selectNote = (clickedNote) => {
    setSelectedNote(clickedNote === selectedNote ? null : clickedNote);
    setNoteText(clickedNote ? clickedNote.text : '');
    setColour(clickedNote ? clickedNote.colour : 'red');
  };

  return (
    <div className='container'>
      <div className='note-container'>
        <h1>Ben's Note Taking Application</h1>
        <input
          className='search'
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search notes"
        />
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter note here"
        ></textarea>
        <br />
        <label htmlFor="colour-select">Select a colour:</label>
        <select
          id="colour-select"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
          <option value="cyan">Cyan</option>
          <option value="pink">Pink</option>
          <option value="yellow">Yellow</option>
        </select>
        <br />
        <br />
        <button onClick={addNote}>Add note</button>
        <button onClick={editNote}>Edit note</button>
        <button onClick={deleteNote}>Delete note</button>

        <div>
          {notes
            .filter((note) => note.text.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((note, index) => (
              <div
                key={index}
                className={`note ${selectedNote === note ? 'selected' : ''} ${note.colour}`}
                onClick={() => selectNote(note)}
              >
                {note.text}
              </div>
            ))}
        </div>
      </div>

      <div className='synonyms-container'>
        <div className='synonyms-input-container'>
          <input
            className='synonyms-input'
            type="text"
            value={wordForSynonyms}
            onChange={(e) => setWordForSynonyms(e.target.value)}
            placeholder="Enter a word for synonyms"
          />
          <button onClick={() => setWordForSynonyms('')}>
            Clear Synonyms
          </button>
        </div>
        <div className='synonyms-output'>
          {wordForSynonyms && <Synonyms word={wordForSynonyms} />}
        </div>
      </div>
    </div>
  );
};

export default App;
