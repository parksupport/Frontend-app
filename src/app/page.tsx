import { MyCard } from '@/components/Card';
import { CarouselDemo } from '@/components/Carousel';
import { Card as UiCard } from '@/components/ui/card'; 

import ValidationState from '@/components/ValidationState';

export default function Home() {
  return (
    <main 
    className='justify-center flex flex-col w-full items-center'
    >
      {/* <ValidationState /> */}
      <UiCard /> 
      <MyCard />  
      <CarouselDemo />
    </main>
  );
}
