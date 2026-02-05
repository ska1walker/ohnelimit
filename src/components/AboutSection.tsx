'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { bandInfo, bandHistory, bandMembers } from '@/lib/mockData';

export default function AboutSection() {
  return (
    <section id="band" className="py-20 md:py-32 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
      <div className="container mx-auto px-4">
        {/* Über uns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#e11d48] text-sm uppercase tracking-[0.3em] font-medium">
            Wer wir sind
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase mt-4">
            Über uns
          </h2>
        </motion.div>

        {/* Band Description */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {bandInfo.description}
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              {bandInfo.style}
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              {bandInfo.sound}
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              {bandInfo.musicalElements}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-[#e11d48] font-bold italic"
            >
              {bandInfo.unique}
            </motion.p>
          </motion.div>
        </div>

        {/* Unsere Geschichte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <h3 className="font-display text-3xl md:text-4xl font-bold text-[#e11d48] mb-6">
            {bandHistory.title}
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed italic">
            "{bandHistory.story}"
          </p>
        </motion.div>

        {/* Band Members Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-3xl md:text-5xl font-black uppercase">
            Die Bandmitglieder
          </h3>
        </motion.div>

        {/* Band Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {bandMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-[#d4a953]/30 group-hover:border-[#e11d48] transition-colors">
                {/* Placeholder gradient when no image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />

                {/* Member silhouette placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-white/20 group-hover:text-[#e11d48]/30 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#e11d48]/0 group-hover:bg-[#e11d48]/20 transition-colors" />
              </div>

              {/* Member info */}
              <div className="mt-3 text-center">
                <h4 className="font-bold text-sm md:text-base group-hover:text-[#e11d48] transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs md:text-sm text-white/60 mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <span className="block font-display text-4xl md:text-5xl font-black text-[#e11d48]">6</span>
            <span className="text-white/60 text-sm uppercase tracking-wider">Mitglieder</span>
          </div>
          <div className="text-center">
            <span className="block font-display text-4xl md:text-5xl font-black text-[#e11d48]">2022</span>
            <span className="text-white/60 text-sm uppercase tracking-wider">Gegründet</span>
          </div>
          <div className="text-center">
            <span className="block font-display text-4xl md:text-5xl font-black text-[#e11d48]">2</span>
            <span className="text-white/60 text-sm uppercase tracking-wider">Sänger</span>
          </div>
          <div className="text-center">
            <span className="block font-display text-4xl md:text-5xl font-black text-[#e11d48]">∞</span>
            <span className="text-white/60 text-sm uppercase tracking-wider">Energie</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
