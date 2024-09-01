import { Home } from "@/layouts/BecomeAhostLayout";
import { section } from "@/pages/becomeAhostPages/SelectTypePage";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface HomeTypeProps {
  icon: string;
  name: section;
  setSelected: React.Dispatch<React.SetStateAction<section | undefined>>;
  selected: section | undefined;
  setNewHome: React.Dispatch<React.SetStateAction<Home>>;
  newHome: Home;
}

function HomeType({
  icon,
  name,
  selected,
  setSelected,
  setNewHome,
  newHome,
}: HomeTypeProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setIsClicked(true);
    setSelected(name);
    if (name) {
      const updatedHome = { ...newHome, type: name };
      setNewHome(updatedHome);
      localStorage.setItem("newHome", JSON.stringify(updatedHome));
    }
    setTimeout(() => {
      setIsClicked(false);
    }, 150); // Briefly scale down
    setSearchParams({ step: "selectType" });

    console.log(newHome);
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
