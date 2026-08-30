'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Link, MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeading from '@/components/ui/SectionHeading';

const EMAIL = 'nguyentinhdn0507@gmail.com';
const PHONE = '+84906050793';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nguyentinh0507/';

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const contactItems = [
    {
      icon: Mail,
      label: c.emailLabel,
      value: EMAIL,
      action: () => copyToClipboard(EMAIL, 'email'),
      actionLabel: copiedField === 'email' ? c.copied : c.copyEmail,
      actionIcon: copiedField === 'email' ? Check : Copy,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: Phone,
      label: c.phoneLabel,
      value: PHONE,
      action: () => copyToClipboard(PHONE, 'phone'),
      actionLabel: copiedField === 'phone' ? c.copied : c.copyPhone,
      actionIcon: copiedField === 'phone' ? Check : Copy,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: MapPin,
      label: c.locationLabel,
      value: c.locationValue,
      action: undefined,
      actionLabel: '',
      actionIcon: null,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10',
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const ActionIcon = item.actionIcon;
            return (
              <motion.div
                key={i}
                className="glass-card rounded-2xl p-5 text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-3 break-all">{item.value}</p>
                {item.action && ActionIcon && (
                  <button
                    onClick={item.action}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[var(--border-glass)] hover:border-[var(--accent-cyan)]/50 transition-all cursor-pointer ${
                      copiedField ? 'text-emerald-500' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    <ActionIcon className="w-3.5 h-3.5" /> {item.actionLabel}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href={`mailto:${EMAIL}`}
            className="glow-btn-primary px-6 py-3 rounded-xl text-white text-sm font-semibold inline-flex items-center gap-2 no-underline"
          >
            <Mail className="w-4 h-4" /> {c.sendEmailCta}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl text-sm font-semibold border border-[var(--border-glass)] text-[var(--text-primary)] hover:border-blue-500/50 hover:bg-blue-500/5 transition-all inline-flex items-center gap-2 no-underline"
          >
            <Link className="w-4 h-4" /> {c.connectLinkedIn} <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </motion.div>

        {/* Availability */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {c.availabilityTitle}: {c.availabilityDesc}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
