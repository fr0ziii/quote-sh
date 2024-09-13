// const categories = ["All", ...new Set(quotes.map(quote => quote.category))]
"use client";

import { useState, useEffect, Suspense } from "react";
import { Quote, RefreshCw, BookOpen, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRandomQuote } from "@/app/actions";
import DeployButton from "./deploy-button";
import { ThemeSwitcher } from "./theme-switcher";

const quotes: any[] = [];

const categories = [
  "All",
  "Life",
  "Motivation",
  "Science",
  "Nature",
  "Mathematics",
];

const categoryColors: any = {
  All: "bg-gradient-to-r from-purple-500 to-pink-500",
  Life: "bg-gradient-to-r from-green-400 to-blue-500",
  Motivation: "bg-gradient-to-r from-yellow-400 to-orange-500",
  Science: "bg-gradient-to-r from-blue-400 to-indigo-500",
  Nature: "bg-gradient-to-r from-green-300 to-teal-500",
  Mathematics: "bg-gradient-to-r from-red-400 to-pink-500",
};

export default function QuotePage() {
  const [currentQuote, setCurrentQuote] = useState<{ quote?: string; author_name?: string; author_info?: string }>({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddQuoteForm, setShowAddQuoteForm] = useState(false);
  const [newQuote, setNewQuote] = useState({
    text: "",
    author: "",
    category: "",
    reference: "",
  });

  const filteredQuotes = selectedCategory === "All"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  const changeQuote = () => {
    getRandomQuote().then((quote) => {
      setCurrentQuote(quote);
    });
  };

  useEffect(() => {
    changeQuote();
  }, [selectedCategory]);

  const handleSubmitNewQuote = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New quote submitted:", newQuote);
    setShowAddQuoteForm(false);
    setNewQuote({ text: "", author: "", category: "", reference: "" });
  };

  return (
    <div
      className={`md:grow w-full bg-cover bg-center flex flex-col items-center justify-center rounded-3xl p-6 md:p-12`}
    >
      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-background bg-opacity-90 p-4 rounded-lg shadow-lg overflow-x-auto mb-4">
          <div className="flex gap-4 justify-between items-center">
            <div
              className={`${categoryColors[selectedCategory]} rounded-full p-[3px] flex flex-col lg:flex-row items-center`}
            >
              <div className="flex items-stretch gap-2 bg-background rounded-full p-2">
              <Quote></Quote> 
                <p className="text-3xl font-bold whitespace-nowrap items-center">Quote/sh
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-1 lg:space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`hover:animate-bounce whitespace-nowrap ${selectedCategory === category ? categoryColors[category] : "bg-background hover:bg-foreground-100"} text-primary`}
                >
                  {category}
                </Button>
              ))}
              <ThemeSwitcher/>
            </div>
          </div>
        </div>
        <div className={`${categoryColors[selectedCategory]} rounded p-[3px] flex items-center`}>
          <Suspense fallback={<p>Loading feed...</p>}>
        <Card className="relative z-10 w-full bg-background bg-opacity-90 overflow-hidden  shadow-xl h-[450px]">
          <CardContent className="p-6 md:p-8 h-full overflow-hidden ">
            <ScrollArea className="h-full">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className={`${categoryColors[selectedCategory]} w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0 shadow-lg}`}>
                </div>
                <div className="flex-grow mt-2 text-center md:text-left items-stretch">
                  <blockquote className="text-2xl md:text-3xl font-bold text-foreground-800 mb-2 italic">
                    {currentQuote.quote}
                  </blockquote>
                  <cite className="text-xl text-foreground-600 block">
                    - {currentQuote.author_name}
                  </cite>
                  {currentQuote.author_info && <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                    <span className="text-sm text-foreground-500 flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {currentQuote.author_info}
                    </span>
                  </div>}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        </Suspense>
        </div>
        <div className="flex flex-col mb-4 md:flex-row gap-4 mt-8 relative z-10 items-center justify-center">
          <Button
            onClick={changeQuote}
            size="lg"
            className={`text-background border-background ${categoryColors[selectedCategory]} hover:brightness-110 transition-all duration-300`}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> New Quote
          </Button>
          <Button
            onClick={() => setShowAddQuoteForm(true)}
            size="lg"
            variant="outline"
            className="bg-background text-foreground hover:bg-foreground-100"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Request to Add Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
