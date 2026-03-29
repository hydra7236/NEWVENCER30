import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const images = [
    "/gallery/20250408_131102.jpg",
    "/gallery/20250408_185333.jpg",
    "/gallery/20250408_204951.jpg",
    "/gallery/20250408_210601.jpg",
    "/gallery/20250409_205514.jpg",
    "/gallery/20250409_213212.jpg",
    "/gallery/image1.jpg",
    "/gallery/image2.jpg",
    "/gallery/image3.jpg",
    "/gallery/image4.jpg",
    "/gallery/media__1773941054928.jpg",
    "/gallery/20250408_123809.jpg",
  ];

  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl tracking-wider fest-gradient-text mb-4 uppercase">Gallery</h2>
          <p className="font-body text-white/60">Moments from Vencer</p>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="flex w-full overflow-hidden mb-6">
        <motion.div 
          className="flex gap-4 px-2"
          animate={{ x: [0, -1200] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...images, ...images].map((src, i) => (
            <motion.div
              key={i}
              onClick={() => setSelected(i % images.length)}
              className="glass rounded-xl w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] relative overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-500 shrink-0"
            >
              <img 
                src={src} 
                alt={`Vencer ${i}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div className="flex w-full overflow-hidden">
        <motion.div 
          className="flex gap-4 px-2"
          animate={{ x: [-1200, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...images, ...images].reverse().map((src, i) => (
            <motion.div
              key={i}
              onClick={() => setSelected(i % images.length)}
              className="glass rounded-xl w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] relative overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-500 shrink-0"
            >
              <img 
                src={src} 
                alt={`Vencer ${i}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative glass rounded-2xl w-full max-w-2xl aspect-video flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              >
                <X size={16} />
              </button>
              <p className="text-muted-foreground font-display text-sm tracking-wider">Image {selected + 1}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
