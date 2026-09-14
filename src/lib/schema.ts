/**
 * JSON-LD builders. Every page emits ONE @graph that references stable @ids,
 * so Google, Bing and AI systems resolve "Dr Kartini" to a single entity.
 *
 *   #person      Person (the human: credentials, sameAs, affiliations)
 *   #physician   IndividualPhysician (the medical practice entity: specialty, hospitals)
 *   #website     WebSite
 *   #hospital-*  Hospital entities
 */
import {
  SITE_URL,
  SITE_NAME,
  LANG,
  person,
  registrations,
  qualifications,
  affiliations,
  contact,
  social,
  hospitals,
} from '../data/site';

export const ids = {
  person: `${SITE_URL}/#person`,
  physician: `${SITE_URL}/#physician`,
  website: `${SITE_URL}/#website`,
  primaryImage: `${SITE_URL}/#primaryimage`,
  hospital: (id: string) => `${SITE_URL}/#hospital-${id}`,
};

export const PERSON_IMAGE = `${SITE_URL}/images/dr-kartini-farah-rahim-consultant-dermatologist.jpg`;

export const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

type Json = Record<string, unknown>;

export const sameAs = [
  social.linkedin,
  social.facebook,
  social.youtube,
  ...hospitals.map((h) => h.profileUrl),
];

const orgUrls: Record<string, string> = {};

export function hospitalNodes(): Json[] {
  return hospitals.map((h) => ({
    '@type': 'Hospital',
    '@id': ids.hospital(h.id),
    name: h.name,
    url: h.url,
    telephone: h.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: h.streetAddress,
      addressLocality: h.locality,
      addressRegion: h.region,
      postalCode: h.postalCode,
      addressCountry: h.country,
    },
    ...(h.geo ? { geo: { '@type': 'GeoCoordinates', latitude: h.geo.latitude, longitude: h.geo.longitude } } : {}),
    hasMap: h.mapUrl,
  }));
}

export function personNode(imageUrl: string): Json {
  return {
    '@type': 'Person',
    '@id': ids.person,
    name: person.name,
    alternateName: person.alternateNames,
    givenName: person.givenName,
    familyName: person.familyName,
    honorificPrefix: person.honorificPrefix,
    honorificSuffix: 'MRCP (UK), FAADV',
    jobTitle: person.jobTitle,
    description: person.oneLineBio,
    url: `${SITE_URL}/about-dr-kartini/`,
    image: { '@type': 'ImageObject', '@id': `${SITE_URL}/#personimage`, url: imageUrl, caption: `${person.name}, ${person.jobTitle}` },
    email: `mailto:${contact.email}`,
    telephone: contact.whatsappE164,
    nationality: { '@type': 'Country', name: 'Malaysia' },
    birthPlace: { '@type': 'Place', name: 'Petaling Jaya, Selangor, Malaysia' },
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Malay', alternateName: 'ms' },
    ],
    knowsAbout: person.knowsAbout,
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Consultant Dermatologist',
      occupationalCategory: '2212 Specialist medical practitioners',
      occupationLocation: { '@type': 'City', name: 'Shah Alam, Selangor, Malaysia' },
      skills: person.clinicalFocus.join(', '),
    },
    worksFor: hospitals.map((h) => ({ '@id': ids.hospital(h.id) })),
    affiliation: hospitals.map((h) => ({ '@id': ids.hospital(h.id) })),
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University College Dublin', sameAs: 'https://en.wikipedia.org/wiki/University_College_Dublin' },
      { '@type': 'CollegeOrUniversity', name: 'Universiti Kebangsaan Malaysia', sameAs: 'https://en.wikipedia.org/wiki/National_University_of_Malaysia' },
    ],
    hasCredential: [
      ...qualifications.map((q) => ({
        '@type': 'EducationalOccupationalCredential',
        name: `${q.name} (${q.abbr})`,
        credentialCategory: q.category,
        recognizedBy: { '@type': 'Organization', name: q.awardedBy },
        ...(q.year ? { dateCreated: String(q.year) } : {}),
      })),
      ...registrations.map((r) => ({
        '@type': 'EducationalOccupationalCredential',
        name: r.name,
        credentialCategory: 'license',
        identifier: r.value,
        recognizedBy: { '@type': 'Organization', name: r.authority, url: r.url },
      })),
    ],
    identifier: registrations.map((r) => ({ '@type': 'PropertyValue', propertyID: r.name, value: r.value })),
    memberOf: affiliations.map((a) => ({
      '@type': 'OrganizationRole',
      roleName: a.role,
      memberOf: { '@type': 'Organization', name: a.org, ...(orgUrls[a.orgShort] ? { url: orgUrls[a.orgShort] } : {}) },
    })),
    sameAs,
  };
}

export function physicianNode(imageUrl: string): Json {
  return {
    '@type': ['IndividualPhysician', 'Physician'],
    '@id': ids.physician,
    name: `${person.name}, Consultant Dermatologist`,
    alternateName: ['Dr Kartini, Dermatologist', 'Dr Kartini Farah Rahim Dermatology'],
    url: `${SITE_URL}/`,
    image: imageUrl,
    description:
      'Consultant Dermatologist Dr Kartini Farah Rahim sees adults and children with eczema, psoriasis, acne, skin infections, allergic skin reactions and blistering disorders at Avisena Specialist Hospital and Avisena Women’s & Children’s Specialist Hospital, Shah Alam, Selangor.',
    medicalSpecialty: ['https://schema.org/Dermatology', 'https://schema.org/InternalMedicine'],
    isAcceptingNewPatients: true,
    telephone: contact.appointmentsE164,
    email: contact.email,
    areaServed: [
      { '@type': 'City', name: 'Shah Alam' },
      { '@type': 'State', name: 'Selangor' },
      { '@type': 'Country', name: 'Malaysia' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: hospitals[0].streetAddress,
      addressLocality: hospitals[0].locality,
      addressRegion: hospitals[0].region,
      postalCode: hospitals[0].postalCode,
      addressCountry: hospitals[0].country,
    },
    ...(hospitals[0].geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: hospitals[0].geo.latitude, longitude: hospitals[0].geo.longitude } }
      : {}),
    hospitalAffiliation: hospitals.map((h) => ({ '@id': ids.hospital(h.id) })),
    practicesAt: hospitals.map((h) => ({ '@id': ids.hospital(h.id) })),
    availableService: person.clinicalFocus.map((name) => ({
      '@type': 'MedicalTherapy',
      name: `Diagnosis and management of ${name.toLowerCase()}`,
      relevantSpecialty: 'https://schema.org/Dermatology',
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'appointments',
        telephone: contact.appointmentsE164,
        areaServed: 'MY',
        availableLanguage: ['English', 'Malay'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        name: 'WhatsApp enquiries',
        telephone: contact.whatsappE164,
        url: contact.whatsappLink,
        areaServed: 'MY',
        availableLanguage: ['English', 'Malay'],
      },
    ],
    employee: { '@id': ids.person },
    founder: { '@id': ids.person },
    sameAs: hospitals.map((h) => h.profileUrl),
  };
}

export function websiteNode(): Json {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: ['DrKartini.net', 'Dr Kartini'],
    description: `${person.tagline} Official website of ${person.name}.`,
    inLanguage: LANG,
    publisher: { '@id': ids.person },
    about: { '@id': ids.person },
    copyrightHolder: { '@id': ids.person },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(pageUrl: string, crumbs: Crumb[]): Json {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqNode(pageUrl: string, faqs: { q: string; a: string }[]): Json | null {
  if (!faqs?.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export type PageType =
  | 'WebPage'
  | 'MedicalWebPage'
  | 'ProfilePage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage'
  | 'FAQPage'
  | 'ItemPage';

export function webPageNode(opts: {
  url: string;
  type: PageType | PageType[];
  name: string;
  description: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  lastReviewed?: string;
  reviewed?: boolean;
  about?: Json | { '@id': string } | (Json | { '@id': string })[];
  mainEntity?: Json | { '@id': string };
  hasBreadcrumb?: boolean;
  speakable?: string[];
  inLanguage?: string;
  medicalAudience?: boolean;
}): Json {
  const node: Json = {
    '@type': opts.type,
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.inLanguage ?? LANG,
    isPartOf: { '@id': ids.website },
    author: { '@id': ids.person },
    publisher: { '@id': ids.person },
  };
  if (opts.imageUrl) node.primaryImageOfPage = { '@type': 'ImageObject', url: opts.imageUrl };
  if (opts.datePublished) node.datePublished = opts.datePublished;
  if (opts.dateModified) node.dateModified = opts.dateModified;
  if (opts.lastReviewed) node.lastReviewed = opts.lastReviewed;
  if (opts.reviewed) node.reviewedBy = { '@id': ids.person };
  if (opts.about) node.about = opts.about;
  if (opts.mainEntity) node.mainEntity = opts.mainEntity;
  if (opts.hasBreadcrumb !== false) node.breadcrumb = { '@id': `${opts.url}#breadcrumb` };
  if (opts.speakable?.length) node.speakable = { '@type': 'SpeakableSpecification', cssSelector: opts.speakable };
  if (opts.medicalAudience) {
    node.audience = { '@type': 'PeopleAudience', audienceType: 'Patients and caregivers', geographicArea: { '@type': 'Country', name: 'Malaysia' } };
    node.specialty = 'https://schema.org/Dermatology';
  }
  return node;
}

export function medicalConditionNode(opts: {
  url: string;
  name: string;
  alternateNames: string[];
  description: string;
  wikipedia?: string;
  symptoms: string[];
  treatments: string[];
}): Json {
  return {
    '@type': 'MedicalCondition',
    '@id': `${opts.url}#condition`,
    name: opts.name,
    alternateName: opts.alternateNames,
    description: opts.description,
    url: opts.url,
    ...(opts.wikipedia ? { sameAs: opts.wikipedia } : {}),
    relevantSpecialty: 'https://schema.org/Dermatology',
    associatedAnatomy: { '@type': 'AnatomicalSystem', name: 'Integumentary system (skin, hair and nails)' },
    signOrSymptom: opts.symptoms.map((s) => ({ '@type': 'MedicalSignOrSymptom', name: s })),
    possibleTreatment: opts.treatments.map((t) => ({ '@type': 'MedicalTherapy', name: t })),
  };
}

export function articleNode(opts: {
  url: string;
  headline: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  section: string;
  inLanguage: string;
  wordCount: number;
  medical: boolean;
  citations: { title: string; url: string; publisher: string }[];
  about?: { '@id': string }[];
}): Json {
  return {
    '@type': 'BlogPosting',
    '@id': `${opts.url}#article`,
    headline: opts.headline.slice(0, 110),
    description: opts.description,
    image: { '@type': 'ImageObject', url: opts.imageUrl, width: 1200, height: 630 },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { '@id': ids.person },
    publisher: { '@id': ids.person },
    mainEntityOfPage: { '@id': `${opts.url}#webpage` },
    isPartOf: { '@id': ids.website },
    articleSection: opts.section,
    keywords: opts.keywords.join(', '),
    inLanguage: opts.inLanguage,
    wordCount: opts.wordCount,
    ...(opts.medical ? { genre: 'Patient education', audience: { '@type': 'PeopleAudience', audienceType: 'Patients and caregivers' } } : {}),
    ...(opts.about?.length ? { about: opts.about } : {}),
    ...(opts.citations.length
      ? {
          citation: opts.citations.map((c) => ({
            '@type': 'CreativeWork',
            name: c.title,
            url: c.url,
            publisher: { '@type': 'Organization', name: c.publisher },
          })),
        }
      : {}),
  };
}

export function videoNode(v: {
  id: string;
  title: string;
  description: string;
  seconds: number;
  uploadDate: string;
  lang: string;
  channel: string;
  topics: string[];
  pageUrl: string;
}): Json {
  const mm = Math.floor(v.seconds / 60);
  const ss = v.seconds % 60;
  return {
    '@type': 'VideoObject',
    '@id': `${v.pageUrl}#video`,
    name: v.title,
    description: v.description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    ],
    uploadDate: v.uploadDate,
    duration: `PT${mm}M${ss}S`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    inLanguage: v.lang === 'ms' ? 'ms-MY' : 'en-MY',
    keywords: v.topics.join(', '),
    actor: { '@id': ids.person },
    about: v.topics.map((t) => ({ '@type': 'Thing', name: t })),
    publisher: { '@type': 'Organization', name: v.channel },
    isFamilyFriendly: true,
  };
}

/** Wraps nodes in a single @graph with the site-wide entity nodes. */
export function graph(nodes: (Json | null | undefined)[], imageUrl: string = PERSON_IMAGE, includeHospitals = true): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(imageUrl),
      physicianNode(imageUrl),
      ...(includeHospitals ? hospitalNodes() : []),
      ...nodes.filter(Boolean),
    ],
  };
}
