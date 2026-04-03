import { GallerySection } from "@/components/sections/gallery";

export default function GalleryPage() {
  return (
    <main className="pb-16">
      <section className="section-shell py-16">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Gallery</p>
          <h1 className="mt-3 font-heading text-5xl text-accent">A quiet visual tour of the property.</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Rooms, garden spaces, and event-friendly areas shown in a clean, easy layout.
          </p>
        </div>
      </section>
      <GallerySection />
    </main>
  );
}
