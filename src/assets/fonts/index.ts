import localFont from "next/font/local";

const bloggerSans = localFont({
  src: "./blogger-sans.medium.ttf",
  display: "swap",
  variable: "--font-blogger-sans",
});

const feather = localFont({
  src: "./feather.ttf",
  display: "swap",
  variable: "--font-feather",
});

const groteskText= localFont({
  src: "./feather.ttf",
  display: "swap",
  variable: "--font-feather",
});

const interSemiBold= localFont({
  src: "./feather.ttf",
  display: "swap",
  variable: "--font-inter",
});

const interNormal= localFont({
  src: "./feather.ttf",
  display: "swap",
  variable: "--font-inter",
});

const groteskTextBold= localFont({
  src: "./feather.ttf",
  display: "swap",
  variable: "--font-feather",
});

export {
    bloggerSans,
    feather,
    groteskText,
    interSemiBold,
    interNormal,
    groteskTextBold
}