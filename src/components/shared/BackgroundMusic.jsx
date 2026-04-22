import React, { useEffect, useRef } from 'react';

const BackgroundMusic = ({ isPlaying }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log("Autoplay blocked or audio error:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      src="/music/always-with-me.mp3"
      loop
      preload="auto"
    />
  );
};

export default BackgroundMusic;
