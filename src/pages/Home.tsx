import { forwardRef, lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

const GallerySection = lazy(() => import("@/components/GallerySection"));
const PrizeSection = lazy(() => import("@/components/PrizeSection"));
const ScheduleSection = lazy(() => import("@/components/ScheduleSection"));
const SponsorsSection = lazy(() => import("@/components/SponsorsSection"));

const Home = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="space-y-0">
      <HeroSection />
      
      <div className="relative">
        {/* About section - explains what Vencer is */}
        <AboutSection />
        
        {/* Dynamic content sections with suspence for performance */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
          <PrizeSection />
          <GallerySection />
          <ScheduleSection />
          <SponsorsSection />
        </Suspense>
      </div>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
