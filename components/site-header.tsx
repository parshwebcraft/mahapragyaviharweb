import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/72 backdrop-blur-xl md:top-4 md:border-0 md:bg-transparent md:px-4">
      <div className="section-shell flex h-20 items-center justify-between md:rounded-full md:border md:border-white/60 md:bg-white/82 md:px-6 md:shadow-soft md:backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-accent/10 bg-white shadow-sm">
            <Image
              src="/TS.png"
              alt="Mahapragya Vihar logo"
              fill
              sizes="48px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div>
            <p className="font-heading text-xl text-accent">Mahapragya Vihar</p>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Bhuwana, Udaipur
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/rooms">
          <Button variant="secondary" size="sm">
            Explore Venue
          </Button>
        </Link>
      </div>
    </header>
  );
}
