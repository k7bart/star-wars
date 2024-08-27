import { useState, useRef, useEffect } from "react";

const THEME_SRC_URL =
    "https://archive.org/download/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3";

const AudioButton = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current.volume = 0.05;
    }, []);

    const handleAudioToggle = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <>
            <button onClick={handleAudioToggle}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <audio ref={audioRef} src={THEME_SRC_URL} controls={false} />
        </>
    );
};

export default AudioButton;
