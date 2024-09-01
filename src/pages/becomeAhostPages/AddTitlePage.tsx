import { Textarea } from "@/components/ui/textarea";
import { Home } from "@/layouts/BecomeAhostLayout";
import React, { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

function AddTitlePage() {
  const [newHome, setNewHome] =
    useOutletContext<[Home, React.Dispatch<React.SetStateAction<Home>>]>();

  const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({ step: "addTitle" });
    handleNewHomeUpdate();
  }, [text]);

  function handleNewHomeUpdate() {
    const localStorageHome = localStorage.getItem("newHome");

    // Check if localStorageHome exists and parse it to an object
    const homeObject = localStorageHome ? JSON.parse(localStorageHome) : {};

    // Update the homeObject with the new roomType
    const updatedHome = {
      ...homeObject,
      name: text,
      host: {
        ...homeObject.host, // Preserve other properties in the host object
        about: text, // Update the about field in the host object
      },
    };

    // Update the state and localStorage
    setNewHome(updatedHome);
    localStorage.setItem("newHome", JSON.stringify(updatedHome));
  }

  return (
    <div className="h-screen flex justify-center mt-40">
      <div className="max-w-[700px] w-full space-y-6">
        <div className="pl-2 space-y-2">
          <h1 className="text-4xl font-[500]">
            Now, let's give your cabin a title
          </h1>
          <p className="text-lg text-[#9d9d9d]">
            Short titles work best. Have fun with it—you can always change it
            later.
          </p>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={32}
          className="w-full"
        />
        <div className=" text-sm text-gray-500 font-600">{text.length}/32</div>
      </div>
    </div>
  );
}

export default AddTitlePage;
