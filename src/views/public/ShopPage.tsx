import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, Wallet, BadgePercent, ArrowRight, Search, Package, Check, Loader2, ShoppingCart } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import FeatureCard from "@/components/shop/FeatureCard";
import HeroButtons from "@/components/shop/HeroButtons";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const carouselImages = [
  "/ayurvedic_herbs_carousel.png",
  "/ayurvedic_bottles_carousel.png",
  "/ayurvedic_ingredients_carousel.png"
];

export const products = [
  {
    id: "shilajit-gold-capsules",
    name: "Shilajit Gold Capsules",
    description: "Premium purification with gold dust for vitality, energy, and strength.",
    image: "/shilajit_gold_product.png",
    price: 899,
    originalPrice: 1599,
    discount: 44,
    rating: 4.7,
    options: ["1 Month", "2 Months", "3 Months"],
    reviewsCount: 124,
    stock: 3,
    category: "Vitality"
  },
  {
    id: "prostpro-package",
    name: "Prostpro Package",
    description: "Advanced prostate health formula supporting urinary flow and cellular function.",
    image: "/prostpro_product.png",
    price: 2199,
    originalPrice: 3999,
    discount: 45,
    rating: 4.6,
    options: ["Full Course", "1 Month", "2 Months"],
    reviewsCount: 98,
    stock: 12,
    category: "Vitality"
  },
  {
    id: "ayuja-capsules",
    name: "Ayuja Capsules",
    description: "Pure Ayurvedic blend for immune support, stress relief, and cellular rejuvenation.",
    image: "/ayuja_product.png",
    price: 1299,
    originalPrice: 2199,
    discount: 42,
    rating: 4.8,
    options: ["90 Days", "2 Months", "1 Month"],
    reviewsCount: 156,
    stock: 25,
    category: "Immunity"
  },
  {
    id: "testovridhi-capsules",
    name: "Testovridhi Capsules",
    description: "High-potency herbal formulation designed to naturally support testosterone levels.",
    image: "/testovridhi_product.png",
    price: 699,
    originalPrice: 1399,
    discount: 51,
    rating: 4.8,
    options: ["30 Days", "2 Months", "60 Days"],
    reviewsCount: 204,
    stock: 4,
    category: "Vitality"
  },
  {
    id: "triphala-churna",
    name: "Triphala Churna",
    description: "Traditional Ayurvedic formula for gentle colon cleansing and digestion support.",
    image: "/triphala_churna_product.png",
    price: 349,
    originalPrice: 599,
    discount: 41,
    rating: 4.8,
    options: ["100g", "250g", "500g"],
    reviewsCount: 82,
    stock: 32,
    category: "Digestion"
  },
  {
    id: "ashwagandha-stress-relief",
    name: "Ashwagandha Calming Complex",
    description: "Premium Ashwagandha extract to help body adapt to stress and improve sleep quality.",
    image: "/ashwagandha_product.png",
    price: 499,
    originalPrice: 899,
    discount: 44,
    rating: 4.9,
    options: ["60 Capsules", "120 Capsules"],
    reviewsCount: 312,
    stock: 2,
    category: "Stress Relief"
  },
  {
    id: "chyawanprash-awaleha",
    name: "Chyawanprash Awaleha",
    description: "Rich in Vitamin C and antioxidants, prepared with 40+ potent Ayurvedic herbs.",
    image: "/chyawanprash_product.png",
    price: 399,
    originalPrice: 699,
    discount: 42,
    rating: 4.7,
    options: ["500g", "1kg"],
    reviewsCount: 145,
    stock: 15,
    category: "Immunity"
  },
  {
    id: "brahmi-memory-booster",
    name: "Brahmi Memory Booster",
    description: "Natural brain tonic supporting focus, memory retention, and mental clarity.",
    image: "/brahmi_product.png",
    price: 449,
    originalPrice: 799,
    discount: 43,
    rating: 4.6,
    options: ["60 Tablets", "120 Tablets"],
    reviewsCount: 76,
    stock: 19,
    category: "Stress Relief"
  },
];

const mockOrderDatabase: Record<string, { product: string; status: string; date: string; courier: string; steps: { title: string; desc: string; date: string; done: boolean }[] }> = {
  "NT-8812": {
    product: "Ashwagandha Calming Complex (120 Capsules)",
    status: "Delivered",
    date: "July 15, 2026",
    courier: "Delhivery (Tracking ID: DL-881273-IN)",
    steps: [
      { title: "Order Placed", desc: "Payment received & verified.", date: "July 12, 2026 10:30 AM", done: true },
      { title: "Processing Complete", desc: "Ayurvedic formulation bottled & packed.", date: "July 13, 2026 02:15 PM", done: true },
      { title: "Dispatched", desc: "Handed over to carrier at Delhi Hub.", date: "July 14, 2026 09:00 AM", done: true },
      { title: "Delivered", desc: "Signed by Patient Amit Verma.", date: "July 15, 2026 04:30 PM", done: true },
    ]
  },
  "NT-2005": {
    product: "Shilajit Gold Capsules (1 Month Course)",
    status: "Out for Delivery",
    date: "July 18, 2026 (Today)",
    courier: "BlueDart (Tracking ID: BD-200599-IN)",
    steps: [
      { title: "Order Placed", desc: "Payment received & verified.", date: "July 16, 2026 11:00 AM", done: true },
      { title: "Processing Complete", desc: "Ayurvedic formulation bottled & packed.", date: "July 17, 2026 01:10 PM", done: true },
      { title: "Dispatched", desc: "In transit to delivery location.", date: "July 17, 2026 08:30 PM", done: true },
      { title: "Out for Delivery", desc: "Delivery agent is arriving today before 6 PM.", date: "July 18, 2026 08:45 AM", done: true },
    ]
  },
  "NT-3008": {
    product: "Ayuja Immune Rejuvenation Package",
    status: "Processing Complete",
    date: "Estimated July 21, 2026",
    courier: "SpeedPost (Tracking ID: SP-300811-IN)",
    steps: [
      { title: "Order Placed", desc: "Payment received & verified.", date: "July 17, 2026 05:40 PM", done: true },
      { title: "Processing Complete", desc: "Ayurvedic formulation bottled & packed.", date: "July 18, 2026 10:00 AM", done: true },
      { title: "Dispatched", desc: "Awaiting pickup from warehouse.", date: "Pending courier pickup", done: false },
      { title: "Delivered", desc: "Will update post-dispatch.", date: "Pending transit", done: false },
    ]
  }
};

const features = [
  { title: "Genuine Products", icon: ShieldCheck },
  { title: "Free Delivery Above ₹399", icon: Truck },
  { title: "Cash On Delivery Available", icon: Wallet },
  { title: "7% Cashback On Every Order", icon: BadgePercent },
];

const ShopPage = () => {
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "tracker">("products");

  // Cart Context Hooks
  const { cart, totalCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  // Order Tracker State
  const [orderIdInput, setOrderIdInput] = useState("");
  const [trackerResult, setTrackerResult] = useState<any | null>(null);
  const [trackerLoading, setTrackerLoading] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleShopNowClick = () => {
    setActiveTab("products");
    setTimeout(() => {
      bestSellersRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleTrackOrder = () => {
    if (!orderIdInput.trim()) {
      toast.error("Please enter a valid Order ID.");
      return;
    }
    setTrackerLoading(true);
    setTrackerResult(null);

    setTimeout(() => {
      setTrackerLoading(false);
      const cleaned = orderIdInput.trim().toUpperCase();
      if (mockOrderDatabase[cleaned]) {
        setTrackerResult(mockOrderDatabase[cleaned]);
      } else {
        setTrackerResult({
          product: `Custom Order (${cleaned})`,
          status: "In Transit",
          date: "Estimated Delivery: July 20, 2026",
          courier: "Delhivery Premium (Tracking ID: DL-REG-8291)",
          steps: [
            { title: "Order Placed", desc: "Payment verified successfully.", date: "Today, 09:12 AM", done: true },
            { title: "Processing Complete", desc: "Herbs measured & sealed.", date: "Today, 10:45 AM", done: true },
            { title: "Dispatched", desc: "In transit to nearest city terminal.", date: "Today, 02:00 PM", done: true },
            { title: "Delivered", desc: "Expected at address.", date: "Pending arrival", done: false }
          ]
        });
      }
    }, 1500);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif] bg-[#F8FAF7] min-h-screen pb-20">
      {/* E-commerce Sub-Header Bar (Sticky) */}
      <div className={cn(
        "sticky z-40 bg-white/95 backdrop-blur-md border-b border-border/80 py-3 shadow-sm select-none transition-all duration-300",
        isScrolled ? "top-0" : "top-16"
      )}>
        <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Sub-Header Title & Store Category Shortcuts */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <span 
              onClick={() => { setActiveTab("products"); setSelectedCategory("All"); }}
              className="text-sm font-black text-[#2F5E1A] uppercase tracking-wider shrink-0 flex items-center gap-1.5 border-r border-border/80 pr-4 sm:pr-6 cursor-pointer hover:opacity-80 transition"
            >
              💊 Nirogi Store
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-[calc(100vw-8rem)]">
              {["All", "Vitality", "Stress Relief", "Immunity", "Digestion"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveTab("products");
                  }}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap",
                    selectedCategory === cat && activeTab === "products"
                      ? "bg-[#2F5E1A] text-white border-[#2F5E1A]"
                      : "bg-[#F8FAF7] text-[#667085] border-border hover:bg-[#F3F4F6] hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search, Track Order, and Cart Drawer */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Store Specific Search Input */}
            <div className="relative w-40 sm:w-48">
              <Input
                type="search"
                placeholder="Search store..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveTab("products");
                }}
                className="pl-8 pr-3 py-1.5 text-xs rounded-full border border-border bg-[#F8FAF7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5E1A]/10 h-8 shadow-none"
              />
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Track Order Tab Toggle Button */}
            <Button
              variant={activeTab === "tracker" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("tracker")}
              className={cn(
                "text-xs h-8 rounded-xl font-bold transition-all",
                activeTab === "tracker" 
                  ? "bg-[#2F5E1A] text-white hover:bg-[#1E3F11]" 
                  : "border-border bg-[#F8FAF7] hover:bg-[#F3F4F6]"
              )}
            >
              Track Order
            </Button>

            {/* E-commerce Isolated Cart Drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative text-foreground hover:text-[#2F5E1A] transition-colors rounded-xl h-8 text-xs font-bold flex items-center gap-1.5 border-border bg-[#F8FAF7]"
                  aria-label="Open Store Cart"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Cart
                  {totalCount > 0 && (
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#EF4444] text-[9px] font-bold text-white shadow-sm">
                      {totalCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md flex flex-col h-full bg-white p-6 border-l border-border z-[9999]">
                <SheetHeader className="pb-4 border-b border-border">
                  <SheetTitle className="flex items-center gap-2 text-2xl font-bold text-[#1B1B1B]">
                    <ShoppingCart className="h-6 w-6 text-[#2F5E1A]" />
                    Your Cart ({totalCount})
                  </SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
                    <div className="p-4 rounded-full bg-[#F8FAF7] text-muted-foreground">
                      <ShoppingCart className="h-12 w-12" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#1B1B1B]">Your cart is empty</h3>
                      <p className="text-sm text-[#667085] mt-1">Add items from our Shop to get started.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3 rounded-2xl border border-border bg-[#F8FAF7] transition-all hover:shadow-sm"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-xl object-cover bg-white border border-border/60"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-semibold text-[#1B1B1B] text-sm truncate">{item.name}</h4>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-red-500 hover:text-red-700 font-medium"
                              >
                                Remove
                              </button>
                            </div>
                            <p className="text-xs text-[#667085] mt-0.5">Option: {item.option}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-[#2F5E1A] text-sm">₹{item.price}</span>
                              <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-2 py-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="text-muted-foreground hover:text-primary text-sm font-semibold px-1"
                                >
                                  -
                                </button>
                                <span className="text-xs font-semibold text-[#1B1B1B] w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="text-muted-foreground hover:text-primary text-sm font-semibold px-1"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border space-y-4">
                      <div className="flex justify-between items-center text-[#1B1B1B]">
                        <span className="font-medium">Subtotal</span>
                        <span className="font-bold text-xl text-[#2F5E1A]">₹{subtotal}</span>
                      </div>
                      <p className="text-xs text-[#667085]">Shipping, taxes, and promotional discounts applied at checkout.</p>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button variant="outline" onClick={clearCart} className="border-border rounded-xl hover:bg-[#F8FAF7]">
                          Clear Cart
                        </Button>
                        <Button
                          className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl font-semibold shadow-sm transition-all"
                          onClick={() => {
                            toast.success("Checkout processed successfully!");
                            clearCart();
                          }}
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "products" ? (
          <motion.div
            key="products-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* 1. Hero Banner */}
            <section className="relative overflow-hidden w-full h-[420px] sm:h-[500px] lg:h-[700px] flex items-center bg-[#1B1B1B]">
              <div className="absolute inset-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImgIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('${carouselImages[currentImgIndex]}')`,
                    }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10" />
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentImgIndex === idx ? "w-8 bg-[#6EF3A5]" : "w-2.5 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Hero Content */}
              <div className="container relative z-20 px-6 sm:px-10 lg:px-20 text-white flex flex-col justify-center h-full max-w-[1280px] mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="max-w-2xl text-left"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-[64px] leading-tight font-extrabold text-white mt-4 tracking-tight">
                    GET UPTO 40% OFF
                  </h1>

                  <p className="text-xl sm:text-2xl text-white/90 font-medium mt-3">
                    On Our Best Sellers
                  </p>

                  <HeroButtons onShopNowClick={handleShopNowClick} showConsultation={false} />

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#6EF3A5] text-sm font-semibold shadow-md cursor-pointer hover:bg-white/15 transition-all select-none"
                  >
                    <span>⭐</span>
                    <span>Rewards Program</span>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* 2. Benefits Banner Section */}
            <section className="container px-6 sm:px-10 lg:px-20 max-w-[1280px] mt-10 md:mt-14 mb-4 mx-auto">
              <div className="bg-white py-10 md:py-12 px-8 rounded-3xl border border-[#E5E7EB] shadow-[0_8px_30px_rgba(0,0,0,0.015)] w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
                >
                  {features.map((feature, idx) => (
                    <FeatureCard key={idx} title={feature.title} icon={feature.icon} />
                  ))}
                </motion.div>
              </div>
            </section>

            {/* 3. Best Sellers Section */}
            <section
              ref={bestSellersRef}
              className="container px-6 sm:px-10 lg:px-20 mt-16 md:mt-20 max-w-[1280px] scroll-mt-24 mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                    OUR BEST PRODUCTS
                  </span>
                  <h2 className="text-3xl sm:text-[42px] font-bold text-[#1B1B1B] mt-1">
                    Best Sellers
                  </h2>
                  <p className="text-sm sm:text-base text-[#667085] mt-2">
                    Trusted by 100,000+ customers.
                  </p>
                </div>
              </motion.div>

              {/* Product Category Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["All", "Vitality", "Stress Relief", "Immunity", "Digestion"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-xl border transition-all",
                      selectedCategory === cat 
                        ? 'bg-[#2F5E1A] text-white border-[#2F5E1A]' 
                        : 'bg-white text-[#667085] border-[#E5E7EB] hover:bg-[#F3F4F6]'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Responsive Product Grid */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="tracker-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="container max-w-3xl mx-auto px-4 sm:px-6 py-10 min-h-[60vh] flex flex-col justify-center"
          >
            {/* Breadcrumb path navigation */}
            <div className="flex items-center gap-2 mb-8 text-xs text-[#667085] select-none">
              <button 
                onClick={() => setActiveTab("products")} 
                className="hover:text-[#2F5E1A] font-bold transition-all"
              >
                Store Home
              </button>
              <span>/</span>
              <span className="font-bold text-foreground">Order & Shipping Tracker</span>
            </div>

            {/* Main Tracker Container */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 shadow-md">
              <div className="border-b border-[#E5E7EB] pb-4 mb-6">
                <h3 className="text-2xl font-bold text-[#1B1B1B]">Order Tracker Portal</h3>
                <p className="text-sm text-[#667085] mt-1">Check the delivery status of your Ayurvedic supplements in real-time.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-8">
                <input
                  placeholder="Enter Order ID (e.g. NT-8812, NT-2005, NT-3008)"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="h-11 px-4 border border-[#E5E7EB] rounded-xl text-sm bg-[#F8FAF7] focus:outline-none focus:ring-1 focus:ring-[#2F5E1A] flex-1"
                />
                <button
                  onClick={handleTrackOrder}
                  disabled={trackerLoading}
                  className="h-11 px-6 rounded-xl bg-[#2F5E1A] hover:bg-[#1E3F11] text-white font-semibold text-sm flex items-center justify-center gap-2 shrink-0 transition shadow-sm"
                >
                  {trackerLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Track Order
                    </>
                  )}
                </button>
              </div>

              {trackerResult ? (
                <div className="border border-[#E5E7EB] bg-[#F8FAF7]/50 rounded-2xl p-5 space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#E5E7EB] pb-4 text-sm">
                    <div>
                      <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider block">Product Details</span>
                      <span className="font-bold text-[#1B1B1B]">{trackerResult.product}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider block">Status</span>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 ${trackerResult.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : trackerResult.status === 'Out for Delivery' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {trackerResult.status}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Steps */}
                  <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
                    {trackerResult.steps.map((step: any, idx: number) => (
                      <div key={idx} className="relative text-xs">
                        <div className={`absolute -left-6 top-0.5 h-4.5 w-4.5 rounded-full border-4 border-white flex items-center justify-center ${step.done ? 'bg-[#2F5E1A] text-white' : 'bg-[#E5E7EB]'}`}>
                          {step.done && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className={`font-bold ${step.done ? 'text-[#1B1B1B]' : 'text-[#667085]'}`}>{step.title}</h4>
                          <p className="text-[#667085] text-[11px]">{step.desc}</p>
                          <span className="text-[9px] text-[#667085]/60 font-semibold">{step.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[10px] text-[#667085] border-t border-[#E5E7EB]/60">
                    <span>Carrier Partner: {trackerResult.courier}</span>
                    <span>Last updated today</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-2xl bg-[#F8FAF7]/30">
                  <Package className="h-10 w-10 text-[#2F5E1A]/40 mb-3" />
                  <p className="text-xs text-muted-foreground font-semibold">Enter a valid Order ID (e.g. NT-2005) above to view details</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
