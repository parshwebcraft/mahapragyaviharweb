import Image from "next/image";

const gallery = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
];

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
        {gallery.map((image, index) => (
          <div
            key={image}
            className={`relative overflow-hidden rounded-[32px] shadow-soft ${
              index === 0 ? "md:row-span-2 min-h-[520px]" : "min-h-[250px]"
            }`}
          >
            <Image
              src={image}
              alt={`Mahapragya Vihar gallery ${index + 1}`}
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
