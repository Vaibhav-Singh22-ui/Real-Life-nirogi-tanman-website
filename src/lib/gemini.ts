export type GeminiResponse = {
  text: string;
  usedKeyIndex: number;
  success: boolean;
  error?: string;
};

/**
 * Retrieves the stored Gemini API keys from localStorage
 */
export const getStoredApiKeys = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("nirogi_gemini_api_keys");
  if (!stored) return [];
  try {
    const keys = JSON.parse(stored);
    return Array.isArray(keys) ? keys.filter(k => typeof k === "string" && k.trim() !== "") : [];
  } catch {
    return [];
  }
};

/**
 * Stores the list of Gemini API keys into localStorage
 */
export const setStoredApiKeys = (keys: string[]): void => {
  if (typeof window === "undefined") return;
  const filtered = keys.filter(k => k.trim() !== "");
  localStorage.setItem("nirogi_gemini_api_keys", JSON.stringify(filtered));
};

/**
 * Calls the Gemini API with automatic key rotation and failover support
 */
export const generateGeminiContent = async (
  prompt: string,
  systemInstruction?: string
): Promise<GeminiResponse> => {
  const keys = getStoredApiKeys();
  
  if (keys.length === 0) {
    return {
      text: "",
      usedKeyIndex: -1,
      success: false,
      error: "No Gemini API keys found. Please add at least one API key in the configuration drawer.",
    };
  }

  // Iterate over all provided keys
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    try {
      // Using gemini-2.5-flash as it is fast and robust
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      
      const payload: any = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error?.message || response.statusText;
        console.warn(`Gemini API key at index ${i} failed: Status ${response.status} - ${errorMessage}`);
        // Continue loop to try the next key
        continue;
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.warn(`Gemini API key at index ${i} returned an empty response.`);
        continue;
      }

      // Found a successful key!
      return {
        text,
        usedKeyIndex: i,
        success: true
      };

    } catch (e: any) {
      console.warn(`Network or system error on key index ${i}:`, e);
      // Try next key
      continue;
    }
  }

  // If all keys failed
  return {
    text: "",
    usedKeyIndex: -1,
    success: false,
    error: "All provided Gemini API keys failed or were rate-limited. Please check your keys or network connection.",
  };
};
