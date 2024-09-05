import { ChevronLeft } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function EditHomeSideBar() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/hostPage/listing"); // This will navigate back to the previous page
  };
  return (
    <div>
      <p className="p-10 px-20 text-3xl font-semibold flex gap-4 justify-center items-center">
        <ChevronLeft
          className="cursor-pointer hover:bg-gray-100 rounded-full"
          onClick={handleGoBack}
        />{" "}
        Listing editor
      </p>
      <ul className="px-36 flex flex-col gap-6 h-96 w-[30rem] overflow-y-scroll overflow-x-hidden">
        {[
          { to: "selectType", label: "Type" },
          { to: "selectRoomType", label: "Room type" },
          { to: "selectLocation", label: "Location" },
          { to: "floorPlan", label: "Floor plan" },
          { to: "amenities", label: "Amenities" },
          { to: "addPhotos", label: "Add photos" },
          { to: "addTitle", label: "Add title" },
          { to: "addDescription", label: "Add description" },
          { to: "bookType", label: "BookType" },
          { to: "addPrice", label: "Add price" },
        ].map((item, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              `shadow-lg p-6 self-center text-center w-[20rem] ${
                isActive ? "border border-black rounded-md" : ""
              }`
            }
            to={item.to}
          >
            <li>{item.label}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default EditHomeSideBar;
