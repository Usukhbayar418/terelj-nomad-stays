export type Locale = "mn" | "en";

export const LOCALES: Locale[] = ["mn", "en"];
export const DEFAULT_LOCALE: Locale = "mn";

type Dict = {
  brand: {
    name: string;
    tagline: string;
    badges: string[];
  };
  nav: {
    home: string;
    accommodation: string;
    tours: string;
    activities: string;
    packages: string;
    contact: string;
    bookNow: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    features: { title: string; desc: string }[];
  };
  location: {
    title: string;
    body: string;
    bullets: string[];
  };
  accommodation: {
    title: string;
    subtitle: string;
    ger: {
      name: string;
      price: string;
      per: string;
      capacity: string;
      bullets: string[];
      best: string;
    };
    tent: {
      name: string;
      price: string;
      per: string;
      capacity: string;
      bullets: string[];
      best: string;
      note: string;
    };
  };
  tours: {
    title: string;
    subtitle: string;
    terelj: {
      name: string;
      price: string;
      priceNote: string;
      bullets: string[];
    };
    chinggis: {
      name: string;
      price: string;
      priceNote: string;
      desc: string;
    };
  };
  activities: {
    title: string;
    subtitle: string;
    horse: { name: string; price: string; per: string };
    camel: { name: string; price: string; per: string };
    food: {
      title: string;
      name: string;
      price: string;
      per: string;
      desc: string;
      note: string;
    };
    night: {
      title: string;
      name: string;
      price: string;
      per: string;
      bullets: string[];
    };
  };
  packages: {
    title: string;
    subtitle: string;
    terelj: {
      name: string;
      price: string;
      per: string;
      includes: string;
    };
    evening: {
      name: string;
      price: string;
      per: string;
      includes: string;
    };
  };
  why: {
    title: string;
    bullets: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    ig: string;
    airbnb: string;
    notesTitle: string;
    notes: string[];
    bookNow: string;
  };
  footer: {
    rights: string;
    follow: string;
  };
};

const mn: Dict = {
  brand: {
    name: "NOMAD",
    tagline: "Тэрэлжийн голын эрэг дэх амрагч",
    badges: ["Тайван байгаль", "Жинхэнэ Монгол", "Мартагдашгүй дурсамж"],
  },
  nav: {
    home: "Нүүр",
    accommodation: "Байр",
    tours: "Аялал",
    activities: "Үйл ажиллагаа",
    packages: "Багц",
    contact: "Холбоо барих",
    bookNow: "Захиалга өгөх",
  },
  hero: {
    eyebrow: "Гэр • Майхан • Аялал • Жинхэнэ Монгол туршлага",
    title: "Тэрэлжийн голын эрэг дэх амрагч",
    subtitle:
      "Туул голын эрэг дээр, Тэрэлжийн байгалийн цогцолборт байрлах манай жижиг хувийн кемп нь байгальд тайван амрах боломжийг олгоно.",
    ctaPrimary: "Одоо захиалах",
    ctaSecondary: "Дэлгэрэнгүй үзэх",
    features: [
      { title: "Тэрэлжийн БЦГ", desc: "Үндэсний тусгай хамгаалалттай" },
      { title: "Туул голын эрэг", desc: "Усны дуу чимээтэй амралт" },
      { title: "Жижиг, хувийн", desc: "Зөвхөн 3 гэр, 2 майхан" },
    ],
  },
  location: {
    title: "Байршил",
    body:
      "Тэрэлжийн байгалийн цогцолборт, Туул голын эрэг дээр байрлах манай жижиг хувийн кемп нь байгальд тайван амрах боломжийг олгоно.",
    bullets: [
      "Голын эрэг дээр",
      "Уул, байгалиар хүрээлэгдсэн",
      "Амрах, байгаль мэдрэх, од харахад тохиромжтой",
      "Жижиг хувийн кемп: зөвхөн 3 гэр, 2 майхан",
    ],
  },
  accommodation: {
    title: "Байрлах",
    subtitle: "Тав тухтай гэр эсвэл адал явдалт майхан — сонголт танд",
    ger: {
      name: "Монгол гэр",
      price: "$90",
      per: "/шөнө",
      capacity: "(4 хүртэл хүн)",
      bullets: [
        "Ор, цагаан хэрэглэлтэй",
        "Дулаан, тохилог гэр",
        "Монгол ахуйн жинхэнэ мэдрэмж",
      ],
      best: "Тав тухтэй хүссэн, гэр бүлд тохиромжтой",
    },
    tent: {
      name: "Майхан",
      price: "$50",
      per: "/шөнө",
      capacity: "(4 хүртэл хүн)",
      bullets: ["2 өрөөтэй майхан", "Энгийн кемпингийн хэрэгсэл"],
      best: "Байгальд ойр, хямд, адал явдалт мэдрэмж",
      note: "Анхаарах: Майхан нь энгийн нөхцөлтэй, цаг агаараас хамаарна.",
    },
  },
  tours: {
    title: "Аялал",
    subtitle: "Манай жолоочтой Тэрэлж хийгээд Чингис хааны хөшөөг үзээрэй",
    terelj: {
      name: "Тэрэлжийн аялал",
      price: "$100",
      priceNote: "(2–4 хүн)",
      bullets: [
        "Машин + жолооч",
        "Яст мэлхий хад",
        "Арьяабал хийд",
      ],
    },
    chinggis: {
      name: "Чингис хааны хөшөө",
      price: "$30",
      priceNote: "/хүн (тасалбар орогүй)",
      desc: "Чингис хааны хөшөө цогцолборыг үзэх аялал.",
    },
  },
  activities: {
    title: "Үйл ажиллагаа",
    subtitle: "Морь, тэмээ, хорхог болон гал түлэх — мартагдашгүй мэдрэмж",
    horse: { name: "Морь унах", price: "$20–25", per: "/цаг / хүн" },
    camel: { name: "Тэмээ унах", price: "$20", per: "/цаг / хүн" },
    food: {
      title: "Хоол",
      name: "Хорхог",
      price: "$30",
      per: "/хүн",
      desc:
        "Монгол уламжлалт хоол. Чулуугаар болгосон. 2+ хүнтэй захиалахыг зөвлөж байна.",
      note: "2-оос дээш хүнтэй захиалахыг зөвлөнө",
    },
    night: {
      title: "Оройн хөтөлбөр",
      name: "Гал + Од харах",
      price: "$15",
      per: "/хүн",
      bullets: ["Гал түлэх", "Од харах", "Цай эсвэл халуун сүү", "Зефир шарах"],
    },
  },
  packages: {
    title: "Багц санал",
    subtitle: "Хэмнэлттэй багц, хамгийн дуртай туршлагуудыг нэгтгэв",
    terelj: {
      name: "Тэрэлж багц",
      price: "$130–160",
      per: "/хүн",
      includes: "Гэр + Аялал + Морь унах",
    },
    evening: {
      name: "Оройн багц",
      price: "$45",
      per: "/хүн",
      includes: "Хорхог + Гал + Од харах + Цай / Халуун сүү + Зефир",
    },
  },
  why: {
    title: "Яагаад бид?",
    bullets: [
      "Голын эрэг дээр байршилтай (Туул гол)",
      "Жижиг, хувийн кемп (5 байр)",
      "Монгол ахуйн жинхэнэ мэдрэмж",
      "Найрсаг, хувь хандлагатай үйлчилгээ",
      "Үнэ боломжийн, үнэ цэн өндөр",
    ],
  },
  contact: {
    title: "Холбоо барих",
    subtitle: "Захиалга, нэмэлт мэдээлэл авах бол бидэнтэй холбогдоорой",
    phone: "+976 88849073",
    ig: "@nomad_terelj",
    airbnb: "Airbnb: Nomad Riverside Stay Terelj",
    notesTitle: "Нэмэлт мэдээлэл",
    notes: [
      "Урьдчилан захиалах шаардлагатай",
      "Үнэ нь хүний тооноос хамаарч өөрчлөгдөж болно",
      "Захиалгат аялал, үйлчилгээ боломжтой",
    ],
    bookNow: "Одоо захиалах",
  },
  footer: {
    rights: "Бүх эрх хуулиар хамгаалагдсан.",
    follow: "Биднийг дагах",
  },
};

const en: Dict = {
  brand: {
    name: "NOMAD",
    tagline: "Riverside Stay Terelj",
    badges: ["Peaceful Nature", "Authentic Mongolia", "Unforgettable Memories"],
  },
  nav: {
    home: "Home",
    accommodation: "Accommodation",
    tours: "Tours",
    activities: "Activities",
    packages: "Packages",
    contact: "Contact",
    bookNow: "Book Now",
  },
  hero: {
    eyebrow: "Ger • Camping • Tours • Authentic Experiences",
    title: "Riverside Stay in Terelj",
    subtitle:
      "Located by the beautiful Tuul River in Terelj National Park, our small private camp offers a peaceful escape surrounded by nature.",
    ctaPrimary: "Book Now",
    ctaSecondary: "Learn More",
    features: [
      { title: "Terelj National Park", desc: "Inside the protected park" },
      { title: "Tuul Riverside", desc: "Sleep to the sound of the river" },
      { title: "Small & Private", desc: "Only 3 gers, 2 tents" },
    ],
  },
  location: {
    title: "Location",
    body:
      "Located by the beautiful Tuul River in Terelj National Park, our small private camp offers a peaceful escape surrounded by nature.",
    bullets: [
      "Riverside setting",
      "Surrounded by mountains",
      "Perfect for relaxation, nature & stargazing",
      "Small private camp: 3 gers & 2 tents only",
    ],
  },
  accommodation: {
    title: "Accommodation",
    subtitle: "Cosy traditional ger or adventurous tent — choose what fits you",
    ger: {
      name: "Traditional Ger Stay",
      price: "$90",
      per: "per night",
      capacity: "(up to 4 people)",
      bullets: [
        "Comfortable beds & bedding",
        "Warm, insulated ger",
        "Authentic Mongolian experience",
      ],
      best: "Best for comfort, families, colder nights",
    },
    tent: {
      name: "Camping Tent Stay",
      price: "$50",
      per: "per night",
      capacity: "(up to 4 people)",
      bullets: ["2-room tent", "Basic camping setup"],
      best: "Best for nature lovers, budget travelers, adventure experience",
      note: "Note: Tent stay is a simple outdoor experience and weather dependent.",
    },
  },
  tours: {
    title: "Tours",
    subtitle: "Explore Terelj and the famous Chinggis Khan Statue with our driver",
    terelj: {
      name: "Terelj National Park Tour",
      price: "$100",
      priceNote: "total (2–4 people)",
      bullets: ["Private car & driver", "Turtle Rock", "Aryabal Meditation Temple"],
    },
    chinggis: {
      name: "Chinggis Khan Statue Tour",
      price: "$30",
      priceNote: "per person (entry not included)",
      desc: "Visit the famous Chinggis Khan Statue Complex.",
    },
  },
  activities: {
    title: "Activities",
    subtitle: "Horses, camels, khorkhog and bonfires — pure Mongolia",
    horse: { name: "Horse Riding", price: "$20–25", per: "/hour / person" },
    camel: { name: "Camel Riding", price: "$20", per: "/hour / person" },
    food: {
      title: "Food Experience",
      name: "Khorkhog",
      price: "$30",
      per: "per person",
      desc: "Traditional Mongolian BBQ cooked with hot stones.",
      note: "Minimum 2 people recommended.",
    },
    night: {
      title: "Night Experience",
      name: "Bonfire & Stargazing",
      price: "$15",
      per: "per person",
      bullets: ["Bonfire", "Stargazing", "Tea or hot milk", "Marshmallow roasting"],
    },
  },
  packages: {
    title: "Packages",
    subtitle: "Bundle the favourites and save",
    terelj: {
      name: "Terelj Experience Package",
      price: "$130–160",
      per: "per person",
      includes: "Ger stay + Terelj tour + Horse riding",
    },
    evening: {
      name: "Evening Experience Package",
      price: "$45",
      per: "per person",
      includes: "Khorkhog + Bonfire & Stargazing + Tea / Hot milk + Marshmallows",
    },
  },
  why: {
    title: "Why Choose Us?",
    bullets: [
      "Riverside location (Tuul River)",
      "Small & private camp (5 units)",
      "Authentic Mongolian experience",
      "Friendly & personalized service",
      "Affordable & great value",
    ],
  },
  contact: {
    title: "Contact",
    subtitle: "Reach out for booking and more information",
    phone: "+976 88849073",
    ig: "@nomad_terelj",
    airbnb: "Airbnb: Nomad Riverside Stay Terelj",
    notesTitle: "Notes",
    notes: [
      "Advance booking recommended",
      "Prices may vary depending on group size",
      "Custom tours & experiences available upon request",
    ],
    bookNow: "Book Now",
  },
  footer: {
    rights: "All rights reserved.",
    follow: "Follow us",
  },
};

export const dictionaries: Record<Locale, Dict> = { mn, en };

export type { Dict };
