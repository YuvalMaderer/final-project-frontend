import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function SearchBar() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex flex-col items-center text-xs ">
      <div className="flex gap-2 border border-gray-300 rounded-full py-1 px-4 shadow-md shadow-gray-300 font-500  w-[65%]">
        <div className="p-2 px-4 flex-1 text-left hover:bg-gray-200 rounded-full ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <Button
                variant={null}
                className="flex flex-col self-center text-xs flex"
              >
                <div className="text-black font-600 ">Where</div>
                <div className="text-gray-500">Search destinations</div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl relative left-12 top-4">
              <DropdownMenuLabel>Search by region</DropdownMenuLabel>
              <div className="flex">
                <DropdownMenuItem>I'm flexible</DropdownMenuItem>
                <DropdownMenuItem>Europe</DropdownMenuItem>
                <DropdownMenuItem>Italy</DropdownMenuItem>
              </div>
              <div className="flex">
                <DropdownMenuItem>United States</DropdownMenuItem>
                <DropdownMenuItem>Greece</DropdownMenuItem>
                <DropdownMenuItem>South America</DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="border-l border-gray-300"></div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={null}
              className={cn(
                "p-2 px-4 text-left font-normal flex flex-col self-center text-xs hover:bg-gray-200 rounded-full ",
                !checkInDate && "text-muted-foreground"
              )}
            >
              <div className="text-black font-600  ">Check in</div>

              <div className="text-gray-500  font-500">Add dates</div>
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
                "p-2 px-4 flex flex-col  font-normal self-center text-xs hover:bg-gray-200 rounded-full ",
                !checkOutDate && "text-muted-foreground"
              )}
            >
              <div className="text-black font-600">Check out</div>
              <div className="text-gray-500  font-500">Add dates</div>
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
        <div className="border-l border-gray-300 "></div>
        <div className="p-2 px-4 flex-1 text-left hover:bg-gray-200 rounded-full ">
          <Button
            variant={null}
            className="mr-36 flex flex-col self-center text-xs "
          >
            <div className="text-black font-600 flex ">Who</div>
            <div className="text-gray-500">Add guests</div>
          </Button>
        </div>
        <button className="bg-primary text-white font-800 p-3 rounded-full flex items-center justify-center">
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
