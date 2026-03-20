import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DomeGalleryProps {
  images: { url: string; title: string }[];
  radius?: number;
  onImageClick?: (url: string) => void;
}

const DomeGallery: React.FC<DomeGalleryProps> = ({
  images,
  radius = 350,
  onImageClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Refs for tracking physics without re-rendering
  const rotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0.05, y: 0.15 });
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  const n = images.length;
  const phi = Math.PI * (3 - Math.sqrt(5));

  const itemsWithTransforms = (isMobile || radius <= 250) ? [] : images.map((img, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    const rotateY = Math.atan2(x, z) * (180 / Math.PI);
    const rotateX = Math.asin(-y) * (180 / Math.PI);

    return {
      ...img,
      rotateY,
      rotateX,
      x, y, z
    };
  });

  const updateTransforms = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateZ(${-radius}px) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
    }
  };

  const animate = useCallback(() => {
    if (!isDragging.current && !isHovering.current) {
      // Auto-rotation
      rotation.current.x += velocity.current.x;
      rotation.current.y += velocity.current.y;

      // Auto rotation base speed returning to baseline slowly
      velocity.current.x = velocity.current.x * 0.95 + 0.05 * 0.05;
      velocity.current.y = velocity.current.y * 0.95 + 0.15 * 0.05;
    } else if (!isDragging.current && isHovering.current) {
      // Slow down when hovered (friction)
      velocity.current.x *= 0.92;
      velocity.current.y *= 0.92;
      rotation.current.x += velocity.current.x;
      rotation.current.y += velocity.current.y;
    }

    updateTransforms();
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isMobile || radius <= 250) return;
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate, isMobile, radius]);

  const handlePointerDown = (clientX: number, clientY: number) => {
    isDragging.current = true;
    lastMousePos.current = { x: clientX, y: clientY };
    velocity.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    velocity.current = {
      x: -deltaY * 0.15, // dragging vertically rotates around X axis
      y: deltaX * 0.15   // dragging horizontally rotates around Y axis
    };

    rotation.current.x += velocity.current.x;
    rotation.current.y += velocity.current.y;

    updateTransforms();

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Provide a smooth 2D swipe layout for low performance/mobile explicitly
  if (isMobile || radius <= 250) {
    return (
      <div className="w-full h-[350px] sm:h-[400px] overflow-x-auto flex items-center gap-4 px-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {images.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-center w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => onImageClick?.(item.url)}
          >
            <img src={item.url} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[600px] sm:h-[800px] flex items-center justify-center overflow-hidden bg-transparent perspective-[1200px]"
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerUp}
      onMouseLeave={() => { handlePointerUp(); isHovering.current = false; }}
      onMouseEnter={() => isHovering.current = true}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handlePointerUp}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center absolute top-0 left-0"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {itemsWithTransforms.map((item, i) => (
          <div
            key={i}
            className="absolute rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_40px_rgba(45,212,191,0.9)] border-2 border-primary/20 hover:border-primary bg-black/40"
            style={{
              width: '180px',
              height: '180px',
              transform: `rotateY(${item.rotateY}deg) rotateX(${item.rotateX}deg) translateZ(${radius}px)`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              left: 'calc(50% - 90px)',
              top: 'calc(50% - 90px)'
            }}
            onClick={(e) => {
              e.stopPropagation(); // prevent drag from registering as click if possible
              onImageClick?.(item.url);
            }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none mix-blend-screen"></div>

            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-110"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomeGallery;
