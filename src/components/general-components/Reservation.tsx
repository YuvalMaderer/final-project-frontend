import { fetchHomeById } from "@/lib/http";
import { IHome, IReview } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star } from "lucide-react";

function Reservation() {
  const { id } = useParams<{ id: string }>();

  const {
    data: home,
    isLoading,
    error,
  } = useQuery<IHome | null>({
    queryKey: ["home", id],
    queryFn: () => fetchHomeById(id as string),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading home details</div>;
  if (!home) return <div>No home details available.</div>;

  const calculateOverallAverageRating = (reviews: IReview[]) => {
    if (reviews.length === 0) return 0;

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
    return (totalRating / (numCategories * reviews.length)).toFixed(1);
  };

  return (
    <div className="flex">
      <div></div>
      <div>
        <Card className="w-[27rem] border">
          <CardHeader>
            <CardTitle className="font-400 text-xl">
              <div className="flex items-center gap-4">
                <img
                  src={home.imgUrls[0]}
                  alt={`${home.name} - Main Image`}
                  className="w-[6.3rem] h-[6.3rem] object-cover rounded-lg"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-[1rem]">{home.name}</p>
                  <p className="text-sm font-400">{home.roomType}</p>
                  <p className="flex items-center gap-1 text-sm">
                    <Star fill="black" width="12px" />
                    <p>{calculateOverallAverageRating(home.reviews)}</p>
                    <p className="font-400">
                      ({home.reviews.length} review
                      {home.reviews.length > 1 ? "s" : ""})
                    </p>
                    {home.host.isSuperhost && (
                      <>
                        <span className="text-black">•</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          className="ml-1 h-3 w-3 fill-current "
                        >
                          <path d="m8.5 7.6 3.1-1.75 1.47-.82a.83.83 0 0 0 .43-.73V1.33a.83.83 0 0 0-.83-.83H3.33a.83.83 0 0 0-.83.83V4.3c0 .3.16.59.43.73l3 1.68 1.57.88c.35.2.65.2 1 0zm-.5.9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"></path>
                        </svg>
                        <span className="ml-1 text-sm font-400 ">
                          Superhost
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="border-t flex flex-col gap-4">
              <p className="mt-4 text-xl font-semibold">Price details</p>
              <div className="flex justify-between">
                <p>${home.price}</p>
                <p>$100</p>
              </div>
              <div className="flex justify-between">
                <p className="underline">Airbnb service fee</p>
                <p>$100</p>
              </div>
            </div>
            <div className="border-t mt-6">
              <div className="mt-4 flex justify-between ">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">$100</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Reservation;
