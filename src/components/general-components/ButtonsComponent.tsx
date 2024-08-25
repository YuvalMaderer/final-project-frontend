import React, { useState } from "react";

// Use your existing QueryFilter type
interface QueryFilter {
  type?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: string;
  beds?: string;
  bathrooms?: string;
  hostLanguage?: string;
  amenities?: string[];
  capacity?: number;
  accessibility?: boolean;
  bookingOptions: {
    InstantBook: boolean;
    SelfCheckIn: boolean;
    AllowsPets: boolean;
  };
  location?: string;
  startDate?: Date;
  endDate?: Date;
}

interface ButtonsProps {
  setFilters: React.Dispatch<React.SetStateAction<QueryFilter>>;
  filterType: keyof QueryFilter; // Using keyof QueryFilter ensures type safety for filterType
}

const Buttons: React.FC<ButtonsProps> = ({ setFilters, filterType }) => {
  const buttons: string[] = ["Any", "1", "2", "3", "4", "5", "6", "7", "8+"];

  const [chosenButton, setChosenButton] = useState<string>(buttons[0]);

  const handleClick = (value: string): void => {
    const newValue = value === "Any" ? "" : value; // If "Any" is clicked, set to an empty string
    setChosenButton(value);

    setFilters((prevFilters: QueryFilter) => ({
      ...prevFilters,
      [filterType]: newValue, // Update the filter with the chosen value or reset if "Any"
    }));
  };

  return (
    <div className="flex gap-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          aria-pressed={chosenButton === button}
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
