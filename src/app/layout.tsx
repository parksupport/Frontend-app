import { bloggerSans } from "./fonts";
import "./globals.css";
import Providers from "./providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`${bloggerSans.className} bg-[#F4F4FA] `}
      >
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
