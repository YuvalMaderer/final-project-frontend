import { X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 100); // Quicker hide for subtle exit animation
    }
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className={`font-montserrat fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transform transition-all duration-500 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            <X />
          </button>
          <h3 className="font-semibold">Filters</h3>
          <div></div>
        </div>
        <div className="pb-4">
          <h1 className="font-600 text-xl">Type of place</h1>
          <Tabs defaultValue="anytipe" className="w-[400px]">
            <TabsContent value="anytipe">
              Search rooms, entire homes, or any type of place
            </TabsContent>
            <TabsContent value="room">
              A room in a home, plus access to shared spaces.
            </TabsContent>
            <TabsContent value="entire">A home all to yourself.</TabsContent>
            <div className="flex flex-col justify-center items-center">
              <TabsList>
                <TabsTrigger value="anytipe">Any Type</TabsTrigger>
                <TabsTrigger value="room">Room</TabsTrigger>
                <TabsTrigger value="entire">Entire Home</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
        <hr className="pb-4" />
        <div>
          <h1 className="font-600 text-xl pb-2">Price Range</h1>
          <p className="text-xs">Nightly prices including fees and taxes</p>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
