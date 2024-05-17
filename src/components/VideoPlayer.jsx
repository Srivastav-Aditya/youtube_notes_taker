// src/components/VideoPlayer.js
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

const VideoPlayer = ({ videoId, onReady }) => {
  const [videoDetails, setVideoDetails] = useState({ title: '', description: '' });
  const [expandedDescription, setExpandedDescription] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyCCiCIhBkQMFx4gkUwGRIhpxW5reQi9UWE`
        );
        const { title, description } = response.data.items[0].snippet;
        setVideoDetails({ title, description });
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  const toggleDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const getShortenedDescription = () => {
    // Split the description by newline characters and select the first three lines
    const lines = videoDetails.description.split('\n').slice(0, 8);
    // Join the lines back together and trim any leading/trailing whitespace
    return lines.join('\n').trim();
  };

  const opts = {
    height: '490',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="video-player-container minn-w-fit">
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
      <div className="video-details mt-4">
        <h2 className="text-2xl font-bold">{videoDetails.title}</h2>
        <p className="text-gray-700 mt-2">
          {expandedDescription ? videoDetails.description : getShortenedDescription()}
          {videoDetails.description.split('\n').length > 8 && (
            <button onClick={toggleDescription} className="text-blue-500 ml-2">
              {expandedDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
