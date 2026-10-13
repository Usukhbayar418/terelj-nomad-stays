import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";
import BookingForm from "./BookingForm";

export default function BookingPage() {
  return (
    <div>
      <PageHero
        title="Book Your Stay"
        subtitle="Reserve a ger, plan tours and request pickup — all in one place"
        imageSrc={images.ger}
        imageAlt="Traditional Mongolian ger at sunset"
      />

      <section className="bg-stone-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
