/**
 * SINGLE SOURCE OF TRUTH for every fact about Dr Kartini used on the site,
 * in structured data (JSON-LD), llms.txt and the press kit.
 * Update facts HERE, never inline in pages, so search engines and AI systems
 * always see one consistent entity.
 *
 * Sources: drkartini.net (crawled 14 Sep 2026) and Avisena specialist profiles
 * (ash.avisena.com.my and awcsh.avisena.com.my, checked 14 Sep 2026).
 */

export const SITE_URL = 'https://www.drkartini.net';
export const SITE_NAME = 'Dr Kartini Farah Rahim';
export const LOCALE = 'en_MY';
export const LANG = 'en-MY';

export const person = {
  name: 'Dr Kartini Farah Rahim',
  shortName: 'Dr Kartini',
  givenName: 'Kartini Farah',
  familyName: 'Rahim',
  honorificPrefix: 'Dr',
  alternateNames: [
    'Dr Kartini Farah Abdul Rahim',
    'Dr Kartini Farah Abd Rahim',
    'Dr Kartini Rahim',
    'Kartini Farah Binti Abd Rahim',
    'Dr Kartini',
  ],
  jobTitle: 'Consultant Dermatologist',
  tagline: 'Consultant Dermatologist. Educator. Advocate for People, Animals & the Planet.',
  // Strategy wording was "Expert dermatology care…"; "Specialist" keeps within MMC guidance on self-praise.
  secondaryMessage: 'Specialist dermatology care with a commitment that extends beyond the clinic.',
  positioning:
    'A dermatologist who believes caring for people should extend beyond the clinic.',
  oneLineBio:
    'Dr Kartini Farah Rahim is a Consultant Dermatologist in Shah Alam, Selangor, registered on Malaysia’s National Specialist Register, a former Senior Lecturer at Universiti Putra Malaysia, and an advocate for animal welfare, the environment and women’s and children’s wellbeing.',
  languages: ['English', 'Bahasa Malaysia'],
  nationality: 'Malaysia',
  birthPlace: 'Petaling Jaya, Selangor',
  namesake:
    'Her grandmother named her after Raden Adjeng Kartini, the Indonesian heroine celebrated for championing women’s rights and education.',
  clinicalFocus: [
    'Eczema (atopic dermatitis)',
    'Psoriasis',
    'Acne',
    'Skin infections',
    'Allergic skin reactions',
    'Blistering disorders',
    'Children’s skin conditions',
  ],
  knowsAbout: [
    'Dermatology',
    'Atopic dermatitis',
    'Psoriasis',
    'Acne',
    'Skin infections',
    'Urticaria',
    'Allergic contact dermatitis',
    'Autoimmune blistering diseases',
    'Hidradenitis suppurativa',
    'Ichthyosis',
    'Paediatric dermatology',
    'Internal medicine',
    'Medical education',
    'Animal welfare',
    'Trap-neuter-vaccinate-return programmes',
    'Environmental conservation',
    'Plastic pollution',
  ],
};

export const registrations = [
  { name: 'Malaysian Medical Council (MMC) registration', value: '43483', authority: 'Malaysian Medical Council', url: 'https://mmc.gov.my/' },
  { name: 'National Specialist Register (Dermatology)', value: '128619', authority: 'National Specialist Register of Malaysia', url: 'https://www.nsr.org.my/' },
  { name: 'National Specialist Register (Internal Medicine)', value: '128619', authority: 'National Specialist Register of Malaysia', url: 'https://www.nsr.org.my/' },
  { name: 'General Medical Council (UK) registration', value: '5204337', authority: 'General Medical Council (UK)', url: 'https://www.gmc-uk.org/' },
];

export const qualifications = [
  {
    abbr: 'MBBCh BAO',
    name: 'Bachelor of Medicine, Bachelor of Surgery and Bachelor of the Art of Obstetrics',
    awardedBy: 'University College Dublin, Ireland',
    year: null as number | null,
    category: 'degree',
  },
  {
    abbr: 'MRCP (UK)',
    name: 'Membership of the Royal Colleges of Physicians of the United Kingdom',
    awardedBy: 'Royal Colleges of Physicians of the United Kingdom',
    year: 2007,
    category: 'membership',
  },
  {
    abbr: 'Dip Derm (Glasgow)',
    name: 'Diploma in Dermatology',
    awardedBy: 'Royal College of Physicians and Surgeons of Glasgow',
    year: 2005,
    category: 'diploma',
  },
  {
    abbr: 'Adv M Derm (UKM)',
    name: 'Advanced Master of Dermatology',
    awardedBy: 'Universiti Kebangsaan Malaysia (UKM)',
    year: 2011,
    category: 'degree',
  },
  {
    abbr: 'FAADV',
    name: 'Fellow of the Asian Academy of Dermatology and Venereology',
    awardedBy: 'Asian Academy of Dermatology and Venereology',
    year: null as number | null,
    category: 'fellowship',
  },
];

export const postNominals = 'MBBCh BAO (Ireland), MRCP (UK), Dip Derm (Glasgow), Adv M Derm (UKM), FAADV';

export const career = [
  { year: '2004', title: 'Dermatology Research Fellow', org: 'Dundee, Scotland', detail: 'Began her dermatology career as a research fellow in Dundee, Scotland.' },
  { year: '2005', title: 'Diploma in Dermatology', org: 'Royal College of Physicians and Surgeons of Glasgow', detail: 'Awarded the Diploma in Dermatology while working and training in the United Kingdom.' },
  { year: '2007', title: 'MRCP (UK)', org: 'Royal Colleges of Physicians of the United Kingdom', detail: 'Elected to membership of the Royal Colleges of Physicians of the United Kingdom, then returned to Malaysia.' },
  { year: '2011', title: 'Advanced Master of Dermatology', org: 'Universiti Kebangsaan Malaysia (UKM)', detail: 'Completed advanced dermatology training at UKM.' },
  { year: '', title: 'Physician and Dermatologist', org: 'Hospital Kuala Lumpur and Hospital Serdang', detail: 'Served as a physician and dermatologist in two of Malaysia’s major public hospitals.' },
  { year: '2007 onwards', title: 'Senior Lecturer in Medicine and Dermatology', org: 'Universiti Putra Malaysia (UPM)', detail: 'Taught and trained future doctors for more than ten years after returning from the United Kingdom.' },
  { year: '2015 – 2017', title: 'Chairperson, National Skin Day (Hari Kulit Kebangsaan)', org: 'Malaysia', detail: 'Chaired National Skin Day from its first year, and became active in patient support groups, awareness campaigns and health writing from 2015.' },
  { year: 'Today', title: 'Consultant Dermatologist', org: 'Avisena Specialist Hospital and Avisena Women’s & Children’s Specialist Hospital, Shah Alam', detail: 'Sees adults and children with a broad range of skin conditions.' },
];

export const affiliations = [
  { role: 'Vice-President', org: 'Pertubuhan Pelindung Khazanah Alam Malaysia (PEKA)', orgShort: 'PEKA Malaysia', area: 'environment', description: 'A national NGO for the protection of Malaysia’s natural heritage.' },
  { role: 'Board Member', org: 'Filbert’s Foundation for Furry Friends (F3)', orgShort: 'F3', area: 'animal-welfare', description: 'An animal welfare foundation supporting rescue, neutering and vaccination of stray animals.' },
  { role: 'Media Advisor', org: 'Malaysia Eczema Support Community (MESC)', orgShort: 'MESC', area: 'dermatology', description: 'A Facebook support community for people living with eczema and their families.' },
  { role: 'Main Medical Advisor', org: 'Hidradenitis Suppurativa Support Group Malaysia', orgShort: 'HS Support Group Malaysia', area: 'dermatology', description: 'A patient support group for people living with hidradenitis suppurativa.' },
  { role: 'Main Medical Advisor', org: 'Pertubuhan Kebajikan Pesakit Ichthyosis Malaysia (PEKIM)', orgShort: 'PEKIM', area: 'dermatology', description: 'A patient support group for people and families living with ichthyosis.' },
];

export const contact = {
  whatsappDisplay: '+60 11-2616 6480',
  whatsappE164: '+601126166480',
  whatsappLink: 'https://wa.me/601126166480',
  email: 'DrKartiniRahim@gmail.com',
  appointmentsDisplay: '+603-5515 1966',
  appointmentsE164: '+60355151966',
  hospitalGeneralDisplay: '+603-5515 1888',
  hospitalGeneralE164: '+60355151888',
  whatsappNote: 'WhatsApp any time for non-urgent enquiries. For emergencies, go to the nearest emergency department.',
};

export const social = {
  facebook: 'https://www.facebook.com/kartini.rahim.338',
  linkedin: 'https://www.linkedin.com/in/kartinirahim',
  youtube: 'https://www.youtube.com/@DrKartiniFarahRahim-Website',
};

export type Session = { day: string; hours: string; note?: string };

export const hospitals = [
  {
    id: 'ash',
    name: 'Avisena Specialist Hospital',
    shortName: 'Avisena Specialist Hospital, Shah Alam',
    streetAddress: 'No. 4, Jalan Ikhtisas, Seksyen 14',
    locality: 'Shah Alam',
    region: 'Selangor',
    postalCode: '40000',
    country: 'MY',
    telephone: '+60355151888',
    appointments: '+60355151966',
    url: 'https://ash.avisena.com.my/',
    profileUrl: 'https://ash.avisena.com.my/specialist/kartini-farah-rahim/',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Avisena+Specialist+Hospital+Shah+Alam',
    geo: { latitude: 3.0714143, longitude: 101.5236927 },
    sessions: [
      { day: 'Monday', hours: '3:00 pm – 8:00 pm' },
      { day: 'Thursday', hours: '3:00 pm – 8:00 pm' },
      { day: 'Friday', hours: '11:00 am – 8:00 pm' },
      { day: 'Saturday', hours: '11:00 am – 3:00 pm', note: '1st and 3rd Saturday' },
    ] as Session[],
  },
  {
    id: 'awcsh',
    name: 'Avisena Women’s & Children’s Specialist Hospital',
    shortName: 'Avisena Women’s & Children’s Specialist Hospital, Shah Alam',
    streetAddress: 'No. 3, Jalan Perdagangan 14/4, Seksyen 14',
    locality: 'Shah Alam',
    region: 'Selangor',
    postalCode: '40000',
    country: 'MY',
    telephone: '+60355151888',
    appointments: '+60355151966',
    url: 'https://awcsh.avisena.com.my/',
    profileUrl: 'https://awcsh.avisena.com.my/specialist/kartini-farah-rahim/',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Avisena+Women%27s+%26+Children%27s+Specialist+Hospital+Shah+Alam',
    geo: null as null | { latitude: number; longitude: number },
    sessions: [
      { day: 'Monday', hours: '11:00 am – 3:00 pm' },
      { day: 'Wednesday', hours: '11:00 am – 8:00 pm' },
      { day: 'Thursday', hours: '11:00 am – 3:00 pm' },
      { day: 'Saturday', hours: '11:00 am – 3:00 pm', note: '2nd and 4th Saturday' },
    ] as Session[],
  },
];

export const scheduleCheckedOn = '2026-09-14';

/** Topics journalists can contact Dr Kartini about (press page, llms.txt). */
export const commentTopics = [
  { area: 'Dermatology', topics: ['Eczema and World Atopic Eczema Day', 'Psoriasis', 'Acne in teens and adults', 'Skin allergies and reactions to products', 'Skin infections in hot, humid weather', 'Children’s skin health', 'Haze, heat and the skin', 'Unregulated and adulterated skin creams', 'Hidradenitis suppurativa and ichthyosis awareness'] },
  { area: 'Animal welfare', topics: ['Humane stray dog and cat population management', 'Trap-neuter-vaccinate-return (TNVR) programmes', 'Responsible pet ownership and adoption', 'Dog bite prevention and child safety around roaming dogs', 'Animal Welfare Act 2015 and enforcement', 'Community feeders and local council policy'] },
  { area: 'Environment', topics: ['Single-use plastics and microplastics', 'Waste separation at source', 'Urban forests and green lungs', 'Environmental education for schools and communities'] },
  { area: 'Women, children and community', topics: ['Skin health education for women and children', 'Stigma and visible skin disease', 'Women in medicine and advocacy'] },
];

export const nav = [
  {
    label: 'About',
    href: '/about-dr-kartini/',
    children: [
      { label: 'About Dr Kartini', href: '/about-dr-kartini/' },
      { label: 'Beyond Skin: Her Story', href: '/beyond-skin/' },
      { label: 'Qualifications & Registration', href: '/credentials/' },
    ],
  },
  {
    label: 'Dermatology',
    href: '/dermatology/',
    children: [
      { label: 'Dermatologist in Malaysia', href: '/dermatologist-malaysia/' },
      { label: 'All Skin Conditions', href: '/dermatology/' },
      { label: 'Acne', href: '/dermatology/acne/' },
      { label: 'Eczema', href: '/dermatology/eczema/' },
      { label: 'Psoriasis', href: '/dermatology/psoriasis/' },
      { label: 'Children’s Skin', href: '/dermatology/childrens-skin-conditions/' },
    ],
  },
  {
    label: 'Community',
    href: '/community/',
    children: [
      { label: 'Community Work', href: '/community/' },
      { label: 'Animal Welfare', href: '/animal-welfare/' },
      { label: 'Environment (PEKA)', href: '/community/environment/' },
      { label: 'Empowerment Sentuhan', href: '/community/empowerment-sentuhan/' },
    ],
  },
  {
    label: 'Media',
    href: '/media/',
    children: [
      { label: 'In the Media', href: '/media/' },
      { label: 'Videos', href: '/videos/' },
      { label: 'For Journalists', href: '/press/' },
    ],
  },
  { label: 'Articles', href: '/articles/' },
];

export const articleCategories = {
  dermatology: { label: 'Dermatology', description: 'Evidence-based skin health guidance from Consultant Dermatologist Dr Kartini Farah Rahim.' },
  'animal-welfare': { label: 'Animal Welfare', description: 'Dr Kartini’s rescue stories and perspectives on humane stray animal management in Malaysia.' },
  environment: { label: 'Environment', description: 'Writing on plastics, waste and conservation from PEKA Malaysia’s Vice-President.' },
  community: { label: 'Community', description: 'Stories from Dr Kartini’s volunteer and community work.' },
  perspectives: { label: 'Perspectives', description: 'Dr Kartini’s considered views on Malaysian news and public issues.' },
  'press-statements': { label: 'Press Statements', description: 'Official statements and open letters from Dr Kartini.' },
} as const;

export type ArticleCategory = keyof typeof articleCategories;
