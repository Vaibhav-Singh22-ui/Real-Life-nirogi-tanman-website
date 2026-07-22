"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, Sparkles, Search, Share2, ThumbsUp, CheckCircle2, X, Eye, UserCheck, Film, Video, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const videoSessions = [
  {
    id: "spinal-decompression",
    title: "15-Minute Spinal Decompression Routine",
    category: "Yoga Therapy",
    duration: "15:20",
    instructor: "Neel Joshi",
    instructorRole: "Spine Specialist",
    instructorAvatar: "NJ",
    desc: "A step-by-step mechanical spine correction routine designed to relieve workspace strain and cervical pressure.",
    thumb: "/services/yoga_therapy.png",
    videoUrl: "https://cdn.coverr.co/videos/coverr-woman-doing-yoga-stretches-in-a-park-5683/1080p.mp4",
    views: "14.2k",
    likes: "1.8k",
    uploadDate: "3 days ago",
  },
  {
    id: "vagal-breathing",
    title: "Vagal Nerve Breathing & Pranayama",
    category: "Breathwork",
    duration: "10:45",
    instructor: "Mira Patel",
    instructorRole: "Breathwork Guide",
    instructorAvatar: "MP",
    desc: "Slow pacing diaphragmatic breathwork triggers parasympathetic vagus nerve stimulation to flatten daily cortisol spikes.",
    thumb: "/services/ai_assistant.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-stretches-on-the-beach-40502-large.mp4",
    views: "28.9k",
    likes: "3.4k",
    uploadDate: "1 week ago",
  },
  {
    id: "vedic-cooking",
    title: "Vedic Cooking: Agni Digest Rebuild",
    category: "Ayurvedic Cooking",
    duration: "22:15",
    instructor: "Radhika Iyer",
    instructorRole: "Clinical Nutritionist",
    instructorAvatar: "RI",
    desc: "Ayurvedic culinary preparation guidelines focusing on digestive spices (ginger, cumin, ajwain) to restore metabolic Agni fire.",
    thumb: "/services/clinical_nutrition.png",
    videoUrl: "https://cdn.coverr.co/videos/coverr-preparing-healthy-food-ingredients-6059/1080p.mp4",
    views: "9.5k",
    likes: "1.1k",
    uploadDate: "5 days ago",
  },
  {
    id: "desk-worker-posture",
    title: "Postural Adjustment for Desk Workers",
    category: "Spine & Ergonomics",
    duration: "18:00",
    instructor: "Dr. Vikram Seth",
    instructorRole: "Senior Vaidya",
    instructorAvatar: "VS",
    desc: "Ergonomic workspace stretching techniques to open shoulder blades, prevent thoracic kyphosis, and reduce lumbar strain.",
    thumb: "/services/tele_yoga.png",
    videoUrl: "https://cdn.coverr.co/videos/coverr-stretching-exercises-in-nature-5412/1080p.mp4",
    views: "32.1k",
    likes: "4.5k",
    uploadDate: "2 weeks ago",
  },
];

const categories = ["All", "Yoga Therapy", "Breathwork", "Ayurvedic Cooking", "Spine & Ergonomics"];

const VideosPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<(typeof videoSessions)[0] | null>(null);

  // Video Player Controls State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("0:00");
  const [durationStr, setDurationStr] = useState("0:00");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const filteredVideos = videoSessions.filter((video) => {
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVideoSelect = (video: (typeof videoSessions)[0]) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setProgress(0);
    setHasLiked(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setProgress((cur / dur) * 100);

      const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? "0" : ""}${s}`;
      };

      setCurrentTimeStr(formatTime(cur));
      setDurationStr(formatTime(dur));
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = (parseFloat(e.target.value) / 100) * (videoRef.current?.duration || 0);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTo;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-24 overflow-hidden">
      {/* HERO HEADER WITH TOP BACKGROUND IMAGE */}
      <section className="relative py-20 md:py-28 border-b border-border overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/services/tele_yoga.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/65 backdrop-blur-[2px]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-emerald-300 font-bold text-xs uppercase tracking-widest backdrop-blur-md">
            <Film className="h-4 w-4 text-[#DDA853]" />
            Interactive Media Studio
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Video Lectures & Guided Sessions
          </h1>
          
          <p className="text-sm sm:text-base text-gray-300 font-normal max-w-xl mx-auto leading-relaxed">
            Watch interactive postural classes, Ayurvedic cooking guidelines, and breathing sessions led by certified guides.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Input
              type="search"
              placeholder="Search videos by title, instructor, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-3 text-sm bg-white/95 border-none rounded-2xl shadow-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-white h-12"
            />
            <Search className="absolute left-4 top-5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-12 space-y-12">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full border transition-all duration-200 ${
                  isActive
                    ? "bg-[#2F5E1A] border-[#2F5E1A] text-white shadow-md scale-105"
                    : "bg-white border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Video Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              {selectedCategory === "All" ? "Featured Video Library" : `${selectedCategory} Videos`}
              <span className="text-xs font-normal text-muted-foreground">({filteredVideos.length} available)</span>
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {filteredVideos.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ y: -4 }}
                className="cursor-pointer"
                onClick={() => handleVideoSelect(session)}
              >
                <Card className="bg-white border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Thumbnail View */}
                    <div className="relative h-56 w-full bg-black overflow-hidden flex items-center justify-center">
                      <img
                        src={session.thumb}
                        alt={session.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 fill-[#2F5E1A] text-[#2F5E1A] ml-1" />
                        </div>
                      </div>

                      <span className="absolute top-3 left-3 bg-[#2F5E1A] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {session.category}
                      </span>

                      <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1">
                        <Clock className="h-3 w-3 text-emerald-400" />
                        {session.duration}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
                        <span className="flex items-center gap-1.5 text-foreground font-bold">
                          <div className="h-6 w-6 rounded-full bg-[#2F5E1A] text-white flex items-center justify-center text-[10px] font-black">
                            {session.instructorAvatar}
                          </div>
                          {session.instructor}
                        </span>
                        <span>{session.views} views • {session.uploadDate}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-1">
                        {session.title}
                      </h3>

                      <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-2">
                        {session.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-border/60 bg-[#FAF8F5]/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2F5E1A] flex items-center gap-1">
                      <Play className="h-3.5 w-3.5 fill-[#2F5E1A]" />
                      Click to Watch in HD Player
                    </span>

                    <span className="text-[11px] font-bold text-muted-foreground bg-white border border-border px-2.5 py-1 rounded-lg">
                      Pexels Video Stream
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM YOUTUBE-STYLE VIDEO PLAYER OVERLAY MODAL */}
      <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
        {activeVideo && (
          <DialogContent className="sm:max-w-5xl bg-[#0F0F0F] text-white p-0 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden max-h-[95vh]">
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto">
              
              {/* MAIN THEATER PLAYER AREA */}
              <div className="flex-1 flex flex-col bg-black">
                {/* VIDEO STAGE */}
                <div className="relative aspect-video w-full bg-black group flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={activeVideo.videoUrl}
                    poster={activeVideo.thumb}
                    autoPlay
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlayPause}
                    className="w-full h-full object-contain cursor-pointer"
                  />

                  {/* CUSTOM PLAYER OVERLAY CONTROLS BAR */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-90 transition-opacity flex flex-col gap-2">
                    {/* Scrubbing Bar */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleScrub}
                      className="w-full h-1.5 bg-white/30 accent-emerald-500 rounded-lg cursor-pointer"
                    />

                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-4">
                        <button onClick={togglePlayPause} className="hover:text-emerald-400 transition-colors p-1">
                          {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
                        </button>

                        <button onClick={toggleMute} className="hover:text-emerald-400 transition-colors p-1">
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>

                        <span className="text-gray-300 font-mono text-[11px]">
                          {currentTimeStr} / {durationStr || activeVideo.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="bg-emerald-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          1080p HD
                        </span>
                        <button onClick={handleFullscreen} className="hover:text-emerald-400 transition-colors p-1">
                          <Maximize className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VIDEO DETAILS UNDER PLAYER */}
                <div className="p-5 space-y-4 bg-[#0F0F0F]">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                      {activeVideo.title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 font-normal">
                      {activeVideo.views} views • Uploaded {activeVideo.uploadDate} • {activeVideo.category}
                    </p>
                  </div>

                  {/* INSTRUCTOR / CHANNEL & ACTIONS BAR */}
                  <div className="flex items-center justify-between flex-wrap gap-4 py-3 border-y border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-extrabold text-sm border border-emerald-500/40">
                        {activeVideo.instructorAvatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          {activeVideo.instructor}
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
                        </h4>
                        <p className="text-[10px] text-gray-400">{activeVideo.instructorRole}</p>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => {
                          setIsSubscribed(!isSubscribed);
                          toast.success(isSubscribed ? "Unsubscribed" : "Subscribed to channel!");
                        }}
                        className={`ml-2 rounded-full text-xs font-bold px-4 h-8 ${
                          isSubscribed
                            ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                            : "bg-white text-black hover:bg-gray-200"
                        }`}
                      >
                        {isSubscribed ? "Subscribed" : "Subscribe"}
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setHasLiked(!hasLiked);
                          toast.success(hasLiked ? "Unliked" : "Liked video!");
                        }}
                        className={`rounded-full text-xs font-bold h-8 flex items-center gap-1.5 ${
                          hasLiked ? "bg-emerald-800 text-white" : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                        }`}
                      >
                        <ThumbsUp className={`h-3.5 w-3.5 ${hasLiked ? "fill-white" : ""}`} />
                        <span>{hasLiked ? "Liked" : activeVideo.likes}</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toast.success("Video link copied!")}
                        className="rounded-full text-xs font-bold h-8 bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center gap-1.5"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>

                  {/* DESCRIPTION FOLD */}
                  <div className="bg-gray-900/80 rounded-2xl p-4 text-xs text-gray-300 font-normal leading-relaxed">
                    {activeVideo.desc}
                  </div>
                </div>
              </div>

              {/* RECOMMENDED VIDEOS SIDEBAR (YOUTUBE STYLE) */}
              <div className="w-full lg:w-80 bg-[#181818] p-4 border-t lg:border-t-0 lg:border-l border-gray-800 space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Up Next</h4>

                <div className="space-y-3">
                  {videoSessions.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => handleVideoSelect(v)}
                      className={`flex gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
                        activeVideo.id === v.id ? "bg-gray-800 border border-emerald-500/50" : "hover:bg-gray-800/60"
                      }`}
                    >
                      <div className="relative h-16 w-24 rounded-lg bg-black shrink-0 overflow-hidden">
                        <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                          {v.duration}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h5 className="text-xs font-bold text-white truncate">{v.title}</h5>
                        <p className="text-[10px] text-gray-400">{v.instructor}</p>
                        <p className="text-[10px] text-gray-500">{v.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default VideosPage;
