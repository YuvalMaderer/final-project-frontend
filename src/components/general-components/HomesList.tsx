import { IHome } from "@/types";
import { Star } from "lucide-react";
import HomeCarousel from "./HomeCarousel";
import { calculateOverallAverageRating } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type HomesListProps = {
  homes: IHome[] | undefined; // Define homes as an array of IHome objects
  isLoading: boolean;
};

function HomesList({ homes, isLoading }: HomesListProps) {
  if (!homes) {
    return <p>No homes found.</p>;
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 18 }, (_, index) => (
            <div key={index}>
              <Skeleton className="h-[270px] w-[270px] rounded-xl mb-2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-[200px] mb-1" />
                <Skeleton className="h-5 w-[30px]" />
              </div>
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-5 w-[100px] mb-1" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-4 gap-10">
        {homes?.map((home) => (
          <div key={home._id} className="w-64">
            <HomeCarousel
              images={home.imgUrls}
              name={home.name}
              homeId={home._id}
            />
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
