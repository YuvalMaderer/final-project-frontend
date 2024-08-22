import React from "react";
import { Button } from "../ui/button";

type CardProps = {
  title: string;
  paragraph: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isDecrementDisabled?: boolean;
};

const Card: React.FC<CardProps> = ({
  title,
  paragraph,
  count,
  onIncrement,
  onDecrement,
  isDecrementDisabled = false,
}) => {
  return (
    <div className="flex items-center justify-between p-4 w-full ">
      <div className="">
        <h3 className="font-600 text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{paragraph}</p>
      </div>
      <div className="flex items-center">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDecrement();
          }}
          disabled={isDecrementDisabled}
          variant="outline"
          className="mr-2 rounded-full"
        >
          -
        </Button>
        <span className="text-lg font-bold">{count}</span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onIncrement();
          }}
          variant="outline"
          className="ml-2  rounded-full"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Card;
