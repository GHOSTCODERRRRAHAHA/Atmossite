import { Link } from "react-router-dom";
import { Linkedin, Instagram, ShieldCheck, Info, FileText, BookOpen, Mail, X } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "@/components/ui/sonner";

export default function Footer() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const [showContact, setShowContact] = useState(false);

  const handleLinkedInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear the form fields
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
    // Notify the user
    toast("Thank you for contacting the Atmos team.");
    // Scroll to top for confirmation context on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Close modal
    setShowContact(false);
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 items-start md:items-center">
        {/* Logo/Brand */}
        <div className="flex flex-col gap-2 min-w-[160px]">
          <span className="text-2xl font-black tracking-tight">ATMOS</span>
          <span className="text-xs text-gray-500">© {new Date().getFullYear()} Atmos Technologies, Inc.</span>
        </div>
        <div className="hidden md:block h-12 border-l border-gray-200 mx-8"></div>
        {/* Columns */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Connect */}
          <div>
            <div className="font-semibold text-black mb-2 text-sm">Connect</div>
            <ul className="space-y-2">
              <li>
                <a href="#" onClick={handleLinkedInClick} className="flex items-center gap-2 hover:text-blue-700 transition text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-pink-500 transition text-sm">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
            </ul>
          </div>
          {/* Explore */}
          <div>
            <div className="font-semibold text-black mb-2 text-sm">Explore</div>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-black transition text-sm">
                  <Info className="w-4 h-4" /> About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 hover:text-black transition text-sm">
                  <BookOpen className="w-4 h-4" /> FAQ
                </Link>
              </li>
              <li>
                <Link to="/purchase" className="flex items-center gap-2 hover:text-black transition text-sm">
                  <ShieldCheck className="w-4 h-4" /> Configure
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <div className="font-semibold text-black mb-2 text-sm">Legal</div>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="flex items-center gap-2 hover:text-black transition text-sm">
                  <FileText className="w-4 h-4" /> Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="flex items-center gap-2 hover:text-black transition text-sm">
                  <FileText className="w-4 h-4" /> Privacy
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <div className="font-semibold text-black mb-2 text-sm">Contact</div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => setShowContact(true)}
                  className="flex items-center gap-2 hover:text-black transition text-sm"
                >
                  <Mail className="w-4 h-4" /> Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowContact(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowContact(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-black mb-4">Contact Us</h3>
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <input
                ref={nameRef}
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                required
              />
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                required
              />
              <textarea
                ref={messageRef}
                name="message"
                placeholder="How can we help?"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black/10"
                required
              />
              <button
                type="submit"
                className="w-full rounded-md bg-black text-white text-sm font-medium px-3 py-2 hover:bg-black/90 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
} 