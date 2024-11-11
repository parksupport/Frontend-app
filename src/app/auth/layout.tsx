import { Logo } from "@/components/logo";
import car_one from "@/assets/images/car_one.jpg";
import carocelCar1 from "@/assets/images/carocelCar1.jpg";
import carocelCar2 from "@/assets/images/carocelCar2.jpg";
import ImageSlider from "@/components/ImageSlider";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const images = [car_one, carocelCar1, carocelCar2];

  return (
  

      <div className="flex flex-col lg:flex-row h-full max-w-[1344px] mx-auto justify-center items-center">
        <div className="flex-1 mx-auto w-full overflow-x-hidden pt-[1.8125rem]" >
          {/* <Logo className="pt-[138px] pb-[46px]"  /> */}
          {children}
        </div>
        <div className="hidden lg:flex flex-1 py-[30px] px-[30px] lg:w-[680px] h-[954px]">
          <ImageSlider images={images} />
        </div>
      </div>
  
  );
}
