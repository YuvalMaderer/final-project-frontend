import React from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

function BecomeAhostFooter() {
  return (
    <footer className="sticky bottom-0 left-0 w-full bg-white">
      <div className="flex space-x-1">
        <Progress value={0} className="rounded-none h-[0.4rem] bg-[#DDDDDD]" />
        <Progress value={0} className="rounded-none h-[0.4rem] bg-[#DDDDDD]" />
        <Progress value={0} className="rounded-none h-[0.4rem] bg-[#DDDDDD]" />
      </div>
      <div className="flex justify-between px-14 py-6">
        <Button variant={"ghost"} className="underline text-md">
          Back
        </Button>
        <Button className="text-white bg-gray-800 px-7 py-6 text-md rounded-lg hover:bg-black">
          Next
        </Button>
      </div>
    </footer>
  );
}

export default BecomeAhostFooter;
