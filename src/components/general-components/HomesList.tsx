import { IHome } from "@/types";
import { Star } from "lucide-react";
import HomeCarousel from "./HomeCarousel";
import { calculateOverallAverageRating } from "@/lib/utils";

type HomesListProps = {
  homes: IHome[] | undefined; // Define homes as an array of IHome objects
};

function HomesList({ homes }: HomesListProps) {
  if (!homes) {
    return <p>No homes found.</p>;
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
