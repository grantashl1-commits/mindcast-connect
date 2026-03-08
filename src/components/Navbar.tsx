import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { activePartner, setup, logout } = useAppContext();

  const isLoggedIn = !!activePartner && !!setup;
  const dashboardPath = activePartner === "A" ? "/dashboard-a" : "/dashboard-b";
  const partnerName = isLoggedIn
    ? activePartner === "A" ? setup.partnerA.name : setup.partnerB.name
    : "";

  const navLinks = isLoggedIn
    ? [
        { label: "my space", path: dashboardPath },
        { label: "shared space", path: "/couple-room" },
        { label: "modules", path: "/modules" },
        { label: "safety", path: "/safety" },
      ]
    : [
        { label: "home", path: "/" },
        { label: "modules", path: "/modules" },
        { label: "safety", path: "/safety" },
      ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const accentDotColor = activePartner === "B" 
    ? "bg-partner-b-accent" 
    : "bg-partner-a-accent";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to={isLoggedIn ? dashboardPath : "/"} className="font-heading italic text-foreground text-lg">
          mindcast<span className="text-muted-foreground font-body text-sm font-light ml-1">relationships</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`font-body text-sm transition-colors duration-300 ${
                location.pathname === l.path ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${accentDotColor}`} />
                <span className="font-body text-sm text-foreground font-semibold">
                  {partnerName}
                </span>
              </div>
              <button onClick={handleLogout} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/"
              className="btn-warm btn-primary text-sm px-5 py-2"
            >
              enter your space
            </Link>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden bg-background overflow-hidden"
          >
            <div className="flex flex-col px-6 pb-6 gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setOpen(false)}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-3 border-b border-border/10"
                >
                  {l.label}
                </Link>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-3 text-left"
                >
                  step away for now
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
