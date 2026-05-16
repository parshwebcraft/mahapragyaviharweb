"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export function GalleryVideoCard({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [videoError, setVideoError] = useState("");

  async function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
        setVideoError("");
      } catch {
        setVideoError("Video could not play in this browser. Try converting this MOV to MP4.");
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function updateVolume(nextVolume: number) {
    const video = videoRef.current;
    if (!video) return;

    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);
    setMuted(video.muted);
  }

  return (
    <div className="group overflow-hidden rounded-[32px] bg-white shadow-soft">
      <div className="relative aspect-[9/16] bg-black">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-contain"
          preload="metadata"
          playsInline
          muted={muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => setVideoError("Video format is not supported by this browser. MP4 is best for web playback.")}
        />

        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 grid place-items-center bg-black/0 opacity-100 transition group-hover:bg-black/10"
          aria-label={playing ? "Pause video" : "Play video"}
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-accent shadow-soft transition group-hover:scale-105">
            {playing ? <Pause className="h-7 w-7" /> : <Play className="ml-1 h-7 w-7" />}
          </span>
        </button>

        {videoError && (
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-3 text-sm font-medium text-accent shadow-soft">
            {videoError}
          </div>
        )}
      </div>

      <div className="grid gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-accent">{title}</p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" className="px-3" onClick={togglePlay}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button type="button" variant="outline" size="sm" className="px-3" onClick={toggleMute}>
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <label className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          Volume
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(event) => updateVolume(Number(event.target.value))}
            className="h-2 flex-1 accent-[#7A1E1E]"
            aria-label={`${title} volume`}
          />
        </label>
      </div>
    </div>
  );
}
