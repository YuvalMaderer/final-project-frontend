// components/ReviewList.tsx

import React from "react";
import { IReview } from "@/types";

interface ReviewListProps {
  reviews: IReview[];
  limit?: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, limit }) => {
  const displayedReviews = limit ? reviews.slice(0, limit) : reviews;

  // Utility functions
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const calculateAverageRating = (ratings: { [key: string]: number }) => {
    const total = Object.values(ratings).reduce(
      (acc, rating) => acc + rating,
      0
    );
    const count = Object.values(ratings).length;
    return count ? total / count : 0;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon key={`full-${index}`} className="w-4 h-4 " />
          ))}
        {hasHalfStar && <StarIcon key="half" className="w-4 h-4 " />}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon
              key={`empty-${index}`}
              className="w-4 h-4 text-gray-300"
            />
          ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t">
      {displayedReviews.map((review, index) => {
        const averageRating = calculateAverageRating(review.rate);
        const reviewDate = new Date(review.at);
        const month = reviewDate.toLocaleString("default", { month: "long" });
        const year = reviewDate.getFullYear();
        const randomYears = getRandomNumber(1, 20);

        return (
          <div key={index} className="mt-4 p-4">
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
              <p className="text-sm font-500">{`${month} ${year}`}</p>
            </div>
            <p className="text-sm font-500 max-w-96">{review.txt}</p>
          </div>
        );
      })}
    </div>
  );
};

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2.25l2.25 4.5 4.95.72-3.57 3.48.84 4.92-4.42-2.32-4.42 2.32.84-4.92-3.57-3.48 4.95-.72L12 2.25z" />
  </svg>
);

export default ReviewList;
