"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DiscountBadge from "./DiscountBadge";
import RatingStars from "./RatingStars";
import SubscriptionSelector from "./SubscriptionSelector";
import PriceDisplay from "./PriceDisplay";
import { useCart } from "@/context/CartContext";

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
  const [selectedOption, setSelectedOption] = useState<string>(product.options[0]);

  const handleAddToCart = () => {
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
  };

  const isLowStock = product.stock !== undefined && product.stock <= 5;

  return (
    <div className="group bg-white rounded-[20px] border border-[#E5E7EB] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(47,94,26,0.08)] flex flex-col justify-between h-full">
      <div>
        {/* Product Image and Discount Badge */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F8FAF7] border border-[#E5E7EB]/40">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <DiscountBadge discount={product.discount} className="absolute top-3 right-3" />
          {product.stock !== undefined && (
            <div className={`absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border backdrop-blur-md ${isLowStock ? 'bg-rose-50/90 text-rose-600 border-rose-200' : 'bg-emerald-50/90 text-emerald-600 border-emerald-200'}`}>
              {isLowStock ? `Only ${product.stock} Left` : 'In Stock'}
            </div>
          )}
        </div>

        {/* Rating Stars */}
        <div className="mt-4">
          <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-[#1B1B1B] mt-2.5 transition-colors duration-200 hover:text-[#2F5E1A]">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-[#667085] mt-1.5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Subscription / Option Selector */}
        <div className="mt-2">
          <SubscriptionSelector
            options={product.options}
            selectedOption={selectedOption}
            onChange={setSelectedOption}
          />
        </div>
      </div>

      {/* Pricing & Add to Cart CTA */}
      <div className="pt-4 border-t border-[#E5E7EB]/60 mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Price</span>
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all duration-200"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
