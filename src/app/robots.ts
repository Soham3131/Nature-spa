import type { MetadataRoute } from "next";

const BASE = "https://thenaturespa.example.com"; // TODO: set your real domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
