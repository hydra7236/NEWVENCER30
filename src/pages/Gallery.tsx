import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, ArrowLeft } from "lucide-react";
import DomeGallery from "@/components/DomeGallery";

const getGalleryImages = () => {
  const images = [
    '/gallery/image1.jpg',
    '/gallery/image2.jpg',
    '/gallery/image3.jpg',
    '/gallery/image4.jpg',
    '/gallery/image5.jpg',
    '/gallery/media__1773941054824.jpg',
    '/gallery/media__1773941054839.jpg',
    '/gallery/media__1773941054853.jpg',
    '/gallery/media__1773941054874.jpg',
    '/gallery/media__1773941054928.jpg',
  ];
  
  // Creating an array of 40 images to populate the 3D dome.
  return Array.from({ length: 40 }).map((_, i) => ({
    url: images[i % images.length],
    title: `Gallery Image ${i + 1}`,
  }));
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [radius, setRadius] = useState(350);
  
  // Responsive radius
  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 250 : window.innerWidth < 1024 ? 350 : 450);
    };
    
    // Initial call
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const domeImages = getGalleryImages();

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop() || "download.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col bg-background/50 relative overflow-hidden">
      {/* Background glow effects to match the dark cyberpunk theme */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container px-4 pt-12 pb-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl tracking-widest fest-gradient-text mb-6 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
            AITM Gallery
          </h2>
          <p className="font-body text-white/70 max-w-2xl mx-auto text-lg">
            Explore moments from previous editions in this interactive 3D space. 
            <span className="text-primary block mt-2 animate-pulse">Drag to rotate • Click to view</span>
          </p>
        </motion.div>
      </div>

      {/* 3D Dome Rendering */}
      <div className="w-full relative z-20 overflow-hidden flex items-center justify-center my-8">
        {/* Pass responsive radius. On smaller screens, use a smaller radius to prevent overflow */}
        <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 h-[600px] sm:h-[800px] flex items-center justify-center">
          <DomeGallery 
            images={domeImages} 
            radius={radius} 
            onImageClick={setSelectedImage}
          />
        </div>
      </div>

      {/* College & Gallery Description Section */}
      <div className="container px-4 py-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl tracking-wider text-white mb-6"
          >
            The Spirit of <span className="fest-gradient-text">AITM</span>
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-pandora p-8 sm:p-12 rounded-2xl relative overflow-hidden text-left sm:text-center shadow-[0_0_30px_rgba(45,212,191,0.1)] border border-primary/20 backdrop-blur-xl"
          >
            {/* Subtle background glow inside the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/10 blur-[80px] pointer-events-none"></div>
            
            <p className="font-body text-lg sm:text-xl text-white/80 leading-relaxed mb-6 relative z-10">
              Welcome to the visual legacy of <strong className="text-white">Angadi Institute of Technology and Management (AITM)</strong>. Our gallery is more than just a collection of photographs; it is a true testament to the vibrant energy, relentless innovation, and unbreakable camaraderie that define our campus life.
            </p>
            <p className="font-body text-lg sm:text-xl text-white/80 leading-relaxed relative z-10">
              From the electrifying nights of <strong className="text-primary">VENCER 2K26</strong> to insightful industrial tours, fierce sports competitions, and late-night hackathons, every frame captures the passion of our students. Explore these highlights and relive the moments that make our college an unparalleled technical and cultural hub.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* Top Bar Navigation */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[101]">
              <button 
                onClick={() => setSelectedImage(null)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/30 px-5 py-2.5 rounded-full font-display tracking-wider backdrop-blur-md focus:outline-none border border-white/10 hover:border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <ArrowLeft size={20} />
                <span>BACK</span>
              </button>
              
              <button 
                onClick={() => handleDownload(selectedImage)}
                className="flex items-center gap-2 text-black transition-colors bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-full font-display tracking-wider backdrop-blur-md focus:outline-none shadow-[0_0_20px_rgba(45,212,191,0.6)]"
              >
                <Download size={20} />
                <span>DOWNLOAD</span>
              </button>
            </div>

            {/* Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Selected Gallery Image"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_rgba(45,212,191,0.3)] border border-primary/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
