// src/utils/formatTime.js
export const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
  
    const formattedTime = `${hrs > 0 ? `${hrs}:` : ''}${hrs > 0 ? String(mins).padStart(2, '0') : mins}:${String(secs).padStart(2, '0')}`;
    return formattedTime;
  };
  