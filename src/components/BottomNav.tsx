import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Calendar, Image, Users, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Trophy, label: "Events", href: "/events" },
  { icon: Calendar, label: "Passes", href: "/register" }, // More intuitive name
  { icon: Image, label: "Gallery", href: "/gallery" },
  { icon: Users, label: "About", href: "/#about" }, 
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[500] bg-background/80 backdrop-blur-xl border-t border-primary/20 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16 relative">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex flex-col items-center justify-center w-full h-full relative group"
            >
              <div className={`relative transition-all duration-300 ${isActive ? "text-primary -translate-y-1" : "text-muted-foreground hover:text-foreground"}`}>
                <item.icon size={22} className={isActive ? "drop-shadow-[0_0_8px_hsl(var(--fest-teal))]" : ""} />
                {isActive && (
                  <motion.div
                    layoutId="bottomNavGlow"
                    className="absolute -inset-2 bg-primary/10 rounded-full blur-md -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
              <span className={`text-[10px] font-heading font-bold uppercase tracking-widest mt-1 transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground/60"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
