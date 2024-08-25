import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeById } from "@/lib/http";
import { IHome } from "@/types";
import { Star } from "lucide-react";
import { IReview } from "@/types";

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
    <div className="p-4 px-20">
      {/* Name */}
      <h1 className="text-2xl font-bold">{home.name}</h1>

      {/* Images */}
      <div className="flex  mt-4">
        {/* Large Image */}
        <div className="w-2/3">
          <img
            src={home.imgUrls[0]}
            alt={`${home.name} - Main Image`}
            className="w-[80%] h-[80%] rounded-lg"
          />
        </div>

        {/* Small Images */}
        <div className="w-1/3 grid grid-cols-2 gap-2">
          {home.imgUrls.slice(1, 5).map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`${home.name} - Image ${index + 1}`}
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Room Details */}
      <div className="flex gap-4 mt-4">
        <p className="font-semibold">
          {home.capacity} guest{home.capacity > 1 ? "s" : ""}
        </p>
        <p className="font-semibold">
          {home.bedrooms} bedroom{home.bedrooms > 1 ? "s" : ""}
        </p>
        <p className="font-semibold">
          {home.beds} bed{home.beds > 1 ? "s" : ""}
        </p>
        <p className="font-semibold">
          {home.bathrooms} bathroom{home.bathrooms > 1 ? "s" : ""}
        </p>
      </div>

      {/* Rating and Number of Reviews */}
      <div className="flex items-center gap-2 mt-4">
        <div className="flex items-center gap-1">
          <Star fill="black" width="20px" />
          <p className="text-lg font-semibold">
            {calculateOverallAverageRating(home.reviews)}
          </p>
        </div>
        <p className="text-sm">
          {home.reviews.length} review{home.reviews.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Host Details */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          Hosted by {home.host.fullname}
        </h2>
        <p>{home.host.about}</p>
        <img
          src={home.host.imgUrl}
          alt={home.host.fullname}
          className="w-16 h-16 rounded-full mt-2"
        />
      </div>

      {/* Booking Options */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Booking Options</h2>
        <p>
          {home.bookingOptions.InstantBook ? "Instant Book, " : ""}
          {home.bookingOptions.SelfCheckIn ? "Self Check-In, " : ""}
          {home.bookingOptions.AllowsPets ? "Pets Allowed" : ""}
        </p>
      </div>

      {/* Summary */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p>{home.summary}</p>
      </div>

      {/* Amenities */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Amenities</h2>
        <p>{home.amenities.join(", ")}</p>
      </div>

      {/* Rating Breakdown */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Rating Breakdown</h2>
        <div className="flex gap-4">
          <p>
            Cleanliness:{" "}
            {home.reviews.reduce(
              (acc, review) => acc + review.rate.Cleanliness,
              0
            ) / home.reviews.length}
          </p>
          <p>
            Accuracy:{" "}
            {home.reviews.reduce(
              (acc, review) => acc + review.rate.Accuracy,
              0
            ) / home.reviews.length}
          </p>
          <p>
            Check-in:{" "}
            {home.reviews.reduce(
              (acc, review) => acc + review.rate["Check-in"],
              0
            ) / home.reviews.length}
          </p>
          <p>
            Communication:{" "}
            {home.reviews.reduce(
              (acc, review) => acc + review.rate.Communication,
              0
            ) / home.reviews.length}
          </p>
          <p>
            Location:{" "}
            {home.reviews.reduce(
              (acc, review) => acc + review.rate.Location,
              0
            ) / home.reviews.length}
          </p>
          <p>
            Value:{" "}
            {home.reviews.reduce((acc, review) => acc + review.rate.Value, 0) /
              home.reviews.length}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div>
          {home.reviews.map((review, index) => (
            <div key={index} className="border-t pt-2 mt-2">
              <div className="flex items-center gap-2">
                <img
                  src={review.by.imgUrl}
                  alt={review.by.fullname}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{review.by.fullname}</p>
                  <p className="text-gray-500">
                    {new Date(review.at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2">{review.txt}</p>
              <div className="flex gap-2 mt-2">
                <span>Cleanliness: {review.rate.Cleanliness}</span>
                <span>Communication: {review.rate.Communication}</span>
                <span>Check-in: {review.rate["Check-in"]}</span>
                <span>Accuracy: {review.rate.Accuracy}</span>
                <span>Location: {review.rate.Location}</span>
                <span>Value: {review.rate.Value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeDetails;
