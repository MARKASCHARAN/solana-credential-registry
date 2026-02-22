import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/50 backdrop-blur-3xl py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(156,252,201,0.5)]" />
            </div>
            <span className="font-black text-xs uppercase tracking-[0.3em] text-foreground/90">
              Protocol Registry
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            The world's most secure and scalable on-chain credential registry.
            Engineered for the future of decentralized identity on Solana.
          </p>
          <div className="flex gap-4">
            {["Twitter", "GitHub", "Discord"].map((social) => (
              <a
                key={social}
                href="#"
                className="h-10 w-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:text-primary transition-all duration-300"
              >
                <span className="sr-only">{social}</span>
                {/* SVG icons would go here */}
                <div className="w-4 h-4 rounded-sm border border-current" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Protocol</h4>
          <ul className="space-y-4">
            <li><Link href="/whitepaper" className="text-sm text-muted-foreground hover:text-primary transition-colors">Whitepaper</Link></li>
            <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Registry</Link></li>
            <li><Link href="/verify" className="text-sm text-muted-foreground hover:text-primary transition-colors">Verification</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Legal</h4>
          <ul className="space-y-4">
            <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Protocol Registry. All rights Reserved.
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          Designed for Excellence <span className="h-1 w-1 rounded-full bg-primary" /> Solana Mainnet
        </p>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-0 translate-y-1/2 translate-x-1/2" />
    </footer>
  );
}