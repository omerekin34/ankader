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

export type SiteData = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    titleEnd: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: SiteStat[];
  corporate: {
    title: string;
    text: string;
    mission: string;
    vision: string;
  };
  activities: SiteActivity[];
  board: SiteBoardMember[];
  members: SiteMember[];
  posts: SitePost[];
  about: {
    heroTitle: string;
    heroText: string;
    storyTitle: string;
    storyText: string;
  };
  donate: {
    pageEyebrow: string;
    pageTitle: string;
    pageText: string;
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
  };
};
