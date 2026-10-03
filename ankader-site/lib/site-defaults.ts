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
  yonetim_kurulu: [],
  denetim_kurulu: [],
  dernekBaskanlari: {
    eyebrow: "Kurumsal",
    title: "Dernek Başkanlarımız",
    text: "Derneğe başkanlık etmiş isimler.",
    people: [],
  },
  baskanSozu: {
    eyebrow: "Başkan'dan söz",
    greeting: "Kıymetli Mezunlarımız, Değerli Mensuplarımız ve Aziz Gönül Dostlarımız,",
    highlight: "ANKADER, işte bu anlayışın ve vefanın bir tezahürüdür.",
    closing: "Birlikte hatırlıyor, birlikte üretiyor, birlikte geleceğe yürüyoruz.",
    farewell: "Selam, dua ve muhabbetle…",
    name: "Emre Boylu",
    role: "ANKADER Yönetim Kurulu Başkanı",
    body: [
      "Bir okul; yalnızca dersliklerden, sıralardan ve koridorlardan ibaret değildir. Bir okul, yıllar boyunca nice gönüllerin buluştuğu, dostlukların kurulduğu, ideallerin ve hayallerin yeşerdiği bir yuva; hayatımıza yön veren kıymetli bir hatıradır.",
      "Bizler, Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi’nin sıralarından geçen, bu okulun havasını teneffüs eden ve burada nice güzel hatıralar biriktiren mezun ve mensuplar olarak, okulumuzla olan bağımızın mezuniyet belgesiyle sona ermediğine inanıyoruz.",
      "ANKADER, işte bu anlayışın ve vefanın bir tezahürüdür.",
      "Gayemiz; mezunlarımız ve mensuplarımız arasındaki gönül bağını güçlendirmek, öğrencilerimizin eğitim ve gelişim süreçlerine katkı sunmak, gençlerimize rehberlik etmek ve okulumuzun bugününe olduğu kadar yarınlarına da omuz vermektir.",
      "İlim, irfan ve güzel ahlak ekseninde yetişen gençlerimizin; kendisine, ailesine, milletine ve insanlığa faydalı bireyler olarak yetişmesi hepimizin ortak sorumluluğudur. Bu sorumluluğu yalnızca bugünün değil, geleceğin emanetini taşıma bilinciyle üstleniyoruz.",
      "ANKADER olarak; mezunlarımızın tecrübesini öğrencilerimizin heyecanıyla buluşturmayı, büyüklerimizin birikimini gençlerimize aktarmayı ve okulumuza gönül veren herkesi aynı çatı altında bir araya getirmeyi hedefliyoruz.",
      "Biliyoruz ki güçlü bir okul kültürü, güçlü bir aidiyet duygusuyla; güçlü bir gelecek ise el ele veren insanların gayretiyle inşa edilir.",
      "Bu yolda attığımız her adımda okulumuzun değerlerini, mezunlarımızın hatıralarını ve öğrencilerimizin geleceğe dair umutlarını taşıyoruz.",
      "Rabbimizden niyazımız; ilimle, irfanla, güzel ahlakla ve kardeşlikle yürüdüğümüz bu yolda gayretimizi bereketlendirmesi, ANKADER’i hayırlı işlere vesile kılması ve bizlere emanet edilen gençlerimizin istikbaline katkı sunmayı nasip etmesidir.",
      "Bu vesileyle ANKADER’in kuruluşundan bugüne emeği geçen tüm başkanlarımıza, yönetim kurulu üyelerimize, mezunlarımıza, mensuplarımıza, kıymetli hocalarımıza ve gönül veren tüm dostlarımıza teşekkür ediyorum.",
    ].join("\n\n"),
  },
  privileges: {
    eyebrow: "Üyeler",
    title: "Üye Ayrıcalıkları",
    text: "Üyelik; mezun ağına katılmak, birbirine destek olmak ve gelecek nesillere katkı sunmaktır.",
    quote:
      "ANKADER üyeliği, yalnızca bir üyelik değil; mezun olduğumuz okulla bağımızı sürdürmenin, birbirimize destek olmanın ve gelecek nesillere katkı sunmanın bir yoludur.",
    items: [
      {
        icon: "🤝",
        title: "Güçlü Bir Mezun Ağı",
        text: "ANKADER çatısı altında farklı dönemlerden mezun ve mensuplarla tanışma, iletişim ve dayanışma imkânı.",
      },
      {
        icon: "🎓",
        title: "Kariyer ve Rehberlik",
        text: "Öğrencilerimiz ve mezunlarımız arasında tecrübe paylaşımı, kariyer buluşmaları ve mesleki rehberlik imkânları.",
      },
      {
        icon: "📚",
        title: "Eğitim ve Gelişim",
        text: "Seminer, söyleşi, eğitim, atölye ve özel programlardan haberdar olma ve katılım fırsatı.",
      },
      {
        icon: "🏫",
        title: "Okulla Bağını Sürdürme",
        text: "Mezun olduğun okulla bağını koparmadan, okulun gelişimine ve öğrencilerimizin geleceğine katkı sunma imkânı.",
      },
      {
        icon: "🎉",
        title: "Mezun Buluşmaları",
        text: "Mezuniyet dönemleri ve farklı kuşaklardan arkadaşlarla düzenlenen buluşmalara katılım.",
      },
      {
        icon: "💼",
        title: "İş ve İmkân Paylaşımı",
        text: "Mezunlar arasında iş, staj, proje ve mesleki fırsatların paylaşılmasına katkı sağlayan dayanışma ağı.",
      },
      {
        icon: "🌱",
        title: "Sosyal Sorumluluk",
        text: "Eğitim, gençlik ve sosyal sorumluluk çalışmalarında aktif rol alma ve gönüllü projelere katılma imkânı.",
      },
      {
        icon: "📢",
        title: "ANKADER’den Öncelikli Haberdar Olma",
        text: "Dernek faaliyetleri, etkinlikler, buluşmalar ve duyurulardan doğrudan haberdar olma.",
      },
    ],
  },
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
    donateHeroText: "Tutarı seçin, hesaba havale veya EFT yapın, dekontu iletin.",
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

export function councilInitials(name: string) {
  const letters = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr-TR");
  return letters || "YY";
}

function councilField(raw: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function normalizeCouncilMember(raw: Partial<SiteData["board"][number]> | null | undefined): SiteData["board"][number] {
  const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const name = councilField(record, ["name", "ad_soyad"]);
  return {
    name,
    role: councilField(record, ["role", "gorev"]),
    phone: councilField(record, ["phone", "telefon"]),
    photo: councilField(record, ["photo", "fotograf"]),
    email: councilField(record, ["email", "eposta"]),
    initials: councilField(record, ["initials"]) || councilInitials(name),
  };
}

function councilList(value: unknown, fallback: SiteData["board"]) {
  const source = Array.isArray(value) ? value : fallback;
  return source.map((item) => normalizeCouncilMember(item));
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
  const legacyBoard = Array.isArray(raw.board) ? raw.board : [];
  const yonetim_kurulu = councilList(raw.yonetim_kurulu, legacyBoard);
  const denetim_kurulu = councilList(raw.denetim_kurulu, []);
  const presidents = fillObject(defaultSite.dernekBaskanlari, raw.dernekBaskanlari);
  presidents.people = councilList(raw.dernekBaskanlari?.people, []);

  return {
    hero,
    identity: fillObject(defaultSite.identity, raw.identity),
    home,
    stats: Array.isArray(raw.stats) ? raw.stats : [],
    corporate,
    activities: Array.isArray(raw.activities) ? raw.activities : [],
    board: yonetim_kurulu,
    yonetim_kurulu,
    denetim_kurulu,
    dernekBaskanlari: presidents,
    baskanSozu: fillObject(defaultSite.baskanSozu, raw.baskanSozu),
    privileges: {
      ...fillObject(defaultSite.privileges, raw.privileges),
      items: Array.isArray(raw.privileges?.items)
        ? raw.privileges.items.map((item) => ({
            icon: typeof item?.icon === "string" && item.icon.trim() ? item.icon.trim() : "✦",
            title: typeof item?.title === "string" ? item.title : "",
            text: typeof item?.text === "string" ? item.text : "",
          }))
        : defaultSite.privileges.items.map((item) => ({ ...item })),
    },
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
