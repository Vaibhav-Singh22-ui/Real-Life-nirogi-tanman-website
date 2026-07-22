"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Search, Sparkles, Share2, Bookmark, X, User, Check, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { blogPosts } from "@/data/health-data";
import { toast } from "sonner";

const categories = ["All", "Immunity", "Yoga & Posture", "Nutrition", "Mental Health", "Ayurveda"];

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<(typeof blogPosts)[0] | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Filter articles based on search & category
  const filteredArticles = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
      toast.info("Removed from saved reading list.");
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      toast.success("Saved to your reading list!");
    }
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((item) => item !== id));
    } else {
      setLikedIds([...likedIds, id]);
      toast.success("Thanks for your feedback!");
    }
  };

  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-24 overflow-hidden">
      {/* HERO HEADER WITH TOP BACKGROUND IMAGE */}
      <section className="relative py-20 md:py-28 border-b border-border overflow-hidden">
        {/* Background image & gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/services/clinical_nutrition.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60 backdrop-blur-[2px]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-emerald-300 font-bold text-xs uppercase tracking-widest backdrop-blur-md">
            <BookOpen className="h-4 w-4 text-[#DDA853]" />
            Evidence-Based Publications
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Articles & Medical Insights
          </h1>
          
          <p className="text-sm sm:text-base text-gray-300 font-normal max-w-xl mx-auto leading-relaxed">
            Explore scientific research papers, Ayurvedic dietary plans, and therapeutic posture guidelines authored by our clinical medical team.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Input
              type="search"
              placeholder="Search articles by topic, keyword, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-3 text-sm bg-white/95 border-none rounded-2xl shadow-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-white h-12"
            />
            <Search className="absolute left-4 top-5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-12 space-y-12">
        {/* Category Pills Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full border transition-all duration-200 ${
                  isActive
                    ? "bg-[#2F5E1A] border-[#2F5E1A] text-white shadow-md scale-105"
                    : "bg-white border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Article Banner (Only visible when no search query filter is applied) */}
        {!searchQuery && selectedCategory === "All" && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-2 group cursor-pointer"
            onClick={() => setActiveArticle(featuredPost)}
          >
            <div className="relative h-64 lg:h-auto min-h-[280px] overflow-hidden bg-muted">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#2F5E1A] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                  Featured Publication
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
                  <span className="text-primary font-bold">{featuredPost.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredPost.readTime}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 font-normal">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                    NC
                  </div>
                  <span className="text-xs font-bold text-foreground">Nirogi Clinical Team</span>
                </div>

                <Button size="sm" className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              <span className="text-xs font-semibold text-muted-foreground font-normal">({filteredArticles.length} found)</span>
            </h3>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-border space-y-3">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto opacity-40" />
              <h4 className="text-lg font-bold text-foreground">No articles match your search</h4>
              <p className="text-xs text-muted-foreground">Try clearing search filter terms or choosing another category.</p>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="rounded-xl mt-2 text-xs font-bold">
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((post, idx) => {
                const isBookmarked = bookmarkedIds.includes(post.id);
                const isLiked = likedIds.includes(post.id);

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setActiveArticle(post)}
                    className="cursor-pointer"
                  >
                    <Card className="bg-white border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                      <div>
                        {/* Card Image */}
                        <div className="relative h-48 w-full bg-muted overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#2F5E1A] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {post.category}
                          </span>
                          <button
                            onClick={(e) => toggleBookmark(post.id, e)}
                            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary transition-colors shadow-sm"
                            title="Save Article"
                          >
                            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
                          </button>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-semibold">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>

                          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-5 py-4 border-t border-border/60 flex items-center justify-between bg-[#FAF8F5]/50">
                        <span className="text-[11px] text-muted-foreground font-bold flex items-center gap-1">
                          <User className="h-3 w-3 text-primary" />
                          Care Team
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleLike(post.id, e)}
                            className={`p-1.5 rounded-lg hover:bg-white transition-colors ${isLiked ? "text-primary" : "text-muted-foreground"}`}
                          >
                            <ThumbsUp className={`h-3.5 w-3.5 ${isLiked ? "fill-primary" : ""}`} />
                          </button>
                          <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
                            Read
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ARTICLE READER MODAL */}
      <Dialog open={!!activeArticle} onOpenChange={() => setActiveArticle(null)}>
        {activeArticle && (
          <DialogContent className="sm:max-w-3xl bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-3 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#2F5E1A] bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {activeArticle.readTime}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                {activeArticle.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-muted">
                <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
              </div>

              <div className="prose prose-emerald max-w-none space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
                  {activeArticle.excerpt}
                </p>

                <p>
                  Comprehensive health recovery requires evaluating root metabolic triggers alongside structural body alignment. In clinical practice, integrating targeted Ayurvedic herbal formulations with daily functional movement has consistently shown accelerated recovery markers across patient cohorts.
                </p>

                <div className="p-4 rounded-2xl bg-[#F8FAF7] border border-primary/20 space-y-2">
                  <h5 className="font-bold text-xs text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" /> Key Clinical Takeaways
                  </h5>
                  <ul className="space-y-1.5 text-xs text-foreground font-medium pl-1">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Consistent morning hydration unlocks digestive metabolic Agni fire.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Workspace posture checks every 45 minutes prevent cervical spinal compression.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Combining natural adaptogens reduces evening cortisol levels, fostering restorative REM sleep.</span>
                    </li>
                  </ul>
                </div>

                <p>
                  For personalized advice tailored to your metabolic dosha index or chronic symptoms, consult directly with our verified Ayurvedic doctors and yoga specialists via the Nirogi Tanman patient portal.
                </p>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#2F5E1A] text-white flex items-center justify-center font-black text-sm">
                    NT
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-foreground">Authored by Nirogi Tanman Clinical Board</h5>
                    <p className="text-[10px] text-muted-foreground">Reviewed for medical accuracy by Dr. Vikram Seth</p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    toast.success("Article link copied to clipboard!");
                  }}
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs font-bold flex items-center gap-1.5 border-border"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share Article
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ArticlesPage;
