import api from "@/services/api.service";
import { IHome, IReview } from "@/types";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

function HomesList() {
  const [homes, setHomes] = useState<IHome[]>([]);

  async function fetchHomes() {
    try {
      const response = await api.get("/homes/24homes");
      setHomes(response.data); // Adjusted to use response.data
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchHomes();
  }, []);

  const calculateOverallAverageRating = (reviews: IReview[]) => {
    let totalRating = 0;
    const numCategories = 6; // Number of rating categories

    reviews.forEach((review) => {
      totalRating += review.rate.Accuracy;
      totalRating += review.rate["Check-in"];
      totalRating += review.rate.Cleanliness;
      totalRating += review.rate.Communication;
      totalRating += review.rate.Location;
      totalRating += review.rate.Value;
    });

    // Calculate the overall average rating
    const overallAverage = (
      totalRating /
      (numCategories * reviews.length)
    ).toFixed(1);
    return overallAverage;
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-4 gap-10">
        {homes.map((home) => (
          <div key={home.name} className="w-64 cursor-pointer">
            <Carousel className="w-72 pb-2">
              <CarouselContent>
                <CarouselItem>
                  <img
                    src={home.imgUrls[0]}
                    alt={home.name}
                    className="w-[270px] h-[270px] rounded-lg"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={home.imgUrls[1]}
                    alt={home.name}
                    className="w-[270px] h-[270px] rounded-lg"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={home.imgUrls[2]}
                    alt={home.name}
                    className="w-[270px] h-[270px] rounded-lg"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={home.imgUrls[3]}
                    alt={home.name}
                    className="w-[270px] h-[270px] rounded-lg"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={home.imgUrls[4]}
                    alt={home.name}
                    className="w-[270px] h-[270px] rounded-lg"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-6" />
              <CarouselNext className="absolute right-8" />
            </Carousel>
            <div className="flex justify-between">
              <p className="font-600 text-[14px]">{home.loc.address}</p>
              <div className="flex items-center gap-1">
                <Star fill="black" width="14px" />
                <p className="text-xs font-500">
                  {calculateOverallAverageRating(home.reviews)}
                </p>
              </div>
            </div>
            <p className="font-500 text-[14px] text-gray-500 pb-2">
              {home.bedrooms} bedrooms
            </p>
            <p className="font-600">${home.price} night</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomesList;
