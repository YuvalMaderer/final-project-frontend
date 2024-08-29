import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

function BecomeAhostFooter() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stepParam = searchParams.get("step");
    setStep(stepParam);
  }, [searchParams]);

  function handleNext() {
    if (step === "stepOne") {
      navigate("selectType");
    } else if (step === "selectType") {
      navigate("selectRoomType");
    } else if (step === "selectRoomType") {
      navigate("selectLocation");
    } else if (step === "selectLocation") {
      navigate("floorPlan");
    } else if (step === "floorPlan") {
      navigate("stepTwo");
    } else if (step === "stepTwo") {
      navigate("amenities");
    }
  }

  function handleBack() {
    const lastSegment = location.pathname.split("/").pop();

    if (lastSegment === "selectLocation") {
      navigate("selectRoomType");
    } else if (lastSegment === "selectRoomType") {
      navigate("selectType");
    } else if (lastSegment === "selectType") {
      navigate("");
    } else if (lastSegment === "floorPlan") {
      navigate("selectLocation");
    } else if (lastSegment === "stepTwo") {
      navigate("floorPlan");
    } else if (lastSegment === "amenities") {
      navigate("stepTwo");
    }
  }

  return (
    <footer className="sticky bottom-0 left-0 w-full bg-white">
      <div className="flex space-x-1">
        <Progress value={0} className="rounded-none h-[0.4rem] bg-[#DDDDDD]" />
        <Progress value={0} className="rounded-none h-[0.4rem] bg-[#DDDDDD]" />
        <Progress value={0} className="rounded-none h-[0.4rem] bg-[#DDDDDD]" />
      </div>
      <div className="flex justify-between px-14 py-6">
        <Button
          onClick={handleBack}
          variant={"ghost"}
          className="underline text-md"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="text-white bg-gray-800 px-7 py-6 text-md rounded-lg hover:bg-black"
        >
          Next
        </Button>
      </div>
    </footer>
  );
}

export default BecomeAhostFooter;
