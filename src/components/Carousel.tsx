import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
    const images = [
        "https://via.placeholder.com/600x400?text=Slide+1",
        "https://via.placeholder.com/600x400?text=Slide+2",
        "https://via.placeholder.com/600x400?text=Slide+3",
        "https://via.placeholder.com/600x400?text=Slide+4",
      ];

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
        //   <CarouselItem key={index}>
             <CarouselItem key={index} className="basic-full">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-5xl font-semibold">{index + 1}</span>
                </CardContent>
                
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
