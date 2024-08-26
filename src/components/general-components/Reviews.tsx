import React from "react";
import { IReview } from "@/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search, Star } from "lucide-react";
import ReviewList from "./ReviewList"; // Import the new component

const ReviewsSection: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {
  const limitedReviews = reviews.slice(0, 6);
  const totalReviews = reviews.length;

  // Define rating categories
  const ratingCategories: { [key: string]: string } = {
    Cleanliness: "Cleanliness",
    Accuracy: "Accuracy",
    "Check-in": "Check-in",
    Communication: "Communication",
    Location: "Location",
    Value: "Value",
  };

  // Initialize ratings
  const initialRatings = {
    Cleanliness: 0,
    Accuracy: 0,
    "Check-in": 0,
    Communication: 0,
    Location: 0,
    Value: 0,
  };

  const totalRatings = { ...initialRatings };
  let reviewCount = 0;

  // Calculate total ratings
  reviews.forEach((review) => {
    reviewCount++;
    Object.keys(totalRatings).forEach((key) => {
      totalRatings[key as keyof typeof totalRatings] +=
        review.rate[key as keyof typeof totalRatings];
    });
  });

  // Calculate average ratings
  const averageRatings = Object.keys(totalRatings).reduce(
    (acc, key) => {
      acc[key as keyof typeof acc] = reviewCount
        ? totalRatings[key as keyof typeof totalRatings] / reviewCount
        : 0;
      return acc;
    },
    { ...initialRatings }
  );

  // Calculate overall average rating
  const calculateOverallAverageRating = () => {
    return (
      Object.values(totalRatings).reduce((acc, rating) => acc + rating, 0) /
      (reviewCount * Object.keys(initialRatings).length)
    );
  };

  return (
    <div className="mt-8">
      {/* Display reviews outside the dialog */}
      <ReviewList reviews={limitedReviews} />

      {totalReviews > 6 && (
        <div className="mt-4">
          <Dialog>
            <DialogTrigger>
              <Button
                variant={"outline"}
                className="mt-8 hover:bg-gray-50 p-6 border-black text-sm font-semibold"
                aria-label={`Show all ${totalReviews} reviews`}
              >
                Show all {totalReviews} reviews
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl mb-10 overflow-y-auto px-12">
              <div className="flex">
                <div className="flex lg:w-1/3 gap-10">
                  {/* First Card - Rating Breakdown */}
                  <div className="mt-10 bg-red-50">
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center gap-2 mb-10">
                        <Star fill="black" className="w-8 h-8" />
                        <p className="text-4xl font-semibold">
                          {Number(calculateOverallAverageRating()).toFixed(1)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col gap-6">
                        <div className="text-sm font-500 mr-6">
                          Overall rating
                        </div>
                        {Object.entries(ratingCategories).map(
                          ([key, label]) => (
                            <div
                              key={key}
                              className="flex items-center px-4 mr-2 gap-4 w-72"
                            >
                              {/* SVG for each category */}
                              <svg
                                className=""
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                style={{
                                  display: "block",
                                  height: "24px",
                                  width: "24px",
                                  fill: "currentColor",
                                }}
                              >
                                {/* Replace paths based on category */}
                                {/* SVG Paths Here */}
                              </svg>
                              <p className="text-sm font-500 flex-1">{label}</p>
                              <p className="text-xs font-semibold">
                                {averageRatings[
                                  key as keyof typeof averageRatings
                                ].toFixed(1)}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 ">
                    <div className="flex  lg:w-2/3">
                      <div className="mt-[3rem] flex justify-between w-full ">
                        <p className="text-xl font-semibold">
                          {reviews.length} review
                          {reviews.length > 1 ? "s" : ""}
                        </p>
                        <Button
                          variant={"outline"}
                          className="rounded-3xl py-1 px-2"
                        >
                          Most recent
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center border rounded-3xl p-2 shadow-sm w-[27rem] focus-within:border-black">
                      <Search className="w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search reviews"
                        className="ml-2 outline-none border-none bg-transparent flex-grow text-sm"
                      />
                    </div>
                    {/* Display reviews inside the dialog */}
                    <div className="h-32 ">
                      <ReviewList reviews={reviews} />
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <hr className="mt-10 mb-10" />
    </div>
  );
};

export default ReviewsSection;
