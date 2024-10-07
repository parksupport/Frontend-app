import { bloggerSans } from "./fonts";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={bloggerSans.className}
      >
        {children}
      </body>
    </html>
  );
}
