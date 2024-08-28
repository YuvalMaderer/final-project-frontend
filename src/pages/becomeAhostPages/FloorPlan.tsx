import { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { updateSearchParams } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Card from "@/components/general-components/GuestCard";

type FloorPlan = "Guests" | "Bedrooms" | "Beds" | "Bathrooms";

function FloorPlan() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => setSearchParams({ step: "floorPlan" }), []);

  const [guestCounts, setGuestCounts] = useState({
    Guests: 1,
    Bedrooms: 0,
    Beds: 1,
    Bathrooms: 1,
  });

  const handleIncrement = (key: FloorPlan) => {
    setGuestCounts((prevCounts) => {
      return {
        ...prevCounts,
        [key]: prevCounts[key] + 1,
      };
    });
  };

  const handleDecrement = (key: FloorPlan) => {
    if (guestCounts.Guests === 1 && key === "Guests") return;
    if (guestCounts.Beds === 1 && key === "Beds") return;
    if (guestCounts.Bathrooms === 1 && key === "Bathrooms") return;
    setGuestCounts((prevCounts) => {
      return {
        ...prevCounts,
        [key]: prevCounts[key] > 0 ? prevCounts[key] - 1 : 0,
      };
    });
  };

  return (
    <div className="flex flex-col justify-center  h-screen max-w-[740px] mx-auto pb-[400px]">
      <div className="pl-3 space-y-2">
        <h1 className="text-3xl font-[500]">
          Share some basics about your place
        </h1>
        <p className="text-lg text-[#9d9d9d] mb-8">
          You'll add more details later, like bed types.
        </p>
      </div>

      <div className="border-b py-2">
        <Card
          title="Guests"
          paragraph=""
          count={guestCounts.Guests}
          onIncrement={() => handleIncrement("Guests")}
          onDecrement={() => handleDecrement("Guests")}
        />
      </div>
      <div className="border-b py-2">
        <Card
          title="Bedrooms"
          paragraph=""
          count={guestCounts.Bedrooms}
          onIncrement={() => handleIncrement("Bedrooms")}
          onDecrement={() => handleDecrement("Bedrooms")}
        />
      </div>
      <div className="border-b py-2">
        <Card
          title="Beds"
          paragraph=""
          count={guestCounts.Beds}
          onIncrement={() => handleIncrement("Beds")}
          onDecrement={() => handleDecrement("Beds")}
        />
      </div>
      <div className="border-b py-2">
        <Card
          title="Bathrooms"
          paragraph=""
          count={guestCounts.Bathrooms}
          onIncrement={() => handleIncrement("Bathrooms")}
          onDecrement={() => handleDecrement("Bathrooms")}
        />
      </div>
    </div>
  );
}

export default FloorPlan;
