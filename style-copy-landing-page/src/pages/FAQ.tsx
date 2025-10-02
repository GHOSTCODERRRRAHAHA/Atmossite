import { useState } from "react";
import { Zap, Mic, Shield, Camera, Droplet, Lock, Truck, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqData = [
  {
    section: "General Product",
    icon: <Zap className="w-6 h-6 text-indigo-500" />,
    faqs: [
      {
        q: "What is Atmos Halo and how is it different from a smartwatch?",
        a: "Atmos Halo is an AI-powered wearable designed for intelligence, not apps. Unlike traditional smartwatches, it focuses on voice-first interaction, environmental awareness, and real-world functionality, without a screen.",
      },
      {
        q: "What's the difference between Atmos Halo and Atmos Lucid?",
        a: "Lucid is our premium model with the same core AI as Halo, but crafted from rare materials and produced in limited, serialized batches. It's built for collectors and those who demand more.",
      },
    ],
  },
  {
    section: "AI & Features",
    icon: <Mic className="w-6 h-6 text-green-600" />,
    faqs: [
      {
        q: "How does Atmos Listen™ work?",
        a: "Just say \"Atmos, listen\" to activate real-time voice translation in 25+ languages. Atmos transcribes, translates, and can speak back in natural, lifelike voices, making conversations seamless anywhere in the world.",
      },
      {
        q: "What is Atmos Shield™?",
        a: "Atmos Shield is your invisible layer of protection. A tap or voice command alerts your emergency contacts, shares your live location, and activates audio monitoring.",
      },
      {
        q: "Does Atmos have a display?",
        a: "Atmos features a subtle, screenless light-strip interface. It's designed for low-distraction, intelligent feedback, so you stay present in the real world.",
      },
      {
        q: "Can Atmos tell me about things I point at?",
        a: "Yes. With the \"Ask the World\" camera, you can point at anything, objects, signs, places, and Atmos will identify or explain what it sees in real time.",
      },
    ],
  },
  {
    section: "Design & Materials",
    icon: <Droplet className="w-6 h-6 text-blue-400" />,
    faqs: [
      {
        q: "Is Atmos waterproof?",
        a: "Atmos is water-resistant and built for daily wear, rain, and sweat. Full submersion is not recommended at this time.",
      },
      {
        q: "What materials is the band made from?",
        a: "The Halo band uses soft-touch polymers with color-matched AI displays. Lucid editions offer ceramic, sapphire, and carbon fiber finishes.",
      },
      {
        q: "How long does the battery last?",
        a: "Atmos Halo lasts 2-3 days on typical use. Lucid models include performance tuning for up to 20% longer battery life.",
      },
    ],
  },
  {
    section: "Privacy & Security",
    icon: <Lock className="w-6 h-6 text-gray-700" />,
    faqs: [
      {
        q: "Is Atmos always listening to me?",
        a: "No. Atmos only activates when you say the wake phrase or press the button. All voice data is processed securely and never sold or shared.",
      },
      {
        q: "Can I turn off translation, camera, or Shield?",
        a: "Yes, all features are opt-in and fully controllable through your settings or by voice.",
      },
    ],
  },
  {
    section: "Shipping, Returns, and Support",
    icon: <Truck className="w-6 h-6 text-orange-500" />,
    faqs: [
      {
        q: "When will my Atmos band ship?",
        a: "First public batch begins shipping late 2025. Orders are fulfilled on a first-come, first-served basis.",
      },
      {
        q: "Do you offer warranty or returns?",
        a: "Yes. All Atmos products come with a 1-year limited warranty and 30-day return policy.",
      },
      {
        q: "Can I update Atmos with new features?",
        a: "Yes. Atmos receives regular OTA (over-the-air) updates to improve AI performance, add languages, and unlock new features.",
      },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<{ section: number; q: number } | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-inter py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-500 hover:to-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Back to Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
          Home
        </button>
        <h1 className="text-4xl sm:text-5xl font-bold text-black mb-12 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Frequently Asked Questions
        </h1>
        <div className="space-y-10">
          {faqData.map((section, i) => (
            <div key={section.section} className="rounded-2xl bg-gray-50 p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                {section.icon}
                <span className="text-lg font-semibold text-black">{section.section}</span>
              </div>
              <div className="divide-y divide-gray-200">
                {section.faqs.map((faq, j) => {
                  const isOpen = open?.section === i && open.q === j;
                  return (
                    <div key={faq.q}>
                      <button
                        className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                        onClick={() => setOpen(isOpen ? null : { section: i, q: j })}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${i}-${j}`}
                      >
                        <span className="font-medium text-black group-hover:text-blue-700 transition">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {isOpen && (
                        <div
                          id={`faq-${i}-${j}`}
                          className="pb-4 text-gray-700 animate-fade-in"
                        >
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 