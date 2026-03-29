import { motion } from "framer-motion";
import { Instagram, Github, Linkedin, Circle } from "lucide-react";
import cosmicsarjaPhoto from "@/assets/cosmicsarja-photo.png";

interface Developer {
  id: number;
  name: string;
  department: string;
  role: string;
  photo: string;
  handle: string;
  instagram?: string;
  github?: string;
  linkedin?: string;
}

const basePath = import.meta.env.BASE_URL || '/';

const developers: Developer[] = [
  {
    id: 0,
    name: "Cosmicsarja",
    department: "Artificial Intelligence and Data Science",
    role: "Lead Developer",
    photo: cosmicsarjaPhoto,
    handle: "cosmicsarja",
    instagram: "https://instagram.com/cosmicsarja",
    github: "https://github.com/cosmicsarja",
    linkedin: "https://linkedin.com/in/cosmicsarja",
  },
  {
    id: 1,
    name: "Sahil Barbal",
    department: "Artificial Intelligence and Data Science",
    role: "Backend and Database",
    photo: `${basePath}sahil.png`,
    handle: "sahilbarbal",
    instagram: "https://www.instagram.com/sahil7236sahil/",
    github: "https://github.com/hydra7236",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Rohan Patil",
    department: "Artificial Intelligence and Data Science",
    role: "UI/UX Designer",
    photo: `${basePath}rohan.png`,
    handle: "rohanpatel",
    instagram: "https://www.instagram.com/justtt.rohan__",
    github: "#",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Nivedita A",
    department: "Artificial Intelligence and Data Science",
    role: "Frontend Developer",
    photo: `${basePath}nivedita.png`,
    handle: "niveditaakkimaradi",
    instagram: "https://www.instagram.com/nivedita_s_a21/",
    github: "#",
    linkedin: "#",
  },
];

const Developers = () => {
  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center justify-center bg-background/50 overflow-hidden">
      {/* Cinematic Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="container px-4 text-center mb-16 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl tracking-[0.3em] font-black fest-gradient-text mb-4 drop-shadow-[0_0_20px_rgba(45,212,191,0.4)] uppercase">
            Development Team
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="font-body text-white/60 max-w-2xl mx-auto text-lg tracking-wide">
            The masterminds crafting the technical landscape of VENCER 2K26.
          </p>
        </motion.div>
      </div>

      <div className="container px-4 relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative w-full max-w-[320px] h-[480px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-all duration-500 bg-black/40 shadow-2xl"
            >
              {/* Profile Image with subtle zoom */}
              <img 
                src={dev.photo} 
                alt={dev.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
              />

              {/* Top Gradient Overlay */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

              {/* Top Label */}
              <div className="absolute top-6 left-6 z-20">
                <div className="font-display text-[10px] tracking-[0.2em] text-primary uppercase font-bold mb-1 opacity-80">
                  {dev.role}
                </div>
                <h3 className="font-heading text-xl font-black text-white tracking-wider">
                  {dev.name}
                </h3>
              </div>

              {/* Bottom Status Bar (Revealed on Hover) */}
              <div className="absolute inset-x-0 bottom-0 z-30 translate-y-[85%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                {/* Blur Background */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border-t border-white/10" />
                
                <div className="relative p-6">
                  {/* Status & Handle */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Circle size={8} className="fill-green-500 text-green-500 animate-pulse" />
                      <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest font-bold">Online</span>
                    </div>
                    <span className="font-mono text-[10px] text-white/40 tracking-wider">@{dev.handle}</span>
                  </div>

                  {/* Social Grid */}
                  <div className="flex items-center justify-center gap-4">
                    {dev.instagram && (
                      <a 
                        href={dev.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-white hover:bg-pink-500 hover:text-white transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                    {dev.github && (
                      <a 
                        href={dev.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {dev.linkedin && (
                      <a 
                        href={dev.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/20 flex items-center justify-center text-white hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Accent Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;
