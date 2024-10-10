import ImageSlider from "@/components/ImageSlider";
import { Logo } from "@/components/logo";
import car_one from "@/assets/images/car_one.jpg";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const images = [
    "https://via.placeholder.com/600x400?text=Slide+1",
    "https://via.placeholder.com/600x400?text=Slide+2",
    "https://via.placeholder.com/600x400?text=Slide+3",
    "https://via.placeholder.com/600x400?text=Slide+4",
    car_one,
  ];

  return (
    <div className="min-h-screen lg:w-[1440px] mx-auto px-4 py-6 lg:px-0 lg:py-0 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row h-full">
        <div className="flex-1 mt-32 mx-auto w-full overflow-x-hidden"> 
          <Logo />
          {children}
        </div>
        <div className="hidden lg:flex flex-1 py-[35px] px-[30px] lg:w-[680px] h-[954px]">
          <ImageSlider images={images} />
        </div>
      </div>
    </div>
  );
}
