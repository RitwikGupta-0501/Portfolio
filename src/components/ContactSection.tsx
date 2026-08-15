import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'ritwikg.205@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact-handshake" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-white/[0.08] shadow-2xl relative overflow-hidden text-center space-y-8 bg-[#222226]">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 font-medium tracking-wider">
            <Mail className="w-3.5 h-3.5 text-[#C59458]" />
            <span>05 // DIRECT CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Contact
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto pt-1">
            I love diving into systems architecture and building fast backends from scratch, but the best part of engineering is the people you get to work with. I’m currently looking for new grad roles, open to cool projects, or simply taking a screen break over a virtual chai to swap favorite movies and shows. My inbox is always open—hit me up!
          </p>
        </div>

        {/* Email Address in Rectangular Box with Simple Icon-Only Copy Button */}
        <div className="max-w-md mx-auto pt-2">
          <div className="bg-[#18181B] border border-white/10 hover:border-white/20 rounded-xl p-3 flex items-center justify-between gap-3 transition-all">
            <div className="flex items-center gap-3 pl-2 min-w-0">
              <div className="p-2 bg-white/[0.05] border border-white/10 rounded-lg text-[#C59458] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-mono text-sm sm:text-base font-semibold text-white truncate select-all">
                {emailAddress}
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              title={copied ? "Copied!" : "Copy email address"}
              aria-label="Copy email address"
              className={`p-2.5 rounded-lg border transition-all shrink-0 flex items-center justify-center ${
                copied
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-[#242428] border-white/10 text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {copied && (
            <p className="text-xs font-mono text-emerald-400 mt-2 text-center">
              ✓ Email copied to clipboard
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

