import { MetadataRoute } from "next";
import { getAllSolutionSlugs } from "../utils/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const envBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = (envBaseUrl || "https://dragaleaviation.com").replace(/\/$/, "");
  const lastModified = new Date();

  const solutionUrls = getAllSolutionSlugs().map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified,
    },
    {
      url: `${baseUrl}/advisors`,
      lastModified,
    },
    {
      url: `${baseUrl}/team`,
      lastModified,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified,
    },
    ...solutionUrls,
  ];
}
