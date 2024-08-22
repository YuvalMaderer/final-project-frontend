import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Card from "./GuestCard";
import { ScrollArea } from "../ui/scroll-area";

type GuestType = "adults" | "children" | "infants" | "pets";

function Guests() {
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleIncrement = (key: GuestType) => {
    setGuestCounts((prevCounts) => {
      if (key !== "adults" && prevCounts.adults === 0) {
        return {
          ...prevCounts,
          adults: 1,
          [key]: prevCounts[key] + 1,
        };
      } else {
        return {
          ...prevCounts,
          [key]: prevCounts[key] + 1,
        };
      }
    });
  };

  const handleDecrement = (key: GuestType) => {
    setGuestCounts((prevCounts) => {
      if (key === "adults") {
        const { children, infants, pets } = prevCounts;
        if (children === 0 && infants === 0 && pets === 0) {
          return {
            ...prevCounts,
            adults: prevCounts.adults > 0 ? prevCounts.adults - 1 : 0,
          };
        } else if (prevCounts.adults > 1) {
          return {
            ...prevCounts,
            adults: prevCounts.adults - 1,
          };
        } else {
          return prevCounts; // Prevent decrement to 0 if other counts are non-zero
        }
      } else {
        return {
          ...prevCounts,
          [key]: prevCounts[key] > 0 ? prevCounts[key] - 1 : 0,
        };
      }
    });
  };

  const isAdultDecrementDisabled =
    guestCounts.adults === 1 &&
    (guestCounts.children > 0 ||
      guestCounts.infants > 0 ||
      guestCounts.pets > 0);

  let displayText = "Add guests";
  const totalGuests = guestCounts.adults + guestCounts.children;

  if (totalGuests > 0) {
    displayText = `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`;

    if (guestCounts.infants > 0) {
      displayText += `, ${guestCounts.infants} infant${
        guestCounts.infants > 1 ? "s" : ""
      }`;
    }

    if (guestCounts.pets > 0) {
      displayText += `, ${guestCounts.pets} pet${
        guestCounts.pets > 1 ? "s" : ""
      }`;
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex p-2 px-4 flex-1 text-left hover:bg-gray-200 rounded-full">
          <Button
            variant={null}
            className="mr-14 flex flex-col self-center text-xs"
          >
            <div className="text-black font-600 flex">Who</div>
            <div className="text-gray-500">{displayText}</div>
          </Button>
          <Button className="text-white font-800 p-3 rounded-full flex items-center justify-center">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-3xl w-96 relative top-2 right-20">
        <ScrollArea className="h-72">
          <DropdownMenuItem>
            <Card
              title="Adults"
              paragraph="Ages 13 or above"
              count={guestCounts.adults}
              onIncrement={() => handleIncrement("adults")}
              onDecrement={() => handleDecrement("adults")}
              isDecrementDisabled={isAdultDecrementDisabled}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Card
              title="Children"
              paragraph="Ages 2-12"
              count={guestCounts.children}
              onIncrement={() => handleIncrement("children")}
              onDecrement={() => handleDecrement("children")}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Card
              title="Infants"
              paragraph="Under 2"
              count={guestCounts.infants}
              onIncrement={() => handleIncrement("infants")}
              onDecrement={() => handleDecrement("infants")}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Card
              title="Pets"
              paragraph="Bringing a service animal?"
              count={guestCounts.pets}
              onIncrement={() => handleIncrement("pets")}
              onDecrement={() => handleDecrement("pets")}
            />
          </DropdownMenuItem>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Guests;
