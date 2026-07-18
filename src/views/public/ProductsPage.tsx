"use client";

import React, { useState } from "react";
import { ShoppingBag, ChevronRight, Activity, Moon, HeartPulse, Leaf } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "./ShopPage";

const categoriesList = [
  { id: "All", label: "All Products", icon: ShoppingBag },
  { id: "Vitality", label: "Vitality", icon: Activity },
  { id: "Stress Relief", label: "Stress Relief", icon: Moon },
  { id: "Immunity", label: "Immunity", icon: HeartPulse },
  { id: "Digestion", label: "Digestion", icon: Leaf },
];

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="section-band font-['Manrope',sans-serif]">
      <div className="container space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Vedic Pharmacy</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Product Catalog</h1>
          <p className="max-w-2xl text-muted-foreground text-sm font-light">
            Browse our purified Ayurvedic formulations and daily organic supplements certified by AYUSH standards.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:bg-muted/50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="h-full">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
