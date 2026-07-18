import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import nirogiLogo from "@/assets/nirogi-logo.png";
import { getImgSrc } from "@/lib/utils";
interface NavigationProps {
  variant?: "default" | "dark";
}
const Navigation = ({
  variant = "default"
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = variant === "dark";
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const handleBookNow = () => {
    if (isHomePage) {
      document.getElementById('booking')?.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      router.push('/');
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  };
  const navItems = [{
    label: "Locations",
    href: "/locations",
    isRoute: true
  }, {
    label: "About",
    href: "/about",
    isRoute: true
  }, {
    label: "Contact",
    href: "/contact",
    isRoute: true
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6
  }} className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${isMobileMenuOpen ? "bg-foreground" : isDark ? isScrolled ? "bg-foreground/95 backdrop-blur-lg shadow-soft" : "bg-foreground" : isScrolled ? "bg-card/95 backdrop-blur-lg shadow-soft" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 lg:px-12 py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div whileHover={{
            scale: 1.02
          }} className="flex items-center gap-2 cursor-pointer">
              <img src={getImgSrc(nirogiLogo)} alt="Nirogi Tanman logo" className="h-11 w-11 object-contain" />
              <span className={`text-sm font-normal tracking-wide ${isMobileMenuOpen || isDark || !isScrolled ? "text-white" : "text-foreground"}`}>
                Nirogi Tanman
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map(item => item.isRoute ? <Link key={item.label} href={item.href} className={`relative text-[11px] uppercase tracking-wider font-normal transition-all duration-300 hover:-translate-y-0.5 hover:opacity-80 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${isDark || !isScrolled ? "text-white" : "text-foreground"}`}>
                  {item.label}
                </Link> : <a key={item.label} href={item.href} className={`relative text-[11px] uppercase tracking-wider font-normal transition-all duration-300 hover:-translate-y-0.5 hover:opacity-80 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${isDark || !isScrolled ? "text-white" : "text-foreground"}`}>
                  {item.label}
                </a>)}
            <Button variant="outline" size="sm" className={`rounded-full smooth-hover text-[11px] uppercase tracking-wider font-normal backdrop-blur-md border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-5 ${isDark || !isScrolled ? "bg-white/10 text-white hover:bg-primary/80 hover:text-white hover:border-primary/80" : "bg-white/20 text-foreground hover:bg-primary/80 hover:text-white hover:border-primary/80"}`} onClick={handleBookNow}>
              Book Now
            </Button>
          </div>

          <button className={`md:hidden ${isMobileMenuOpen || isDark || !isScrolled ? "text-white" : "text-foreground"}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      <AnimatePresence>
      {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        clipPath: "inset(0 0 100% 0)"
      }} animate={{
        opacity: 1,
        clipPath: "inset(0 0 0% 0)"
      }} exit={{
        opacity: 0,
        clipPath: "inset(0 0 100% 0)"
      }} transition={{
        duration: 0.6,
        clipPath: "inset(0 0 100% 0)"
      }} className={`md:hidden mt-6 pb-4 -mx-6 px-6 rounded-b-xl ${isDark || !isScrolled ? "bg-foreground" : "bg-card"}`}>
            {navItems.map(item => item.isRoute ? <Link key={item.label} href={item.href} className={`block py-3 text-[11px] uppercase tracking-wider font-normal transition-all duration-300 hover:translate-x-1 hover:opacity-70 ${isDark || !isScrolled ? "text-white" : "text-foreground"}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link> : <a key={item.label} href={item.href} className={`block py-3 text-[11px] uppercase tracking-wider font-normal transition-all duration-300 hover:translate-x-1 hover:opacity-70 ${isDark || !isScrolled ? "text-white" : "text-foreground"}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </a>)}
            <Button variant="outline" className={`w-full mt-4 rounded-full text-[11px] uppercase tracking-wider font-normal backdrop-blur-md border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-5 ${isDark || !isScrolled ? "bg-white/10 text-white hover:bg-primary/80 hover:text-white hover:border-primary/80" : "bg-white/20 text-foreground hover:bg-primary/80 hover:text-white hover:border-primary/80"}`} onClick={() => {
          setIsMobileMenuOpen(false);
          handleBookNow();
        }}>
              Book Now
            </Button>
          </motion.div>}
      </AnimatePresence>
      </div>
    </motion.nav>;
};
export default Navigation;