import { useState } from "react";
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
                <DropdownMenuItem>
                  <div>
                    <img
                      src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg?im_w=320"
                      alt="flexible"
                      className="w-[122px] h-[122px] rounded-lg border border-gray-200 cursor-pointer hover:border-gray-600 transition duration-150 ease-in-out"
                    />
                    <p className="font-500">I'm Flexible</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div>
                    <img
                      src="https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320"
                      alt="Europe"
                      className="w-[122px] h-[122px] rounded-lg border border-gray-200 cursor-pointer hover:border-gray-600 transition duration-150 ease-in-out"
                    />
                    <p className="font-500">Europe</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div>
                    <img
                      src="https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320"
                      alt="Italy"
                      className="w-[122px] h-[122px] rounded-lg border border-gray-200 cursor-pointer hover:border-gray-600 transition duration-150 ease-in-out"
                    />
                    <p className="font-500">Italy</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <div className="flex">
                <DropdownMenuItem>
                  <div>
                    <img
                      src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                      alt="UnitedState"
                      className="w-[122px] h-[122px] rounded-lg border border-gray-200 cursor-pointer hover:border-gray-600 transition duration-150 ease-in-out"
                    />
                    <p className="font-500">United States</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div>
                    <img
                      src="https://a0.muscache.com/im/pictures/09be1400-6a42-4a4f-90f6-897e50110031.jpg?im_w=320"
                      alt="Greece"
                      className="w-[122px] h-[122px] rounded-lg border border-gray-200 cursor-pointer hover:border-gray-600 transition duration-150 ease-in-out"
                    />
                    <p className="font-500">Greece</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div>
                    <img
                      src="https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320"
                      alt="SouthAmerica"
                      className="w-[122px] h-[122px] rounded-lg border border-gray-200 cursor-pointer hover:border-gray-600 transition duration-150 ease-in-out"
                    />
                    <p className="font-500">South America</p>
                  </div>
                </DropdownMenuItem>
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
