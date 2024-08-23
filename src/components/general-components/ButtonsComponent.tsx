import React, { useState } from "react";

const Buttons: React.FC = () => {
  const buttons: string[] = ["Any", "1", "2", "3", "4", "5", "6", "7", "8+"];

  // Set the default state to the first button ("Any")
  const [chosenButton, setChosenButton] = useState<string>(buttons[0]);

  const handleClick = (value: string): void => {
    setChosenButton(value);
  };

  return (
    <div className="flex gap-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-full w-14 transition duration-150 ease-in-out text-xs ${
            chosenButton === button
              ? "bg-black text-white"
              : "bg-white border-[1px] border-gray-200 hover:border-black"
          }`}
          onClick={() => handleClick(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
