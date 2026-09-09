/** @type {import('next').NextConfig} */

// Set CUSTOM_DOMAIN=1 (e.g. in the GitHub Actions workflow, once a .me domain
// is attached) to drop the "/portfolio" prefix — a custom domain always serves
// from the root, so the prefix needed for the default github.io/portfolio/
// URL would otherwise break every asset path.
const onCustomDomain = process.env.CUSTOM_DOMAIN === "1";
const repoBasePath = onCustomDomain ? "" : "/portfolio";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: repoBasePath,
  images: { unoptimized: true },
  // Next's basePath auto-prefixes next/link and next/image, but not plain
  // <img src="/x"> or <a href="/x"> — this exposes the same value to those.
  env: { NEXT_PUBLIC_BASE_PATH: repoBasePath },
};

export default nextConfig;
