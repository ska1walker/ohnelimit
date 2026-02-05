'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { Song } from '@/lib/mockData';

interface StickyAudioPlayerProps {
  song: Song;
  onExpand?: () => void;
}

// Streaming service icons as inline SVGs for clean design
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AppleMusicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.8.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.56-2.07-1.494-.18-.593-.132-1.167.15-1.72.35-.688.9-1.126 1.614-1.345.457-.14.928-.2 1.404-.26.26-.036.52-.068.78-.102.167-.023.327-.06.482-.124.263-.108.39-.296.39-.59V8.267c0-.08-.01-.16-.026-.238-.056-.29-.26-.46-.546-.415-.116.018-.233.04-.348.065-.648.138-1.296.276-1.943.415l-3.298.704-1.36.29c-.01.003-.02.008-.085.037V16.57c0 .082-.013.162-.018.243-.033.47-.127.917-.387 1.32-.387.6-.934.953-1.62 1.085-.327.063-.66.1-.993.09-.972-.028-1.778-.582-2.05-1.486-.217-.722-.093-1.406.345-2.028.37-.527.876-.868 1.49-1.042.406-.115.823-.176 1.242-.218.357-.037.715-.066 1.068-.124.376-.062.584-.26.62-.64.007-.076.01-.154.01-.23V5.006c0-.09.007-.18.028-.27.057-.24.207-.4.438-.47.116-.035.236-.058.355-.078.613-.106 1.226-.21 1.838-.316L15.822 3.5l1.72-.296c.11-.02.22-.042.33-.054.32-.033.555.15.61.473.012.072.018.146.018.22v6.27h.07z"/>
  </svg>
);

const SoundCloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.19-1.308-.19-1.334c-.01-.057-.046-.094-.09-.094m1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.104.106.104.061 0 .12-.044.12-.104l.24-2.458-.24-2.563c0-.06-.045-.104-.12-.104m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.15.138.074 0 .149-.061.15-.138l.225-2.544-.225-2.64c-.001-.075-.076-.135-.15-.135m.93-.256c-.09 0-.165.075-.165.166l-.18 2.73.195 2.613c0 .09.075.166.165.166.089 0 .165-.075.165-.166l.21-2.613-.21-2.73c-.001-.091-.091-.166-.166-.166m.93-.166c-.104 0-.18.075-.195.18l-.165 2.73.18 2.58c.016.104.09.18.18.18.104 0 .18-.076.195-.18l.195-2.58-.195-2.73c-.015-.105-.09-.18-.18-.18m.915-.091c-.12 0-.21.09-.225.195l-.15 2.625.165 2.55c.015.12.105.21.21.21s.195-.09.21-.195l.18-2.565-.18-2.625c-.015-.12-.09-.21-.195-.21m.93-.015c-.135 0-.225.105-.225.225l-.135 2.475.15 2.52c0 .135.09.225.225.225.12 0 .225-.09.225-.225l.165-2.52-.165-2.475c0-.135-.105-.24-.225-.24m7.98 1.08c-.375 0-.72.105-1.005.3-.21-2.37-2.19-4.215-4.62-4.215-.6 0-1.185.12-1.71.33-.24.09-.3.18-.315.36v8.37c.015.18.135.33.315.345h7.335c1.32 0 2.4-1.095 2.4-2.43 0-1.32-1.065-2.4-2.385-2.4"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function StickyAudioPlayer({ song, onExpand }: StickyAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStreamingLinks, setShowStreamingLinks] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const vol = Number(e.target.value);
    audio.volume = vol;
    setVolume(vol);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Check if any streaming links exist
  const hasStreamingLinks = song.streamingLinks &&
    (song.streamingLinks.spotify || song.streamingLinks.appleMusic ||
     song.streamingLinks.soundcloud || song.streamingLinks.youtube);

  return (
    <>
      <audio ref={audioRef} src={song.audioUrl} preload="metadata" />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-white/10"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
          <motion.div
            className="h-full bg-[#e11d48]"
            style={{ width: `${progress}%` }}
            layoutId="progress"
          />
        </div>

        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Song info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={song.coverArt}
                  alt={song.title}
                  fill
                  className="object-cover"
                />
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                      <div className="flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-[#e11d48]"
                            animate={{
                              height: ['8px', '16px', '8px'],
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{song.title}</p>
                <p className="text-xs text-[#a1a1aa] truncate">Ohne Limit</p>
              </div>

              {/* Streaming Links - visible on desktop, toggleable on mobile */}
              {hasStreamingLinks && (
                <div className="hidden sm:flex items-center gap-1 ml-2">
                  {song.streamingLinks?.spotify && (
                    <a
                      href={song.streamingLinks.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/50 hover:text-[#1DB954] hover:bg-[#1DB954]/10 rounded-full transition-all"
                      title="Auf Spotify anhören"
                    >
                      <SpotifyIcon />
                    </a>
                  )}
                  {song.streamingLinks?.appleMusic && (
                    <a
                      href={song.streamingLinks.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/50 hover:text-[#FA243C] hover:bg-[#FA243C]/10 rounded-full transition-all"
                      title="Auf Apple Music anhören"
                    >
                      <AppleMusicIcon />
                    </a>
                  )}
                  {song.streamingLinks?.soundcloud && (
                    <a
                      href={song.streamingLinks.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/50 hover:text-[#FF5500] hover:bg-[#FF5500]/10 rounded-full transition-all"
                      title="Auf SoundCloud anhören"
                    >
                      <SoundCloudIcon />
                    </a>
                  )}
                  {song.streamingLinks?.youtube && (
                    <a
                      href={song.streamingLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/50 hover:text-[#FF0000] hover:bg-[#FF0000]/10 rounded-full transition-all"
                      title="Auf YouTube anhören"
                    >
                      <YouTubeIcon />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Mobile streaming toggle */}
              {hasStreamingLinks && (
                <div className="relative sm:hidden">
                  <button
                    onClick={() => setShowStreamingLinks(!showStreamingLinks)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>

                  {/* Mobile dropdown */}
                  <AnimatePresence>
                    {showStreamingLinks && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-2 bg-[#1a1a1a] rounded-xl shadow-xl border border-white/10 p-2 flex gap-1"
                      >
                        {song.streamingLinks?.spotify && (
                          <a
                            href={song.streamingLinks.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-white/70 hover:text-[#1DB954] hover:bg-[#1DB954]/10 rounded-lg transition-all"
                          >
                            <SpotifyIcon />
                          </a>
                        )}
                        {song.streamingLinks?.appleMusic && (
                          <a
                            href={song.streamingLinks.appleMusic}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-white/70 hover:text-[#FA243C] hover:bg-[#FA243C]/10 rounded-lg transition-all"
                          >
                            <AppleMusicIcon />
                          </a>
                        )}
                        {song.streamingLinks?.soundcloud && (
                          <a
                            href={song.streamingLinks.soundcloud}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-white/70 hover:text-[#FF5500] hover:bg-[#FF5500]/10 rounded-lg transition-all"
                          >
                            <SoundCloudIcon />
                          </a>
                        )}
                        {song.streamingLinks?.youtube && (
                          <a
                            href={song.streamingLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-white/70 hover:text-[#FF0000] hover:bg-[#FF0000]/10 rounded-lg transition-all"
                          >
                            <YouTubeIcon />
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-[#e11d48] hover:bg-[#be123c] transition-colors flex items-center justify-center"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Time display - hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#a1a1aa]">
                <span className="w-10 text-right">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-32 md:w-48 accent-[#e11d48] cursor-pointer"
                />
                <span className="w-10">{formatTime(duration)}</span>
              </div>

              {/* Volume - hidden on mobile */}
              <div className="hidden md:flex items-center gap-2">
                <svg className="w-4 h-4 text-[#a1a1aa]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-[#e11d48] cursor-pointer"
                />
              </div>

              {/* Expand button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
