/**
 * SEO metadata for static pages. Titles ≤ 60 characters, descriptions 140–160.
 * `og` controls the generated social card at /og/<key>.jpg.
 */
export type PageMeta = {
  path: string;
  title: string;
  description: string;
  og: { title: string; eyebrow?: string; portrait?: string; accent?: 'clinic' | 'animals' | 'planet' | 'media' };
  llms?: string; // one-line description for llms.txt
};

export const pages = {
  home: {
    path: '/',
    title: 'Dr Kartini Farah Rahim | Consultant Dermatologist, Shah Alam',
    description:
      'Dr Kartini Farah Rahim is a Consultant Dermatologist in Shah Alam treating eczema, psoriasis, acne and children’s skin at Avisena. WhatsApp to book.',
    og: { title: 'Consultant Dermatologist. Educator. Advocate for People, Animals & the Planet.', portrait: 'portraits/dr-kartini-farah-rahim-dermatologist-shah-alam.jpg' },
    llms: 'Home page: who Dr Kartini is, where she practises, and her three advocacy pillars.',
  },
  about: {
    path: '/about-dr-kartini/',
    title: 'About Dr Kartini Farah Rahim | Consultant Dermatologist',
    description:
      'Meet Dr Kartini Farah Rahim: NSR-registered Consultant Dermatologist, former UPM Senior Lecturer, MRCP (UK), FAADV, and advocate for animals and the planet.',
    og: { title: 'About Dr Kartini Farah Rahim', eyebrow: 'Consultant Dermatologist, Shah Alam', portrait: 'portraits/dr-kartini-farah-rahim-at-desk.jpg' },
    llms: 'Master entity page: full biography, training, career, clinical focus, affiliations, media and community work.',
  },
  story: {
    path: '/beyond-skin/',
    title: 'Beyond Skin: The Story of Dr Kartini Farah Rahim',
    description:
      'The story of Dr Kartini Farah Rahim, a Malaysian dermatologist who believes caring for people should extend beyond the clinic, to animals and the planet.',
    og: { title: 'Beyond Skin: The Story of Dr Kartini', eyebrow: 'Care beyond pores and skin', portrait: 'portraits/dr-kartini-farah-rahim-baju-kurung-stethoscope.jpg', accent: 'media' },
    llms: 'Personal brand story: her namesake, values, and how dermatology connects to people, animals, environment and community.',
  },
  credentials: {
    path: '/credentials/',
    title: 'Dr Kartini’s Qualifications & Specialist Registration',
    description:
      'Verify Dr Kartini Farah Rahim’s credentials: MMC No. 43483, National Specialist Register No. 128619, MRCP (UK), Advanced Master of Dermatology (UKM), FAADV.',
    og: { title: 'Qualifications & Specialist Registration', portrait: 'portraits/dr-kartini-farah-rahim-seated-portrait.jpg' },
    llms: 'Verifiable credentials: medical degrees, memberships, fellowships and MMC, NSR and GMC registration numbers.',
  },
  dermatologistMalaysia: {
    path: '/dermatologist-malaysia/',
    title: 'Consultant Dermatologist in Malaysia | Dr Kartini, Shah Alam',
    description:
      'Looking for a consultant dermatologist in Malaysia? Dr Kartini Farah Rahim treats adults and children with skin, hair and nail conditions in Shah Alam.',
    og: { title: 'Consultant Dermatologist in Malaysia', eyebrow: 'Shah Alam, Selangor', portrait: 'portraits/dr-kartini-farah-rahim-white-blazer.jpg' },
    llms: 'Main dermatology pillar page: what a consultant dermatologist does, conditions treated, how to book in Shah Alam.',
  },
  dermatology: {
    path: '/dermatology/',
    title: 'Skin Conditions Treated | Dr Kartini, Dermatologist Malaysia',
    description:
      'Guides to acne, eczema, psoriasis, skin allergies, infections, blistering disorders and children’s skin conditions, reviewed by Dr Kartini Farah Rahim.',
    og: { title: 'Skin Conditions: Patient Guides', eyebrow: 'Reviewed by a Consultant Dermatologist', portrait: 'portraits/dr-kartini-farah-rahim-scrubs.jpg' },
    llms: 'Hub of dermatology condition guides.',
  },
  appointments: {
    path: '/appointments/',
    title: 'Book a Dermatologist Appointment in Shah Alam | Dr Kartini',
    description:
      'Clinic hours, locations and how to book an appointment with Consultant Dermatologist Dr Kartini Farah Rahim at Avisena hospitals in Shah Alam, Selangor.',
    og: { title: 'Book an Appointment with Dr Kartini', eyebrow: 'Avisena hospitals, Shah Alam', portrait: 'portraits/dr-kartini-farah-rahim-dermatologist-shah-alam.jpg' },
    llms: 'Clinic sessions at both Avisena hospitals, addresses, phone and WhatsApp booking.',
  },
  animalWelfare: {
    path: '/animal-welfare/',
    title: 'Dr Kartini & Animal Welfare: Compassion Beyond the Clinic',
    description:
      'Dermatologist Dr Kartini Farah Rahim rescues cats and dogs, serves on the board of Filbert’s Foundation for Furry Friends and speaks up for humane stray care.',
    og: { title: 'Animal Welfare: Compassion Beyond the Clinic', eyebrow: 'Board Member, Filbert’s Foundation for Furry Friends', portrait: 'animal-welfare/dr-kartini-animal-rescuer-with-cat.jpg', accent: 'animals' },
    llms: 'Animal welfare pillar: rescue work, F3 board role, humane stray population management (TNVR), advocacy and media.',
  },
  community: {
    path: '/community/',
    title: 'Dr Kartini in the Community: Beyond the Clinic',
    description:
      'Beyond dermatology, Dr Kartini Farah Rahim volunteers for animal welfare, the environment with PEKA, and skin health education for women and children.',
    og: { title: 'Dr Kartini in the Community', eyebrow: 'Beyond the clinic', portrait: 'media/dr-kartini-speaking-at-health-event.jpg', accent: 'media' },
    llms: 'Community hub: animal welfare, environment (PEKA), Empowerment Sentuhan and patient support groups.',
  },
  environment: {
    path: '/community/environment/',
    title: 'Dr Kartini & PEKA: Environmental Advocacy in Malaysia',
    description:
      'As Vice-President of PEKA Malaysia, Dr Kartini Farah Rahim campaigns against plastic pollution and for Malaysia’s forests, wildlife and clean air.',
    og: { title: 'Green Fingerprint: Environmental Advocacy', eyebrow: 'Vice-President, PEKA Malaysia', portrait: 'portraits/dr-kartini-farah-rahim-portrait-dark.jpg', accent: 'planet' },
    llms: 'Environmental advocacy as Vice-President of PEKA Malaysia: plastics, waste separation, urban forests, education.',
  },
  empowerment: {
    path: '/community/empowerment-sentuhan/',
    title: 'Empowerment Sentuhan: Skin Health for Women & Children',
    description:
      'Empowerment Sentuhan is Dr Kartini’s skin health education initiative helping Malaysian women and children embrace self-care as a form of strength.',
    og: { title: 'Empowerment Sentuhan', eyebrow: 'Skin health education for women & children', portrait: 'portraits/dr-kartini-farah-rahim-baju-kurung-seated.jpg', accent: 'media' },
    llms: 'Empowerment Sentuhan: skin health education and awareness for women and children.',
  },
  media: {
    path: '/media/',
    title: 'Dr Kartini in the Media: TV, Press & Interviews',
    description:
      'Dr Kartini Farah Rahim in Malaysian media: TV3 Helo Doktor, RTM, Sky TV, The Star, Harian Metro, Utusan Malaysia and more, on skin health and animal welfare.',
    og: { title: 'In the Media: TV, Press & Interviews', eyebrow: 'Television, newspapers and interviews', portrait: 'media/dr-kartini-tv-studio-doctors-programme.jpg', accent: 'media' },
    llms: 'Media coverage: television appearances, newspaper features, published letters and quotes.',
  },
  press: {
    path: '/press/',
    title: 'Media Enquiries & Press Kit | Dr Kartini Farah Rahim',
    description:
      'Journalists: contact Dr Kartini Farah Rahim for expert comment on dermatology, eczema, stray animal management and the environment. Bio, photos and topics.',
    og: { title: 'For Journalists: Expert Comment & Press Kit', eyebrow: 'Available for comment in English and Bahasa Malaysia', portrait: 'portraits/dr-kartini-farah-rahim-black-blazer.jpg', accent: 'media' },
    llms: 'Press kit: approved short and long bios, comment topics, headshots and media contact.',
  },
  videos: {
    path: '/videos/',
    title: 'Ask Dr Kartini: Dermatology & Animal Welfare Videos',
    description:
      'Watch Dr Kartini Farah Rahim explain eczema care, wet wrap therapy, skin moisture, scalp health, dog bite prevention and stray animal welfare.',
    og: { title: 'Ask Dr Kartini: Videos', eyebrow: 'English and Bahasa Malaysia', portrait: 'media/dr-kartini-television-studio.jpg', accent: 'media' },
    llms: 'Video library with individual watch pages.',
  },
  articles: {
    path: '/articles/',
    title: 'Articles by Dr Kartini: Skin Health, Animals & Environment',
    description:
      'Read articles by Consultant Dermatologist Dr Kartini Farah Rahim on skin health, choosing a dermatologist, animal welfare, plastics and community issues.',
    og: { title: 'Articles by Dr Kartini', eyebrow: 'Skin health, animal welfare and the environment', portrait: 'portraits/dr-kartini-farah-rahim-arms-crossed.jpg' },
    llms: 'Article index.',
  },
  faq: {
    path: '/faq/',
    title: 'Frequently Asked Questions About Dr Kartini Farah Rahim',
    description:
      'Answers to common questions about Dr Kartini Farah Rahim: qualifications, clinic locations, booking, conditions treated, languages, fees and her advocacy.',
    og: { title: 'Questions About Dr Kartini, Answered', portrait: 'portraits/dr-kartini-farah-rahim-consultant-dermatologist.jpg' },
    llms: 'FAQ about Dr Kartini: identity, qualifications, locations, booking, conditions, languages and advocacy.',
  },
  contact: {
    path: '/contact/',
    title: 'Contact Dr Kartini Farah Rahim | WhatsApp & Enquiries',
    description:
      'Contact Consultant Dermatologist Dr Kartini Farah Rahim by WhatsApp, phone or email for appointments, media requests, speaking and community collaborations.',
    og: { title: 'Contact Dr Kartini', portrait: 'clinical/dermatology-consultation-dr-kartini.jpg' },
    llms: 'Contact details and enquiry form.',
  },
  editorial: {
    path: '/editorial-policy/',
    title: 'Editorial & Medical Review Policy | Dr Kartini Farah Rahim',
    description:
      'How medical content on this website is written, reviewed by Consultant Dermatologist Dr Kartini Farah Rahim, sourced, updated and kept independent.',
    og: { title: 'Editorial & Medical Review Policy' },
    llms: 'How content is written, medically reviewed, sourced and corrected.',
  },
  privacy: {
    path: '/privacy-policy/',
    title: 'Privacy Policy | Dr Kartini Farah Rahim',
    description:
      'How this website handles personal data from enquiries, WhatsApp messages and website analytics, in line with Malaysia’s Personal Data Protection Act 2010.',
    og: { title: 'Privacy Policy' },
  },
} satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof pages;
