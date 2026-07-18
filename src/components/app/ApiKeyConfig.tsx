import { useState, useEffect } from "react";
import { Key, Plus, Trash2, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStoredApiKeys, setStoredApiKeys, generateGeminiContent } from "@/lib/gemini";
import { toast } from "sonner";

const ApiKeyConfig = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [newKey, setNewKey] = useState("");
  const [testingIndex, setTestingIndex] = useState<number | null>(null);
  const [activeKeysCount, setActiveKeysCount] = useState(0);

  useEffect(() => {
    const stored = getStoredApiKeys();
    setKeys(stored);
    setActiveKeysCount(stored.length);
  }, []);

  const handleAddKey = () => {
    if (!newKey.trim()) return;
    if (keys.includes(newKey.trim())) {
      toast.error("This key is already in your rotation list.");
      return;
    }
    const updated = [...keys, newKey.trim()];
    setKeys(updated);
    setStoredApiKeys(updated);
    setNewKey("");
    setActiveKeysCount(updated.length);
    toast.success(`Key #${updated.length} added successfully!`);
  };

  const handleRemoveKey = (index: number) => {
    const updated = keys.filter((_, idx) => idx !== index);
    setKeys(updated);
    setStoredApiKeys(updated);
    setActiveKeysCount(updated.length);
    toast.info("API key removed from rotation.");
  };

  const handleTestKey = async (index: number) => {
    setTestingIndex(index);
    const keyToTest = keys[index];
    
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToTest}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] })
      });

      if (response.ok) {
        toast.success(`Key #${index + 1} is working perfectly!`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData?.error?.message || "Invalid credentials";
        toast.error(`Key #${index + 1} failed check: ${msg}`);
      }
    } catch {
      toast.error(`Key #${index + 1} test failed. Check network connection.`);
    } finally {
      setTestingIndex(null);
    }
  };

  return (
    <Card className="border border-border/80 bg-background/50 shadow-sm backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Key className="h-4 w-4 text-primary" />
          Gemini API Key Rotation Setup
        </CardTitle>
        <CardDescription className="text-xs">
          Provide 2-3 Gemini keys. If one key hits rate-limits (429) or fails, the platform automatically fails over to the next key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key inputs */}
        <div className="flex gap-2">
          <Input
            placeholder="Paste Gemini API Key (AIzaSy...)"
            type="password"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="text-xs h-9"
          />
          <Button size="sm" onClick={handleAddKey} className="h-9">
            <Plus className="h-4 w-4 mr-1" /> Add Key
          </Button>
        </div>

        {/* Key rotation status list */}
        {keys.length === 0 ? (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50/50 p-3 text-xs text-yellow-800 dark:border-yellow-900/30 dark:bg-yellow-950/20 dark:text-yellow-300 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="font-semibold">Setup Required</p>
              <p className="mt-0.5 leading-relaxed">
                No active API keys found. Please obtain free Gemini API keys from Google AI Studio and add them above to use AI features.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Rotational Pool ({activeKeysCount} Keys Active)
            </p>
            <div className="space-y-1.5">
              {keys.map((key, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border border-border bg-card/60 p-2 text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-foreground">Key #{index + 1}:</span>
                    <span className="text-muted-foreground">
                      {key.substring(0, 7)}...{key.substring(key.length - 4)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-muted-foreground hover:text-primary"
                      onClick={() => handleTestKey(index)}
                      disabled={testingIndex === index}
                      title="Test Connection"
                    >
                      <CheckCircle2 className={`h-3.5 w-3.5 ${testingIndex === index ? "animate-pulse" : ""}`} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-muted-foreground hover:text-red-500"
                      onClick={() => handleRemoveKey(index)}
                      title="Delete Key"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyConfig;
