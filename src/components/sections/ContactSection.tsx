import { useState } from 'react';
import { Copy, Mail, Phone, Linkedin, Github, Code2, Check } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import ContactButton from '../ui/ContactButton';
import { sendContact, isEmailJsConfigured } from '../../lib/emailjs';
import { PROFILE } from '../../data/profile';

interface InfoCard {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
  copyValue?: string;
}

const infoCards: InfoCard[] = [
  {
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: <Mail className="h-5 w-5" />,
    copyValue: PROFILE.email,
  },
  {
    label: 'WhatsApp',
    value: PROFILE.whatsapp,
    href: `https://wa.me/${PROFILE.whatsapp.replace(/\D/g, '')}`,
    icon: <Phone className="h-5 w-5" />,
    copyValue: PROFILE.whatsapp,
  },
  {
    label: 'LinkedIn',
    value: 'in/bikash-talukder-6497633b8',
    href: PROFILE.linkedin,
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    label: 'GitHub',
    value: 'github.com/bikash-20',
    href: PROFILE.github,
    icon: <Github className="h-5 w-5" />,
  },
  {
    label: 'LeetCode',
    value: 'leetcode.com/bikashtalukder',
    href: PROFILE.leetcode,
    icon: <Code2 className="h-5 w-5" />,
  },
];

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [copied, setCopied] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('sending');
    try {
      await sendContact({ name, email, message });
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const copy = (value: string, label: string) => {
    if (!value) return;
    navigator.clipboard?.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
    >
      <FadeIn delay={0} duration={0.7} y={30}>
        <h2 className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20" style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}>
          Contact
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Form */}
        <FadeIn delay={0.05} duration={0.7} y={20}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-3xl border border-[#D7E2EA]/15 bg-[#0C0C0C]/60 p-6 sm:p-8"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-widest text-[#D7E2EA]/60"
              >
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-[#D7E2EA]/15 bg-[#0C0C0C] px-4 py-3 text-[#D7E2EA] outline-none transition-colors focus:border-[#B600A8]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-widest text-[#D7E2EA]/60"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#D7E2EA]/15 bg-[#0C0C0C] px-4 py-3 text-[#D7E2EA] outline-none transition-colors focus:border-[#B600A8]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-widest text-[#D7E2EA]/60"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Tell me about your project…"
                className="w-full resize-none rounded-xl border border-[#D7E2EA]/15 bg-[#0C0C0C] px-4 py-3 text-[#D7E2EA] outline-none transition-colors focus:border-[#B600A8]"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-[11px] text-[#D7E2EA]/50">
                {isEmailJsConfigured()
                  ? 'Will send via EmailJS.'
                  : 'No EmailJS configured — opens your email client.'}
              </span>
              <ContactButton
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent);
                }}
                label={
                  status === 'sending'
                    ? 'Sending…'
                    : status === 'sent'
                      ? 'Sent ✓'
                      : 'Send Message'
                }
              />
            </div>
            {status === 'sent' && (
              <p className="text-xs text-emerald-300">
                Thanks! Your message is on its way.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-rose-300">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </FadeIn>

        {/* Info cards */}
        <FadeIn delay={0.15} duration={0.7} y={20}>
          <div className="flex flex-col gap-3">
            {infoCards.map((c) => (
              <div
                key={c.label}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C]/60 p-4 transition-colors hover:border-[#D7E2EA]/30"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[#D7E2EA]/10 text-[#D7E2EA]">
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="truncate text-sm font-medium text-[#D7E2EA] hover:underline"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="truncate text-sm text-[#D7E2EA]">
                        {c.value}
                      </span>
                    )}
                  </div>
                </div>
                {c.copyValue && (
                  <button
                    type="button"
                    onClick={() => copy(c.copyValue!, c.label)}
                    className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[#D7E2EA]/15 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
                    aria-label={`Copy ${c.label}`}
                  >
                    {copied === c.label ? (
                      <Check className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            ))}

            <div className="mt-4 flex justify-center">
              <ContactButton
                href={`mailto:${PROFILE.email}?subject=Hi%20Bikash%2C%20let%27s%20build%20something`}
                label="Hire Me"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      <footer className="mt-20 flex flex-col items-center gap-2 text-center text-xs text-[#D7E2EA]/40">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind &
          Framer Motion.
        </span>
        <span>Designed and engineered in Sylhet, Bangladesh.</span>
      </footer>
    </section>
  );
}
