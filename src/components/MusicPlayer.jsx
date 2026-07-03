import React, { useState, useEffect, useRef } from 'react';

/**
 * MusicPlayer — Komponen untuk memutar musik latar Gamelan Bali.
 *
 * FITUR:
 * - Play/Pause dengan icon dinamis
 * - Animasi Equalizer (Wave Bars) yang bergerak saat musik menyala
 * - Kontrol Volume Slider (muncul saat di-hover/tap)
 * - Autoplay handling (karena browser modern memblokir autoplay sebelum interaksi)
 * - Menggunakan file lokal `/gamelan.mp3` dengan fallback audio online agar langsung bisa dicoba.
 */
const MusicPlayer = ({ isVRMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);

  // Sumber suara:
  // 1. Utama: file lokal /gamelan.wav
  // 2. Cadangan Lokal: file lokal /gamelan.mp3
  // 3. Cadangan Internet: musik online (untuk testing)
  const audioSourceWav = '/gamelan.wav';
  const audioSourceMp3 = '/gamelan.mp3';
  const fallbackSource = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Efek untuk menangani error loading audio lokal secara berjenjang (WAV -> MP3 -> Online)
  const handleAudioError = () => {
    if (!audioRef.current) return;
    
    const currentSrc = audioRef.current.src;
    
    if (currentSrc.endsWith(audioSourceWav)) {
      console.warn("⚠️ Gamelan.wav lokal tidak ditemukan. Mencoba gamelan.mp3...");
      audioRef.current.src = audioSourceMp3;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    } else if (currentSrc.endsWith(audioSourceMp3)) {
      console.warn("⚠️ Gamelan.mp3 lokal tidak ditemukan. Menggunakan fallback audio online.");
      audioRef.current.src = fallbackSource;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Gagal memutar audio:", error);
          // Beberapa browser meminta interaksi user terlebih dahulu
        });
    }
  };

  // Mencoba autoplay setelah klik pertama kali di dokumen (bypass browser policy)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      // Hapus event listener setelah interaksi pertama
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [isPlaying]);

  return (
    <div
      id="music-player-container"
      className={`
        fixed z-50 transition-all duration-500 ease-out
        ${isVRMode 
          ? 'bottom-6 left-[calc(50%-80px)] -translate-x-1/2 opacity-0 pointer-events-none' // Sembunyikan saat VR
          : 'bottom-6 left-5 md:left-8'
        }
      `}
    >
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioSourceWav}
        loop
        onError={handleAudioError}
        preload="auto"
      />

      <div 
        className="flex items-center gap-3 glass-card rounded-2xl p-2.5 shadow-lg"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        {/* Tombol Play/Pause */}
        <button
          id="music-play-btn"
          onClick={togglePlay}
          className={`
            w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300
            ${isPlaying 
              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md shadow-emerald-500/20' 
              : 'bg-white/10 hover:bg-white/15 text-white/80'
            }
            active:scale-95
          `}
          aria-label={isPlaying ? "Jeda Musik Gamelan" : "Putar Musik Gamelan"}
        >
          {isPlaying ? (
            /* Icon Pause */
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            /* Icon Play */
            <svg className="w-5 h-5 translate-x-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          )}
        </button>

        {/* Visualisasi Animasi Gelombang Suara (Equalizer) */}
        <div 
          onClick={togglePlay}
          className="flex items-end gap-[3px] h-5 px-1 cursor-pointer"
          title={isPlaying ? "Gamelan sedang berbunyi" : "Gamelan mati"}
        >
          <div 
            className={`w-[3px] rounded-full bg-emerald-400 transition-all duration-300 ${
              isPlaying ? 'animate-wave-1' : 'h-2'
            }`} 
            style={{ height: isPlaying ? undefined : '8px' }} 
          />
          <div 
            className={`w-[3px] rounded-full bg-cyan-400 transition-all duration-300 ${
              isPlaying ? 'animate-wave-2' : 'h-3'
            }`} 
            style={{ height: isPlaying ? undefined : '12px' }} 
          />
          <div 
            className={`w-[3px] rounded-full bg-emerald-400 transition-all duration-300 ${
              isPlaying ? 'animate-wave-3' : 'h-1.5'
            }`} 
            style={{ height: isPlaying ? undefined : '6px' }} 
          />
          <div 
            className={`w-[3px] rounded-full bg-cyan-400 transition-all duration-300 ${
              isPlaying ? 'animate-wave-4' : 'h-2.5'
            }`} 
            style={{ height: isPlaying ? undefined : '10px' }} 
          />
        </div>

        {/* Slider Volume (Slide out on hover) */}
        <div 
          className={`
            overflow-hidden transition-all duration-300 flex items-center
            ${showVolume ? 'w-24 md:w-28 opacity-100 pr-2 ml-1' : 'w-0 opacity-0'}
          `}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="
              w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer
              accent-emerald-400 hover:accent-emerald-300
            "
            aria-label="Volume Musik"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
