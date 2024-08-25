import { IReview } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Star: React.FC<{ fill: string; width: string }> = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="10px"
    height="10px"
    fill={fill}
  >
    <path d="M12 17.27L18.18 21 16.54 14.83 22 9.24 15.81 8.63 12 2 8.19 8.63 2 9.24 7.46 14.83 5.82 21z" />
  </svg>
);

const calculateAverageRating = (rates: IReview["rate"]): number => {
  const total = Object.values(rates).reduce((acc, rate) => acc + rate, 0);
  return total / Object.keys(rates).length;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const totalStars = 5;

  return [...Array(totalStars)].map((_, index) => {
    if (index < fullStars) {
      return <Star key={index} fill="black" width="24px" />;
    } else if (index === fullStars && halfStar) {
      return <Star key={index} fill="gray" width="24px" />;
    } else {
      return <Star key={index} fill="gray" width="24px" />;
    }
  });
};
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ReviewsSection: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {
  const limitedReviews = reviews.slice(0, 6);
  const totalReviews = reviews.length;
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t">
        {limitedReviews.map((review, index) => {
          const averageRating = calculateAverageRating(review.rate);
          const reviewDate = new Date(review.at);
          const month = reviewDate.toLocaleString("default", { month: "long" });
          const year = reviewDate.getFullYear();
          const randomYears = getRandomNumber(1, 20);

          return (
            <div key={index} className="mt-4 p-4 ">
              <div className="flex gap-4 mb-2 items-center">
                <img
                  src={review.by.imgUrl}
                  alt={review.by.fullname}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold">{review.by.fullname}</p>
                  <p className="text-sm">{`${randomYears} years on Airbnb`}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  {renderStars(averageRating)}
                </div>
                <p className=" text-sm font-500">{`${month} ${year}`}</p>
              </div>
              <p className="text-sm font-500 max-w-96">{review.txt}</p>
            </div>
          );
        })}
      </div>
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reviews!</DialogTitle>
                <DialogDescription>r r r r r r</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <hr className="mt-10 mb-10" />
    </div>
  );
};

export default ReviewsSection;
