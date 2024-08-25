import { IHome } from "@/types";
import { Star } from "lucide-react";
import HomeCarousel from "./HomeCarousel";
import { fetchHomes } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { IReview } from "@/types";
import { useSearchParams } from "react-router-dom";

function HomesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries()); // Convert searchParams to an object

  const { data: homes } = useQuery<IHome[]>({
    queryKey: ["homes", filters], // Use paramsObject directly in queryKey
    queryFn: () => fetchHomes(filters), // Pass paramsObject to fetchHomes
  });

  const calculateOverallAverageRating = (reviews: IReview[]) => {
    let totalRating = 0;
    const numCategories = 6;
    reviews.forEach((review) => {
      totalRating += review.rate.Accuracy;
      totalRating += review.rate["Check-in"];
      totalRating += review.rate.Cleanliness;
      totalRating += review.rate.Communication;
      totalRating += review.rate.Location;
      totalRating += review.rate.Value;
    });
    const overallAverage = (
      totalRating /
      (numCategories * reviews.length)
    ).toFixed(1);
    return overallAverage;
  };

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
