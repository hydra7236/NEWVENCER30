import { lazy, Suspense, useState, useEffect } from "react";
import { useGlobalClickSound } from "@/hooks/useClickSound";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import ClickSpark from "./components/ClickSpark";
import IntroVideoSequence from "./components/IntroVideoSequence";

// Lazy-loaded route components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));
const Branches = lazy(() => import("./pages/Branches"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Rulebook = lazy(() => import("./pages/Rulebook"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Developers = lazy(() => import("./pages/Developers"));
const Contact = lazy(() => import("./pages/Contact"));
const Registration = lazy(() => import("./pages/Registration"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Only play the intro once per session so they don't get annoyed routing back to Home manually
    if (sessionStorage.getItem("vencer_intro_played")) {
      setIntroFinished(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroFinished(true);
    sessionStorage.setItem("vencer_intro_played", "true");
  };

  useEffect(() => {
    return useGlobalClickSound();
  }, []);

  return (
    <ClickSpark sparkColor="hsl(175, 80%, 50%)" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <AnimatePresence>
            {!loaded && <LoadingScreen key="loading" onComplete={() => setLoaded(true)} />}
            
            {loaded && !introFinished && (
              <IntroVideoSequence key="intro" onComplete={handleIntroComplete} />
            )}
          </AnimatePresence>

          <HashRouter>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/rulebook" element={<Rulebook />} />
                  <Route path="/branches" element={<Branches />} />
                  <Route path="/timeline" element={<Timeline />} />
                  <Route path="/sponsors" element={<Sponsors />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/developers" element={<Developers />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/register" element={<Registration />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </HashRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ClickSpark>
  );
};

export default App;
