import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { PROFILE_MANIFEST } from '../data/profile_manifest';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = PROFILE_MANIFEST.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact-handshake" className="py-16 sm:py-20 scroll-mt-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
      {/* Eyebrow in Tracked-out Bronze/Brass Monospace */}
      <div className="text-[#C59458] text-xs font-mono tracking-[0.2em] uppercase mb-2 font-medium">
        05 • DIRECT CHANNEL
      </div>

      {/* Serif Title Anchor */}
      <h2 className="font-serif-display text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight mb-6 font-normal">
        Let's Connect
      </h2>

      {/* Refined Editorial Body Copy */}
      <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
        I love diving into systems architecture and building fast backends from scratch, but the best part of engineering is the people you get to work with. Open to new grad roles, collaborative projects, or just grabbing a virtual chai to swap movie recommendations.
      </p>

      {/* Tactile Monolithic Click-to-Copy Pill */}
      <div className="flex justify-center">
        <button
          onClick={handleCopyEmail}
          className={`inline-flex items-center gap-3 sm:gap-3.5 px-6 sm:px-7 py-3.5 rounded-full border transition-all duration-200 cursor-pointer select-none group shadow-sm ${
            copied
              ? 'bg-[#18261E] border-emerald-500/40 text-emerald-300'
              : 'bg-[#242427] border-white/10 hover:border-[#C59458]/40 hover:bg-[#2B2B30] text-[#EAEAEA]'
          }`}
          title="Click to copy email address"
          aria-label="Click to copy email address"
        >
          <Mail
            className={`w-4 h-4 transition-colors ${
              copied ? 'text-emerald-400' : 'text-gray-400 group-hover:text-[#C59458]'
            }`}
          />
          <span className="font-mono text-sm sm:text-base font-medium tracking-wide">
            {emailAddress}
          </span>
          <span className="text-white/20 font-mono text-xs">•</span>
          <span
            className={`text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 ${
              copied ? 'text-emerald-400' : 'text-gray-400 group-hover:text-[#C59458]'
            }`}
          >
            {copied ? (
              <>
                <span>COPIED</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </>
            ) : (
              <span>COPY</span>
            )}
          </span>
        </button>
      </div>
    </section>
  );
};
