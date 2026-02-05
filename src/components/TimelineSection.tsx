'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { TimelineEvent } from '@/lib/mockData';

interface TimelineSectionProps {
  events: TimelineEvent[];
}

const badgeColors: Record<TimelineEvent['badge'], string> = {
  LIVE: 'bg-[#e11d48] text-white',
  REHEARSAL: 'bg-amber-500 text-black',
  STUDIO: 'bg-purple-500 text-white',
  BACKSTAGE: 'bg-zinc-600 text-white',
};

export default function TimelineSection({ events }: TimelineSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#e11d48] text-sm uppercase tracking-[0.3em] font-medium">
            Unsere Geschichte
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase mt-4">
            Rock Timeline
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e11d48] via-[#e11d48]/50 to-transparent md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-24">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#e11d48] rounded-full border-4 border-[#0a0a0a] md:-translate-x-1/2 z-10 shadow-lg shadow-[#e11d48]/50" />

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                      isEven ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl shadow-black/50"
                    >
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />

                        {/* Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                              badgeColors[event.badge]
                            }`}
                          >
                            {event.badge}
                          </span>
                        </div>

                        {/* Red glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#e11d48]/10" />
                      </div>

                      {/* Text content */}
                      <div className="p-6">
                        <span className="text-[#a1a1aa] text-sm">
                          {formatDate(event.date)}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-bold mt-1 group-hover:text-[#e11d48] transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-white/70 mt-2 text-sm md:text-base">
                          {event.caption}
                        </p>
                      </div>

                      {/* Accent border on hover */}
                      <div className="absolute inset-0 border-2 border-[#e11d48] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </div>

          {/* End decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute left-4 md:left-1/2 -bottom-4 md:-translate-x-1/2 flex flex-col items-center"
          >
            <div className="w-3 h-3 bg-[#e11d48]/50 rounded-full" />
            <div className="w-2 h-2 bg-[#e11d48]/30 rounded-full mt-2" />
            <div className="w-1 h-1 bg-[#e11d48]/20 rounded-full mt-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
