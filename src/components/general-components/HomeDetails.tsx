import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeById } from "@/lib/http";
import { IHome } from "@/types";
import { RiShare2Line } from "react-icons/ri";
import { IReview } from "@/types";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { iconMap, AmenityKey } from "./AmenityIconMap";
import ReviewsSection from "./Reviews";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function HomeDetails() {
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

  // Calculate the overall rating
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
    <div className="px-20">
      <div className="flex justify-between items-center">
        {/* Name */}
        <h1 className="text-2xl font-semibold">{home.name}</h1>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="underline text-sm flex items-center gap-2 font-600 hover:bg-gray-100 p-2 rounded-lg">
            <RiShare2Line className="w-4 h-4" />
            Share
          </button>
          <button className="underline text-sm flex items-center gap-2 font-600 hover:bg-gray-100 p-2 rounded-lg">
            <Heart className="w-4 h-4 " strokeWidth={1.5} />
            Save
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="flex mt-4">
        {/* Large Image */}
        <div className="w-1/2 pr-2">
          <img
            src={home.imgUrls[0]}
            alt={`${home.name} - Main Image`}
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>

        {/* Small Images */}
        <div className="w-1/2 grid grid-cols-2 gap-2 h-[300px]">
          {home.imgUrls.slice(1, 5).map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`${home.name} - Image ${index + 1}`}
              className="w-full h-[calc(300px/2-2px)] object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Room Type */}
      <div className="max-w-[57%]">
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            {home.roomType} in {home.loc.address}
          </h2>
        </div>
        {/* Room Details */}
        <div className="flex items-center gap-1 text-sm">
          {[
            `${home.capacity} guest${home.capacity > 1 ? "s" : ""}`,
            `${home.bedrooms} bedroom${home.bedrooms > 1 ? "s" : ""}`,
            `${home.beds} bed${home.beds > 1 ? "s" : ""}`,
            `${home.bathrooms} bath${home.bathrooms > 1 ? "s" : ""}`,
          ].map((detail, index) => (
            <>
              <p className="flex items-center">{detail}</p>
              {index < 3 && <span className=" text-black">•</span>}
            </>
          ))}
        </div>
        {/* Rating and Number of Reviews */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star fill="black" width="16px" />
            <p className="text-lg font-semibold">
              {calculateOverallAverageRating(home.reviews)}
            </p>
          </div>
          <span className=" text-black">•</span>
          <p className="text-sm underline font-600">
            {home.reviews.length} review{home.reviews.length > 1 ? "s" : ""}
          </p>
        </div>
        <hr className="mt-6" />

        {/* Host Details */}
        <div className="mt-4 flex items-center gap-4">
          <img
            src={home.host.imgUrl}
            alt={home.host.fullname}
            className="w-10 h-10 rounded-full mt-2"
          />
          <div>
            <h2 className="font-semibold ">Hosted by {home.host.fullname}</h2>

            {home.host.isSuperhost && (
              <div className="flex items-center gap-1 text-xs">
                <p>Superhost</p>
                <span className="text-black">•</span>
                <p>10 years hosting</p>
              </div>
            )}
          </div>
        </div>
        <hr className="mt-6" />

        {/* Booking Options */}
        <div className="mt-4">
          <div className="flex flex-col gap-2">
            {home.host.isSuperhost && (
              <div className="flex items-start  mt-1 gap-6 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    fill: "currentcolor",
                  }}
                >
                  <path d="M16 17a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM25.67.33a2 2 0 0 1 2 1.85v6.54a2 2 0 0 1-.97 1.7l-.14.08-9.67 4.84a2 2 0 0 1-1.61.07l-.17-.07-9.67-4.84a2 2 0 0 1-1.1-1.62V2.33a2 2 0 0 1 1.84-2h.15zm0 2H6.33v6.39L16 13.55l9.67-4.83z"></path>
                </svg>
                <div>
                  <p className="font-500">Superhost</p>
                  <p className="text-gray-600 text-xs">
                    Superhosts are experienced, highly rated Hosts.
                  </p>
                </div>
              </div>
            )}
            {home.bookingOptions.SelfCheckIn && (
              <div className="flex items-start  mt-1 gap-6 p-2">
                <svg
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
                  <path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path>
                </svg>
                <div>
                  <p className="font-500">Self check-in</p>
                  <p className="text-gray-600 text-xs">
                    Check yourself in with the smartlock.
                  </p>
                </div>
              </div>
            )}
            {home.bookingOptions.AllowsPets && (
              <div className="flex items-start  mt-1 gap-6 p-2">
                <svg
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
                  <path d="M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                </svg>
                <div>
                  <p className="font-500">Furry friends welcome</p>
                  <p className="text-gray-600 text-xs">
                    Bring your pets along for the stay.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="mt-6" />

        {/* Summary */}
        <div className="mt-6 space-y-4">
          <div className="flex gap-1 items-center p-3 px-4 bg-gray-100 rounded-lg">
            <span className="text-sm font-500">
              Some info has been automatically translated.
            </span>
            <button
              aria-label="Show original"
              type="button"
              className=" underline font-600"
            >
              Show original
            </button>
          </div>

          <p>{home.summary}</p>
        </div>
        <hr className="mt-6" />

        {/* Amenities */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">What this place offers</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {home.amenities.slice(0, 10).map((amenity, index) => {
              const amenityKey = amenity as AmenityKey;
              return (
                <div key={index} className="flex items-center space-x-2">
                  {iconMap[amenityKey] || <div className="w-6 h-6" />}{" "}
                  <p>{amenity}</p>
                </div>
              );
            })}
          </div>
          {home.amenities.length > 10 && (
            <Dialog>
              <DialogTrigger>
                <Button
                  variant={"outline"}
                  className="mt-8 hover:bg-gray-50 p-6 border-black text-sm font-semibold"
                  aria-label={`Show all ${home.amenities.length} amenities`}
                >
                  Show all {home.amenities.length} amenities
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl mt-10 mb-10 h-screen overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold mt-8">
                    What this place offers
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 h-[70vh] flex flex-col gap-8 ">
                  {home.amenities.map((amenity, index) => {
                    const amenityKey = amenity as AmenityKey;
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-2 py-2 border-b border-gray-200"
                      >
                        {iconMap[amenityKey] || <div className="w-6 h-6" />}{" "}
                        <p>{amenity}</p>
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <hr className="mt-10" />

      {/* Rating Breakdown */}
      <div className="mt-10">
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-2">
            <Star fill="black" width="16px" />
            <p className="text-2xl font-semibold">
              {Number(calculateOverallAverageRating(home.reviews)).toFixed(1)}
            </p>
          </div>
          <span className="text-black text-2xl">•</span>
          <p className="text-2xl font-600">
            {home.reviews.length} review{home.reviews.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="mt-10">
          <div className="flex">
            <div className="flex-1 border-r border-gray-300 px-4 mr-2  ">
              <p className="text-sm font-500">Overall rating</p>
            </div>
            <div className="flex-1 border-r border-gray-300 px-4 mr-2">
              <p className="text-sm font-500">Cleanliness</p>
              <p className="text-lg font-semibold">
                {(
                  home.reviews.reduce(
                    (acc, review) => acc + review.rate.Cleanliness,
                    0
                  ) / home.reviews.length
                ).toFixed(1)}
              </p>
              {/* SVG for Cleanliness */}
              <svg
                className="mt-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "32px",
                  width: "32px",
                  fill: "currentColor",
                }}
              >
                <path d="M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z"></path>
              </svg>
            </div>

            <div className="flex-1 border-r border-gray-300 px-4 mr-2">
              <p className="text-sm font-500">Accuracy</p>
              <p className="text-lg font-semibold">
                {(
                  home.reviews.reduce(
                    (acc, review) => acc + review.rate.Accuracy,
                    0
                  ) / home.reviews.length
                ).toFixed(1)}
              </p>
              {/* SVG for Accuracy */}
              <svg
                className="mt-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "32px",
                  width: "32px",
                  fill: "currentColor",
                }}
              >
                <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z"></path>
              </svg>
            </div>

            <div className="flex-1 border-r border-gray-300 px-4 mr-2">
              <p className="text-sm font-500">Check-in</p>
              <p className="text-lg font-semibold">
                {(
                  home.reviews.reduce(
                    (acc, review) => acc + review.rate["Check-in"],
                    0
                  ) / home.reviews.length
                ).toFixed(1)}
              </p>
              {/* SVG for Check-in */}
              <svg
                className="mt-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "32px",
                  width: "32px",
                  fill: "currentColor",
                }}
              >
                <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z"></path>
              </svg>
            </div>

            <div className="flex-1 border-r border-gray-300 px-4">
              <p className="text-sm font-500">Communication</p>
              <p className="text-lg font-semibold">
                {(
                  home.reviews.reduce(
                    (acc, review) => acc + review.rate.Communication,
                    0
                  ) / home.reviews.length
                ).toFixed(1)}
              </p>
              {/* SVG for Communication */}
              <svg
                className="mt-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "32px",
                  width: "32px",
                  stroke: "currentColor",
                  strokeWidth: "2.66667",
                  fill: "none",
                }}
              >
                <path d="M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"></path>
              </svg>
            </div>

            <div className="flex-1 border-r border-gray-300 px-4">
              <p className="text-sm font-500">Location</p>
              <p className="text-lg font-semibold">
                {(
                  home.reviews.reduce(
                    (acc, review) => acc + review.rate.Location,
                    0
                  ) / home.reviews.length
                ).toFixed(1)}
              </p>
              {/* SVG for Location */}
              <svg
                className="mt-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "32px",
                  width: "32px",
                  fill: "currentColor",
                }}
              >
                <path d="M30.95 3.81a2 2 0 0 0-2.38-1.52l-7.58 1.69-10-2-8.42 1.87A1.99 1.99 0 0 0 1 5.8v21.95a1.96 1.96 0 0 0 .05.44 2 2 0 0 0 2.38 1.52l7.58-1.69 10 2 8.42-1.87A1.99 1.99 0 0 0 31 26.2V4.25a1.99 1.99 0 0 0-.05-.44zM12 4.22l8 1.6v21.96l-8-1.6zM3 27.75V5.8l-.22-.97.22.97 7-1.55V26.2zm26-1.55-7 1.55V5.8l7-1.55z"></path>
              </svg>
            </div>

            <div className="flex-1 px-4 mr-2">
              <p className="text-sm font-500">Value</p>
              <p className="text-lg font-semibold">
                {(
                  home.reviews.reduce(
                    (acc, review) => acc + review.rate.Value,
                    0
                  ) / home.reviews.length
                ).toFixed(1)}
              </p>
              {/* SVG for Value */}
              <svg
                className="mt-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "32px",
                  width: "32px",
                  fill: "currentColor",
                }}
              >
                <path d="M16.17 2a3 3 0 0 1 1.98.74l.14.14 11 11a3 3 0 0 1 .14 4.1l-.14.14L18.12 29.3a3 3 0 0 1-4.1.14l-.14-.14-11-11A3 3 0 0 1 2 16.37l-.01-.2V5a3 3 0 0 1 2.82-3h11.35zm0 2H5a1 1 0 0 0-1 .88v11.29a1 1 0 0 0 .2.61l.1.1 11 11a1 1 0 0 0 1.31.08l.1-.08L27.88 16.7a1 1 0 0 0 .08-1.32l-.08-.1-11-11a1 1 0 0 0-.58-.28L16.17 4zM9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewsSection reviews={home.reviews} />
    </div>
  );
}

export default HomeDetails;
