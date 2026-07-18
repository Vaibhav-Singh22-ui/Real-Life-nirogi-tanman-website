import Link from "next/link";
import BrandMark from "@/components/app/BrandMark";
import { ShieldCheck, Lock, Shield, Mail } from "lucide-react";

const footerGroups = [
  {
    title: "About",
    links: [
      { label: "About NirogiTanman", path: "/about" },
      { label: "Our Wellness Approach", path: "/wellness-approach" },
      { label: "Practitioners", path: "/practitioners" },
      { label: "Testimonials", path: "/testimonials" },
      { label: "Frequently Asked Questions", path: "/faqs" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Ayurveda Services", path: "/services/ayurveda" },
      { label: "Naturopathy Care", path: "/services/naturopathy" },
      { label: "Yoga Instruction", path: "/services/yoga" },
      { label: "Meditation Practice", path: "/services/meditation" },
      { label: "Lifestyle & Diet Plans", path: "/services/lifestyle-diet" },
      { label: "Corporate Wellness", path: "/corporate-wellness" },
    ],
  },
  {
    title: "Programmes",
    links: [
      { label: "Stress & Sleep Support", path: "/programmes/stress-sleep" },
      { label: "Metabolic Wellness", path: "/programmes/metabolic-wellness" },
      { label: "Weight Management", path: "/programmes/weight-management" },
      { label: "Digestive Wellness", path: "/programmes/digestive-wellness" },
      { label: "Senior Wellness", path: "/programmes/senior-wellness" },
      { label: "Women's Wellness", path: "/programmes/womens-wellness" },
    ],
  },
  {
    title: "Store & Resources",
    links: [
      { label: "Product Catalog", path: "/shop" },
      { label: "Articles & Blog", path: "/resources/articles" },
      { label: "Video Lectures", path: "/resources/videos" },
      { label: "Wellness Guides", path: "/resources/guides" },
      { label: "Wellness Assessment", path: "/wellness-assessment" },
      { label: "Book Consultation", path: "/book-consultation" },
    ],
  },
  {
    title: "Legal & Policies",
    links: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms & Conditions", path: "/terms-conditions" },
      { label: "Medical Disclaimer", path: "/medical-disclaimer" },
      { label: "Consultation Consent", path: "/consultation-consent" },
      { label: "Shipping Policy", path: "/shipping-policy" },
      { label: "Refund & Return Policy", path: "/refund-policy" },
      { label: "Cancellation Policy", path: "/cancellation-policy" },
      { label: "Product Disclaimer", path: "/product-disclaimer" },
    ],
  },
];

const PublicFooter = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground font-['Manrope',sans-serif]">
      {/* Balanced 7-column layout (2 cols for brand description and newsletter, 5 cols for lists) */}
      <div className="container mx-auto px-6 md:px-12 grid gap-10 py-16 grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
        <div className="space-y-6 md:col-span-3 lg:col-span-2">
          <BrandMark />
          <p className="max-w-sm text-xs text-primary-foreground/80 leading-relaxed font-light">
            Integrated digital healthcare platform combining board-certified doctors, therapeutic yoga specialists, and 24/7 AI-guided wellness routines.
          </p>

          {/* Newsletter Input to fill space elegantly */}
          <div className="space-y-2.5 max-w-sm">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#DDA853] flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Subscribe to Health Insights
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-3 py-2 text-xs text-white placeholder-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-[#DDA853] w-full" 
              />
              <button className="bg-[#DDA853] hover:bg-[#c99540] text-primary-foreground rounded-xl px-4 py-2 text-xs font-bold transition-all">
                Join
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-primary-foreground/15 max-w-sm">
            <div className="flex items-center gap-2 text-[10px] text-primary-foreground/75">
              <ShieldCheck className="h-3.5 w-3.5 text-[#DDA853] shrink-0" />
              <span>AYUSH Standards Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-primary-foreground/75">
              <Lock className="h-3.5 w-3.5 text-[#DDA853] shrink-0" />
              <span>HIPAA Protected Cloud</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-primary-foreground/75">
              <Shield className="h-3.5 w-3.5 text-[#DDA853] shrink-0" />
              <span>SSL Secured Video & Payments</span>
            </div>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-4 lg:col-span-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#DDA853]">
              {group.title}
            </p>
            <div className="space-y-2">
              {group.links.map((link) => (
                <Link
                  key={link.label + link.path}
                  href={link.path}
                  className="block text-xs text-primary-foreground/80 hover:text-[#DDA853] transition-colors leading-normal"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/15 bg-primary">
        <div className="container mx-auto px-6 md:px-12 flex flex-col gap-3 py-6 text-xs text-primary-foreground/70 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>© 2026 Nirogi Tanman. All rights reserved.</p>
            <p className="text-[10px] text-primary-foreground/50">
              Approved by AYUSH & Medical Governance Advisory Council. Registered Digital Health Platform.
            </p>
          </div>
          <p className="font-semibold text-primary-foreground/90">
            Integrated Preventive Healthcare Ecosystem
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
