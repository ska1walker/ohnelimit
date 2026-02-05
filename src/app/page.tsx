'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TimelineSection from '@/components/TimelineSection';
import TourDatesSection from '@/components/TourDatesSection';
import StickyAudioPlayer from '@/components/StickyAudioPlayer';
import { images, tourDates, songs, timelineEvents } from '@/lib/mockData';

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection heroImage={images.hero} />

      {/* Timeline Section */}
      <TimelineSection events={timelineEvents} />

      {/* Tour Dates Section */}
      <TourDatesSection tourDates={tourDates} />

      {/* Sticky Audio Player - Always visible at bottom */}
      <StickyAudioPlayer song={songs[0]} />
    </main>
  );
}
