import { selection } from "@/pages/becomeAhostPages/SelectRoomTypePage";
import React, { useState } from "react";

interface RoomTypeProps {
  selected: selection;
  setSelected: React.Dispatch<React.SetStateAction<selection>>;
  icon: JSX.Element;
  name: selection;
}

function RoomType({ selected, setSelected, icon, name }: RoomTypeProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setSelected(name);
  };

  return (
    <div
      onClick={handleClick}
      className={`border lg:min-w-56 p-4 rounded-xl pt-6 space-y-2 font-[500] 
          ${
            selected === name
              ? "border-black border-[3px] bg-[#F7F7F7]"
              : "border-gray-300 hover:border-[3px] hover:border-black"
          }
         
          transition-transform duration-150 ease-in-out`}
    >
      {icon}
      <p>{name}</p>
    </div>
  );
}
export default RoomType;
