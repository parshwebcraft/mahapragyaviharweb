import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahapragya Vihar",
    short_name: "Mahapragya",
    description:
      "Simple website for Mahapragya Vihar rooms, gallery, contact, and support.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF7E6",
    theme_color: "#F5D36A",
    icons: [
      {
        src: "/TS.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/TS.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
