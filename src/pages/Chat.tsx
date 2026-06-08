import { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  Bot,
  Loader2,
  ArrowLeft,
  Volume2,
  Square,
  Copy,
  Check,
} from "lucide-react";
import { Link } from "react-router";
import Navigation from "../sections/Navigation";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const SUGGESTIONS = [
  "Tell me about Tej.",
  "Is he good at Android Development?",
  "What projects has he built?",
  "What are his open source contributions?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Tej's AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const togglePlay = (text: string, index: number) => {
    if (playingIndex === index) {
      window.speechSynthesis.cancel();
      setPlayingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setPlayingIndex(null);
    utterance.onerror = () => setPlayingIndex(null);

    setPlayingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const sendMessage = async (e?: React.FormEvent, customMessage?: string) => {
    e?.preventDefault();
    const messageToSend = customMessage || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://e1daec31-3e98-4207-914a-469f5948f28e.search.ai.cloudflare.com/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful and professional AI assistant for Tej Pratap Singh, a software engineer. You help visitors learn more about his work, skills, and experience. Be concise and friendly.",
              },
              ...messages,
              userMessage,
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message;
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#0a0a0a] text-black dark:text-white flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-24 pb-4 px-4 sm:px-6">
        {/* Header/Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-sm font-medium px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5">
            AI Assistant
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto mb-6 space-y-6 scrollbar-hide"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-black/5 dark:bg-white/10"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`relative group max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                }`}
              >
                <div>{msg.content}</div>
                {msg.role !== "user" && (
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => togglePlay(msg.content, index)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium transition-all border ${
                        playingIndex === index
                          ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                          : "bg-black/5 text-black/60 border-black/5 hover:bg-black/10 dark:bg-white/5 dark:text-white/60 dark:border-white/5 dark:hover:bg-white/10"
                      }`}
                    >
                      {playingIndex === index ? (
                        <>
                          <Square className="w-2.5 h-2.5 fill-current" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(msg.content, index)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium transition-all border ${
                        copiedIndex === index
                          ? "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400 dark:border-green-500/30"
                          : "bg-black/5 text-black/60 border-black/5 hover:bg-black/10 dark:bg-white/5 dark:text-white/60 dark:border-white/5 dark:hover:bg-white/10"
                      }`}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-3 rounded-2xl">
                <Loader2 className="w-4 h-4 animate-spin text-black/40 dark:text-white/40" />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length === 1 && !isLoading && (
          <div className="mb-6 flex flex-wrap gap-2 justify-end">
            {SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => sendMessage(undefined, suggestion)}
                className="text-xs sm:text-sm px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={sendMessage} className="relative mt-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition-all text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-center mt-4 text-black/40 dark:text-white/40">
          AI can make mistakes. Check important info.
        </p>
      </main>
    </div>
  );
}
