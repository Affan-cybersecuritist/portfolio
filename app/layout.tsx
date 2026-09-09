import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://affan-cybersecuritist.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mohamed Affan H. — Cybersecurity Engineer",
    template: "%s — Mohamed Affan H.",
  },
  description:
    "Mohamed Affan H. — cybersecurity undergraduate building anomaly detection, autonomous AppSec agents, and AI-driven compliance systems.",
  keywords: [
    "Mohamed Affan H",
    "cybersecurity engineer",
    "network security",
    "GRC",
    "AI agents",
    "Chennai Institute of Technology",
  ],
  authors: [{ name: "Mohamed Affan H." }],
  openGraph: {
    title: "Mohamed Affan H. — Cybersecurity Engineer",
    description:
      "Cybersecurity undergraduate building anomaly detection, autonomous AppSec agents, and AI-driven compliance systems.",
    url: SITE_URL,
    siteName: "Mohamed Affan H.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Affan H. — Cybersecurity Engineer",
    description:
      "Cybersecurity undergraduate building anomaly detection, autonomous AppSec agents, and AI-driven compliance systems.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
