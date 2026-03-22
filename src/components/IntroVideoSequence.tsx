import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, ArrowRight } from "lucide-react";

const IntroVideoSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Skip button logic moved to handleStart
    return () => {};
  }, []);

  const handleStart = () => {
    // Show skip button after 5 seconds of video start
    setTimeout(() => setShowSkip(true), 5000);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch((e) => {
        // Fallback for strict browsers
        videoRef.current!.muted = true;
        videoRef.current!.play();
        setIsPlaying(true);
        setIsMuted(true);
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[150] bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}intro.mp4`}
        playsInline
        poster={`${import.meta.env.BASE_URL}gallery/image1.jpg`}
        onEnded={onComplete}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[85svh] md:h-full md:w-full object-cover"
      />

      {/* Start Overlay (to allow autoplay with sound) */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 backdrop-blur-md"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="flex items-center gap-3 px-8 py-4 bg-primary/10 border border-primary/50 text-primary rounded-full font-display tracking-widest uppercase hover:bg-primary hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(45,212,191,0.2)] hover:shadow-[0_0_50px_rgba(45,212,191,0.6)]"
            >
              <Play size={20} className="fill-current" />
              <span>Enter Experience</span>
            </motion.button>
            <p className="mt-6 text-white/40 font-heading text-xs tracking-[0.3em] uppercase">
              Immersive Sound Highly Recommended
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      {isPlaying && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 flex gap-4 z-20"
        >
          <button
            onClick={toggleMute}
            className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/40 rounded-full backdrop-blur-md transition-all"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-primary" />}
          </button>
          
          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onComplete}
                className="flex items-center gap-2 px-6 h-12 bg-black/40 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/40 rounded-full backdrop-blur-md transition-all font-display text-sm tracking-wider uppercase group"
              >
                <span>Skip</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IntroVideoSequence;
