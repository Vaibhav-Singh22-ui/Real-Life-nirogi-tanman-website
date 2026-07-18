import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import { useLoading } from "@/context/LoadingContext";
import { MessageSquare, X, Send, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PublicLayout = () => {
  const { isLoading, isDocking } = useLoading();
  const showContent = !isLoading || isDocking;

  // Floating Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "bot" | "user"; text: string }>>([]);
  const [inputVal, setInputVal] = useState("");
  const [activeTicket, setActiveTicket] = useState<any | null>(null);

  useEffect(() => {
    // Check if there is a newly submitted ticket in localStorage
    const updateTicket = () => {
      const saved = localStorage.getItem("nirogi_active_ticket");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setActiveTicket(parsed);
          setMessages([
            {
              role: "bot",
              text: `Hello! I have loaded your support request: Ticket #${parsed.id} (${parsed.subject}). Care Desk priority is set to [${parsed.priority.toUpperCase()}]. A coordination specialist is reviewing your file now. How can I help you today?`
            }
          ]);
        } catch (e) {
          console.error(e);
        }
      } else {
        setActiveTicket(null);
        setMessages([
          {
            role: "bot",
            text: "Hello! Welcome to Nirogi Tanman Care Coordination. How can I assist you with clinical consultations, yoga booking, or product orders today?"
          }
        ]);
      }
    };

    updateTicket();
    // Listen for custom events or changes
    window.addEventListener("storage", updateTicket);
    return () => window.removeEventListener("storage", updateTicket);
  }, [chatOpen]);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInputVal("");

    setTimeout(() => {
      let reply = "Our coordinators are reviewing your profile. We will reach you at your registered email address shortly.";
      
      if (activeTicket) {
        if (activeTicket.category === "billing") {
          reply = `Billing Coordinator desk has acknowledged Ticket #${activeTicket.id}. We are initiating transaction checkback with the payment gateway.`;
        } else if (activeTicket.category === "returns") {
          reply = `Product Return request logged for Ticket #${activeTicket.id}. Our courier partner will pick up the package within 48 hours.`;
        } else {
          reply = `Care Specialist has received Ticket #${activeTicket.id}. We are reviewing your records. Thank you for your patience.`;
        }
      } else {
        if (userMsg.toLowerCase().includes("book") || userMsg.toLowerCase().includes("doctor")) {
          reply = "You can book active doctor sessions directly at the Book Consultation tab in the navbar. Let me know if you face scheduling issues!";
        } else if (userMsg.toLowerCase().includes("shop") || userMsg.toLowerCase().includes("product")) {
          reply = "Our online herbal store contains certified adaptogens. You can look up shipping status on the Shop Page tracking card.";
        }
      }

      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    }, 1000);
  };

  return (
    <>
      <div className="page-shell relative">
        <PublicNavbar />
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
        <PublicFooter />

        {/* Global Floating Live Support Chat Widget */}
        <div className="fixed bottom-6 right-6 z-[999] font-['Manrope',sans-serif]">
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-16 right-0 w-[330px] sm:w-[360px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[420px]"
              >
                {/* Header */}
                <div className="bg-primary px-4 py-3.5 flex justify-between items-center text-white shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <p className="text-xs font-black tracking-tight leading-none">Care Coordination Chat</p>
                      <p className="text-[10px] text-white/70 mt-0.5 font-medium leading-none">Online · Coordinator Desk</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setChatOpen(false)} 
                    className="text-white/80 hover:text-white transition"
                    aria-label="Close Support Chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-muted/20">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                    >
                      <div
                        className={`rounded-xl p-3 text-xs leading-relaxed whitespace-pre-line ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground font-medium"
                            : "bg-background text-foreground border border-border shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Controls */}
                <div className="p-3 border-t border-border bg-background flex items-center gap-2 shrink-0">
                  <Input
                    placeholder="Type support query..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="border-border rounded-xl text-xs h-9 focus-visible:ring-primary"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSend} 
                    className="h-9 w-9 rounded-xl bg-primary text-primary-foreground shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200 border border-primary-foreground/10 relative"
            aria-label="Open Support Chat"
          >
            {chatOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
            {activeTicket && !chatOpen && (
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-amber-500 rounded-full border-2 border-background animate-ping" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PublicLayout;
