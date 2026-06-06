import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  galleryEmbeddedVideos,
  galleryImages,
  galleryVideos,
  getEmbeddedVideoUrl
} from "@/lib/site-content";
import { GalleryVideoCard } from "@/components/sections/gallery-video-card";

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
          Explore real photos and videos of Luxury AC Rooms, wedding setups,
          garden area and event halls at Mahapragya Vihar, Bhuwana Udaipur.
        </p>
      </div>

      <div className="mb-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-accent/70">Venue Videos</p>
            <h3 className="mt-2 font-heading text-3xl text-accent">Walkthrough and real venue clips</h3>
          </div>
        </div>

        {galleryEmbeddedVideos.length > 0 && (
          <div className="mb-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {galleryEmbeddedVideos.map((video) => (
              <div key={video.url} className="overflow-hidden rounded-[32px] bg-white shadow-soft">
                <div className="aspect-[9/16] bg-black">
                  <iframe
                    src={getEmbeddedVideoUrl(video.url)}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
                    {video.sourceLabel}
                  </p>
                  <h4 className="mt-2 font-heading text-2xl text-accent">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {galleryVideos.map((video, index) => (
            <GalleryVideoCard
              key={video}
              src={video}
              title={`Mahapragya Vihar video ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.26em] text-accent/70">Photo Gallery</p>
        <h3 className="mt-2 font-heading text-3xl text-accent">Rooms and campus photos</h3>
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
                    ? "AC room 2 at Mahapragya Vihar Bhuwana Udaipur"
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
          <Button>Check Venue</Button>
        </Link>

        <Link href="/events">
          <Button variant="secondary">View Wedding Hall</Button>
        </Link>
      </div>
    </section>
  );
}
