import { selection } from "@/pages/becomeAhostPages/SelectRoomTypePage";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface RoomTypeProps {
  selected: selection;
  setSelected: React.Dispatch<React.SetStateAction<selection>>;
  icon: JSX.Element;
  name: selection;
  description: string;
}

function RoomType({
  selected,
  setSelected,
  icon,
  name,
  description,
}: RoomTypeProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSelected(name);
    setSearchParams({ step: "selectRoomType" });
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-between items-center border lg:min-w-56 p-4 rounded-xl pt-6 space-y-2 font-[500] 
          ${
            selected === name
              ? "border-black border-[3px] bg-[#F7F7F7]"
              : "border-gray-300 hover:border-[3px] hover:border-black"
          }
         
          transition-transform duration-150 ease-in-out`}
    >
      <div>
        <p className="text-xl font-[500]">{name}</p>
        <p className="text-[#9D9D9D]">{description}</p>
      </div>
      <div className="pb-4">{icon}</div>
    </div>
  );
}
export default RoomType;
