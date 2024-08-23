import { X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Buttons from "./ButtonsComponent";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

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
                  <TabsTrigger value="anytipe">Any Type</TabsTrigger>
                  <TabsTrigger value="room">Room</TabsTrigger>
                  <TabsTrigger value="entire">Entire Home</TabsTrigger>
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
            <Buttons />
            <p className="text-[16px]">Beds</p>
            <Buttons />
            <p className="text-[16px]">Bathrooms</p>
            <Buttons />
          </div>
          <hr className="pb-4" />
          <div>
            <h1 className="font-600 text-xl pb-2">Amenities</h1>
            <p className="pb-4 text-[16px] font-bold">Essentials</p>
            <div className="grid grid-cols-2 gap-5 pb-4">
              <div className="flex items-center">
                <Checkbox id="wifi" />
                <Label htmlFor="wifi" className="ml-3">
                  Wifi
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="kitchen" />
                <Label htmlFor="kitchen" className="ml-3">
                  Kitchen
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="washer" />
                <Label htmlFor="washer" className="ml-3">
                  Washer
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="Dryer" />
                <Label htmlFor="Dryer" className="ml-3">
                  Dryer
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="air" />
                <Label htmlFor="air" className="ml-3">
                  Air conditioning
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="Heating" />
                <Label htmlFor="Heating" className="ml-3">
                  Heating
                </Label>
              </div>
              {showMore && (
                <>
                  <div className="flex items-center">
                    <Checkbox id="workspace" />
                    <Label htmlFor="workspace" className="ml-3">
                      Dedicated workspace
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="TV" />
                    <Label htmlFor="TV" className="ml-3">
                      TV
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="dryer" />
                    <Label htmlFor="dryer" className="ml-3">
                      Hair dryer
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="Iron" />
                    <Label htmlFor="Iron" className="ml-3">
                      Iron
                    </Label>
                  </div>
                  <p className="col-span-2 text-[16px] font-bold">Features</p>
                  <div className="flex items-center">
                    <Checkbox id="pool" />
                    <Label htmlFor="pool" className="ml-3">
                      Pool
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="tub" />
                    <Label htmlFor="tub" className="ml-3">
                      Hot tub
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="parking" />
                    <Label htmlFor="parking" className="ml-3">
                      Free parking
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="charger" />
                    <Label htmlFor="charger" className="ml-3">
                      EV charger
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="crib" />
                    <Label htmlFor="crib" className="ml-3">
                      Crib
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="king" />
                    <Label htmlFor="king" className="ml-3">
                      King bed
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="gym" />
                    <Label htmlFor="gym" className="ml-3">
                      Gym
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="bbq" />
                    <Label htmlFor="bbq" className="ml-3">
                      BBQ grill
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="breakfast" />
                    <Label htmlFor="breakfast" className="ml-3">
                      Breakfast
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="fireplace" />
                    <Label htmlFor="fireplace" className="ml-3">
                      Indoor fireplace
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="smoking" />
                    <Label htmlFor="smoking" className="ml-3">
                      Smoking allowed
                    </Label>
                  </div>
                  <p className="col-span-2 text-[16px] font-bold">Location</p>
                  <div className="flex items-center">
                    <Checkbox id="Beachfront" />
                    <Label htmlFor="Beachfront" className="ml-3">
                      Beachfront
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="Waterfront" />
                    <Label htmlFor="Waterfront" className="ml-3">
                      Waterfront
                    </Label>
                  </div>
                  <p className="col-span-2 text-[16px] font-bold">Safety</p>
                  <div className="flex items-center">
                    <Checkbox id="smokealarm" />
                    <Label htmlFor="smokealarm" className="ml-3">
                      Smoke alarm
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="Carbon" />
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
      </div>
    </div>
  );
};

export default FilterModal;
