import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Github, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import cosmicsarjaPhoto from "@/assets/cosmicsarja-photo.png";

interface Developer {
  id: number;
  name: string;
  department: string;
  role: string;
  photo: string;
  instagram?: string;
  github?: string;
  linkedin?: string;
}

const developers: Developer[] = [
  {
    id: 0,
    name: "Cosmicsarja",
    department: "Artificial Intelligence and Data Science",
    role: "Full Stack Developer",
    photo: cosmicsarjaPhoto,
    instagram: "https://instagram.com/cosmicsarja",
    github: "https://github.com/cosmicsarja",
    linkedin: "https://linkedin.com/in/cosmicsarja",
  },
  {
    id: 1,
    name: "Sahil Barbal",
    department: "Artificial Intelligence and Data Science",
    role: "Backend and UI/UX",
    photo: "/sahil.png",
    instagram: "https://www.instagram.com/sahil7236sahil/?utm_source=ig_web_button_share_sheet",
    github: "https://github.com/hydra7236",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Rohan Patil",
    department: "Artificial Intelligence and Data Science",
    role: "Database and Frontend",
    photo: "/rohan.png",
    instagram: "https://www.instagram.com/justtt.rohan__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    github: "#",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Nivedita Akkimaradi",
    department: "Artificial Intelligence and Data Science",
    role: "Frontend and UI/UX",
    photo: "https://i.pravatar.cc/300?img=9",
    instagram: "https://www.instagram.com/nivedita_s_a21/?utm_source=ig_web_button_share_sheet",
    github: "#",
    linkedin: "#",
  },
];

const Developers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const n = developers.length;
  const radius = window.innerWidth < 768 ? 200 : 350; // Distance of cards from center
  const angleDelta = 360 / n; // 90 degrees since 4 devs

  // Auto-rotate logic
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const handleNext = () => setActiveIndex((prev) => prev + 1);
  const handlePrev = () => setActiveIndex((prev) => prev - 1);

  // Normalize current index for display
  const currentIndex = ((activeIndex % n) + n) % n;

  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center justify-center bg-background/50 overflow-hidden">
      {/* Immersive Cyberpunk Backdrops */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container px-4 text-center mb-16 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-5xl tracking-widest fest-gradient-text mb-4 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]"
        >
          Meet the Developers
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-white/70 max-w-2xl mx-auto text-lg"
        >
          The masterminds crafting the technical landscape of VENCER 2K26.
        </motion.p>
      </div>

      {/* 3D Carousel Container */}
      <div 
        className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center preserve-3d"
          animate={{ rotateY: -activeIndex * angleDelta }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ transformStyle: "preserve-3d", cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
          onPanEnd={(e, info) => {
            const dragThreshold = 50;
            if (info.offset.x < -dragThreshold) {
              handleNext();
            } else if (info.offset.x > dragThreshold) {
              handlePrev();
            }
          }}
        >
          {developers.map((dev, i) => {
            const angle = i * angleDelta;
            const isCenter = currentIndex === i;

            return (
              <div
                key={dev.id}
                className={`absolute top-1/2 left-1/2 -ml-[140px] -mt-[200px] sm:-ml-[160px] sm:-mt-[220px] w-[280px] h-[400px] sm:w-[320px] sm:h-[440px] rounded-2xl glass-pandora border-2 transition-all duration-300 flex flex-col items-center justify-center p-6 cursor-pointer shadow-2xl group
                  ${isCenter ? 'border-primary/80 shadow-[0_0_30px_rgba(45,212,191,0.4)] scale-100 z-10' : 'border-white/10 opacity-60 scale-90 z-0'}
                  hover:scale-105 hover:opacity-100 hover:border-primary/50
                `}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
                onClick={(e) => {
                  // Find shortest rotation path
                  e.stopPropagation();
                  let delta = i - currentIndex;
                  if (delta > n / 2) delta -= n;
                  if (delta < -n / 2) delta += n;
                  setActiveIndex(activeIndex + delta);
                }}
              >
                {/* Image Section */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-6 border-4 border-primary/20 group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.6)]">
                  <img src={dev.photo} alt={dev.name} className="w-full h-full object-cover" />
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
                </div>

                {/* Details Section */}
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-purple-400 mb-1 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(45,212,191,1)] transition-all">
                  {dev.name}
                </h3>
                <p className="font-display text-xs sm:text-sm tracking-[0.2em] text-[#c084fc] mb-2 uppercase text-center font-bold relative z-10 drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]">
                  {dev.department}
                </p>
                <p className="text-sm sm:text-base text-white/90 font-semibold mb-8 max-w-full text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {dev.role}
                </p>

                {/* Social Links - Reveal on Hover if center or make more prominent */}
                <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {dev.instagram && (
                    <a href={dev.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-primary hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all" onClick={e => e.stopPropagation()}>
                      <Instagram size={18} />
                    </a>
                  )}
                  {dev.github && (
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#c084fc] hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-all" onClick={e => e.stopPropagation()}>
                      <Github size={18} />
                    </a>
                  )}
                  {dev.linkedin && (
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#2dd4bf] hover:bg-teal-500/20 hover:border-teal-500/50 hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all" onClick={e => e.stopPropagation()}>
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>

                {/* Ambient glow block behind card text mapping */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none rounded-b-2xl"></div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-6 mt-8 relative z-20">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all focus:outline-none hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
        >
          <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all focus:outline-none hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
        >
          <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Developers;
