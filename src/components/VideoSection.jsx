import { Lock, Play } from "lucide-react";
import { useRef, useState } from "react";

export default function VideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const modules = [
    { title: "Relevance Blueprint to Become Only Choice", module: 2 },
    { title: "One Step Closer Framework - 2x Conversion", module: 3 },
    { title: "Science of Urgency", module: 4 },
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="about"
      className=" pb-10 md:pb-16 px-4"
      style={{ background: "#D9D9D9" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[25px] shadow-xl p-4 md:p-6 bg-white/40">
          <div className="rounded-[25px] overflow-hidden">
            {/* Video element with click to pause/play */}
            <div 
              className="relative w-full cursor-pointer rounded-[28px]" 
              style={{ aspectRatio: "16/9" }}
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="https://res.cloudinary.com/dnbjncck1/video/upload/v1/TrailerAgnelCourse_tres9d"
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>

              {/* Play button overlay (only shows when video is paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
  <div className="relative group">
    {/* Outer glow effect */}
    <div className="absolute inset-0 rounded-full bg-white/20 blur-lg group-hover:bg-white/30 transition-all duration-300"></div>
    
    {/* Main button with glass morphism effect */}
    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 border border-white/50">
      
      
      {/* Top highlight */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/60 rounded-full blur-sm"></div>
      
      {/* Play icon */}
      <Play className="relative w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1 z-10" />
    </div>
    
    {/* Ripple effect on hover */}
    <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/30 animate-ping-slow opacity-0 group-hover:opacity-100"></div>
  </div>
</div>
              )}

              {/* Dark gradient shadow at bottom of video */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "45%",
                  background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(15,15,15,0.92) 100%)",
                }}
              />
            </div>

            {/* Currently playing */}
            <div className="px-5 py-4 border-b border-white/10 bg-black">
              <div className="flex md:items-center gap-2 text-white text-xs md:text-sm font-medium">
                <Play size={14} className="text-white fill-white mt-[1px]" />
                <span>1.1. The Growth Laws of My EdTech - My Own Story</span>
              </div>
            </div>

            {/* Locked modules */}
            <div className="divide-y divide-white/10 bg-black">
              {modules.map((m) => (
                <div
                  key={m.module}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <div className="flex items-center gap-2.5 text-[#CFCFCF] text-xs md:text-sm">
                    <Lock size={14} className="text-[#CFCFCF]" />
                    <span>{m.title}</span>
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 bg-[#CFCFCF] rounded-full px-3 py-1.5 text-xs text-[#1D1D1D]">
                    <Lock size={11} />
                    <span>Module {m.module} Locked</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}