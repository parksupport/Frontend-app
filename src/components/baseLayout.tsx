import ImageSlider from "@/components/imageSlider";
import { Logo } from "@/components/logo";

interface BaseProps {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseProps> = ({ children }) => {
  const images = [
    "https://via.placeholder.com/600x400?text=Slide+1",
    "https://via.placeholder.com/600x400?text=Slide+2",
    "https://via.placeholder.com/600x400?text=Slide+3",
    "https://via.placeholder.com/600x400?text=Slide+4",
  ];

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mt-32 mx-auto">
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
