import { lazy, Suspense, memo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Lazy load heavy background components
const ParticleBackground = lazy(() => import("./ParticleBackground"));
const JellyfishBackground = lazy(() => import("./JellyfishBackground"));

const BottomNav = lazy(() => import("./BottomNav"));

const Layout = memo(() => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Suspense fallback={null}>
        <ParticleBackground />
        <JellyfishBackground />
      </Suspense>
      <Navbar />
      <main className="flex-grow pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
      <Footer />
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
