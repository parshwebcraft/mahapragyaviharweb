import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/lib/site-content";

export function GallerySection() {
  return (
    <section className="section-shell py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">
          Mahapragya Vihar Gallery
        </p>

        <h2 className="mt-3 font-heading text-4xl text-accent">
          Rooms, wedding hall and gallery photos in Bhuwana, Udaipur
        </h2>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Explore real photos of AC rooms, Non-AC rooms, wedding setups, garden
          area and event halls at Mahapragya Vihar, Bhuwana Udaipur.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {galleryImages.map((image, index) => (
          <div
            key={image}
            className={`relative overflow-hidden rounded-[32px] shadow-soft ${
              index === 0 ? "md:row-span-2 min-h-[520px]" : "min-h-[250px]"
            }`}
          >
            <Image
              src={image}
              alt={
                index === 0
                  ? "AC room 1 at Mahapragya Vihar Bhuwana Udaipur"
                  : index === 1
                    ? "Non AC room 2 at Mahapragya Vihar Bhuwana Udaipur"
                    : "Wedding and event venue Mahapragya Vihar Udaipur"
              }
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/rooms">
          <Button>Check Rooms</Button>
        </Link>

        <Link href="/events">
          <Button variant="secondary">View Wedding Hall</Button>
        </Link>
      </div>
    </section>
  );
}
