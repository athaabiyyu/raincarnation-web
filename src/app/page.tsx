import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{siteConfig.name}</h1>
      <p className="mt-2">{siteConfig.tagline}</p>
    </main>
  );
}