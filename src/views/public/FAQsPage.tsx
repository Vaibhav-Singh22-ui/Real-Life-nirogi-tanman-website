"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleHelp, Search, Sparkles, UserCheck, HeartPulse, Truck, CreditCard, ShieldCheck, MessageSquare, ArrowRight, ThumbsUp, ThumbsDown, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const categorizedFaqs: { category: string; icon: React.ElementType; items: FAQItem[] }[] = [
  {
    category: "Consultations & Doctors",
    icon: UserCheck,
    items: [
      {
        question: "How do online video consultations work with Nirogi Tanman doctors?",
        answer: "After booking a slot on our Doctor Appointments page, you will receive a secure video link via email and SMS. At the scheduled time, join the encrypted video room directly from your browser or mobile phone to speak with your Vaidya or specialist.",
        category: "Consultations & Doctors",
      },
      {
        question: "What qualifications do your Ayurvedic practitioners hold?",
        answer: "All doctors on Nirogi Tanman hold recognized BAMS (Bachelor of Ayurvedic Medicine & Surgery) and MD degrees from premier central universities with a minimum of 8+ years of clinical experience.",
        category: "Consultations & Doctors",
      },
      {
        question: "How will I receive my digital prescription after consultation?",
        answer: "Within 30 minutes of completing your video call, your doctor will upload your personalized digital prescription, dietary guidelines, and herbal regimen to your Patient Dashboard. You can also download it in PDF format.",
        category: "Consultations & Doctors",
      },
      {
        question: "Can I reschedule or cancel my booked consultation?",
        answer: "Yes, consultations can be rescheduled or cancelled up to 2 hours before the appointment time free of charge via your Patient Dashboard.",
        category: "Consultations & Doctors",
      },
    ],
  },
  {
    category: "Ayurveda & Dosha Assessment",
    icon: HeartPulse,
    items: [
      {
        question: "What is the AI Tridosha Profiling Assessment?",
        answer: "Our AI Dosha Engine analyzes 20+ constitutional indicators (pulse tendencies, sleep cycles, digestion Agni, temperature preferences) to accurately calculate your current Vata, Pitta, and Kapha baseline.",
        category: "Ayurveda & Dosha Assessment",
      },
      {
        question: "Are Nirogi Tanman Ayurvedic formulations safe with Western prescription medicine?",
        answer: "Our formulations are 100% natural, heavy-metal tested, and pure herb extracts. However, we recommend disclosing all current allopathic medications to your assigned doctor during consultation to ensure seamless synergy.",
        category: "Ayurveda & Dosha Assessment",
      },
      {
        question: "How soon can I expect results from Ayurvedic treatment?",
        answer: "While acute digestive relief often occurs within 3–7 days, chronic condition balance (such as joint stiffness or metabolic correction) typically shows sustained results within 3 to 6 weeks of disciplined adherence.",
        category: "Ayurveda & Dosha Assessment",
      },
    ],
  },
  {
    category: "Yoga & Tele-Therapy",
    icon: Sparkles,
    items: [
      {
        question: "Do I need prior yoga experience to join tele-therapy sessions?",
        answer: "Not at all. Our tele-yoga modules are customized to your physical mobility. We specialize in gentle desk-yoga, spine decompression sequences, and targeted posture correction for all fitness levels.",
        category: "Yoga & Tele-Therapy",
      },
      {
        question: "What equipment do I need for online yoga classes?",
        answer: "A standard yoga mat and comfortable stretchable clothing are all you need. For spinal decompression routines, a pillow or yoga block can be helpful.",
        category: "Yoga & Tele-Therapy",
      },
    ],
  },
  {
    category: "Orders, Shipping & E-Commerce",
    icon: Truck,
    items: [
      {
        question: "What are the shipping charges and delivery timelines?",
        answer: "We offer Free Shipping on all orders above ₹399 across India. Metro orders deliver within 24 to 48 hours, while rest of India orders take 3 to 5 business days.",
        category: "Orders, Shipping & E-Commerce",
      },
      {
        question: "Is Cash on Delivery (COD) available for store products?",
        answer: "Yes, Cash on Delivery is available for all pin codes across India with zero extra fees.",
        category: "Orders, Shipping & E-Commerce",
      },
      {
        question: "How can I track my active product shipment?",
        answer: "Visit the Store Page and click on the 'Track Order' tab, or enter your order ID (e.g. NT-8812) in your Patient Dashboard to see real-time courier tracking updates.",
        category: "Orders, Shipping & E-Commerce",
      },
    ],
  },
  {
    category: "Subscriptions & Payments",
    icon: CreditCard,
    items: [
      {
        question: "What payment methods are supported on Nirogi Tanman?",
        answer: "We accept all major Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking, EMI options, and Cash on Delivery.",
        category: "Subscriptions & Payments",
      },
      {
        question: "How does the 7% cashback on store orders work?",
        answer: "Every order automatically credits 7% of total purchase value to your Nirogi Health Wallet, which can be redeemed instantly on your next consultation or product purchase.",
        category: "Subscriptions & Payments",
      },
    ],
  },
  {
    category: "Account & Data Security",
    icon: ShieldCheck,
    items: [
      {
        question: "Is my medical data and consultation recording confidential?",
        answer: "Yes. All consultation notes, health history, and vital logs are strictly encrypted under AES-256 protocols adhering to HIPAA standards. We never share patient data with third parties.",
        category: "Account & Data Security",
      },
    ],
  },
];

const categories = ["All FAQs", "Consultations & Doctors", "Ayurveda & Dosha Assessment", "Yoga & Tele-Therapy", "Orders, Shipping & E-Commerce", "Subscriptions & Payments", "Account & Data Security"];

const FAQsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All FAQs");
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({});

  // Filter segments based on category and search query
  const filteredSegments = categorizedFaqs
    .map((seg) => {
      if (activeCategory !== "All FAQs" && seg.category !== activeCategory) {
        return null;
      }
      const matchingItems = seg.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingItems.length === 0) return null;
      return { ...seg, items: matchingItems };
    })
    .filter(Boolean) as typeof categorizedFaqs;

  const totalMatchingFaqs = filteredSegments.reduce((acc, seg) => acc + seg.items.length, 0);

  const handleFeedback = (qKey: string, positive: boolean) => {
    setFeedbackGiven({ ...feedbackGiven, [qKey]: true });
    toast.success(positive ? "Thanks for your feedback!" : "Thank you. We will improve this answer.");
  };

  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-24 overflow-hidden">
      {/* HERO HEADER WITH TOP BACKGROUND IMAGE */}
      <section className="relative py-20 md:py-28 border-b border-border overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/services/ai_assistant.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/65 backdrop-blur-[2px]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-emerald-300 font-bold text-xs uppercase tracking-widest backdrop-blur-md">
            <CircleHelp className="h-4 w-4 text-[#DDA853]" />
            Help Center & Knowledge Base
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          
          <p className="text-sm sm:text-base text-gray-300 font-normal max-w-xl mx-auto leading-relaxed">
            Find detailed answers about appointments, Ayurvedic care plans, shipping, and digital assessments.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Input
              type="search"
              placeholder="Search any question, prescription, or delivery query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-3 text-sm bg-white/95 border-none rounded-2xl shadow-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-white h-12"
            />
            <Search className="absolute left-4 top-5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl py-12 space-y-12">
        {/* Category Tab Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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

        {/* Total Results Count */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {activeCategory}
            <span className="text-xs font-normal text-muted-foreground">({totalMatchingFaqs} questions)</span>
          </h3>
        </div>

        {/* Segmented Accordions */}
        {filteredSegments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-border space-y-3">
            <CircleHelp className="h-12 w-12 text-muted-foreground mx-auto opacity-40" />
            <h4 className="text-lg font-bold text-foreground">No questions match your search query</h4>
            <p className="text-xs text-muted-foreground">Try searching with different keywords or switch categories.</p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setActiveCategory("All FAQs"); }} className="rounded-xl mt-2 text-xs font-bold">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredSegments.map((segment) => {
              const IconComp = segment.icon;
              return (
                <div key={segment.category} className="space-y-4">
                  {/* Segment Title Banner */}
                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-border shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-foreground">{segment.category}</h4>
                      <p className="text-xs text-muted-foreground font-normal">
                        {segment.items.length} answered questions in this topic
                      </p>
                    </div>
                  </div>

                  {/* Accordion Questions List */}
                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {segment.items.map((item, index) => {
                      const qKey = `${segment.category}-${index}`;
                      const rated = feedbackGiven[qKey];

                      return (
                        <AccordionItem
                          key={item.question}
                          value={qKey}
                          className="rounded-2xl border border-border bg-white px-5 shadow-sm hover:border-primary/30 transition-all"
                        >
                          <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-foreground hover:no-underline py-4">
                            <span className="flex items-center gap-3">
                              <span className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                                <CircleHelp className="h-4 w-4" />
                              </span>
                              {item.question}
                            </span>
                          </AccordionTrigger>

                          <AccordionContent className="pb-5 pl-11 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/50 pt-4 space-y-4">
                            <p className="font-normal">{item.answer}</p>

                            {/* Helpful feedback buttons */}
                            <div className="flex items-center justify-between pt-2 text-xs border-t border-border/40">
                              <span className="text-[11px] font-semibold text-muted-foreground">Was this answer helpful?</span>
                              {rated ? (
                                <span className="text-xs font-bold text-[#2F5E1A] flex items-center gap-1">
                                  <Check className="h-3.5 w-3.5" />
                                  Feedback Received
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleFeedback(qKey, true)}
                                    className="p-1.5 rounded-lg border border-border bg-muted/30 hover:bg-emerald-50 text-muted-foreground hover:text-emerald-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                                  >
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => handleFeedback(qKey, false)}
                                    className="p-1.5 rounded-lg border border-border bg-muted/30 hover:bg-rose-50 text-muted-foreground hover:text-rose-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                                  >
                                    <ThumbsDown className="h-3.5 w-3.5" />
                                    No
                                  </button>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM SUPPORT CTA CARD */}
        <div className="bg-white border border-border p-8 rounded-3xl text-center space-y-4 shadow-sm max-w-3xl mx-auto">
          <div className="h-12 w-12 rounded-full bg-emerald-50 text-primary flex items-center justify-center mx-auto">
            <MessageSquare className="h-6 w-6 text-[#2F5E1A]" />
          </div>
          <h4 className="text-xl font-black text-foreground">Still have questions?</h4>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-md mx-auto">
            Chat with our AI Health Assistant or schedule a 1-on-1 consultation with certified Ayurvedic Vaidyas.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button size="sm" className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl text-xs font-bold" asChild>
              <Link href="/ai-health-assistant">
                Chat with Assistant
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="border-border rounded-xl text-xs font-bold" asChild>
              <Link href="/book-consultation">
                Book Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQsPage;