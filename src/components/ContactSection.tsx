import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { PROFILE_MANIFEST } from '../data/profile_manifest';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const emailAddress = PROFILE_MANIFEST.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Dispatch from ${email}`,
          email: email,
          message: message,
          _template: 'box',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error('Email submission error:', err);
      setStatus('error');
      setErrorMessage('Direct transmission interrupted. You can dispatch via your local email client below.');
    }
  };

  const mailtoFallbackUrl = `mailto:${emailAddress}?subject=Connecting%20via%20Portfolio&body=${encodeURIComponent(
    `From: ${email}\n\n${message}`
  )}`;

  const isFormValid = email.trim().length > 0 && message.trim().length > 0;

  return (
    <section id="contact-handshake" className="py-20 sm:py-28 scroll-mt-20 px-6 md:px-12 max-w-3xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="text-[#B58E62] text-[11px] font-mono tracking-[0.25em] uppercase mb-3 font-medium">
          05 • DIRECT CHANNEL
        </div>

        <h2 className="font-serif-display text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight mb-4 font-normal">
          Let's Connect
        </h2>

        <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-xl mx-auto">
          I love diving into systems architecture and building fast backends from scratch, but the best part of engineering is the people you get to work with.
        </p>
      </div>

      {/* Open Architectural Form */}
      <div className="max-w-xl mx-auto">
        {status === 'success' ? (
          <div className="py-12 text-center space-y-4 animate-fade-in border-y border-white/10 my-4">
            <div className="w-12 h-12 rounded-full bg-[#B58E62]/10 border border-[#B58E62]/30 text-[#B58E62] flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif-display text-[#EAEAEA] tracking-tight">Dispatch Transmitted</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto font-sans font-light">
              Your message was routed directly to <span className="font-mono text-xs text-[#B58E62]">{emailAddress}</span>. I will review and reply shortly.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 px-4 py-2 text-xs font-mono tracking-wider uppercase text-gray-400 hover:text-white border-b border-dashed border-gray-600 hover:border-white transition-colors cursor-pointer"
            >
              ← Send another note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Email Field with Balanced Vertical Spacing */}
            <div className="group mb-10">
              <label
                htmlFor="contact-email"
                className="text-[#B58E62] text-[11px] font-mono tracking-[0.2em] uppercase font-medium mb-2 block transition-colors"
              >
                YOUR EMAIL <span className="text-[#B58E62]/70">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full py-3 bg-transparent border-b border-white/15 focus:border-[#B58E62] focus:outline-none transition-colors text-[#EAEAEA] placeholder:text-gray-600 font-sans text-base"
                disabled={status === 'submitting'}
              />
            </div>

            {/* Message Field with Balanced Vertical Spacing */}
            <div className="group mb-10">
              <label
                htmlFor="contact-message"
                className="text-[#B58E62] text-[11px] font-mono tracking-[0.2em] uppercase font-medium mb-2 block transition-colors"
              >
                MESSAGE <span className="text-[#B58E62]/70">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Ritwik, let's talk about..."
                className="w-full py-3 bg-transparent border-b border-white/15 focus:border-[#B58E62] focus:outline-none transition-colors text-[#EAEAEA] placeholder:text-gray-600 font-sans text-base resize-none leading-relaxed"
                disabled={status === 'submitting'}
              />
            </div>

            {/* Inline Error Notice if Network Fails */}
            {status === 'error' && (
              <div className="mb-8 p-3.5 bg-red-950/20 border border-red-500/20 rounded text-xs text-red-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span>{errorMessage}</span>
                  <div>
                    <a
                      href={mailtoFallbackUrl}
                      className="underline font-medium text-white hover:text-[#B58E62]"
                    >
                      Open default email client
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* High-Contrast Tactile Brushed Brass CTA */}
            <button
              id="send-message-button"
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full group py-4 px-6 rounded-md font-mono text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isFormValid
                  ? 'bg-[#B58E62] text-[#1A1A1D] hover:bg-[#C59E72] active:bg-[#A67F53] shadow-[#B58E62]/10 hover:shadow-lg'
                  : 'bg-[#B58E62] text-[#1A1A1D] opacity-90 hover:opacity-100'
              }`}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#1A1A1D]" />
                  <span>TRANSMITTING DISPATCH...</span>
                </>
              ) : (
                <>
                  <span>SEND DISPATCH</span>
                  <ArrowUpRight className="w-4 h-4 text-[#1A1A1D] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Seamless Single-Line Direct Email Fallback */}
        <div className="mt-10 text-center">
          <p className="text-xs font-mono text-gray-500">
            or reach out directly at{' '}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#B58E62] transition-colors cursor-pointer underline decoration-white/20 hover:decoration-[#B58E62] underline-offset-4"
              title="Click to copy email address"
            >
              <span className="text-[#EAEAEA] hover:text-[#B58E62]">{emailAddress}</span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-[#B58E62] font-semibold no-underline text-[11px] uppercase tracking-wider ml-1">
                  (copied <Check className="w-3 h-3 inline" />)
                </span>
              ) : (
                <span className="text-gray-500 hover:text-gray-400 text-[11px] no-underline">
                  (click to copy)
                </span>
              )}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
