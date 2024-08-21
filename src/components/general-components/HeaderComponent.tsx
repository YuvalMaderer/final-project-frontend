import { Globe, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// import { GuestPicker } from "@/components/ui/guest-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function HeaderComponent() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);

  return (
    <>
      <div>
        <nav className="flex justify-between items-center p-4 px-12">
          <Link to="/">
            <img
              src="src/assets/airbnb-logo.webp"
              alt="logo"
              className="w-[130px] h-[70px]  "
            />
          </Link>
          <div className="flex gap-4 ml-32 text-xl">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Stays
            </NavLink>
            <NavLink
              to="/experiences"
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Experiences
            </NavLink>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/airbnb-your-home" className="font-bold">
              Airbnb your home
            </Link>
            <Globe />
            <div className="flex items-center border border-grey-300 rounded-full p-3 gap-4">
              <Menu />
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
          </div>
        </nav>
        <div className="flex flex-col items-center">
          <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 font-500  w-[65%]">
            <div className="p-2 px-4 flex-1 text-left ">
              <button>
                <div className="flex text-black font-600 ">Where</div>
                <div className="text-gray-500">Search destinations</div>
              </button>
            </div>
            <div className="border-l border-gray-300"></div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={null}
                  className={cn(
                    "p-2 px-4 text-left font-normal flex flex-col self-center",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <div className="text-black font-600  ">Check in</div>

                  <div className="text-gray-500 text-base font-500">
                    Add dates
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="border-l border-gray-300"></div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={null}
                  className={cn(
                    "p-2 px-4 flex flex-col text-left font-normal self-center",
                    !checkOutDate && "text-muted-foreground"
                  )}
                >
                  <div className="text-black font-600">Check out</div>
                  <div className="text-gray-500 text-base font-500">
                    Add dates
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="border-l border-gray-300 mr-4"></div>
            <button className="mr-60 ">
              <div className="text-black font-600 flex ">Who</div>
              <div className="text-gray-500 text-base">Add guests</div>
            </button>
            <button className="bg-primary text-white font-700 p-4 rounded-full flex items-center justify-center">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
        <hr className="my-6" />
      </div>
    </>
  );
}

export default HeaderComponent;
