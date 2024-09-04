import EditHomeSideBar from "@/components/host/EditHomeSideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Home } from "./BecomeAhostLayout";

function EditHomeLayout() {
  const [newHome, setNewHome] = useState<Home>({
    name: "",
    type: "string",
    capacity: 0,
    imgUrls: [],
    price: 0,
    summary: "",
    amenities: [],
    bathrooms: 0,
    bedrooms: 0,
    beds: 0,
    roomType: "",
    host: {
      _id: "",
      fullname: "",
      location: "",
      about: "",
      thumbnailUrl: "",
      imgUrl: "",
      isSuperhost: false,
    },
    loc: {
      country: "",
      countryCode: "",
      city: "",
      address: "",
      lat: 0,
      lan: 0,
    },
    reviews: [],
    likedByUsers: [],
    bookingOptions: {
      InstantBook: false,
      SelfCheckIn: true,
      AllowsPets: true,
    },
    accessibility: [],
  });
  return (
    <div className="flex">
      <div className="w-[30%]">
        <EditHomeSideBar />
      </div>
      <div className="w-[70%]">
        <Outlet context={[newHome, setNewHome]} />
      </div>
    </div>
  );
}

export default EditHomeLayout;
