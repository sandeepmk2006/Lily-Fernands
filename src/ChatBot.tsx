/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_CONTEXT = `You are a helpful AI assistant for Lily Fernandes' professional portfolio website. 
Lily is a Marketing, Branding, and Event Management professional based in Bangalore, India.
She has experience as an Event Lead at Christ University Cultural Fest (2023-2024) where she led 15+ volunteers 
for events with 500+ attendees. She also worked as a Social Strategist for 3+ student organizations (2022-2024),
managed content calendars, and designed 50+ visual assets.
She is the Founder of Fern & Co., an Instagram-based customized product business.
Her skills include Social Strategy, Event Curation, Brand Identity, Canva, Adobe Express, CapCut, Instagram, LinkedIn, and TikTok.
Answer questions about Lily's background, services, skills, and experience. Be professional, concise, and helpful.
If asked about things outside Lily's portfolio, politely redirect the conversation back to her professional work.`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Lily's AI assistant. Ask me anything about her background, skills, or services! 👋",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const conversationHistory = [...messages, userMessage]
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n");

      const prompt = `${SYSTEM_CONTEXT}\n\nConversation so far:\n${conversationHistory}\n\nAssistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const replyText =
        response.text ?? "Sorry, I couldn't generate a response. Please try again.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: replyText },
      ]);
    } catch (err) {
      const errorMsg =
        err instanceof Error && err.message.includes("API_KEY")
          ? "AI assistant is not configured yet. Please set the GEMINI_API_KEY."
          : "Sorry, something went wrong. Please try again later.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMsg },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-8 right-8 z-[200] w-14 h-14 bg-neutral-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-neutral-800 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-8 z-[200] w-[360px] max-h-[520px] bg-white rounded-3xl shadow-2xl shadow-neutral-400/30 flex flex-col overflow-hidden border border-neutral-100"
          >
            {/* Header */}
            <div className="bg-neutral-900 text-white px-6 py-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-sm">Lily's AI Assistant</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                  Powered by Gemini
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-2 ${
                    msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-neutral-900 text-white"
                        : "bg-white border border-neutral-200"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-neutral-600" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-neutral-900 text-white rounded-tr-sm"
                        : "bg-white text-neutral-700 border border-neutral-100 rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-2">
                  <div className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-neutral-600" />
                  </div>
                  <div className="bg-white border border-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3">
                    <Loader className="w-4 h-4 text-neutral-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <div className="flex items-center space-x-2 bg-neutral-50 rounded-2xl border border-neutral-200 px-4 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Lily's work..."
                  className="flex-1 bg-transparent text-sm text-neutral-700 placeholder-neutral-400 outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-8 h-8 bg-neutral-900 rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
