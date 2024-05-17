import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Notes from './components/Notes';
import { formatTime } from './utils/formatTime';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [videoId, setVideoId] = useState('');
  const [inputLink, setInputLink] = useState('');
  const [notes, setNotes] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoId) {
      const savedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
      setNotes(savedNotes);
    }
  }, [videoId]);

  const handleAddNote = (noteContent) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const formattedTime = formatTime(currentTime);
      const newNote = {
        id: uuidv4(),
        content: noteContent,
        time: currentTime,
        timestamp: formattedTime,
        date: new Date().toLocaleString(),
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    }
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  const handleEditNote = (id) => {
    const newContent = prompt('Edit your note:');
    if (newContent) {
      const updatedNotes = notes.map(note => (note.id === id ? { ...note, content: newContent } : note));
      setNotes(updatedNotes);
      localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    }
  };

  const handleTimestampClick = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  const extractVideoId = (url) => {
    const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  };

  const handleVideoLinkSubmit = () => {
    const id = extractVideoId(inputLink);
    if (id) {
      setVideoId(id);
      setInputLink('');
      setShowInput(false);
    } else {
      alert('Invalid YouTube URL');
    }
  };

  const handleChangeVideo = () => {
    setShowInput(true);
    setVideoId('');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto p-4 bg-white shadow-lg rounded">
        {showInput ? (
          <div className="video-link-input flex mb-4">
            <input
              type="text"
              value={inputLink}
              onChange={(e) => setInputLink(e.target.value)}
              placeholder="Enter YouTube video link"
              className="flex-1 p-2 border rounded max-w-fit"
            />
            <button onClick={handleVideoLinkSubmit} className="ml-2 p-2 bg-blue-500 text-white rounded">Load Video</button>
          </div>
        ) : (
          <div className="flex mb-4">
            <button onClick={handleChangeVideo} className="ml-2 p-2 bg-red-500 text-white rounded">Change Video</button>
          </div>
        )}
        {videoId && (
          <>
            <div className="video-player mb-6">
              <VideoPlayer
                videoId={videoId}
                onReady={(event) => { playerRef.current = event.target; }}
              />
            </div>
            <Notes
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onEditNote={handleEditNote}
              onTimestampClick={handleTimestampClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
