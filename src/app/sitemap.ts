import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://albertsonweiss.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/como-funciona`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/oportunidades`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/track-record`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/sobre-nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/registro`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/login`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic car pages
  // TODO: Fetch open/active cars from Supabase
  // const supabase = createClient();
  // const { data: cars } = await supabase
  //   .from("cars")
  //   .select("id, updated_at")
  //   .in("status", ["open", "funded", "in_transit"]);
  //
  // const carPages = (cars ?? []).map((car) => ({
  //   url: `${siteUrl}/oportunidades/${car.id}`,
  //   lastModified: new Date(car.updated_at),
  //   changeFrequency: "daily" as const,
  //   priority: 0.8,
  // }));

  return [...staticPages];
}
