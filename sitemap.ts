import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://luxurytaxilimo.com",
      lastModified: new Date(),
    },
    {
      url: "https://luxurytaxilimo.com/en/booking",
      lastModified: new Date(),
    },
    {
      url: "https://luxurytaxilimo.com/en/privacy",
      lastModified: new Date(),
    },
    {
      url: "https://luxurytaxilimo.com/en/colofon",
      lastModified: new Date(),
    },
  ];
}