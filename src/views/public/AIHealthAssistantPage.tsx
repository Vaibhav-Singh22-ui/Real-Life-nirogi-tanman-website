import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Brain, MessageSquare, Compass, Settings, AlertTriangle,
  Paperclip, Mic, Send, Play, Download, Eye, X, Check, FileText, Sparkles
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { generateGeminiContent } from "@/lib/gemini";

const AIHealthAssistantPage = () => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; text: string; keyInfo?: string; hasFile?: boolean }>>([
    { 
      role: "model", 
      text: "Welcome to Nirogi AI Co-pilot! I can help you analyze lab reports, design Ayurvedic diets, and suggest mindfulness practices. Ask me anything to start your free preview (2 queries remaining)!" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Ritual Modals & Log States
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [supplementLogged, setSupplementLogged] = useState(false);

  // Breathing Box Timer State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingSeconds, setBreathingSeconds] = useState(4);
  const [breathingState, setBreathingState] = useState<"Inhale" | "Hold" | "Exhale" | "Hold Out">("Inhale");

  useEffect(() => {
    let interval: any;
    if (breathingActive && showBreathingModal) {
      interval = setInterval(() => {
        setBreathingSeconds((prev) => {
          if (prev <= 1) {
            setBreathingState((curr) => {
              switch (curr) {
                case "Inhale": return "Hold";
                case "Hold": return "Exhale";
                case "Exhale": return "Hold Out";
                case "Hold Out": return "Inhale";
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, showBreathingModal]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Check message limit (max 2 questions for public guest)
    if (messageCount >= 2) {
      setShowPaywall(true);
      return;
    }

    if (!textToSend) setInput("");
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setLoading(true);
    setMessageCount((c) => c + 1);

    // Custom response to match lab report query
    if (query.toLowerCase().includes("lab report") || query.toLowerCase().includes("check lab")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          role: "model",
          text: "Nirogi AI has analyzed your recent blood test results:\n\nYour serum cortisol is 4.2 mcg/dL, which is clinically low. This is a common trigger for afternoon fatigue. We suggest incorporating Ashwagandha extract in the morning and taking a 5-min Box Breathing session at noon.",
          hasFile: true,
          keyInfo: "Fulfillment: Nirogi Vision Analyzer"
        }]);
        setLoading(false);
      }, 800);
      return;
    }

    // Call AI engine with automatic multi-provider key rotation & failover
    const systemInstruction = 
      "You are the Nirogi Tanman AI Integrative Health Assistant. Guide the user in holistic wellness, combining Ayurvedic principles, nutrition, and yoga.";
    const res = await generateGeminiContent(query, systemInstruction);
    if (res.success) {
      setMessages((prev) => [...prev, { 
        role: "model", 
        text: res.text, 
        keyInfo: "Fulfillment: Nirogi AI Engine" 
      }]);
      setLoading(false);
      return;
    }

    // Fallback Mock responses for guest preview
    setTimeout(() => {
      let reply = "";
      if (query.toLowerCase().includes("diet") || query.toLowerCase().includes("food")) {
        reply = "Ayurvedic dietary principles suggest eating according to your Dosha constitution. For instance, a Pitta constitution favors cooling foods like cucumber, coconut water, and sweet fruits, while avoiding excess spices. For clinical nutrition, focusing on low-glycemic carbs and high-fiber lentils supports gut metabolism. (Note: Subscribe to customize this advice to your biometrics).";
      } else if (query.toLowerCase().includes("yoga") || query.toLowerCase().includes("stretch")) {
        reply = "A great routine for spinal mobility is a sequence of Cat-Cow stretches, followed by child's pose and downward dog. Hold each posture for 5 breaths to stimulate flow along your spine. For a personalized yoga list, subscribe to unlock your custom workout generator.";
      } else {
        reply = "That is a great wellness question! Nirogi AI combines bio-sensor data, sleep cycles, and daily diet logs to formulate specific recommendations. To get full personalized charts and clinical answers for this, consider upgrading to our Premium care plans.";
      }

      setMessages((prev) => [...prev, {
        role: "model",
        text: reply,
        keyInfo: "Fulfillment: Nirogi AI Demo Engine"
      }]);
      setLoading(false);
    }, 800);
  };

  const handleLogSupplement = () => {
    if (messageCount >= 2) {
      setShowPaywall(true);
      return;
    }
    setSupplementLogged(true);
    toast.success("Ashwagandha supplement intake logged successfully!");
  };

  return (
    <section className="section-band py-4 md:py-8">
      <div className="container space-y-4 md:space-y-8 max-w-6xl">
        {/* Header section matching mockup */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <p className="uppercase-label text-primary">Intelligent Support Preview</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Welcome to <span className="text-primary font-bold">Nirogi AI Co-pilot</span>.
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl hidden md:block">
              Try our interactive wellness assistant preview. Ask questions, and test upcoming health rituals.
            </p>
          </div>
        </div>

        {/* Two column grid layout matching mockup */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          
          {/* Left Column: Health Vitality & AI Insights (Hidden on mobile) */}
          <div className="space-y-6 hidden lg:block">
            {/* Health Vitality Card */}
            <Card className="surface-panel p-6 flex flex-col items-center justify-between h-[230px]">
              <CardHeader className="p-0 w-full flex flex-row items-center justify-between pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Health Vitality</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </CardHeader>
              <CardContent className="p-0 flex flex-col items-center space-y-4">
                <div className="relative flex items-center justify-center">
                  <svg className="h-28 w-28" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      className="text-muted/10"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="url(#vitalityGradientPublic)"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 0.85)}
                      strokeLinecap="round"
                      className="rotate-[-90deg] origin-center transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="vitalityGradientPublic" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#85a33d" />
                        <stop offset="100%" stopColor="#4A5D23" />
                      </linearGradient>
                    </defs>
                    <text x="50" y="47" textAnchor="middle" className="text-2xl font-bold fill-foreground font-sans">85</text>
                    <text x="50" y="65" textAnchor="middle" className="text-[9px] font-semibold fill-muted-foreground uppercase tracking-widest">Optimal</text>
                  </svg>
                </div>
                <p className="text-xs text-center text-muted-foreground font-medium max-w-[240px]">
                  Your Pitta Kapha balance is improving with the current diet.
                </p>
              </CardContent>
            </Card>

            {/* AI Insights Card */}
            <Card className="surface-panel p-6 h-[230px] flex flex-col justify-between">
              <CardHeader className="p-0 pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Insights</span>
              </CardHeader>
              <CardContent className="p-0 text-xs text-muted-foreground leading-relaxed space-y-2.5">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <p>Deep sleep duration spiked by <span className="font-semibold text-foreground">+14m</span>. Maintain current sleep schedule.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <p>HRV tracking indicates full systemic recovery. System is optimized for higher-intensity yoga.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <p>Cortisol metrics suggest taking a Box Breathing session before lunch at 12:30 PM.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Chat Box (Takes full mobile page) */}
          <Card className="surface-panel flex flex-col justify-between h-[calc(100vh-160px)] lg:h-[480px] overflow-hidden">
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                >
                  <div 
                    className={`rounded-lg p-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/70 text-foreground border border-border/40"
                    }`}
                  >
                    {msg.text}
                    
                    {/* Mock Lab Report card overlay in chat */}
                    {msg.hasFile && (
                      <div className="flex items-center justify-between rounded-lg border border-border bg-background p-2.5 text-xs w-full max-w-xs mt-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-emerald-700 shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground leading-tight">Lab_Report_Jan24.pdf</p>
                            <p className="text-[9px] text-muted-foreground leading-none">Analyzed by Nirogi Vision</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {msg.keyInfo && (
                    <span className="text-[10px] text-muted-foreground mt-1 font-semibold tracking-wide">
                      {msg.keyInfo}
                    </span>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping shrink-0" />
                  Nirogi AI is formulating recommendations...
                </div>
              )}
            </CardContent>

            {/* Chat Quick Action Pills & Rounded Input Wrapper */}
            <div className="border-t border-border/60 p-3 bg-muted/5 space-y-3">
              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap gap-2 pb-1">
                <button
                  onClick={() => handleSend("Analyze my diet protocols")}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition flex items-center gap-1"
                  disabled={messageCount >= 2}
                >
                  🍽️ Analyze my diet
                </button>
                <button
                  onClick={() => handleSend("Assess my Dosha profile")}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition flex items-center gap-1"
                  disabled={messageCount >= 2}
                >
                  🧘 Assess my Dosha
                </button>
                <button
                  onClick={() => handleSend("Give me a yoga routine for stress relief")}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition flex items-center gap-1"
                  disabled={messageCount >= 2}
                >
                  🌸 Yoga for stress
                </button>
                <button
                  onClick={() => handleSend("Check lab report for cortisol levels")}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition flex items-center gap-1"
                  disabled={messageCount >= 2}
                >
                  📄 Check lab report
                </button>
              </div>

              {/* Input Bar */}
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1 shadow-sm">
                <button className="text-muted-foreground hover:text-primary transition p-1" title="Attach Files" disabled={messageCount >= 2}>
                  <Paperclip className="h-4 w-4" />
                </button>
                <Input
                  placeholder={messageCount >= 2 ? "Chat limit reached. Upgrade to continue." : "Ask Nirogi about your health..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="border-0 bg-transparent px-0 focus-visible:ring-0 text-sm flex-1 h-8 shadow-none"
                  disabled={loading || messageCount >= 2}
                />
                <button className="text-muted-foreground hover:text-primary transition p-1" title="Voice Input" disabled={messageCount >= 2}>
                  <Mic className="h-4 w-4" />
                </button>
                <Button 
                  size="icon" 
                  onClick={() => handleSend()} 
                  disabled={loading || !input.trim() || messageCount >= 2} 
                  className="h-7 w-7 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shrink-0"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>

        </div>

        {/* Upcoming Rituals Section */}
        <section className="space-y-4 pt-4 border-t border-border/40 hidden lg:block">
          <h2 className="text-xl font-semibold text-foreground tracking-tight font-sans">Upcoming Rituals</h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            {/* Card 1: Ayurvedic Bowl */}
            <Card className="surface-panel p-5 flex flex-col justify-between h-[180px]">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  🍳
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground leading-tight">Lunch: Ayurvedic Bowl</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Recommended 12:45 PM for maximum digestive fire (Agni) and Pitta balance.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowRecipeModal(true)} 
                className="text-xs font-semibold text-primary hover:underline text-left mt-2 flex items-center gap-1"
              >
                View Recipe &rarr;
              </button>
            </Card>

            {/* Card 2: Mindfulness Break */}
            <Card className="surface-panel p-5 flex flex-col justify-between h-[180px]">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-teal-100 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                  🧘
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground leading-tight">Mindfulness Break</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Nirogi suggests a 5-min Box Breathing session to lower cortisol and anxiety.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowBreathingModal(true)} 
                className="text-xs font-semibold text-primary hover:underline text-left mt-2 flex items-center gap-1"
              >
                Start Session &rarr;
              </button>
            </Card>

            {/* Card 3: Supplement Routine */}
            <Card className="surface-panel p-5 flex flex-col justify-between h-[180px]">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                  💊
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground leading-tight">Supplement Routine</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Take your Ashwagandha extract with warm water for better adaptogenic absorption.
                  </p>
                </div>
              </div>
              {supplementLogged ? (
                <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 mt-2">
                  <Check className="h-4 w-4" /> Logged
                </div>
              ) : (
                <button 
                  onClick={handleLogSupplement}
                  className="text-xs font-semibold text-primary hover:underline text-left mt-2 flex items-center gap-1"
                >
                  Log Intake &rarr;
                </button>
              )}
            </Card>
          </div>
        </section>
      </div>

      {/* Premium Subscription Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
          <Card className="surface-panel w-full max-w-md p-6 relative border-t-4 border-t-primary bg-hero-gradient">
            <button 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPaywall(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col items-center text-center space-y-4 py-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">Unlock Unlimited AI Care</h2>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                  You've reached your free daily preview limit. Upgrade your account to unlock unlimited interactive chats, custom diet protocols, and real-time medical insights.
                </p>
              </div>
              
              <div className="flex flex-col gap-2 w-full pt-4">
                <Button className="w-full bg-primary text-white" asChild>
                  <Link href="/pricing">View Subscription Plans</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Sign In to Your Workspace</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Ayurvedic Bowl Recipe Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="surface-panel w-full max-w-md p-6 relative">
            <button 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowRecipeModal(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-lg">Ayurvedic Quinoa Bowl Recipe</CardTitle>
              <CardDescription>Pitta-soothing lunch routine</CardDescription>
            </CardHeader>
            <CardContent className="p-0 text-xs text-muted-foreground space-y-3 leading-relaxed">
              <p className="font-semibold text-foreground">Ingredients:</p>
              <p>• 1/2 cup organic Quinoa (rinsed)</p>
              <p>• 1/2 cup zucchini (diced)</p>
              <p>• 1/2 cup fresh asparagus or yellow mung lentils</p>
              <p>• 1 tbsp ghee, coriander, and pinch of fennel seeds</p>
              
              <p className="font-semibold text-foreground pt-2">Instructions:</p>
              <p>1. Warm ghee in a small pan, toast the fennel and coriander seeds until aromatic.</p>
              <p>2. Add diced zucchini and stir-fry for 2 minutes.</p>
              <p>3. Add quinoa and 1.5 cups of water. Simmer covered for 15 minutes.</p>
              <p>4. Serve warm at noon for peak Agni digestion.</p>
            </CardContent>
            <div className="pt-4 flex justify-end">
              <Button size="sm" onClick={() => setShowRecipeModal(false)}>Close Recipe</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Mindfulness Box Breathing Modal */}
      {showBreathingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="surface-panel w-full max-w-md p-6 relative flex flex-col items-center text-center">
            <button 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setShowBreathingModal(false);
                setBreathingActive(false);
              }}
            >
              <X className="h-4 w-4" />
            </button>
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-lg">Mindfulness Box Breathing</CardTitle>
              <CardDescription>Vagal stimulation session to reduce stress</CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 py-8 flex flex-col items-center space-y-6 w-full">
              {/* Breathing Circle Visualizer */}
              <div className="relative flex items-center justify-center h-44 w-44">
                <div 
                  className={`absolute rounded-full bg-primary/10 border-4 border-primary transition-all duration-[4000ms] ease-in-out flex items-center justify-center ${
                    breathingState === "Inhale" ? "h-40 w-40" :
                    breathingState === "Hold" ? "h-40 w-40 bg-primary/20" :
                    breathingState === "Exhale" ? "h-20 w-20" :
                    "h-20 w-20 bg-primary/5"
                  }`}
                >
                  <div className="text-center">
                    <p className="text-sm font-bold text-foreground capitalize transition-all duration-300">{breathingState}</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">{breathingSeconds}s</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                {breathingState === "Inhale" && "Inhale slowly through your nose, letting your belly fill with air."}
                {breathingState === "Hold" && "Hold your breath calmly. Keep your shoulders relaxed."}
                {breathingState === "Exhale" && "Exhale gently through your mouth, releasing all muscle tension."}
                {breathingState === "Hold Out" && "Hold your breath out before starting the next inhale."}
              </p>
            </CardContent>

            <div className="flex gap-2 w-full pt-2">
              <Button 
                variant={breathingActive ? "outline" : "default"} 
                className="flex-1"
                onClick={() => setBreathingActive(!breathingActive)}
              >
                {breathingActive ? "Pause" : "Start Session"}
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => {
                  setShowBreathingModal(false);
                  setBreathingActive(false);
                  setBreathingState("Inhale");
                  setBreathingSeconds(4);
                }}
              >
                Exit
              </Button>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
};

export default AIHealthAssistantPage;