import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

function EditHomeSideBar() {
  return (
    <div className="flex flex-col gap-20">
      <header className="flex items-center gap-8 mt-11 ml-6">
        <Button
          className="rounded-full p-2  hover:bg-[#EBEBEB]"
          variant={"ghost"}
        >
          <ArrowLeft />
        </Button>
        <h2 className="text-4xl font-500 py-8">Listing editor</h2>
      </header>
      <ScrollArea className=" h-screen">
        <ul className="pl-16 pr-8 pt-4 pb-32 flex flex-col gap-6">
          <Link to="addPhotos">
            <li className="rounded-2xl shadow-xl p-10">Photos tour</li>
          </Link>
          <Link to="addTitle">
            <li className="rounded-2xl shadow-xl p-10">Add title</li>
          </Link>
          <Link to="selectType">
            <li className="rounded-2xl shadow-xl p-10">Type</li>
          </Link>
          <Link to="selectRoomType">
            <li className="rounded-2xl shadow-xl p-10">Room type</li>
          </Link>
          <Link to="addPrice">
            <li className="rounded-2xl shadow-xl p-10">Add price</li>
          </Link>
          <Link to="floorPlan">
            <li className="rounded-2xl shadow-xl p-10">Floor plan</li>
          </Link>
          <Link to="addDescription">
            <li className="rounded-2xl shadow-xl p-10">Add description</li>
          </Link>
          <Link to="amenities">
            <li className="rounded-2xl shadow-xl p-10">Ameneties</li>
          </Link>
          <Link to="bookType">
            <li className="rounded-2xl shadow-xl p-10">BookType</li>
          </Link>
          <Link to="selectLocation">
            <li className="rounded-2xl shadow-xl p-10">Location</li>
          </Link>
        </ul>
      </ScrollArea>
    </div>
  );
}

export default EditHomeSideBar;
