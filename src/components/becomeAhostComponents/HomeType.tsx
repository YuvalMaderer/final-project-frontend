import { section } from "@/pages/becomeAhostPages/SelectTypePage";
import React, { useState } from "react";

interface HomeTypeProps {
  icon: string;
  name: section;
  setSelected: React.Dispatch<React.SetStateAction<section>>;
  selected: section;
  
}

function HomeType({ icon, name, selected, setSelected }: HomeTypeProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setSelected(name);
    setTimeout(() => {
      setIsClicked(false);
    }, 150); // Briefly scale down
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
        ${isClicked ? "scale-95" : ""}
        transition-transform duration-150 ease-in-out`}
    >
      <img className="w-[36px]" src={icon} alt="" />
      <p>{name}</p>
    </div>
  );
}

export default HomeType;
