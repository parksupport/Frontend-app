
import ImageSlider from "@/components/ImageSlider";
import { Logo } from "@/components/logo";
import  car_one  from "@/assets/images/car_one.jpg"; 



export default function BaseLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const images = [
   car_one,
   car_one,
   car_one,
   car_one,
  ];

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mt-[32px] mx-auto ">
          <Logo />
          {children}
        </div>

        <div className="hidden lg:flex flex-1 p-4">
          <ImageSlider images={images} />
        </div>
      </div>
    </div>
  );
};
