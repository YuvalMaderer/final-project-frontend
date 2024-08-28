import { useState } from "react";

import { Search } from "lucide-react";
import { updateSearchParams } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Card from "@/components/general-components/GuestCard";

type FloorPlan = "Guests" | "Bedrooms" | "Beds" | "Bathrooms";

function FloorPlan() {
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

  const isAdultDecrementDisabled =
    guestCounts.Guests === 1 || guestCounts.Beds === 1;

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col  h-screen ">
      <Card
        title="Guests"
        paragraph=""
        count={guestCounts.Guests}
        onIncrement={() => handleIncrement("Guests")}
        onDecrement={() => handleDecrement("Guests")}
      />

      <Card
        title="Bedrooms"
        paragraph=""
        count={guestCounts.Bedrooms}
        onIncrement={() => handleIncrement("Bedrooms")}
        onDecrement={() => handleDecrement("Bedrooms")}
      />

      <Card
        title="Beds"
        paragraph=""
        count={guestCounts.Beds}
        onIncrement={() => handleIncrement("Beds")}
        onDecrement={() => handleDecrement("Beds")}
      />

      <Card
        title="Bathrooms"
        paragraph=""
        count={guestCounts.Bathrooms}
        onIncrement={() => handleIncrement("Bathrooms")}
        onDecrement={() => handleDecrement("Bathrooms")}
      />
    </div>
  );
}

export default FloorPlan;
