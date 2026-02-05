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
      month: 'short',
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

        {/* Horizontal Scrolling Timeline - 9:16 Cards */}
        <div className="relative">
          {/* Gradient fades on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          {/* Scrollable container */}
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 px-4 md:px-8 snap-x snap-mandatory scrollbar-hide"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 snap-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-[200px] sm:w-[240px] md:w-[280px] bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl shadow-black/50 cursor-pointer"
                  style={{ aspectRatio: '9/16' }}
                >
                  {/* Full-height Image */}
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Badge - top left */}
                  <div className="absolute top-3 left-3 z-20">
                    <span
                      className={`px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full ${
                        badgeColors[event.badge]
                      }`}
                    >
                      {event.badge}
                    </span>
                  </div>

                  {/* Date - top right */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white/80 text-[10px] md:text-xs rounded-full">
                      {formatDate(event.date)}
                    </span>
                  </div>

                  {/* Text content - bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="font-display text-lg md:text-xl font-bold group-hover:text-[#e11d48] transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-white/70 mt-1 text-xs md:text-sm line-clamp-2">
                      {event.caption}
                    </p>
                  </div>

                  {/* Red glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#e11d48]/10 z-10" />

                  {/* Accent border on hover */}
                  <div className="absolute inset-0 border-2 border-[#e11d48] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-30" />
                </motion.div>
              </motion.div>
            ))}

            {/* "More coming" card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 snap-center"
            >
              <div
                className="w-[200px] sm:w-[240px] md:w-[280px] bg-[#1a1a1a]/50 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center"
                style={{ aspectRatio: '9/16' }}
              >
                <div className="w-16 h-16 rounded-full bg-[#e11d48]/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#e11d48]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm font-medium">Mehr folgt...</p>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mt-6 text-white/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-xs uppercase tracking-wider">Swipe</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
