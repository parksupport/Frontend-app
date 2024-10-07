import type { Metadata } from "next";
import { bloggerSans } from "./fonts";
import "./globals.css";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Founders+Grotesk:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={bloggerSans.className}
      >
        {children}
      </body>
    </html>
  );
}
