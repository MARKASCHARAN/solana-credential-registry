import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Whitepaper", href: "/whitepaper" },
    { name: "About", href: "/about" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 md:py-4" : "py-5 md:py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`glass px-4 md:px-8 h-16 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between border-white/5 shadow-2xl transition-all duration-500 ${scrolled ? "bg-black/80 shadow-primary/5" : "bg-white/5"
          }`}>
          {/* Logo / Title */}
          <Link href="/" className="group flex items-center gap-2 md:gap-4 shrink-0">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-primary shadow-[0_0_15px_rgba(156,252,201,0.5)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/90 leading-none">
                Protocol
              </span>
              <span className="font-medium text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden xs:block">
                Registry
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <div className="scale-75 xs:scale-85 md:scale-90 origin-right">
              {mounted && (
                <WalletMultiButton className="!bg-primary !text-primary-foreground !rounded-xl !h-10 md:!h-12 !px-4 md:!px-8 !text-[9px] md:!text-[10px] !font-black !uppercase !tracking-[0.15em] md:!tracking-[0.2em] !border-none !shadow-lg hover:!scale-105 !transition-all" />
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1 p-1 md:p-2 shrink-0"
              aria-label="Toggle Menu"
            >
              <div className={`h-0.5 w-4 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <div className={`h-0.5 w-4 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <div className={`h-0.5 w-4 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-[calc(100%+0.5rem)] left-4 right-4 glass rounded-[1.5rem] p-6 md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group p-2 hover:bg-white/5 rounded-xl"
                >
                  {item.name}
                  <div className="h-1.5 w-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}