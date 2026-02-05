'use client';

import { motion } from 'framer-motion';
import type { TourDate } from '@/lib/mockData';

interface TourDatesSectionProps {
  tourDates: TourDate[];
}

export default function TourDatesSection({ tourDates }: TourDatesSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase(),
      year: date.getFullYear(),
    };
  };

  return (
    <section id="tour" className="py-20 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#e11d48] text-sm uppercase tracking-[0.3em] font-medium">
            Live erleben
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase mt-4">
            Tour 2025
          </h2>
        </motion.div>

        {/* Tour dates list */}
        <div className="max-w-4xl mx-auto space-y-4">
          {tourDates.map((tour, index) => {
            const date = formatDate(tour.date);
            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col sm:flex-row items-stretch bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#242424] transition-colors">
                  {/* Date */}
                  <div className="flex sm:flex-col items-center justify-center gap-2 sm:gap-0 px-6 py-4 sm:py-6 bg-[#e11d48]/10 sm:w-24">
                    <span className="text-2xl sm:text-3xl font-display font-black text-[#e11d48]">
                      {date.day}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white/60">
                      {date.month}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
                    <div>
                      <h3 className="text-xl font-bold">{tour.city}</h3>
                      <p className="text-white/60">{tour.venue}</p>
                    </div>

                    {/* CTA */}
                    {tour.soldOut ? (
                      <span className="px-6 py-2 bg-white/10 text-white/40 font-bold uppercase tracking-wide text-sm rounded-lg cursor-not-allowed">
                        Ausverkauft
                      </span>
                    ) : (
                      <motion.a
                        href={tour.ticketLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-[#e11d48] hover:bg-[#be123c] font-bold uppercase tracking-wide text-sm rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {tour.venue}
                      </motion.a>
                    )}
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e11d48] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* More dates CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#alle-termine"
            className="inline-flex items-center gap-2 text-[#e11d48] hover:text-white transition-colors font-medium"
          >
            Alle Termine anzeigen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
