"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const placeholderPrompts = [
  "I'm looking for a deep tissue massage",
  "I need cleaning services for my home",
  "I'm looking for a baby sitter",
  "I want a manicure and pedicure",
  "I need a haircut and color",
  "I'm looking for a personal trainer",
  "I need dog grooming services",
  "I want bridal makeup",
  "I'm looking for a yoga instructor",
  "I need help with house cleaning",
];

export default function AISearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect
  useEffect(() => {
    if (isFocused) return; // Don't animate when user is typing

    const currentPrompt = placeholderPrompts[currentPromptIndex];

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (!isDeleting && currentCharIndex < currentPrompt.length) {
      // Typing forward
      typingTimeoutRef.current = setTimeout(() => {
        setPlaceholder(currentPrompt.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, 50); // Typing speed: 50ms per character
    } else if (!isDeleting && currentCharIndex === currentPrompt.length) {
      // Pause at the end before deleting
      typingTimeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Pause for 2 seconds
    } else if (isDeleting && currentCharIndex > 0) {
      // Deleting backward
      typingTimeoutRef.current = setTimeout(() => {
        setPlaceholder(currentPrompt.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      }, 30); // Deleting speed: 30ms per character (faster than typing)
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to next prompt
      setIsDeleting(false);
      setCurrentPromptIndex((currentPromptIndex + 1) % placeholderPrompts.length);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentCharIndex, currentPromptIndex, isDeleting, isFocused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Simple keyword matching to categories
    const query = searchQuery.toLowerCase();

    // Map keywords to categories
    const categoryMap: Record<string, string> = {
      massage: "Wellness",
      therapy: "Wellness",
      wellness: "Wellness",
      cleaning: "Cleaning",
      clean: "Cleaning",
      maid: "Cleaning",
      babysitter: "Pet Care", // We'll use Pet Care as placeholder for now
      sitter: "Pet Care",
      nails: "Nails",
      manicure: "Nails",
      pedicure: "Nails",
      hair: "Hair",
      haircut: "Hair",
      color: "Hair",
      styling: "Hair",
      makeup: "Makeup",
      bridal: "Makeup",
      facial: "Beauty",
      beauty: "Beauty",
      waxing: "Beauty",
      fitness: "Fitness",
      trainer: "Fitness",
      training: "Fitness",
      yoga: "Fitness",
      pilates: "Fitness",
      pet: "Pet Care",
      dog: "Pet Care",
      cat: "Pet Care",
      grooming: "Pet Care",
    };

    // Find matching category
    let matchedCategory = "";
    for (const [keyword, category] of Object.entries(categoryMap)) {
      if (query.includes(keyword)) {
        matchedCategory = category;
        break;
      }
    }

    // Navigate to search page with category or general search
    if (matchedCategory) {
      router.push(`/search?category=${encodeURIComponent(matchedCategory)}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative group">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder + (isFocused ? "" : "|")}
            className="w-full pl-12 pr-32 py-4 text-base rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Helper Text */}
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Describe what you're looking for in your own words
        </p>
      </div>
    </form>
  );
}
