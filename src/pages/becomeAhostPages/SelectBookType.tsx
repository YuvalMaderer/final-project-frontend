import BookType from "@/components/becomeAhostComponents/BookType";
import RoomType from "@/components/becomeAhostComponents/RoomType";
import { Home } from "@/layouts/BecomeAhostLayout";
import { Book, MessageSquareText, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

interface BookType {
  icon: JSX.Element;
  name: selection;
  description: string;
}

const roomType: BookType[] = [
  {
    icon: <Zap size={"40px"} strokeWidth={1} />,
    name: "Use Instant Book",
    description: "Guests can book automatically.",
  },
  {
    icon: <MessageSquareText size={"40px"} strokeWidth={1} />,
    name: "Approve or decline requests",
    description: "Guests must ask if they can book.",
  },
];

export type selection =
  | "Use Instant Book"
  | "Approve or decline requests"
  | undefined;

function SelectBookType() {
  const [newHome, setNewHome] =
    useOutletContext<[Home, React.Dispatch<React.SetStateAction<Home>>]>();

  const [selected, setSelected] = useState<selection>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({ step: "" });
  }, []);

  function handleNewHomeUpdate(selection :string) {
    const localStorageHome = localStorage.getItem("newHome");

    // Check if localStorageHome exists and parse it to an object
    const homeObject = localStorageHome ? JSON.parse(localStorageHome) : {};

    let updatedHome;
    // Update the homeObject with the new roomType
    if (selection === "Use Instant Book") {
      updatedHome = {
        ...homeObject,
        bookingOptions: {
          ...homeObject.bookingOptions, // Ensure the previous bookingOptions are preserved
          InstantBook: true,
        },
      };
    } else {
      updatedHome = {
        ...homeObject,
        bookingOptions: {
          ...homeObject.bookingOptions, // Ensure the previous bookingOptions are preserved
          InstantBook: false,
        },
      };
    }

    // Update the state and localStorage
    setNewHome(updatedHome);
    localStorage.setItem("newHome", JSON.stringify(updatedHome));
  }

  return (
    <div className="flex justify-center h-screen pt-40">
      <div className="space-y-10">
        <h1 className="text-left text-3xl font-[600]">
          Decide how you’ll confirm reservations
        </h1>
        <section className="grid gap-4">
          {roomType.map((type, index) => (
            <BookType
              key={index}
              selected={selected}
              setSelected={setSelected}
              icon={type.icon}
              name={type.name}
              description={type.description}
              handleNewHomeUpdate={handleNewHomeUpdate}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default SelectBookType;
