import React, { useState } from 'react';

const Notes = ({ notes, onAddNote, onDeleteNote, onEditNote, onTimestampClick }) => {
  const [noteContent, setNoteContent] = useState('');

  const handleAddNote = () => {
    if (noteContent.trim() === '') return;
    onAddNote(noteContent);
    setNoteContent('');
  };

  return (
    <div className="notes-section max-w-xl min-w-full mt-6 p-4 border border-black rounded bg-white overflow-auto">
      <h2 className="text-xl font-bold mb-4">My Notes</h2>
      <p className="text-gray-500 mb-4">All your notes at a single place. Click on any note to go to specific timestamp in the video.</p>
      <ul id="notes-list" className="list-none p-0">
        {notes.map(note => (
          <li key={note.id} className="flex justify-between items-center mb-2 p-2 border-b">
            <div className="flex flex-col overflow-auto mr-2">
              <p className="cursor-pointer text-blue-500 text-wrap max-w-[80%]" onClick={() => onTimestampClick(note.time)}>
                {note.timestamp}:<span className="break-words">{note.content}</span>
              </p>
              <span className="text-gray-500 text-sm">{note.date}</span>
            </div>
            <div>
              <button className="text-blue-500 mr-2" onClick={() => onEditNote(note.id)}>Edit</button>
              <button className="text-red-500" onClick={() => onDeleteNote(note.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="add-note mt-4 flex">
        <input
          type="text"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 p-2 border rounded text-wrap max-w-full"
        />
        <button onClick={handleAddNote} className="ml-2 p-2 bg-blue-500 text-white rounded">Add Note</button>
      </div>
    </div>
  );
};

export default Notes;
