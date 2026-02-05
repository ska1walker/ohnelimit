// Ohne Limit Band Website - Real Data from ohnelimit.net

// High-quality Unsplash images (placeholder until real images uploaded)
export const images = {
  hero: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80',
  heroAlt: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80',
  crowdSilhouette: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1920&q=80',
  guitarStage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=80',
  drumKit: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1200&q=80',
  bandLive: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
};

// Band info from ohnelimit.net
export const bandInfo = {
  name: 'OHNE LIMIT',
  founded: 2022,
  memberCount: 6,
  genre: 'Postgrunge / Rock / Punkrock',
  motto: 'OHNE LIMIT',
  tagline: 'Hart. Laut. Unaufhaltsam.',
  description: `Wir sind eine sechsköpfige Rockband im "klassischen" Line-Up mit 2 Gitarren, Bass und Drums, allerdings mit dem „Luxus" von zwei Sängern. In der aktuellen Besetzung rocken wir seit dem Jahr 2022.`,
  style: `Wir kombinieren unsere "handgemachte", schnörkellose, puristische und kraftvolle Rockmusik mit deutschen Texten, die von eigenen Erlebnissen, von Höhen und Tiefen, sowie von besonderen Momenten des täglichen Lebens erzählen.`,
  sound: `Stilistisch sind wir am ehesten dem Postgrunge zuzuordnen, jedoch ohne darauf festgelegt zu sein. Wir sind "ohne Limit" und offen für alle stilistischen Elemente und Facetten der Rock- und Punkrockmusik.`,
  musicalElements: `Prägnante musikalische Stilelemente sind treibende und basslastige Beats mit druckvollem Gitarrensound. Die zum Teil metal-lastigen Gitarrenriffs im Wechsel mit melodiösen und cleanen Gitarrenparts bilden zusammen mit den dynamisch wechselnden Gesangsparts den aus dem Postgrunge bekannten Sound.`,
  unique: `Dennoch etablieren wir einen eigenen und unverkennbaren Sound und sind auch immer für Stilelemente aus anderen Musik-Genres offen, getreu unserem Band-Motto: "OHNE LIMIT"`,
};

// Band history from ohnelimit.net
export const bandHistory = {
  title: 'Unsere Geschichte',
  story: `Es begab sich eines Tages, dass sich zwei Männer an einer Bar trafen und viele Tequilas gemeinsam vernichteten. Am Ende wurde ein Entschluss gefasst: "Lass uns gemeinsam Musik machen..." Das Ergebnis war OHNE LIMIT.`,
};

// Real band members from ohnelimit.net
export const bandMembers = [
  {
    id: 1,
    name: 'Andy "Bassomator"',
    role: 'Gründer und Songwriter, Bassist',
    image: '/images/members/andy.jpg', // Placeholder - needs real image
    bio: 'Gründungsmitglied und treibende Kraft am Bass.',
  },
  {
    id: 2,
    name: 'Chris "Gitarrero"',
    role: 'Gründer und Songwriter, Leadgitarre',
    image: '/images/members/chris.jpg',
    bio: 'Gründungsmitglied mit den melodiösen und metal-lastigen Riffs.',
  },
  {
    id: 3,
    name: 'Björn "The Drummachine"',
    role: 'Drummer und Taktgeber',
    image: '/images/members/bjoern.jpg',
    bio: 'Der Taktgeber mit den treibenden und basslastigen Beats.',
  },
  {
    id: 4,
    name: 'Matthias "Matze"',
    role: 'Sänger, Keyboard und Techniker',
    image: '/images/members/matthias.jpg',
    bio: 'Vielseitiger Sänger mit technischem Know-how.',
  },
  {
    id: 5,
    name: 'Florian "Flo"',
    role: 'Rhythmusgitarre',
    image: '/images/members/florian.jpg',
    bio: 'Sorgt für den druckvollen Gitarrensound.',
  },
  {
    id: 6,
    name: 'Joachim "Joaquín"',
    role: 'Sänger und Songwriter',
    image: '/images/members/joachim.jpg',
    bio: 'Zweiter Sänger mit kraftvoller Stimme und Texten aus dem Leben.',
  },
];

// Gallery images
export const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80',
    alt: 'Live concert crowd',
    caption: 'Berlin Arena - Summer Tour 2024',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80',
    alt: 'Stage performance',
    caption: 'Hamburg Rockfest',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    alt: 'Guitar closeup on stage',
    caption: 'Munich Open Air',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1508252592163-5d3c3c559f36?w=800&q=80',
    alt: 'Drum performance',
    caption: 'Köln Underground',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
    alt: 'Festival stage lights',
    caption: 'Rock am Ring 2024',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1571609227073-2a3a3ccc0d40?w=800&q=80',
    alt: 'Band backstage',
    caption: 'Backstage moments',
  },
];

// Tour dates
export interface TourDate {
  id: number;
  date: string;
  city: string;
  venue: string;
  ticketLink: string;
  soldOut?: boolean;
}

export const tourDates: TourDate[] = [
  {
    id: 1,
    date: '2025-03-15',
    city: 'Berlin',
    venue: 'Mercedes-Benz Arena',
    ticketLink: '#tickets',
    soldOut: false,
  },
  {
    id: 2,
    date: '2025-03-22',
    city: 'Hamburg',
    venue: 'Barclays Arena',
    ticketLink: '#tickets',
    soldOut: false,
  },
  {
    id: 3,
    date: '2025-04-05',
    city: 'München',
    venue: 'Olympiahalle',
    ticketLink: '#tickets',
    soldOut: true,
  },
  {
    id: 4,
    date: '2025-04-12',
    city: 'Köln',
    venue: 'Lanxess Arena',
    ticketLink: '#tickets',
    soldOut: false,
  },
  {
    id: 5,
    date: '2025-04-19',
    city: 'Frankfurt',
    venue: 'Festhalle',
    ticketLink: '#tickets',
    soldOut: false,
  },
  {
    id: 6,
    date: '2025-05-03',
    city: 'Stuttgart',
    venue: 'Schleyerhalle',
    ticketLink: '#tickets',
    soldOut: false,
  },
];

// Songs data with public domain audio
export interface Song {
  id: number;
  title: string;
  duration: string;
  durationSeconds: number;
  coverArt: string;
  audioUrl: string;
}

export const songs: Song[] = [
  {
    id: 1,
    title: 'Ohne Limit (Demo)',
    duration: '3:45',
    durationSeconds: 225,
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80',
    // Public domain rock audio from Internet Archive
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Feuer & Flamme',
    duration: '4:12',
    durationSeconds: 252,
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Nachtschicht',
    duration: '3:58',
    durationSeconds: 238,
    coverArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 4,
    title: 'Rebellion',
    duration: '5:01',
    durationSeconds: 301,
    coverArt: 'https://images.unsplash.com/photo-1508252592163-5d3c3c559f36?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 5,
    title: 'Stadtlichter',
    duration: '4:33',
    durationSeconds: 273,
    coverArt: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
];

// News/Updates
export interface NewsItem {
  id: number;
  headline: string;
  date: string;
  snippet: string;
  slug: string;
}

export const news: NewsItem[] = [
  {
    id: 1,
    headline: 'Neue Single "Ohne Limit" ab sofort verfügbar!',
    date: '2025-02-01',
    snippet: 'Nach monatelanger Studioarbeit ist unsere neue Single endlich da. Hört jetzt rein und lasst euch von den harten Riffs mitreißen!',
    slug: 'neue-single-ohne-limit',
  },
  {
    id: 2,
    headline: 'Tour 2025 Ankündigung - Wir kommen!',
    date: '2025-01-15',
    snippet: 'Die Wartezeit hat ein Ende! Ab März 2025 rocken wir die größten Hallen Deutschlands. Tickets ab sofort erhältlich.',
    slug: 'tour-2025-ankuendigung',
  },
  {
    id: 3,
    headline: 'Backstage Video: Making of "Feuer & Flamme"',
    date: '2024-12-20',
    snippet: 'Exklusive Einblicke in die Entstehung unseres neuesten Musikvideos. Seht wie der Funke überspringt!',
    slug: 'making-of-feuer-flamme',
  },
  {
    id: 4,
    headline: 'Rock am Ring 2025 - Wir sind dabei!',
    date: '2024-11-30',
    snippet: 'Es ist offiziell: Ohne Limit wird auf dem Rock am Ring 2025 die Bühne zum Beben bringen!',
    slug: 'rock-am-ring-2025',
  },
];

// Social links (real from ohnelimit.net)
export const socialLinks = {
  facebook: 'https://facebook.com/ohnelimitband',
  instagram: 'https://instagram.com/ohnelimit',
  spotify: 'https://open.spotify.com/artist/ohnelimit',
  youtube: 'https://youtube.com/@ohnelimit',
};

// Contact info (real from ohnelimit.net)
export const contactInfo = {
  email: 'ohnelimitband@googlemail.com',
  booking: 'ohnelimitband@googlemail.com',
};

// Timeline events for band history
export interface TimelineEvent {
  id: number;
  date: string;
  badge: 'LIVE' | 'REHEARSAL' | 'STUDIO' | 'BACKSTAGE';
  title: string;
  caption: string;
  image: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: '2024-12-15',
    badge: 'LIVE',
    title: 'Berlin Arena Premiere',
    caption: 'Unser erster ausverkaufter Arena-Gig. 15.000 Menschen singen unsere Songs.',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80',
  },
  {
    id: 2,
    date: '2024-10-28',
    badge: 'BACKSTAGE',
    title: 'Vor dem Sturm',
    caption: 'Letzte Momente der Ruhe bevor wir auf die Bühne stürmen. Matschig, aber bereit.',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&q=80',
  },
  {
    id: 3,
    date: '2024-08-05',
    badge: 'STUDIO',
    title: 'Recording Sessions',
    caption: 'Drei Wochen im Studio. Kein Schlaf. Viel Kaffee. Noch mehr Rock.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
  },
  {
    id: 4,
    date: '2024-05-20',
    badge: 'REHEARSAL',
    title: 'Proberaum Sessions',
    caption: 'Hier entstehen die neuen Songs. Roh, laut und ungefiltert.',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&q=80',
  },
  {
    id: 5,
    date: '2024-03-10',
    badge: 'LIVE',
    title: 'Hamburg Underground',
    caption: 'Kleine Bühne, große Energie. 200 Menschen in einem Keller.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
  },
];
