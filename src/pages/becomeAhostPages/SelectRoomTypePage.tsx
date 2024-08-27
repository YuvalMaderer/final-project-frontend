import RoomType from "@/components/becomeAhostComponents/RoomType";
import { DoorOpen, House, HousePlus } from "lucide-react";
import React, { useState } from "react";

interface RoomType {
  icon: JSX.Element;
  name: selection;
  description: string;
}

const roomType: RoomType[] = [
  {
    icon: <House />,
    name: "An entire place",
    description: "Guests have the whole place to themselves",
  },
  {
    icon: <DoorOpen />,
    name: "A room",
    description:
      "Guests have their own room in a home, plus access to shared spaces",
  },
  {
    icon: <HousePlus />,

    name: "A shared room",
    description:
      "Guests sleep in a room or common area that may be shared with you or others",
  },
];

export type selection =
  | "An entire place"
  | "A room"
  | "A shared room"
  | undefined;

function SelectRoomTypePage() {
  const [selected, setSelected] = useState<selection>(undefined);
  return (
    <div className="flex justify-center h-screen">
      <div className="space-y-10">
        <h1 className="text-center text-3xl font-[600]">
          What type of place will guests have?
        </h1>
        <section className="grid md:grid-cols-3 grid-cols-2 gap-4">
          {roomType.map((type, index) => (
            <RoomType
              key={index}
              selected={selected}
              setSelected={setSelected}
              icon={type.icon}
              name={type.name}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default SelectRoomTypePage;
