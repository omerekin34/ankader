export const hafizaTags = [
  "Buluşmalar",
  "Mezuniyet",
  "Vefa",
  "Ziyaret",
  "İş Birliği",
  "Mentörlük",
  "Kurultay",
  "Spor",
  "Okul",
] as const;

export type HafizaTag = (typeof hafizaTags)[number];

export type HafizaItem = {
  src: string;
  alt: string;
  caption: string;
  tags: HafizaTag[];
};

export const hafizaItems: HafizaItem[] = [
  {
    src: "/hafiza/etayfa.jpeg",
    alt: "E-Tayfa buluşması",
    caption: "Geleneksel E-Tayfa Buluşmaları",
    tags: ["Buluşmalar"],
  },
  {
    src: "/hafiza/mezun-bulusma.jpeg",
    alt: "Mezunlar buluşması",
    caption: "Yıllar sonra aynı heyecan, aynı muhabbet ve aynı gönül bağıyla yeniden buluştuk.",
    tags: ["Buluşmalar"],
  },
  {
    src: "/hafiza/mezuniyet-2026.jpeg",
    alt: "2026 mezuniyet programı",
    caption: "2026 / 7. Dönem Mezuniyet Programımız",
    tags: ["Mezuniyet"],
  },
  {
    src: "/hafiza/zirve.jpeg",
    alt: "Zirve Yolunda Mezun Buluşmaları",
    caption: "Zirve Yolunda Mezun Buluşmaları",
    tags: ["Buluşmalar", "Mentörlük"],
  },
  {
    src: "/hafiza/vefa.jpeg",
    alt: "Vefa programı",
    caption: "Vefa programlarından bir hatıra",
    tags: ["Vefa"],
  },
  {
    src: "/hafiza/kurumsal.jpeg",
    alt: "Kurumsal ziyaret",
    caption: "Kurumsal ziyaretler ve iş birlikleri",
    tags: ["İş Birliği", "Ziyaret"],
  },
  {
    src: "/hafiza/ziyaret.jpeg",
    alt: "Mezun ziyareti",
    caption: "Mezunlarımızdan bir ziyaret hatırası",
    tags: ["Ziyaret"],
  },
  {
    src: "/hafiza/soylesi.jpeg",
    alt: "Mezun söyleşisi",
    caption: "Köklerden göklere uzanan tecrübe paylaşımı",
    tags: ["Mentörlük"],
  },
  {
    src: "/hafiza/pihmed.jpeg",
    alt: "PİHMED 50. yıl şenlikleri",
    caption:
      "2025 mezunlarımız PİHMED 50. Yıl Şenliklerinde büyük başarı elde ederek futbol turnuvası 1.’si oldular.",
    tags: ["Spor", "Mezuniyet"],
  },
  {
    src: "/hafiza/kurultay.jpeg",
    alt: "İmam Hatipler Kurultayı",
    caption: "23. İmam Hatipler Kurultay’ına katıldık.",
    tags: ["Kurultay", "İş Birliği"],
  },
  {
    src: "/hafiza/mudur-ziyaret.jpeg",
    alt: "Okul müdürü ziyareti",
    caption: "Okul müdürümüz Sayın Ebamüslim Yaşaroğlu hocamızı ziyaret ettik.",
    tags: ["Ziyaret", "Okul"],
  },
  {
    src: "/hafiza/yeni-yil.jpeg",
    alt: "Yeni eğitim öğretim yılı",
    caption: "Yeni eğitim öğretim yılı hayırlı olsun!",
    tags: ["Okul"],
  },
];
