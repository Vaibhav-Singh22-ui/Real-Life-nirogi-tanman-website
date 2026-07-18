"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/data/health-data";

const ArticlesPage = () => {
  return (
    <section className="section-band font-['Manrope',sans-serif]">
      <div className="container space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Health Insights</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Articles & Publications</h1>
          <p className="max-w-2xl text-muted-foreground font-light text-sm">
            Read medical insights, Ayurvedic dietary plans, and posture adjustment guidelines curated by our healthcare team.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="surface-panel flex flex-col justify-between p-6 bg-card border-border shadow-sm hover:shadow-md transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold text-primary tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                      <Clock className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer leading-snug">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-border/40 mt-6 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-semibold">By Nirogi Care Team</span>
                  <Link href={`/blog/${post.id}`} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesPage;
