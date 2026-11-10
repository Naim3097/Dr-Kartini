/**
 * Parents' Threads posts about Dr Kartini's care, shown on the homepage and the eczema guides.
 *
 * Each post is embedded from Threads as the parent published it, with their name, photos and
 * text. Dr Kartini and the parents have agreed to this. If a parent deletes a post or makes it
 * private, Threads stops showing it, so remove its entry here as well.
 *
 * Until a post loads, and wherever Threads is blocked or JavaScript is off, a card shows
 * `quote`, `summary` and `attribution` instead. `summary` is the context in our own words.
 */

export type Review = {
  date: string; // ISO date of the original post
  url: string; // the post's Threads link, used for the embed
  author: string; // the parent's Threads handle
  topics: string[]; // condition ids where the post is shown
  attribution: string; // e.g. 'Parent of a child with eczema'
  summary: string; // context in our own words
  quote?: string; // the parent's own words
  lang?: 'ms'; // set when the quote is in Malay
};

export const reviews: Review[] = [
  {
    date: '2026-11-08',
    url: 'https://www.threads.com/@asmida_saiful/post/DfcxJkLkxps',
    author: '@asmida_saiful',
    topics: ['eczema', 'childrens-skin-conditions'],
    attribution: 'Parent of a 3-month-old baby',
    summary:
      'Their baby was treated by Dr Kartini in hospital for five days with wet wraps, and they are carrying on with the wraps at home.',
    quote: 'Warded 5h4m buat wet wrap, perubahan ketara sgt…',
    lang: 'ms',
  },
  {
    date: '2026-09-05',
    url: 'https://www.threads.com/@zatizzara/post/Dc6BcxkEyyP',
    author: '@zatizzara',
    topics: ['eczema', 'childrens-skin-conditions'],
    attribution: 'Parent of a child with eczema',
    summary:
      'Their child was treated by Dr Kartini during a hospital stay two years earlier. They still use wet wraps at home when the eczema flares.',
    quote: 'Alhamdulillah dapat 1 ilmu cara nak jaga eczema ni. Dr guna kaedah Wetwrap…',
    lang: 'ms',
  },
  {
    date: '2026-06-10',
    url: 'https://www.threads.com/@iylabella/post/DZZ-6fGk__r',
    author: '@iylabella',
    topics: ['eczema', 'childrens-skin-conditions'],
    attribution: 'Parent of a baby with eczema',
    summary:
      'Their baby is kept wrapped up during eczema treatment to stop the scratching, and they hope for a quick recovery.',
    quote: 'Balut pun balut lah nak janji elok.',
    lang: 'ms',
  },
  {
    date: '2025-10-30',
    url: 'https://www.threads.com/@fadhyy/post/DQaot0rEne4',
    author: '@fadhyy',
    topics: ['eczema', 'childrens-skin-conditions'],
    attribution: 'Parent of a young child with eczema',
    summary:
      'Their child was treated by Dr Kartini at Avisena Shah Alam. They tell other parents to be ready for wet wraps and to stick with the routine.',
    quote: 'If anak you ada eczema please please bawa diaorg to Dr Kartini Farah…',
    lang: 'ms',
  },
  {
    date: '2025-08-26',
    url: 'https://www.threads.com/@farzamokh/post/DNzkUHX5r9b',
    author: '@farzamokh',
    topics: ['eczema', 'childrens-skin-conditions'],
    attribution: 'Parent of a baby with mild eczema',
    summary:
      'They chose Dr Kartini after hearing from other parents, wanting proper medical treatment rather than more creams.',
    quote: 'Even though [my baby] only has mild eczema, I want to start treatment early…',
  },
];
