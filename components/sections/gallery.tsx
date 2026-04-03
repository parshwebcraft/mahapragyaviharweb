import Image from "next/image";
import { galleryImages } from "@/lib/site-content";

export function GallerySection() {
  return (
    <section className="section-shell py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Gallery</p>
        <h2 className="mt-3 font-heading text-4xl text-accent">
          Visual storytelling for rooms, ceremonies, and sacred gatherings.
        </h2>
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
              alt={index < 2 ? `Mahapragya Vihar room ${index + 1}` : `Mahapragya Vihar gallery ${index + 1}`}
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
