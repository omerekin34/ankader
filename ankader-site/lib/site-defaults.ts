import { hafizaItems } from "./hafiza";
import type { SiteData } from "./site-types";

export const defaultHeroSlides = [
  "/slides/hero-ziyaret.jpg",
  "/slides/hero-etayfa.jpg",
  "/slides/hero-mezuniyet.png",
];

export const defaultSite: SiteData = {
  hero: {
    eyebrow: "ANKADER · Pendik",
    title: "Küllerinden",
    highlight: "Doğuyor",
    titleEnd: "",
    subtitle: "Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi mezunlar derneği.",
    primaryCta: "Hikâyemiz",
    secondaryCta: "",
    ctaHref: "/hakkimizda",
    slides: defaultHeroSlides,
  },
  identity: {
    ticker: "Küllerinden doğarak, geleceği omuz omuza",
    schoolName: "Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi",
    footerTagline: "Okulumuzun mezunlar derneği.",
    footerMotto: "Geleceği birlikte, küllerimizden doğarak inşa ediyoruz.",
    footerCredit: "Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi mezunlar derneği",
    schoolUrl: "https://pendikitosaaihl.meb.k12.tr/",
  },
  home: {
    pathEyebrow: "Bize katıl",
    pathTitle: "Kapı açık. Yol kısa.",
    pathText: "Üye, gönüllü ya da destek — üç adımda aynı masaya oturursun.",
    steps: [
      { n: "01", title: "Başvur", text: "Öğrenci formunu doldur. Üye, gönüllü ya da destek — üç yol da açık." },
      { n: "02", title: "Eşleş", text: "Yönetim başvurunu okur. İhtiyacına veya katkına göre ekibe bağlanır." },
      { n: "03", title: "Sahaya in", text: "Eğitim, mentorluk ya da mahalle işi. Söz masada kalmaz, işe döner." },
    ],
    quote: "Kimse tek başına yürümesin diye buradayız.",
    activitiesEyebrow: "02 — Faaliyetler",
    activitiesTitle: "Hafızamızdan kareler",
    activitiesText: "Birlikte geçirilen zamanlardan seçilmiş kareler.",
    galleryNoteTitle: "Bu masada yerin var",
    galleryNoteText:
      "Mentörlük, kariyer buluşmaları, vefa programları ve okul ziyaretleri. Gönüllü veya üye olarak sahaya inebilirsin.",
    boardEyebrow: "03 — Yönetim",
    boardTitle: "Yönetim Kurulu",
    newsEyebrow: "04 — Duyurular",
    newsTitle: "ANKADER'den haber",
    joinEyebrow: "Bu masada yerin var",
    joinTitle: "Öğrenciysen, gönüllüysen veya destek olmak istiyorsan kapı açık.",
  },
  stats: [],
  corporate: {
    title: "Neden bir aradayız?",
    text: "",
    missionTitle: "Tecrübeyi yeni nesillere aktarmak",
    mission: "",
    visionTitle: "Kalıcı bir dayanışma kültürü kurmak",
    vision: "",
  },
  activities: [],
  board: [],
  members: [],
  posts: [],
  hafiza: hafizaItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    caption: item.caption,
    tags: [...item.tags],
  })),
  about: {
    heroEyebrow: "Hakkımızda",
    heroTitle: "Bağımız mezuniyetle bitmedi",
    heroText: "",
    storyLabel: "Nasıl başladık?",
    storyTitle: "Bağımız mezuniyetle bitmedi",
    storyText: "",
    schoolQuoteLabel: "Okulumuzdan aldığımız ölçü",
    schoolQuote: "Önce karakter, sonra kariyer.",
    schoolQuoteText:
      "Rehberlik çalışmalarımızda yalnızca mesleki başarıyı değil; sorumluluk sahibi, güvenilir ve fayda üreten insanlar olmayı da önemsiyoruz.",
    principlesEyebrow: "İlkelerimiz",
    principlesTitle: "Birlikteliğimizi taşıyan değerler",
    principlesText: "Kararlarımızda ve çalışmalarımızda okul kültürümüzden gelen dört ilkeyi gözetiyoruz.",
    values: [
      { title: "Vefa", text: "Bizi yetiştiren öğretmenleri, okul kültürünü ve ortak hatıralarımızı unutmamak." },
      { title: "Dayanışma", text: "Farklı dönemlerden mezunlar ve mensuplar arasında güvene dayalı bağlar kurmak." },
      { title: "Rehberlik", text: "Edindiğimiz tecrübeyi bizden sonra gelen öğrenciler ve genç mezunlarla paylaşmak." },
      {
        title: "Sorumluluk",
        text: "Okulumuza, çevremize ve topluma fayda üreten işlerde birlikte hareket etmek.",
      },
    ],
    verseRef: "En’âm Suresi · 162",
    verseText:
      "Şüphesiz benim namazım da, diğer ibadetlerim de, yaşamam da, ölümüm de âlemlerin Rabbi Allah içindir.",
    teamTitle: "Bu yolu birlikte yürüyoruz",
  },
  tuzuk: {
    eyebrow: "Kurumsal",
    title: "Tüzüğümüz, yönümüz",
    text: "Tam metin dernek dosyasında durur. Burada yönümüzü özetliyoruz. Resmî suret için iletişime yazın.",
    items: [
      {
        n: "01",
        title: "Amaç",
        text: "Zorlu süreçlerden geçen öğrencilerin yanında durmak; eğitim, gönüllülük ve saha dayanışmasıyla yalnızlığı kırmak.",
      },
      {
        n: "02",
        title: "Çalışma alanları",
        text: "Burs ve mentorluk, çalıştaylar, mahalle ve kampüs destekleri. Her faaliyet ihtiyaç görülünce başlar, sonuç paylaşılır.",
      },
      {
        n: "03",
        title: "Üyelik",
        text: "Öğrenci başvurusu yönetimce değerlendirilir. Üye, gönüllü ve destek talep eden aynı kapıdan girer.",
      },
      {
        n: "04",
        title: "Şeffaflık",
        text: "Karar, kaynak ve saha işi görünür durur. Bağış ve aidat kayıtları dernek usulünce tutulur.",
      },
    ],
  },
  donate: {
    pageEyebrow: "Katıl",
    pageTitle: "Nasıl katılmak istiyorsun?",
    pageText: "Üstten üye ol veya bağış yap de, ilgili form önüne gelsin.",
    donateHeroEyebrow: "Bağış",
    donateHeroTitle: "Bağışınla dayanışmaya katıl",
    donateHeroText: "Tutarı seç, IBAN’a havale veya EFT yap, dekontu ilet. Kartla ödeme yok.",
    joinTitle: "",
    joinText: "",
    donateTitle: "",
    donateText: "",
    iban: "",
    bank: "",
    accountName: "",
    note: "",
    amounts: [],
  },
  contact: {
    address: "",
    email: "",
    phone: "",
    hours: "",
    registry: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    whatsappCommunity: "",
    mapLat: "40.911291",
    mapLng: "29.2895983",
    mapsUrl: "https://www.google.com/maps/place/ANKADER/@40.911291,29.2895983,19z",
    pageEyebrow: "İletişim",
    pageTitle: "Hayalinizdeki dayanışma için buradayız",
    pageText:
      "Üyelik, gönüllülük veya destek için yazın, arayın ya da derneğe uğrayın. Ekibimiz size yardımcı olmaktan mutluluk duyar.",
    formEyebrow: "Bize yazın",
    formText: "Üyelik, gönüllülük veya bağış sorularınızı iletin, en kısa sürede dönüş yapalım.",
    schedule: [
      { day: "Pazartesi — Cuma", time: "09:00 — 17:00" },
      { day: "Cumartesi", time: "10:00 — 17:00" },
      { day: "Pazar", time: "Kapalı" },
    ],
  },
};

function fillObject<T extends object>(base: T, extra: Partial<T> | undefined): T {
  const out = { ...base };
  if (!extra) return out;
  for (const key of Object.keys(base) as (keyof T)[]) {
    const value = extra[key];
    if (value !== undefined && value !== null) out[key] = value as T[keyof T];
  }
  return out;
}

export function applyDefaults(raw: Partial<SiteData>): SiteData {
  const hero = fillObject(defaultSite.hero, raw.hero);
  if (!hero.slides?.length) hero.slides = [...defaultHeroSlides];
  if (!hero.ctaHref) hero.ctaHref = "/hakkimizda";

  const about = fillObject(defaultSite.about, raw.about);
  if (!about.values?.length) about.values = defaultSite.about.values.map((item) => ({ ...item }));

  const home = fillObject(defaultSite.home, raw.home);
  if (!home.steps?.length) home.steps = defaultSite.home.steps.map((item) => ({ ...item }));

  const tuzuk = fillObject(defaultSite.tuzuk, raw.tuzuk);
  if (!tuzuk.items?.length) tuzuk.items = defaultSite.tuzuk.items.map((item) => ({ ...item }));

  const contact = fillObject(defaultSite.contact, raw.contact);
  if (!contact.schedule?.length) contact.schedule = defaultSite.contact.schedule.map((item) => ({ ...item }));
  if (!contact.mapLat) contact.mapLat = defaultSite.contact.mapLat;
  if (!contact.mapLng) contact.mapLng = defaultSite.contact.mapLng;
  if (!contact.mapsUrl) contact.mapsUrl = defaultSite.contact.mapsUrl;

  const corporate = fillObject(defaultSite.corporate, raw.corporate);

  return {
    hero,
    identity: fillObject(defaultSite.identity, raw.identity),
    home,
    stats: Array.isArray(raw.stats) ? raw.stats : [],
    corporate,
    activities: Array.isArray(raw.activities) ? raw.activities : [],
    board: Array.isArray(raw.board) ? raw.board : [],
    members: Array.isArray(raw.members) ? raw.members : [],
    posts: Array.isArray(raw.posts) ? raw.posts : [],
    hafiza: Array.isArray(raw.hafiza) && raw.hafiza.length ? raw.hafiza : defaultSite.hafiza.map((item) => ({ ...item, tags: [...item.tags] })),
    about,
    tuzuk,
    donate: {
      ...fillObject(defaultSite.donate, raw.donate),
      amounts: Array.isArray(raw.donate?.amounts) ? raw.donate.amounts : [],
    },
    contact,
  };
}
