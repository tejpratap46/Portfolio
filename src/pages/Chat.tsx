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
      let accumulatedText = "";
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
                accumulatedText = delta;
              } else {
                accumulatedText += delta;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
                    updated[lastIdx] = {
                      ...updated[lastIdx],
                      content: accumulatedText,
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
          {messages.map((msg, index) => {
            const isCurrentlyStreaming =
              isStreaming && index === messages.length - 1 && msg.role === "assistant";

            return (
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
                  <div className="whitespace-pre-wrap break-words">
                    {msg.content}
                    {isCurrentlyStreaming && (
                      <span className="inline-block w-1.5 h-3.5 ml-1 bg-current animate-pulse align-middle" />
                    )}
                  </div>
                  {msg.role !== "user" && !isCurrentlyStreaming && (
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
            );
          })}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-3 rounded-2xl flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-black/40 dark:text-white/40" />
                <span className="text-xs text-black/40 dark:text-white/40">Thinking...</span>
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
            placeholder={isBusy ? "AI is generating a response..." : "Ask me anything..."}
            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition-all text-sm"
            disabled={isBusy}
          />
          {isBusy ? (
            <button
              type="button"
              onClick={stopGeneration}
              title="Stop generating"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              title="Send message"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </form>

        <p className="text-[10px] text-center mt-4 text-black/40 dark:text-white/40">
          AI can make mistakes. Check important info.
        </p>
      </main>
    </div>
  );
}
