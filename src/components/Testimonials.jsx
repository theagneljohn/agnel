import { Star } from "lucide-react";
import ticker from "../assets/icons/ticker.png";
import Navin from "../assets/images/Navin.png"
import Savitri from "../assets/images/Savitri.jpg"

const StarRow = () => (
  <div className="flex gap-1 mb-3">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={25} fill="#f59e0b" className="text-yellow-400" />
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="pb-20 md:pt-20 px-4"
      style={{ background: "#D9D9D9", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="text-center">
          <h2
            className="text-black font-medium text-3xl md:text-5xl mb-3 tracking-tighter"
          >
            Results from Real Course Businesses
          </h2>
          <p className="text-gray-500 text-xl md:text-2xl font-normal tracking-tighter">
            The Only Choice Framework that turns your expertise into a{" "}
            <br className="hidden md:block" /> predictable, scalable education
            business.
          </p>
        </div>

        {/* Quote icon */}
        <div className="md:w-32 w-20 rounded-2xl flex items-center justify-center mt-7 md:mt-0">
          <img src={ticker} alt="icon" />
        </div>

        <div className=" bg-black backdrop-blur-sm rounded-2xl p-4 mb-10 md:hidden">
          <StarRow className={"text-2xl"} />
          <p className="text-white text-base leading-relaxed mb-5">
            I admire the way Agnel built Error Makes Clever. I joined his
            program, and in less than three months,{" "}
            <span className="font-extrabold">
              my revenue increased by almost 2x.
            </span>{" "}
            I was making ₹7 lakhs per month, and we moved close to ₹14 lakhs.
          </p>
          <div className="flex items-center gap-2">
            <img
              src={Navin}
              alt="Sarah Johnson"
              className="w-10 h-10 object-cover object-top rounded-full"
            />
            <div>
              <p className="text-white text-base font-semibold">Navin Kumar</p>
              <p className="text-gray-200 text-xs">
                Founder & CEO @ HR Learners Hub
              </p>
            </div>
          </div>
        </div>

        {/* Video testimonial card */}

        <div className="rounded-[25px] shadow-xl p-6 bg-white/50 hidden md:block">
          <div className="rounded-[25px] overflow-hidden">
            {/* Video embed */}
            <div
              className="relative w-full rounded-[28px]"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dnbjncck1&public_id=HR_Navin_Background_Video_dinwwv&autoplay=true&muted=true&loop=true&controls=false"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                className="w-full h-full"
              />

              {/* Review overlay on video */}
              <div className="absolute top-5 left-5 right-5 sm:right-auto sm:max-w-sm bg-black/15 backdrop-blur-sm rounded-2xl p-4 z-[2]">
                <StarRow className={"text-2xl"} />
                <p className="text-white text-xs md:text-base leading-relaxed mb-3">
                  I admire the way Agnel built Error Makes Clever. I joined his
                  program, and in less than three months,{" "}
                  <span className="font-extrabold">
                    my revenue increased by almost 2x.
                  </span>{" "}
                  I was making ₹7 lakhs per month, and we moved close to ₹14
                  lakhs.
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={Navin}
                    alt="Sarah Johnson"
                    className="w-10 h-10 object-cover object-top rounded-full"
                  />
                  <div>
                    <p className="text-white text-xs md:text-base font-semibold">
                      Navin Kumar
                    </p>
                    <p className="text-gray-200 text-xs">
                      Founder & CEO @ HR Learners Hub
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 w-full h-full bg-black/50 backdrop-blur-[1px] rounded-2xl p-4 z-[1]"></div>
            </div>
          </div>
        </div>

        {/* Bottom row: text + tilted card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:mt-20">
          {/* Left text */}
          <div className="w-full md:w-[55%]">
            <h3
              className="font-medium text-black text-2xl md:text-5xl leading-tight mb-3 tracking-tighter"
            >
              Right strategies and frameworks unlocked the next level of growth.
            </h3>
            <p className="text-gray-500 text-sm md:text-2xl leading-relaxed font-light tracking-tight">
              We helped edtech companies grow using our proven frameworks. But
              since we work with only a few clients at a time, consulting may
              not always fit the budget of early-stage founders. So we created a
              course and a book to make growth more accessible.
            </p>
          </div>

          {/* Tilted card */}
          <div
            className="p-4 md:p-6 shadow-xl w-full md:w-[45%] flex-shrink-0 flex-1 bg-white/40 rounded-4xl"
            style={{
              transform: "rotate(3deg)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="bg-white rounded-2xl p-5"
              style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
            >
              <StarRow />
              <p className="text-gray-800 text-sm md:text-3xl leading-relaxed mb-4 font-normal tracking-tight">
                The Session with John and Richa was a true turning point. Their
                clarity, the “Fix–Scale–Fix” framework, and insights on growth
                transformed our approach. In just 3 months, we’re on track to 5x
                our business.
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={Savitri}
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-black text-xs md:text-xl font-medium">
                    Savitri & Sivakumar
                  </p>
                  <p className="text-gray-400 text-xs md:text-lg font-light">
                    <span className="text-xs md:text-base">Founders</span>{" "}
                    @TRICHY PLUS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
