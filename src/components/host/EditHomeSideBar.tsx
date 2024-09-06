import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { IHome } from "@/types";
import { AmenityKey, iconMap } from "../general-components/AmenityIconMap";

function EditHomeSideBar({ newHome }: { newHome: IHome }) {
  const navigate = useNavigate();

  // Step 1: Define the state to store newHome data
  // const [newHome, setNewHome] = useState<IHome | null>(null);
  const [selected, setSelected] = useState<string | null>(null); // State to track selected item

  // Step 2: Load the newHome data from localStorage when the component mounts
  // useEffect(() => {
  //   const localStorageHome = localStorage.getItem("newHome");
  //   if (localStorageHome) {
  //     setNewHome(JSON.parse(localStorageHome));
  //   }
  // }, []);

  const handleGoBack = () => {
    localStorage.removeItem("newHome");
    navigate("/hostPage/listing"); // This will navigate back to the previous page
  };

  const handleSelect = (item: string) => {
    setSelected(item); // Update the selected item
  };

  return (
    <div className="flex flex-col gap-20">
      <header className="flex items-center gap-8 mt-11 ml-6">
        <Button
          className="rounded-full p-2 hover:bg-[#EBEBEB]"
          variant={"ghost"}
          onClick={handleGoBack}
        >
          <ArrowLeft />
        </Button>
        <h2 className="text-4xl font-500 py-8">Listing editor</h2>
      </header>

      <ScrollArea className="h-screen">
        <ul className="pl-16 pr-8 pt-4 pb-32 flex flex-col gap-6">
          <Link to="addPhotos">
            <li
              className={`rounded-2xl shadow-xl p-10 flex flex-col overflow-hidden hover:bg-[#F7F7F7] ${
                selected === "addPhotos"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("addPhotos")}
            >
              <p className="text-lg font-500">Photos tour</p>
              <p className="text-lg text-gray-400 pb-4">
                {newHome?.imgUrls.length} Photos
              </p>
              {newHome && (
                <div className="relative w-[180px] h-[120px] mx-auto mb-12">
                  <img
                    className="absolute top-0 left-0 w-[180px] rounded-2xl z-30 transform rotate-0 shadow-xl"
                    src={newHome.imgUrls[0]}
                    alt=""
                  />
                  <img
                    className="absolute top-0 left-16 w-[180px] rounded-2xl z-20 transform rotate-[3deg] shadow-xl"
                    src={newHome.imgUrls[1]}
                    alt=""
                  />
                  <img
                    className="absolute top-0 right-16 w-[180px] rounded-2xl z-10 transform rotate-[-3deg] shadow-xl"
                    src={newHome.imgUrls[2]}
                    alt=""
                  />
                </div>
              )}
            </li>
          </Link>

          <Link to="addTitle">
            <li
              className={`rounded-2xl shadow-xl p-6 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "addTitle"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("addTitle")}
            >
              <p className="text-lg font-500">Title</p>
              <p className="text-2xl font-500 text-[#6A6A6A]">
                {newHome?.name}
              </p>
            </li>
          </Link>

          <Link to="selectType">
            <li
              className={`rounded-2xl shadow-xl p-6 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "selectType"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("selectType")}
            >
              <p className="text-lg font-500">Property type</p>
              <p className="text-md text-[#6A6A6A]">{newHome?.type}</p>
            </li>
          </Link>

          <Link to="selectRoomType">
            <li
              className={`rounded-lg shadow-xl p-6 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "selectRoomType"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("selectRoomType")}
            >
              <p className="text-lg font-500">Room type</p>
              <p className="text-md text-[#6A6A6A]">{newHome?.roomType}</p>
            </li>
          </Link>

          <Link to="addPrice">
            <li
              className={`rounded-lg shadow-xl p-6 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "addPrice"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("addPrice")}
            >
              <p className="text-lg font-500">Pricing</p>
              <p className="text-md text-[#6A6A6A]">
                ${newHome?.price} per night
              </p>
            </li>
          </Link>

          <Link to="floorPlan">
            <li
              className={`rounded-lg shadow-xl p-6 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "floorPlan"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("floorPlan")}
            >
              <p className="text-lg font-500">Floor plan</p>
              <p className="text-md text-[#6A6A6A]">
                Bedrooms {newHome?.bedrooms} • Bathrooms {newHome?.bathrooms} •
                Beds {newHome?.beds} • Guests {newHome?.capacity}
              </p>
            </li>
          </Link>

          <Link to="addDescription">
            <li
              className={`rounded-lg shadow-xl p-6 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "addDescription"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("addDescription")}
            >
              <div>
                <p className="text-lg font-500">Description</p>
              </div>
              <div>
                {newHome?.summary &&
                  newHome.summary.match(/.{1,30}/g)?.map((chunk, index) => (
                    <p key={index} className="text-md text-[#6A6A6A]">
                      {chunk}
                    </p>
                  ))}
              </div>
            </li>
          </Link>

          <Link to="amenities">
            <li
              className={`rounded-lg shadow-xl p-6 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "amenities"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("amenities")}
            >
              <p className="text-lg font-500">Amenities</p>
              {newHome && newHome.amenities.length > 0 && (
                <div className="space-y-2">
                  <p className="text-md flex gap-4 items-center">
                    <span>{iconMap[newHome.amenities[0] as AmenityKey]} </span>
                    <span>{newHome.amenities[0]}</span>
                  </p>
                  <p className="text-md flex gap-4 items-center">
                    <span>{iconMap[newHome.amenities[1] as AmenityKey]} </span>
                    <span>{newHome.amenities[1]}</span>
                  </p>
                  <p className="text-md flex gap-4 items-center">
                    <span>{iconMap[newHome.amenities[2] as AmenityKey]} </span>
                    <span>{newHome.amenities[2]}</span>
                  </p>
                  {newHome?.amenities.length > 3 && (
                    <p className="text-[#6A6A6A]">
                      + {newHome.amenities.length - 3} more
                    </p>
                  )}
                </div>
              )}
            </li>
          </Link>

          <Link to="bookType">
            <li
              className={`rounded-2xl shadow-xl p-6 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "bookType"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("bookType")}
            >
              <p className="text-lg font-500">Instant Book</p>
              {newHome?.bookingOptions.InstantBook ? (
                <p className="text-md text-[#6A6A6A]">
                  Turned on: Guest can book automatically
                </p>
              ) : (
                <p className="text-md text-[#6A6A6A]">
                  Turned off: Manually accept or decline booking requests
                </p>
              )}
            </li>
          </Link>

          <Link to="selectLocation">
            <li
              className={`rounded-2xl shadow-xl p-10 flex flex-col gap-2 hover:bg-[#F7F7F7] ${
                selected === "selectLocation"
                  ? "ring-2 ring-black"
                  : "focus-within:ring-2 focus-within:ring-black focus:outline-none"
              }`}
              onClick={() => handleSelect("selectLocation")}
            >
              <p className="text-lg font-500">Location</p>
              <p className="text-md text-[#6A6A6A]">
                {newHome?.loc.address} {newHome?.loc.city}{" "}
                {newHome?.loc.country}
              </p>
            </li>
          </Link>
        </ul>
      </ScrollArea>
    </div>
  );
}

export default EditHomeSideBar;
