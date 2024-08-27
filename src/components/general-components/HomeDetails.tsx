import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeById } from "@/lib/http";
import { DateRange, IHome } from "@/types";
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
import RatingBreakdown from "./RatingBreackdown";
import { Calendar } from "../ui/calendar";
import { useState } from "react";

function HomeDetails() {
  const { id } = useParams<{ id: string }>();
  const [checkDates, setCheckDates] = useState<DateRange | undefined>(
    undefined
  );

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

              <DialogContent className="max-w-3xl mb-10 max-h-[40rem] overflow-y-auto">
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
        <hr className="mt-10" />

        {/* dates */}

        <div className="mt-10 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-600">Select check-in date</p>
            <p className="text-xs text-gray-600 font-500">
              Minimum stay: 1 nights
            </p>
          </div>
          <Calendar
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1",
              head_row: "",
              row: "w-full mt-2",
            }}
            mode="range"
            selected={checkDates}
            onSelect={(ev) => {
              setCheckDates(ev as DateRange | undefined);
            }}
            fromDate={new Date()}
            numberOfMonths={2}
            initialFocus
          />
        </div>
      </div>
      <hr className="mt-10" />

      {/* Rating Breakdown */}

      <RatingBreakdown reviews={home.reviews} />

      <hr className="mt-10" />

      {/* Reviews */}
      <ReviewsSection reviews={home.reviews} />
    </div>
  );
}

export default HomeDetails;
