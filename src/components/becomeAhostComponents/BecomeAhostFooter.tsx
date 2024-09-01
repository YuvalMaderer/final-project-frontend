import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { Home } from "@/layouts/BecomeAhostLayout";
import { createNewHome } from "@/lib/http";



function BecomeAhostFooter() {
  useOutletContext<[Home, React.Dispatch<React.SetStateAction<Home>>]>();
  const [progressOneValue, setProgressOneValue] = useState(0);
  const [progressTowValue, setProgressTowValue] = useState(0);
  const [progressThreeValue, setProgressThreeValue] = useState(0);

  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stepParam = searchParams.get("step");
    setStep(stepParam);
    handleProgress();
  }, [searchParams]);

  function handleProgress() {
    const lastSegment = location.pathname.split("/").pop();
    if (lastSegment === "becomeAhost") {
      setProgressOneValue(0);
    } else if (lastSegment === "selectType") {
      setProgressOneValue(20);
    } else if (lastSegment === "selectRoomType") {
      setProgressOneValue(40);
    } else if (lastSegment === "selectLocation") {
      setProgressOneValue(60);
    } else if (lastSegment === "floorPlan") {
      setProgressOneValue(80);
    } else if (lastSegment === "stepTwo") {
      setProgressOneValue(100);
      setProgressTowValue(0);
    } else if (lastSegment === "amenities") {
      setProgressOneValue(100);
      setProgressTowValue(20);
    } else if (lastSegment === "addPhotos") {
      setProgressOneValue(100);
      setProgressTowValue(40);
    } else if (lastSegment === "addTitle") {
      setProgressOneValue(100);
      setProgressTowValue(60);
    } else if (lastSegment === "addDescription") {
      setProgressOneValue(100);
      setProgressTowValue(80);
    } else if (lastSegment === "stepThree") {
      setProgressOneValue(100);
      setProgressTowValue(100);
      setProgressThreeValue(0);
    } else if (lastSegment === "bookType") {
      setProgressOneValue(100);
      setProgressTowValue(100);
      setProgressThreeValue(20);
    } else if (lastSegment === "addPrice") {
      setProgressOneValue(100);
      setProgressTowValue(100);
      setProgressThreeValue(40);
    }
  }

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
    } else if (step === "amenities") {
      navigate("addPhotos");
    } else if (step === "addPhotos") {
      navigate("addTitle");
    } else if (step === "addTitle") {
      navigate("addDescription");
    } else if (step === "addDescription") {
      navigate("stepThree");
    } else if (step === "stepThree") {
      navigate("bookType");
    } else if (step === "bookType") {
      navigate("addPrice");
    } else if (step === "addPrice") {
      navigate("receipt");
    } else if (step === "receipt") {
      const localStorageHome = localStorage.getItem("newHome");
      const homeObject = localStorageHome ? JSON.parse(localStorageHome) : {};
      console.log(homeObject);

      createNewHome(homeObject);
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
    } else if (lastSegment === "addPhotos") {
      navigate("amenities");
    } else if (lastSegment === "addTitle") {
      navigate("addPhotos");
    } else if (lastSegment === "addDescription") {
      navigate("addTitle");
    } else if (lastSegment === "stepThree") {
      navigate("addDescription");
    } else if (lastSegment === "bookType") {
      navigate("stepThree");
    } else if (lastSegment === "addPrice") {
      navigate("bookType");
    }
  }

  return (
    <footer className="sticky bottom-0 left-0 w-full bg-white">
      <div className="flex space-x-1">
        <Progress
          value={progressOneValue}
          className="rounded-none h-[0.4rem] bg-[#DDDDDD]"
        />
        <Progress
          value={progressTowValue}
          className="rounded-none h-[0.4rem] bg-[#DDDDDD]"
        />
        <Progress
          value={progressThreeValue}
          className="rounded-none h-[0.4rem] bg-[#DDDDDD]"
        />
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
