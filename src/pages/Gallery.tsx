import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, ArrowLeft, Maximize2 } from "lucide-react";

const getGalleryImages = () => {
  const basePath = import.meta.env.BASE_URL || '/';
  const getPath = (path: string) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${basePath}${cleanPath}`;
  };

  const images = [
    getPath('/gallery/20250408_123809.jpg'),
    getPath('/gallery/20250408_131102.jpg'),
    getPath('/gallery/20250408_185333.jpg'),
    getPath('/gallery/20250408_185334.jpg'),
    getPath('/gallery/20250408_185335.jpg'),
    getPath('/gallery/20250408_190851.jpg'),
    getPath('/gallery/20250408_190853.jpg'),
    getPath('/gallery/20250408_204951.jpg'),
    getPath('/gallery/20250408_204959.jpg'),
    getPath('/gallery/20250408_205251.jpg'),
    getPath('/gallery/20250408_210601.jpg'),
    getPath('/gallery/20250408_210613.jpg'),
    getPath('/gallery/20250409_205514.jpg'),
    getPath('/gallery/20250409_205523.jpg'),
    getPath('/gallery/20250409_210210.jpg'),
    getPath('/gallery/20250409_213212.jpg'),
    getPath('/gallery/image1.jpg'),
    getPath('/gallery/image2.jpg'),
    getPath('/gallery/image3.jpg'),
    getPath('/gallery/image4.jpg'),
    getPath('/gallery/image5.jpg'),
    getPath('/gallery/media__1773941054824.jpg'),
    getPath('/gallery/media__1773941054839.jpg'),
    getPath('/gallery/media__1773941054853.jpg'),
    getPath('/gallery/media__1773941054874.jpg'),
    getPath('/gallery/media__1773941054928.jpg'),
    getPath('/gallery/20250408_123809(0).jpg'),
    getPath('/gallery/20250408_123810(0).jpg'),
    getPath('/gallery/20250408_205240(0).jpg'),
    getPath('/gallery/20250409_210320(0).jpg'),
  ];

  // Showing all available unique images from the folder
  return images.map((url, i) => ({
    url: url,
    title: `Vencer Moment ${i + 1}`,
  }));
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = getGalleryImages();

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop() || "download.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 min-h-screen flex flex-col bg-background/50 relative overflow-hidden">
      {/* Immersive background effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.05),transparent_70%)] pointer-events-none" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl sm:text-5xl tracking-widest fest-gradient-text mb-4 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)] uppercase">
            Gallery
          </h1>
          <p className="font-body text-white/60 max-w-2xl mx-auto text-lg">
            Relive the moments from previous Vencer editions. <span className="text-primary italic">Click to see</span>
          </p>
        </motion.div>

        {/* 6-Column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.1, duration: 0.5 }}
              onClick={() => setSelectedImage(image.url)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] bg-black/40"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay with subtle Vencer text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <p className="font-display text-[10px] tracking-widest text-primary uppercase mb-1">
                  Vencer Moment
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-[10px] font-body uppercase">{index + 1} / {images.length}</span>
                  <Maximize2 size={14} className="text-primary" />
                </div>
              </div>

              {/* Teal glow effect on hover */}
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/20 group-hover:ring-primary/60 transition-all duration-500 rounded-xl" />
            </motion.div>
          ))}
        </div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center pb-24"
        >
          <div className="glass-pandora p-8 sm:p-12 rounded-3xl border border-primary/20 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />

            <h3 className="font-display text-2xl sm:text-3xl tracking-wider text-white mb-6 uppercase">
              The Spirit of <span className="fest-gradient-text">AITM</span>
            </h3>
            <p className="font-body text-white/70 text-lg leading-relaxed">
              Welcome to the visual legacy of Angadi Institute of Technology and Management (AITM).
              Our gallery is a testament to the vibrant energy, relentless innovation, and unbreakable
              camaraderie that define our campus life. From electrifying nights of VENCER to insightful
              technical exposures, every frame captures the passion that makes our college a hub of excellence.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Improved Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[101]">
              <button
                onClick={() => setSelectedImage(null)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full font-display text-xs tracking-widest backdrop-blur-md border border-white/10"
              >
                <ArrowLeft size={18} />
                <span>BACK</span>
              </button>

              <button
                onClick={() => handleDownload(selectedImage)}
                className="flex items-center gap-2 text-black bg-primary hover:bg-primary/90 px-6 py-3 rounded-full font-display text-xs tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(45,212,191,0.5)]"
              >
                <Download size={18} />
                <span>DOWNLOAD</span>
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex items-center justify-center"
            >
              <img
                src={selectedImage}
                alt="Selected Gallery Image"
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-[0_0_60px_rgba(45,212,191,0.2)] border border-primary/20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

