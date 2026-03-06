import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "HOW IT WORKS", path: "/#how-it-works" },
  { label: "MODULES", path: "/modules" },
  { label: "COUPLE SPACE", path: "/couple-room" },
  { label: "PROGRESS", path: "/check-in" },
  { label: "MEMBERSHIP", path: "/membership" },
  { label: "SAFETY", path: "/safety" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-silver/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="font-heading font-black text-primary-foreground tracking-[0.15em] text-lg">
          MINDCAST<span className="text-silver font-medium text-sm ml-1 tracking-[0.2em]">RELATIONSHIPS</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`heading-label text-[10px] transition-colors hover:text-primary-foreground ${
                location.pathname === l.path ? "text-primary-foreground" : "text-silver"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/journal"
            className="heading-label text-[10px] bg-primary-foreground text-primary px-5 py-2 hover:bg-silver transition-colors"
          >
            SIGN IN
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-primary overflow-hidden"
          >
            <div className="flex flex-col px-6 pb-6 gap-4">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setOpen(false)}
                  className="heading-label text-[11px] text-silver hover:text-primary-foreground transition-colors py-2 border-b border-silver/10"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/journal"
                onClick={() => setOpen(false)}
                className="heading-label text-[11px] bg-primary-foreground text-primary px-5 py-3 text-center mt-2"
              >
                SIGN IN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
