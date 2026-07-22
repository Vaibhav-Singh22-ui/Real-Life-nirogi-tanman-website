"use client";

import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DiscountBadge from "./DiscountBadge";
import RatingStars from "./RatingStars";
import SubscriptionSelector from "./SubscriptionSelector";
import PriceDisplay from "./PriceDisplay";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: number;
    rating: number;
    options: string[];
    reviewsCount?: number;
    stock?: number;
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState<string>(product.options[0] || "");
  const [isAdded, setIsAdded] = useState(false);

  // Helper to calculate dynamic price & original price based on selected option/pack size
  const getDynamicPrice = (selected: string) => {
    if (!product.options || product.options.length === 0) {
      return { price: product.price, originalPrice: product.originalPrice };
    }

    const baseOpt = product.options[0].toLowerCase();
    const normOpt = selected.toLowerCase();

    let multiplier = 1.0;

    const extractNum = (str: string) => {
      const m = str.match(/(\d+)/);
      return m ? parseInt(m[1], 10) : null;
    };

    if (normOpt.includes("1kg") || normOpt.includes("1 kg")) {
      const baseNum = extractNum(baseOpt) || 500;
      multiplier = (1000 / baseNum) * 0.85; // Bulk discount for 1kg
    } else if (normOpt.includes("500g")) {
      const baseNum = extractNum(baseOpt) || 250;
      multiplier = baseNum === 100 ? 4.2 : baseNum === 250 ? 1.8 : 1.0;
    } else if (normOpt.includes("250g")) {
      const baseNum = extractNum(baseOpt) || 100;
      multiplier = baseNum === 100 ? 2.2 : 0.6;
    } else if (normOpt.includes("100g")) {
      multiplier = 1.0;
    } else if (normOpt.includes("120 capsule") || normOpt.includes("120 tablet")) {
      multiplier = 1.8;
    } else if (normOpt.includes("60 capsule") || normOpt.includes("60 tablet")) {
      multiplier = 1.0;
    } else if (normOpt.includes("3 month") || normOpt.includes("90 day")) {
      multiplier = 2.5;
    } else if (normOpt.includes("2 month") || normOpt.includes("60 day")) {
      multiplier = 1.8;
    } else if (normOpt.includes("1 month") || normOpt.includes("30 day")) {
      if (baseOpt.includes("90 day")) multiplier = 0.4;
      else if (baseOpt.includes("2 month") || baseOpt.includes("60 day")) multiplier = 0.6;
      else multiplier = 1.0;
    }

    const calculatedPrice = Math.round(product.price * multiplier);
    const calculatedOriginalPrice = Math.round(product.originalPrice * multiplier);

    return { price: calculatedPrice, originalPrice: calculatedOriginalPrice };
  };

  const { price: currentPrice, originalPrice: currentOriginalPrice } = getDynamicPrice(selectedOption);

  const handleAddToCart = async () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: currentPrice,
        originalPrice: currentOriginalPrice,
      },
      selectedOption
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);

    // Sync to Supabase if user logged in
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user?.id) {
        await supabase.from("cart_items").insert({
          user_id: sessionData.session.user.id,
          selected_option: selectedOption,
          quantity: 1,
        });
      }
    } catch (err) {
      console.error("Cart sync error:", err);
    }
  };

  const isLowStock = product.stock !== undefined && product.stock <= 5;

  return (
    <div className="group bg-white rounded-[20px] border border-[#E5E7EB] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(47,94,26,0.08)] flex flex-col justify-between h-full w-full">
      <div>
        {/* Product Image and Discount Badge */}
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F8FAF7] border border-[#E5E7EB]/40 flex items-center justify-center p-2">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain max-h-full w-auto transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <DiscountBadge discount={product.discount} className="absolute top-2.5 right-2.5" />
          {product.stock !== undefined && (
            <div className={`absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border backdrop-blur-md ${isLowStock ? 'bg-rose-50/90 text-rose-600 border-rose-200' : 'bg-emerald-50/90 text-emerald-600 border-emerald-200'}`}>
              {isLowStock ? `Only ${product.stock} Left` : 'In Stock'}
            </div>
          )}
        </div>

        {/* Rating Stars */}
        <div className="mt-3">
          <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-[#1B1B1B] mt-2 leading-snug transition-colors duration-200 hover:text-[#2F5E1A] line-clamp-1">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-xs sm:text-sm text-[#667085] mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Subscription / Option Selector */}
        <div className="mt-2.5">
          <SubscriptionSelector
            options={product.options}
            selectedOption={selectedOption}
            onChange={setSelectedOption}
            className="my-1"
          />
        </div>
      </div>

      {/* Pricing & Add to Cart CTA - Clean fit inside card */}
      <div className="pt-3.5 border-t border-[#E5E7EB]/60 mt-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
        <PriceDisplay price={currentPrice} originalPrice={currentOriginalPrice} />
        
        <Button
          onClick={handleAddToCart}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 shrink-0 h-9.5 ${
            isAdded 
              ? "bg-emerald-700 text-white hover:bg-emerald-800" 
              : "bg-[#2F5E1A] hover:bg-[#1E3F11] text-white active:scale-95"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
