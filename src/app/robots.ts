import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const envBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = (envBaseUrl || "https://dragaleaviation.com").replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_trash/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
