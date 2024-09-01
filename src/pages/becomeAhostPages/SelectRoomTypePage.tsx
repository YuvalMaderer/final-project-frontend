import RoomType from "@/components/becomeAhostComponents/RoomType";
import { Home } from "@/layouts/BecomeAhostLayout";
import { DoorOpen, House, HousePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

interface RoomType {
  icon: JSX.Element;
  name: selection;
  description: string;
}

const roomType: RoomType[] = [
  {
    icon: <House size={"40px"} />,
    name: "An entire place",
    description: "Guests have the whole place to themselves",
  },
  {
    icon: <DoorOpen size={"40px"} />,
    name: "A room",
    description:
      "Guests have their own room in a home, plus access to shared spaces",
  },
  {
    icon: <HousePlus size={"40px"} />,

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
  const [newHome, setNewHome] =
    useOutletContext<[Home, React.Dispatch<React.SetStateAction<Home>>]>();
  const [selected, setSelected] = useState<selection>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => setSearchParams({ step: "" }), []);
  return (
    <div className="flex justify-center h-screen pt-40">
      <div className="space-y-10">
        <h1 className="text-left text-3xl font-[600]">
          What type of place will guests have?
        </h1>
        <section className="grid gap-4">
          {roomType.map((type, index) => (
            <RoomType
              key={index}
              selected={selected}
              setSelected={setSelected}
              icon={type.icon}
              name={type.name}
              description={type.description}
              setNewHome={setNewHome}
              newHome={newHome}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default SelectRoomTypePage;
