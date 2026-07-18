"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Truck, 
  Award,
  AlertCircle,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { products } from "./ShopPage";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  
  const product = useMemo(() => {
    const key = typeof slug === "string" ? slug : "shilajit-gold-capsules";
    return products.find(p => p.id === key) ?? products[0];
  }, [slug]);

  const [selectedOption, setSelectedOption] = useState<string>(product.options[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice,
        },
        selectedOption
      );
    }
    toast.success(`Added ${quantity} x ${product.name} (${selectedOption}) to cart.`);
  };

  const isLowStock = product.stock !== undefined && product.stock <= 5;

  return (
    <div className="font-['Manrope',sans-serif] bg-background text-foreground min-h-screen pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
        
        {/* Back Link */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary mb-8 group transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Store
        </Link>

        {/* Product Details Section */}
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-card border border-border/80 shadow-md p-6 flex items-center justify-center"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-contain max-h-full max-w-full rounded-2xl"
            />
            {product.stock !== undefined && (
              <div className={`absolute bottom-6 left-6 px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wide border backdrop-blur-md ${
                isLowStock ? 'bg-rose-50/90 text-rose-600 border-rose-200' : 'bg-emerald-50/90 text-emerald-600 border-emerald-200'
              }`}>
                {isLowStock ? `Only ${product.stock} Left in Stock` : 'In Stock'}
              </div>
            )}
            <div className="absolute top-6 right-6 bg-primary text-primary-foreground text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.discount}% OFF
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-3">
                {product.name}
              </h1>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 fill-amber-500 text-amber-500`} />
                ))}
              </div>
              <span className="text-xs font-semibold text-muted-foreground mt-0.5">
                {product.rating} ({product.reviewsCount ?? 120} verified reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 border-t border-b border-border/60 py-4 font-sans">
              <span className="text-3xl font-extrabold text-foreground">₹{product.price}</span>
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {product.description}
            </p>

            {/* Options Selection */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-foreground block">Select Configuration:</span>
              <div className="flex flex-wrap gap-2">
                {product.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                      selectedOption === opt
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-muted-foreground border-border hover:bg-muted/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-xl bg-card">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2.5 hover:text-primary transition-colors focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-foreground min-w-[24px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2.5 hover:text-primary transition-colors focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleAddToCart} 
                className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg px-8 flex-grow sm:flex-grow-0 min-w-[200px]"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                Add to Cart
              </Button>
            </div>

            {/* Value Props Grid */}
            <div className="grid gap-3 sm:grid-cols-3 pt-6 border-t border-border/60">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>AYUSH Standards Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                <Award className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>100% Organic Extracts</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                <Truck className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>Contactless Courier Sync</span>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
