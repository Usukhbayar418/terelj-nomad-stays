"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";

type Faq = { q: string; a: string };

const faqsMn: Faq[] = [
  {
    q: "Та хаана байрлаж байна вэ?",
    a: "Бид Тэрэлжийн БЦГ-ийн дотор, Туул голын эрэг дээр байрлах жижиг хувийн ger camp юм. Улаанбаатар хотоос ойролцоогоор 70 км (1.5–2 цаг) зайтай. GPS координат: 47.97°N, 107.46°E.",
  },
  {
    q: "Хотоос хэр зайтай вэ, яаж хүрэх вэ?",
    a: "Улаанбаатараас 70 км, машинаар 1.5–2 цагийн зайтай. Зам бүгд цементэн зам. Урьдчилан мэдэгдвэл нисэх онгоцны буудлаас тосож авах эсвэл хотоос трансфер тохируулах боломжтой.",
  },
  {
    q: "Хэзээ очих вэ дээр вэ?",
    a: "5–10 сар хүртэлх хугацаа хамгийн тохиромжтой. 6, 9 сард уур амьсгал зөөлөн, жуулчин цөөн. 7, 8 сард хамгийн дулаан, кемпэнд тохиромжтой. Өвөл (11–4 сар) ихэвчлэн хаалттай.",
  },
  {
    q: "Үнэ хэд вэ?",
    a: "Монгол гэр $90/шөнө (4 хүн хүртэл). Майхан $50/шөнө (4 хүн хүртэл). Аялал, морины уналт, хоол хамтарсан багц нь $130-аас эхлэнэ.",
  },
  {
    q: "Кэмп дээр ямар үйл ажиллагаа байдаг вэ?",
    a: "Морь унах ($20–25/цаг), тэмээ унах ($20/цаг), монгол уламжлалт хорхог ($30/хүн), оройн гал тойруу од харах ($15/хүн), Яст мэлхий хад болон Арьяабал хийдийн аялал, Чингис хааны хөшөө рүү аялал.",
  },
  {
    q: "Ойролцоо ямар үзэсгэлэнт газрууд байна вэ?",
    a: "Яст мэлхий хад (15 минут), Арьяабал хийд (30 минут), Чингис хааны хөшөө цогцолбор (1 цаг). Хустайн нуруу нь Улаанбаатараас тусдаа аялалаар очдог.",
  },
  {
    q: "Захиалгыг яаж өгөх вэ?",
    a: "Хамгийн хурдан арга бол WhatsApp: +976 8884 9073. Эсвэл info@tereljnomadstays.com email-ээр холбогдоно уу. Airbnb дээр 'Nomad Riverside Stay Terelj' нэрээр захиалж бас болно. Урьдчилан захиалах нь зүйтэй, ялангуяа 7, 8 сард.",
  },
  {
    q: "Англи хэл дээр харилцаж болох уу?",
    a: "Тийм. Бид Монгол болон гадаадын зочдыг хүлээн авдаг. WhatsApp, email-ээр болон газар дээр нь Англи хэлээр харилцана.",
  },
  {
    q: "Майхан болон гэрийн ялгаа юу вэ?",
    a: "Гэр нь дулаан, тав тухтай, ор хэрэглэлтэй, гэр бүл болон илүү тав тухтай байх хүсэлтэй хүмүүст тохиромжтой. Майхан нь хямд, байгальд илүү ойр, адал явдлын мэдрэмжтэй боловч цаг агаараас хамаарна.",
  },
  {
    q: "Хүүхэдтэй явж болох уу?",
    a: "Тийм, гэр бүлд маш тохиромжтой. Гэр нь дулаан, тав тухтай тул хүүхэдтэй гэр бүлд илүү тохиромжтой. Морины уналт, хорхог болон од харах нь хүүхдүүдэд маш сонирхолтой.",
  },
  {
    q: "Тэжээвэр амьтан авч ирж болох уу?",
    a: "Урьдчилан холбогдож тохиролцоно уу. Кемпэд морьд, малгай зэрэг амьтад байдаг тул бэлтгэл хэрэгтэй.",
  },
  {
    q: "WiFi болон цахилгаан байгаа юу?",
    a: "Кемпэд хязгаарлагдмал WiFi болон цахилгаан байна. Хөдөө байгаль учраас хотын стандарттай харьцуулашгүй. Үүнийг чухал биш гэж бодсон бол байгальтайгаа холбогдох сайхан боломж.",
  },
];

const faqsEn: Faq[] = [
  {
    q: "Where is Nomad Riverside Stay Terelj located?",
    a: "We are a small private ger camp located right on the Tuul River inside Gorkhi-Terelj National Park, Mongolia. About 70 km (1.5–2 hours) from Ulaanbaatar. Coordinates: approximately 47.97°N, 107.46°E.",
  },
  {
    q: "How far is the camp from Ulaanbaatar and how do I get there?",
    a: "About 70 km, roughly 1.5 to 2 hours by car on paved road. We can help arrange a private transfer or airport pickup with advance notice.",
  },
  {
    q: "What is the best time of year to visit?",
    a: "May to early October is the best season. June and September have mild weather and fewer tourists. July and August are warmest and best for camping. The camp is typically closed in winter (November–April).",
  },
  {
    q: "How much does a stay cost?",
    a: "A traditional Mongolian ger is $90 per night (up to 4 people). A camping tent is $50 per night (up to 4 people). Bundled packages including tours, horse riding and meals start from around $130 per person.",
  },
  {
    q: "What activities can we do at the camp?",
    a: "Horse riding ($20–25/hour), camel riding ($20/hour), traditional Mongolian khorkhog BBQ ($30/person), bonfire and stargazing nights ($15/person), and guided day tours to Turtle Rock, Aryabal Meditation Temple, and the Chinggis Khan Equestrian Statue.",
  },
  {
    q: "What other attractions are nearby?",
    a: "Within easy reach: Turtle Rock / Melkhii Khad (~15 min), Aryabal Meditation Temple (~30 min), and the world's largest equestrian statue — the Chinggis Khan Statue (~1 hour). Khustai National Park, home to wild Przewalski's horses, is reachable as a separate day trip from Ulaanbaatar.",
  },
  {
    q: "How do I book a stay?",
    a: "The fastest way is WhatsApp at +976 8884 9073. You can also email info@tereljnomadstays.com or book via our Airbnb listing 'Nomad Riverside Stay Terelj'. Advance booking is strongly recommended, especially in July and August.",
  },
  {
    q: "Do you speak English?",
    a: "Yes. We host both Mongolian and international guests and communicate in English by WhatsApp, email and on site.",
  },
  {
    q: "What is the difference between a ger and a tent?",
    a: "The ger is warm, comfortable, has proper beds, and is best for families and people who want more comfort. The tent is cheaper, closer to nature, more adventurous — but it is a simple outdoor experience and depends on the weather.",
  },
  {
    q: "Is the camp suitable for children?",
    a: "Yes, very family-friendly. The ger is warm and comfortable for kids. Horse rides, khorkhog cooking and stargazing nights are favorites for children.",
  },
  {
    q: "Can I bring pets?",
    a: "Please contact us in advance. We have horses and other animals at the camp, so some preparation is needed.",
  },
  {
    q: "Is there WiFi and electricity?",
    a: "We have limited WiFi and electricity at the camp. As a wild nature setting, it is not a city standard — but if you want to truly disconnect, this is a beautiful chance to do so.",
  },
];

export default function FaqPage() {
  const { locale } = useLanguage();
  const isMn = locale === "mn";
  const faqs = isMn ? faqsMn : faqsEn;

  const title = isMn ? "Түгээмэл асуултууд" : "Frequently Asked Questions";
  const subtitle = isMn
    ? "Зочдын ихэвчлэн асуудаг асуултуудын хариулт"
    : "Answers to the questions our guests ask most often";

  return (
    <div>
      <PageHero
        title={title}
        subtitle={subtitle}
        imageSrc={images.mountain}
        imageAlt={title}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl ring-1 ring-stone-200 bg-stone-50 p-6 open:bg-white open:ring-emerald-300 transition-colors"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-stone-900">
                    {f.q}
                  </h2>
                  <span className="mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-600 text-white text-sm group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-stone-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-emerald-900 text-white p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-bold">
              {isMn
                ? "Өөр асуулт байна уу?"
                : "Still have questions?"}
            </h2>
            <p className="mt-2 text-emerald-100">
              {isMn
                ? "Бидэнтэй WhatsApp эсвэл email-ээр холбогдоно уу."
                : "Reach us on WhatsApp or by email — we usually reply the same day."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/97688849073"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-emerald-900 px-6 py-3 font-semibold hover:bg-emerald-50"
              >
                💬 WhatsApp
              </a>
              <a
                href="mailto:info@tereljnomadstays.com"
                className="inline-flex items-center gap-2 rounded-full ring-1 ring-white/40 px-6 py-3 font-semibold hover:bg-white/10"
              >
                ✉️ info@tereljnomadstays.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
