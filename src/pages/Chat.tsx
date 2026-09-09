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
import SEO from "../components/SEO";

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
  const [isStreaming, setIsStreaming] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isStreaming]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsStreaming(false);
  };

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
    if (!messageToSend.trim() || isLoading || isStreaming) return;

    // Stop any ongoing speech synthesis
    window.speechSynthesis.cancel();
    setPlayingIndex(null);

    const userMessage: Message = { role: "user", content: messageToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(
        "https://e1daec31-3e98-4207-914a-469f5948f28e.search.ai.cloudflare.com/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful and professional AI assistant for Tej Pratap Singh, a software engineer. You help visitors learn more about his work, skills, and experience. Be concise and friendly.",
              },
              ...newMessages,
            ],
            stream: true,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("Response body is not readable");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let hasReceivedFirstChunk = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data:")) continue;

          const dataStr = trimmed.replace(/^data:\s*/, "");
          if (dataStr === "[DONE]") {
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              if (!hasReceivedFirstChunk) {
                hasReceivedFirstChunk = true;
                setIsLoading(false);
                setIsStreaming(true);
                // Initialize assistant message in array
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: delta },
                ]);
              } else {
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
                    updated[lastIdx] = {
                      ...updated[lastIdx],
                      content: updated[lastIdx].content + delta,
                    };
                  }
                  return updated;
                });
              }
            }
          } catch {
            // Ignore parse errors for partial or non-JSON SSE lines
          }
        }
      }

      // If finished without receiving any chunks or empty response
      if (!hasReceivedFirstChunk) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I didn't receive a response. Please try again.",
          },
        ]);
      }
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        // Stream was cancelled by user - keep partial content intact
        return;
      }
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
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const isBusy = isLoading || isStreaming;

  return (
    <div className="min-h-screen bg-page text-ink flex flex-col font-sans">
      <SEO
        title="AI Assistant"
        description="Interact with Tej Pratap Singh's AI assistant to explore his systems engineering background, Renault automotive infotainment, medical SaaS, and side projects."
        canonical="https://tejpratap.com/chat"
        keywords={[
          "Tej Pratap Singh AI",
          "Tej Pratap Assistant",
          "Software Engineer AI",
          "Renault Deputy Manager",
          "Android Automotive Expert",
        ]}
      />
      <Navigation />

      <main className="flex-1 flex flex-col page-column w-full pt-24 pb-8">
        {/* Header/Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono text-copy hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="text-xs font-mono px-3 py-1 bg-[var(--card-surface)] rounded-full border border-line text-copy-muted">
            AI Assistant
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto mb-6 space-y-6 scrollbar-hide"
        >
          {messages.map((msg, index) => {
            const isCurrentlyStreaming =
              isStreaming && index === messages.length - 1 && msg.role === "assistant";

            return (
              <div
                key={index}
                className={`flex gap-3.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-mono ${
                    msg.role === "user"
                      ? "bg-ink text-page"
                      : "bg-[var(--card-surface)] border border-line text-ink"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>

                <div
                  className={`relative group max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-ink text-page"
                      : "bg-[var(--card-surface)] border border-line text-ink"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {msg.content}
                    {isCurrentlyStreaming && (
                      <span className="inline-block w-1.5 h-3.5 ml-1 bg-current animate-pulse align-middle" />
                    )}
                  </div>
                  {msg.role !== "user" && !isCurrentlyStreaming && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-line/60">
                      <button
                        onClick={() => togglePlay(msg.content, index)}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono transition-all border ${
                          playingIndex === index
                            ? "bg-ink text-page border-ink"
                            : "bg-page text-copy border-line hover:border-line-strong hover:text-ink"
                        }`}
                      >
                        {playingIndex === index ? (
                          <>
                            <Square className="w-2.5 h-2.5 fill-current" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-2.5 h-2.5" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(msg.content, index)}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono transition-all border ${
                          copiedIndex === index
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                            : "bg-page text-copy border-line hover:border-line-strong hover:text-ink"
                        }`}
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-2.5 h-2.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[var(--card-surface)] border border-line flex items-center justify-center flex-shrink-0 text-ink">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[var(--card-surface)] border border-line px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-mono text-copy-muted">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-ink" />
                <span>Generating response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length === 1 && !isBusy && (
          <div className="mb-6 flex flex-wrap gap-2 justify-end">
            {SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => sendMessage(undefined, suggestion)}
                className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-line bg-[var(--card-surface)] hover:bg-[var(--card-hover-surface)] hover:border-line-strong text-copy hover:text-ink transition-all"
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
            placeholder={isBusy ? "AI is generating a response..." : "Ask me anything about Tej..."}
            className="w-full bg-[var(--card-surface)] border border-line rounded-xl px-5 py-3.5 pr-14 focus:outline-none focus:border-ink transition-all text-sm font-sans text-ink placeholder:text-copy-muted"
            disabled={isBusy}
          />
          {isBusy ? (
            <button
              type="button"
              onClick={stopGeneration}
              title="Stop generating"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors border border-red-500/20"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              title="Send message"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-ink text-page disabled:opacity-30 transition-opacity"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        <p className="text-[11px] font-mono text-center mt-3 text-copy-muted">
          AI assistant powered by Claude 3.5 Sonnet.
        </p>
      </main>
    </div>
  );
}
