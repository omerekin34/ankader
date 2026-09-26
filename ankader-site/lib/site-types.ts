export type SiteStat = {
  value: string;
  label: string;
  note: string;
};

export type SiteActivity = {
  title: string;
  text: string;
};

export type SiteBoardMember = {
  initials: string;
  name: string;
  role: string;
};

export const POST_TAGS = ["Genel", "Kayıt", "Etkinlik", "Saha"] as const;
export type PostTag = (typeof POST_TAGS)[number];

export type SitePost = {
  day: string;
  month: string;
  title: string;
  text: string;
  body?: string;
  tag?: string;
  slug?: string;
};

export type SiteMember = {
  name: string;
  stage?: string;
  school?: string;
  university?: string;
  department?: string;
  year?: string;
};

export type SiteStep = {
  n: string;
  title: string;
  text: string;
};

export type SiteValue = {
  title: string;
  text: string;
};

export type SiteHafiza = {
  src: string;
  alt: string;
  caption: string;
  tags: string[];
};

export type SiteArticle = {
  n: string;
  title: string;
  text: string;
};

export type SiteSchedule = {
  day: string;
  time: string;
};

export type SiteData = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    titleEnd: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    ctaHref: string;
    slides: string[];
  };
  identity: {
    ticker: string;
    schoolName: string;
    footerTagline: string;
    footerMotto: string;
    footerCredit: string;
    schoolUrl: string;
  };
  home: {
    pathEyebrow: string;
    pathTitle: string;
    pathText: string;
    steps: SiteStep[];
    quote: string;
    activitiesEyebrow: string;
    activitiesTitle: string;
    activitiesText: string;
    galleryNoteTitle: string;
    galleryNoteText: string;
    boardEyebrow: string;
    boardTitle: string;
    newsEyebrow: string;
    newsTitle: string;
    joinEyebrow: string;
    joinTitle: string;
  };
  stats: SiteStat[];
  corporate: {
    title: string;
    text: string;
    missionTitle: string;
    mission: string;
    visionTitle: string;
    vision: string;
  };
  activities: SiteActivity[];
  board: SiteBoardMember[];
  members: SiteMember[];
  posts: SitePost[];
  hafiza: SiteHafiza[];
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroText: string;
    storyLabel: string;
    storyTitle: string;
    storyText: string;
    schoolQuoteLabel: string;
    schoolQuote: string;
    schoolQuoteText: string;
    principlesEyebrow: string;
    principlesTitle: string;
    principlesText: string;
    values: SiteValue[];
    verseRef: string;
    verseText: string;
    teamTitle: string;
  };
  tuzuk: {
    eyebrow: string;
    title: string;
    text: string;
    items: SiteArticle[];
  };
  donate: {
    pageEyebrow: string;
    pageTitle: string;
    pageText: string;
    donateHeroEyebrow: string;
    donateHeroTitle: string;
    donateHeroText: string;
    joinTitle: string;
    joinText: string;
    donateTitle: string;
    donateText: string;
    iban: string;
    bank: string;
    accountName: string;
    note: string;
    amounts: string[];
  };
  contact: {
    address: string;
    email: string;
    phone: string;
    hours: string;
    registry: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    whatsappCommunity: string;
    mapLat: string;
    mapLng: string;
    mapsUrl: string;
    pageEyebrow: string;
    pageTitle: string;
    pageText: string;
    formEyebrow: string;
    formText: string;
    schedule: SiteSchedule[];
  };
};
