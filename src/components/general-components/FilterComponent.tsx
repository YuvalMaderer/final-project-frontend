import { X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Buttons from "./ButtonsComponent";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { BookingOptions, QueryFilter } from "@/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFilters: QueryFilter = {
  type: undefined,
  roomType: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  bedrooms: undefined,
  beds: undefined,
  bathrooms: undefined,
  hostLanguage: undefined,
  amenities: undefined,
  capacity: undefined,
  accessibility: undefined,
  bookingOptions: {
    InstantBook: false,
    SelfCheckIn: false,
    AllowsPets: false,
  },
  location: undefined,
  startDate: undefined,
  endDate: undefined,
};

const FilterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [checkedState, setCheckedState] = useState({
    Wifi: false,
    Kitchen: false,
    Washer: false,
    Dryer: false,
    "Air conditioning": false,
    Heating: false,
    "Dedicated workspace": false,
    TV: false,
    "Hair dryer": false,
    Iron: false,
    Pool: false,
    "Hot tub": false,
    "Free parking": false,
    "EV charger": false,
    Crib: false,
    "King bed": false,
    Gym: false,
    "BBQ grill": false,
    Breakfast: false,
    "Indoor fireplace": false,
    "Smoking allowed": false,
    Beachfront: false,
    Waterfront: false,
    "Smoke alarm": false,
    "Carbon monoxide alarm": false,
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);
  const [filters, setFilters] = useState<QueryFilter>({
    type: undefined,
    roomType: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    beds: undefined,
    bathrooms: undefined,
    hostLanguage: undefined,
    amenities: undefined,
    capacity: undefined,
    accessibility: undefined,
    bookingOptions: {
      InstantBook: false,
      SelfCheckIn: false,
      AllowsPets: false,
    },
    location: undefined,
    startDate: undefined,
    endDate: undefined,
  });

  const setFiltersToParams = () => {
    const params = new URLSearchParams();

    // Helper function to append filter values to params
    const appendFilter = (
      key: string,
      value:
        | string
        | number
        | boolean
        | string[]
        | QueryFilter
        | undefined
        | BookingOptions
        | Date
    ) => {
      if (value !== undefined && value !== null) {
        params.append(key, JSON.stringify(value));
      }
    };

    // Convert each filter to a query parameter
    appendFilter("type", filters.type);
    appendFilter("roomType", filters.roomType);
    appendFilter("minPrice", filters.minPrice);
    appendFilter("maxPrice", filters.maxPrice);
    appendFilter("bedrooms", filters.bedrooms);
    appendFilter("beds", filters.beds);
    appendFilter("bathrooms", filters.bathrooms);
    appendFilter("hostLanguage", filters.hostLanguage);
    appendFilter("amenities", filters.amenities);
    appendFilter("capacity", filters.capacity);
    appendFilter("accessibility", filters.accessibility);
    appendFilter("bookingOptions", filters.bookingOptions);
    appendFilter("location", filters.location);
    appendFilter("startDate", filters.startDate);
    appendFilter("endDate", filters.endDate);

    // Update the URL with the new query parameters
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    // Optionally, update the URL to remove the query parameters
    window.history.replaceState(null, "", window.location.pathname);
  };

  console.log(filters);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 100); // Quicker hide for subtle exit animation
    }
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setCheckedState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));

    if (checked) {
      updateFiltersState(id);
    } else {
      removeFilter(id);
    }
  };

  const updateFiltersState = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      amenities: prevFilters.amenities
        ? [...prevFilters.amenities, value]
        : [value],
    }));
  };

  const removeFilter = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      amenities: prevFilters.amenities
        ? prevFilters.amenities.filter((amenity) => amenity !== value)
        : [],
    }));
  };

  if (!show) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className={`font-montserrat fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 w-[45rem] max-h-[37rem] overflow-auto transform transition-all duration-500 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center border-b pb-2 sticky">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            <X />
          </button>
          <h3 className="font-semibold">Filters</h3>
          <div></div>
        </div>
        <div className="">
          <div className="pb-4">
            <h1 className="font-600 text-xl">Type of place</h1>
            <Tabs defaultValue="anytipe" className="w-[400px]">
              <TabsContent value="anytipe">
                Search rooms, entire homes, or any type of place
              </TabsContent>
              <TabsContent value="room">
                A room in a home, plus access to shared spaces.
              </TabsContent>
              <TabsContent value="entire">A home all to yourself.</TabsContent>
              <div className="flex flex-col justify-center items-center">
                <TabsList>
                  <TabsTrigger
                    value="anytype"
                    onClick={() =>
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        roomType: undefined,
                      }))
                    }
                  >
                    Any Type
                  </TabsTrigger>
                  <TabsTrigger
                    value="room"
                    onClick={() =>
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        roomType: "Private room",
                      }))
                    }
                  >
                    Room
                  </TabsTrigger>
                  <TabsTrigger
                    value="entire"
                    onClick={() =>
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        roomType: "Entire home/apt",
                      }))
                    }
                  >
                    Entire Home
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          <hr className="pb-4" />
          <div className="space-y-2 pb-4">
            <h1 className="font-600 text-xl pb-2">Price Range</h1>
            <p className="text-xs">Nightly prices including fees and taxes</p>
          </div>
          <hr className="pb-4" />
          <div className="space-y-4 pb-4">
            <h1 className="font-600 text-xl pb-2">Rooms and beds</h1>
            <p className="text-[16px]">Bedrooms</p>
            <Buttons setFilters={setFilters} filterType="bedrooms" />
            <p className="text-[16px]">Beds</p>
            <Buttons setFilters={setFilters} filterType="beds" />
            <p className="text-[16px]">Bathrooms</p>
            <Buttons setFilters={setFilters} filterType="bathrooms" />
          </div>
          <hr className="pb-4" />
          <div>
            <h1 className="font-600 text-xl pb-2">Amenities</h1>
            <p className="pb-4 text-[16px] font-bold">Essentials</p>
            <div className="grid grid-cols-2 gap-5 pb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="Wifi"
                  checked={checkedState.Wifi}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="wifi" className="ml-3">
                  Wifi
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="Kitchen"
                  checked={checkedState.Kitchen}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="kitchen" className="ml-3">
                  Kitchen
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="Washer"
                  checked={checkedState.Washer}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="washer" className="ml-3">
                  Washer
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="Dryer"
                  checked={checkedState.Dryer}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="Dryer" className="ml-3">
                  Dryer
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="Air conditioning"
                  checked={checkedState["Air conditioning"]}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="air" className="ml-3">
                  Air conditioning
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="Heating"
                  checked={checkedState.Heating}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="Heating" className="ml-3">
                  Heating
                </Label>
              </div>
              {showMore && (
                <>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Laptop friendly workspace"
                      checked={checkedState["Dedicated workspace"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="workspace" className="ml-3">
                      Dedicated workspace
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="TV"
                      checked={checkedState.TV}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="TV" className="ml-3">
                      TV
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Hair dryer"
                      checked={checkedState["Hair dryer"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="dryer" className="ml-3">
                      Hair dryer
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Iron"
                      checked={checkedState.Iron}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="Iron" className="ml-3">
                      Iron
                    </Label>
                  </div>
                  <p className="col-span-2 text-[16px] font-bold">Features</p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Pool"
                      checked={checkedState.Pool}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="pool" className="ml-3">
                      Pool
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Hot tub"
                      checked={checkedState["Hot tub"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="tub" className="ml-3">
                      Hot tub
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Free parking"
                      checked={checkedState["Free parking"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="parking" className="ml-3">
                      Free parking
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="EV charger"
                      checked={checkedState["EV charger"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="charger" className="ml-3">
                      EV charger
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Crib"
                      checked={checkedState.Crib}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="crib" className="ml-3">
                      Crib
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="King bed"
                      checked={checkedState["King bed"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="king" className="ml-3">
                      King bed
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Gym"
                      checked={checkedState.Gym}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="gym" className="ml-3">
                      Gym
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="BBQ grill"
                      checked={checkedState["BBQ grill"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="bbq" className="ml-3">
                      BBQ grill
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Breakfast"
                      checked={checkedState.Breakfast}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="breakfast" className="ml-3">
                      Breakfast
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Indoor fireplace"
                      checked={checkedState["Indoor fireplace"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="fireplace" className="ml-3">
                      Indoor fireplace
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Smoking allowed"
                      checked={checkedState["Smoking allowed"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="smoking" className="ml-3">
                      Smoking allowed
                    </Label>
                  </div>
                  <p className="col-span-2 text-[16px] font-bold">Location</p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Beachfront"
                      checked={checkedState.Beachfront}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="Beachfront" className="ml-3">
                      Beachfront
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Waterfront"
                      checked={checkedState.Waterfront}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="Waterfront" className="ml-3">
                      Waterfront
                    </Label>
                  </div>
                  <p className="col-span-2 text-[16px] font-bold">Safety</p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Smoke alarm"
                      checked={checkedState["Smoke alarm"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="smokealarm" className="ml-3">
                      Smoke alarm
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Carbon monoxide alarm"
                      checked={checkedState["Carbon monoxide alarm"]}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="Carbon" className="ml-3">
                      Carbon monoxide alarm
                    </Label>
                  </div>
                </>
              )}
            </div>
            <button
              className="underline font-bold text-[14px]"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </button>
          </div>
          <hr className="pb-4" />
          <div>
            <h1 className="font-600 text-xl pb-2">Booking options</h1>
          </div>
        </div>
        <div>
          <div></div>
          <Button onClick={setFiltersToParams}>Show X places</Button>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
