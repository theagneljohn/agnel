import { Lock } from "lucide-react";

export default function VideoSection() {
  const modules = [
    { title: "Relevance Blueprint to Become Only Choice", module: 2 },
    { title: "One Step Closer Framework - 2x Conversion", module: 3 },
    { title: "Science of Urgency", module: 4 },
  ];

  return (
    <section
      id="about"
      className="md:pt-16 pb-10 md:pb-16 px-4"
      style={{ background: "#D9D9D9" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[25px] shadow-xl p-4 md:p-6 bg-white/40">
        <div
          className="rounded-[25px] overflow-hidden"
          
        >
          {/* Video embed */}
          <div className="relative w-full rounded-[28px]" style={{ aspectRatio: "16/9" }}>
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=dnbjncck1&public_id=TrailerAgnelCourse_tres9d"
              style={{ height: "100%", width: "100%", }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              className="w-full h-full"
            />

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
            <div className="flex items-start gap-2 text-white text-xs md:text-sm font-medium">
              <span className="text-white">▶</span>
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