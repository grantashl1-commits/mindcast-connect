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
        { label: "MY SPACE", path: dashboardPath },
        { label: "COUPLE ROOM", path: "/couple-room" },
        { label: "MODULES", path: "/modules" },
        { label: "SAFETY", path: "/safety" },
      ]
    : [
        { label: "HOME", path: "/" },
        { label: "MODULES", path: "/modules" },
        { label: "SAFETY", path: "/safety" },
      ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-silver/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to={isLoggedIn ? dashboardPath : "/"} className="font-heading font-black text-primary-foreground tracking-[0.15em] text-lg">
          MINDCAST<span className="text-silver font-medium text-sm ml-1 tracking-[0.2em]">RELATIONSHIPS</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
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
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="heading-label text-[9px] text-silver border border-silver/30 px-3 py-1">
                {partnerName.toUpperCase()}
              </span>
              <button onClick={handleLogout} className="text-silver hover:text-primary-foreground transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/"
              className="heading-label text-[10px] bg-primary-foreground text-primary px-5 py-2 hover:bg-silver transition-colors"
            >
              SIGN IN
            </Link>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="heading-label text-[11px] text-silver hover:text-primary-foreground transition-colors py-2 text-left"
                >
                  LOG OUT ({partnerName.toUpperCase()})
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
