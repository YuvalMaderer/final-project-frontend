import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UseEmblaCarouselType } from "embla-carousel-react";

interface HomeCarouselProps {
  images: string[];
  name: string;
  homeId: string; // Home ID passed as a prop
}

type EmblaCarouselApi = UseEmblaCarouselType[1];

function HomeCarousel({ images, name, homeId }: HomeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselApi | null>(null);

  const handleSelect = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(currentIndex);
    }
  }, [currentIndex, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelectIndex = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", handleSelectIndex);

    return () => {
      emblaApi.off("select", handleSelectIndex);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-72 pb-2">
      <Carousel
        opts={{ loop: false }}
        setApi={(api) => setEmblaApi(api as EmblaCarouselApi)}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <Link to={`/homes/${homeId}`}>
                <img
                  src={img}
                  alt={`${name} - Image ${index + 1}`}
                  className="w-[270px] h-[270px] rounded-lg cursor-pointer"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-8 top-1/2 transform -translate-y-1/2" />
      </Carousel>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeCarousel;
