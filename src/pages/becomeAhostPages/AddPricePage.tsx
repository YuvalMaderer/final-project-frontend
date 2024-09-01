import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DollarSign, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home } from "@/layouts/BecomeAhostLayout";
import { useOutletContext } from "react-router-dom";

function AddPricePage() {
  const [newHome, setNewHome] =
    useOutletContext<[Home, React.Dispatch<React.SetStateAction<Home>>]>();
  const [price, setPrice] = useState("0");
  const [isFocused, setIsFocused] = useState(false);
  const [guestPriceOpen, setGuestPriceOpen] = useState(true);
  const [youEarmOpen, setYouEarmOpen] = useState(false);

  useEffect(() => handleNewHomeUpdate(), [price]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
    if (value.length > 5) {
      value = value.slice(0, 5); // Ensure the input doesn't exceed 5 characters
    }

    // Add commas after every 3 digits
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setPrice(formattedValue);
  };

  function handleNewHomeUpdate() {
    const localStorageHome = localStorage.getItem("newHome");

    // Check if localStorageHome exists and parse it to an object
    const homeObject = localStorageHome ? JSON.parse(localStorageHome) : {};

    // Update the homeObject with the new roomType
    const updatedHome = {
      ...homeObject,
      price: price,
    };

    // Update the state and localStorage
    setNewHome(updatedHome);
    localStorage.setItem("newHome", JSON.stringify(updatedHome));
  }

  // Determine text size based on the length of the price

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center pt-10 ">
      <div className="space-y-2 mb-8 w-[30%]">
        <h1 className="text-4xl font-[500]">Now, set your price</h1>
        <p className="text-lg text-[#9d9d9d]">You can change it anytime.</p>
      </div>
      <div
        className={`flex justify-center items-center space-x-2 text-9xl font-bold`}
      >
        <span>$</span>
        <Input
          id="price"
          type="text"
          value={price}
          onChange={handlePriceChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`text-9xl h-44 font-bold border-none outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:border-none focus:outline-none focus:shadow-none w-[30%]`}
          style={{ boxShadow: "none", border: "none", outline: "none" }}
        />
        {!isFocused && (
          <Label
            htmlFor="price"
            className="cursor-pointer border rounded-full p-2"
          >
            <Pencil />
          </Label>
        )}
      </div>
      <div className="w-[40%] space-y-4">
        <div
          onClick={() => {
            setYouEarmOpen(false);
            setGuestPriceOpen(true);
          }}
          className="border border-black p-6 rounded-xl space-y-4 focus:outline-none focus:ring-2 focus:ring-black"
          tabIndex={0}
        >
          {guestPriceOpen && (
            <div className="border-b pb-4 space-y-3">
              <div className="flex justify-between text-lg">
                <span>Base Price</span>
                <span>${price}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Guest service fee</span>
                <span>
                  $
                  {(
                    parseFloat(price.replace(/,/g, "")) * 0.14
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between text-lg font-[500]">
            <span>Guest Price</span>
            <span>
              ${(parseFloat(price.replace(/,/g, "")) * 1.14).toLocaleString()}
            </span>
          </div>
        </div>
        <div
          onClick={() => {
            setYouEarmOpen(true);
            setGuestPriceOpen(false);
          }}
          className="border border-black p-6 rounded-xl space-y-4 focus:outline-none focus:ring-2 focus:ring-black"
          tabIndex={0}
        >
          {youEarmOpen && (
            <div className="border-b pb-4 space-y-3">
              <div className="flex justify-between text-lg">
                <span>Base Price</span>
                <span>${price}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Host service fee</span>
                <span>
                  -$
                  {(
                    parseFloat(price.replace(/,/g, "")) * 0.03
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between text-lg font-[500]">
            <span>You earn</span>
            <span>
              ${(parseFloat(price.replace(/,/g, "")) * 0.97).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPricePage;
