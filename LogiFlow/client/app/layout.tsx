import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LogiFlow | Smart Logistics & Delivery",
    template: "%s | LogiFlow",
  },
  description:
    "LogiFlow is a modern logistics platform for shipment tracking, delivery management, and smart logistics solutions.",
  keywords: [
    "LogiFlow",
    "logistics",
    "courier delivery",
    "shipment tracking",
    "delivery management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
