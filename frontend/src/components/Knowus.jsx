"use client"

import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Linkedin, Github, FileText, Send, ArrowLeft } from "lucide-react"
import DeveloperCard from "./developer-card"
import tanmay from "../assets/tanmay.jpg"
import medha from "../assets/medha.jpg"
export  function KnowUs() {
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState("")
  const [submitted, setSubmitted] = useState(false)
// Back Button
  const BackButton = () => (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border border-border bg-card text-card-foreground hover:bg-muted"
      >
        <ArrowLeft size={20} />
        Back
      </button>
    </div>
  );
  const handleSubmit = (e) => {
    e.preventDefault()
    if (suggestion.trim()) {
      setSubmitted(true)
      setSuggestion("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const developers = [
    {
      name: "Medha Pant",
      roles: "Frontend • Backend • UI/UX Designing",
      image: medha,
      links: [
        { icon: FileText, label: "Resume", href: "Medha_Pant_Resume.pdf" },
        { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/medhapant4/" },
        { icon: Github, label: "GitHub", href: "https://github.com/medha0412" },
        { icon: Mail, label: "Email", href: "mailto:medhapant4@gmail.com" },
      ],
    },
    {
      name: "Tanmay Yadav",
      roles: "Backend • AI Integration",
      image: tanmay,
      links: [
        { icon: FileText, label: "Resume", href: "Tanmay_Yadav_res_doccccc.pdf" },
        { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/tanmay-yadav-5b82712" },
        { icon: Github, label: "GitHub", href: "https://github.com/Prabhu0414" },
        { icon: Mail, label: "Email", href: "mailto:tanmayyadav1410@gmail.com" },
      ],
    },
  ]

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <BackButton />
      <div className="section max-w-6xl mx-auto p-8 sm:p-10 border border-border">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-primary">
            Meet the CivicLens Developers
          </h1>
        </div>

        {/* Message Section */}
        <div className="card rounded-lg p-8 sm:p-10 mb-12 shadow-lg border border-border animate-slide-up">
          <p className="text-lg sm:text-xl leading-relaxed text-balance text-card-foreground">
            We created CivicLens to spread civic sense and awareness in our country. India is a beautiful, diverse, and
            welcoming nation — yet, civic sense often takes a backseat. Through this initiative, we aim to inspire
            responsible citizenship and collective community care, because small acts of awareness can create a big
            difference.
          </p>
        </div>

        {/* Developer Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {developers.map((dev, idx) => (
            <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.2}s` }}>
              <DeveloperCard developer={dev} />
            </div>
          ))}
        </div>

        {/* Suggestion Box Section */}
        <div className="card rounded-xl p-8 shadow-lg max-w-2xl mx-auto border border-border animate-slide-up">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Share Your Suggestions
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="We'd love to hear your ideas to make CivicLens better!"
              className="w-full p-4 rounded-lg border border-border resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-all bg-input text-card-foreground placeholder:text-muted-foreground"
              rows={5}
            />
            <button
              type="submit"
              className="button-primary w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-105"
            >
              <Send size={20} />
              Submit Suggestion
            </button>
            {submitted && (
              <div
                className="p-3 rounded-lg text-center font-medium animate-fade-in bg-primary/10 text-primary border border-border"
              >
                ✓ Thank you for your suggestion!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
