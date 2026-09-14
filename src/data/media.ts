/**
 * Media coverage. Headlines, outlets and dates are transcribed from the
 * clippings published on the previous drkartini.net. Where the headline is not
 * visible on the clipping, `isHeadline` is false and `title` is a description.
 * Never invent an outlet or date. Add the online article `url` whenever one is
 * found: those links become citations in structured data, which helps AI
 * systems connect coverage to Dr Kartini.
 */

export type Clipping = {
  title: string;
  isHeadline: boolean;
  outlet?: string;
  author?: string;
  date?: string; // ISO date, only if printed on the clipping
  role: 'quoted' | 'author' | 'profiled' | 'named';
  lang: 'en' | 'ms';
  topic: 'dermatology' | 'animal-welfare' | 'environment' | 'community';
  image: string; // file name in src/assets/images/clippings/
  summary: string;
  url?: string;
};

export const clippings: Clipping[] = [
  {
    title: 'Lift the ban on feeding of strays',
    isHeadline: true,
    outlet: 'The Star',
    date: '2024-03-13',
    role: 'author',
    lang: 'en',
    topic: 'animal-welfare',
    image: 'the-star-lift-the-ban-on-feeding-strays.jpg',
    summary:
      'A letter by Dr Kartini, signed as an animal activist and board member of Filbert’s Foundation for Furry Friends (F3), urging a council to lift a ban on feeding stray animals and pointing to neutering and vaccination as the humane way to manage their numbers.',
  },
  {
    title: 'Peka: Where’s the monkey?',
    isHeadline: true,
    outlet: 'The Star',
    author: 'Arfa Yunus',
    role: 'quoted',
    lang: 'en',
    topic: 'animal-welfare',
    image: 'the-star-peka-wheres-the-monkey.jpg',
    summary:
      'Speaking as PEKA Vice-President, Dr Kartini questioned the lack of action over a viral video of a caged monkey being spray-painted, warning that paint chemicals can damage an animal’s skin and cause burns and respiratory problems.',
  },
  {
    title: 'Animal lovers sue Terengganu govt, Besut council over dog shooting',
    isHeadline: true,
    outlet: 'Free Malaysia Today',
    role: 'named',
    lang: 'en',
    topic: 'animal-welfare',
    image: 'fmt-kopi-animal-welfare-act-lawsuit.jpg',
    summary:
      'Dr Kartini was named among four plaintiffs contending that the killing of Kopi, a stray dog, by a council enforcement officer violated the Animal Welfare Act 2015.',
  },
  {
    title: 'Press conference on dogs held at the Kuala Langat council pound',
    isHeadline: false,
    outlet: 'Malaysiakini',
    role: 'quoted',
    lang: 'en',
    topic: 'animal-welfare',
    image: 'malaysiakini-kuala-langat-dog-pound.jpg',
    summary:
      'Representing the Malaysia Animal Kindness Society at a press conference before a peaceful protest, Dr Kartini questioned whether dogs held by the Kuala Langat Municipal Council (MPKL) were being properly fed.',
  },
  {
    title: 'Scarred by stigma',
    isHeadline: true,
    outlet: 'The Star (StarHealth)',
    author: 'Revathi Murugappan',
    date: '2020-11-01',
    role: 'quoted',
    lang: 'en',
    topic: 'dermatology',
    image: 'starhealth-scarred-by-stigma.jpg',
    summary:
      'A StarHealth cover feature on the stigma faced by people with atopic dermatitis, a condition that is not contagious but is often misunderstood.',
  },
  {
    title: 'Lots of effort needed',
    isHeadline: true,
    outlet: 'The Star (StarHealth)',
    date: '2020-11-01',
    role: 'quoted',
    lang: 'en',
    topic: 'dermatology',
    image: 'lots-of-effort-needed.jpg',
    summary:
      'The continuation of the StarHealth feature, in which Dr Kartini Farah Abdul Rahim discusses the emotional toll of atopic dermatitis and why there is no shame in seeking counselling alongside skin treatment.',
  },
  {
    title: 'Sahabat pesakit kulit',
    isHeadline: true,
    outlet: 'Harian Metro',
    author: 'Intan Mas Ayu Shahimi',
    date: '2019-05-16',
    role: 'profiled',
    lang: 'ms',
    topic: 'dermatology',
    image: 'sahabat-pesakit-kulit.jpg',
    summary:
      'A Harian Metro profile describing Dr Kartini as a friend to skin patients who not only treats but also counsels them, covering her training, her years at UPM and her work with patient support groups.',
  },
  {
    title: 'Pesakit kulit jadi keutamaan',
    isHeadline: true,
    outlet: 'Utusan Malaysia (Mega)',
    author: 'Rosmah Dain',
    date: '2018-02-28',
    role: 'profiled',
    lang: 'ms',
    topic: 'dermatology',
    image: 'mega-pesakit-kulit-jadi-keutamaan-full.jpg',
    summary:
      'A full-page Utusan Malaysia profile on Dr Kartini’s commitment to skin patients, including her support for people living with ichthyosis.',
  },
  {
    title: 'The ubiquitous germs',
    isHeadline: true,
    outlet: 'Selangor Journal',
    date: '2018-08',
    role: 'author',
    lang: 'en',
    topic: 'dermatology',
    image: 'the-ubiquitous-germs.jpg',
    summary:
      'An article written by Dr Kartini on everyday germs, hand, foot and mouth disease, and why proper hand hygiene is one of the simplest ways to prevent skin infections spreading, especially among children.',
  },
  {
    title: 'Sayangi pesakit ichthyosis',
    isHeadline: true,
    role: 'named',
    lang: 'ms',
    topic: 'dermatology',
    image: 'sayangi-pesakit-ichthyosis.jpg',
    summary: 'Coverage of a skin-day celebration organised with people living with ichthyosis in Malaysia, with Dr Kartini among the organisers.',
  },
  {
    title: 'Skin woes: the rise of maskne',
    isHeadline: true,
    role: 'quoted',
    lang: 'en',
    topic: 'dermatology',
    image: 'skin-woes-rise-of-maskne.jpg',
    summary: 'A feature on acne and irritation linked to prolonged face-mask wearing.',
  },
  {
    title: 'Kawal penularan atopik dermatitis waktu pandemik',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'kawal-penularan-atopik-dermatitis.jpg',
    summary: 'Advice on controlling atopic dermatitis during the pandemic, when frequent handwashing and sanitising strained the skin.',
  },
  {
    title: 'Ekzema tangan undang masalah',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'ekzema-tangan-undang-masalah.jpg',
    summary: 'A feature on hand eczema, its triggers, and how to choose cleansers and moisturisers.',
  },
  {
    title: 'Banyak salah faham tentang krim steroid',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'salah-faham-krim-steroid.jpg',
    summary: 'A feature addressing common misunderstandings about steroid creams and the risks of using them without medical advice.',
  },
  {
    title: 'Silap potong kuku punca cagu',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'silap-potong-kuku-punca-cagu.jpg',
    summary: 'How cutting nails incorrectly can lead to painful ingrown toenails.',
  },
  {
    title: 'Ketuat berjangkit melalui sentuhan',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'ketuat-berjangkit-melalui-sentuhan.jpg',
    summary: 'An explainer on warts and how they spread through skin contact.',
  },
  {
    title: 'Cara terbaik urus SLE',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'cara-terbaik-urus-sle.jpg',
    summary: 'A feature on managing systemic lupus erythematosus (SLE).',
  },
  {
    title: 'Tangani SLE dengan bijak',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'tangani-sle-dengan-bijak.jpg',
    summary: 'A magazine feature on living well with SLE.',
  },
  {
    title: 'Tompok hitam kesan perubahan hormon',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'tompok-hitam-kesan-perubahan-hormon.jpg',
    summary: 'An explainer on dark patches of skin linked to hormonal changes.',
  },
  {
    title: 'Cantik tanpa mudaratkan diri',
    isHeadline: true,
    role: 'quoted',
    lang: 'ms',
    topic: 'dermatology',
    image: 'cantik-tanpa-mudaratkan-diri.jpg',
    summary: 'A feature on pursuing beauty without harming your skin or health.',
  },
];

export const tvAppearances = [
  { programme: 'Helo Doktor', network: 'TV3', lang: 'ms', topic: 'Scalp and hair health (2021); dry scalp, scaling and dandruff (2024)' },
  { programme: 'Bicara DR', network: 'RTM', lang: 'ms', topic: 'Facial skin health (3 September 2020)' },
  { programme: 'Atopic dermatitis interview', network: 'Sky TV', lang: 'ms', topic: 'Atopic dermatitis (eczema)' },
  { programme: 'Ask Me Doctor', network: 'Television', lang: 'en', topic: 'Caring for children’s skin' },
  { programme: 'Stray animals news segment', network: 'TV3', lang: 'en', topic: 'Compassion for stray animals (August 2025)' },
];
