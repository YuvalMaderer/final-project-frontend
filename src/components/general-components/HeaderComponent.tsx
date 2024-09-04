import { useState, useEffect, useCallback } from "react";
import { Globe, Menu, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "./LoginModalComponent";
import { useAuth } from "@/providers/user.context";
import { useLocation } from "react-router-dom";

import logo from "../../assets/airbnb-logo.webp";
import { Button } from "../ui/button";
import { useDate } from "@/hooks/useDate";
import { useGuestContext } from "@/providers/Guest-Context";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useCurrency } from "@/providers/CurrencyContext";

function HeaderComponent() {
  const { currency, setCurrency } = useCurrency();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReplacementClicked, setIsReplacementClicked] = useState(false);
  const [isScrollListenerActive, setIsScrollListenerActive] = useState(true);
  const { loggedInUser, logout } = useAuth();
  const location = useLocation();
  const { checkDates, setCheckDates } = useDate();
  const { guestCounts, setGuestCounts } = useGuestContext();
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [activeItem, setActiveItem] = useState("language");

  const isHomePage = location.pathname === "/";

  const formatDates = () => {
    if (!checkDates?.from || !checkDates?.to) return "";

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const fromMonth = monthNames[checkDates.from.getMonth()];
    const fromDay = checkDates.from.getDate();
    const toDay = checkDates.to.getDate();

    return `${fromMonth} ${fromDay} - ${toDay}`;
  };

  const handleScroll = useCallback(() => {
    if (isScrollListenerActive) {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        setIsReplacementClicked(false);
      } else if (window.scrollY === 0) {
        setIsScrolled(false);
      }
    }
  }, [isScrollListenerActive]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleReplacementClick = () => {
    setIsReplacementClicked(true);
    setIsScrollListenerActive(false);
    setTimeout(() => {
      setIsScrollListenerActive(true);
    }, 1000);
  };

  const handleClick = (item) => {
    setActiveItem(item); // Set the clicked item as active
  };

  return (
    <>
      <div className={`bg-white z-50 ${isHomePage ? "sticky top-0" : ""}`}>
        <nav className="flex justify-between items-center p-3 px-20">
          <Link to="/">
            <img src={logo} alt="logo" className="w-[105px] h-[60px]" />
          </Link>

          <div className="flex gap-6 items-center">
            <div
              className={`flex relative left-64 items-center transition-all duration-300 ${
                isScrolled && !isReplacementClicked
                  ? "opacity-0 translate-y-[-20px]"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Stays
              </NavLink>
            </div>
            <div
              className={`relative left-10 transition-all duration-300 mt-2 ${
                isScrolled && !isReplacementClicked
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[20px] pointer-events-none"
              }`}
            >
              <div
                className="flex items-center border border-gray-300 rounded-full py-2 shadow-sm text-sm cursor-pointer"
                onClick={handleReplacementClick}
              >
                <div className="px-3 ml-4 border-r border-gray-300 font-semibold">
                  {selectedDestination ? selectedDestination : "Anywhere"}
                </div>
                <div className="px-3 border-r border-gray-300 font-semibold">
                  {checkDates ? formatDates() : "Any week"}
                </div>
                <div className="ml-2 text-gray-700 flex items-center justify-between gap-4">
                  {guestCounts.adults > 0 ? (
                    <p className="">
                      {guestCounts.adults + guestCounts.children} guest
                      {guestCounts.adults + guestCounts.children > 1
                        ? "s"
                        : ""}{" "}
                      {guestCounts.infants > 0
                        ? `${guestCounts.infants} infant${
                            guestCounts.infants > 1 ? "s" : ""
                          }`
                        : ""}
                      {guestCounts.pets > 0
                        ? `${
                            guestCounts.infants > 0 ||
                            guestCounts.adults + guestCounts.children > 0
                              ? " "
                              : ""
                          }${guestCounts.pets} pet${
                            guestCounts.pets > 1 ? "s" : ""
                          }`
                        : ""}
                    </p>
                  ) : (
                    "Add guests"
                  )}

                  <Button className="text-white font-800 p-3 rounded-full flex items-center justify-center mr-2">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/becomeAhost" className="font-600 text-sm">
              Airbnb your home
            </Link>
            <Dialog>
              <DialogTrigger>
                <Globe className="w-4 h-4" />
              </DialogTrigger>
              <DialogContent className="max-w-6xl mb-10 max-h-[40rem] overflow-y-auto">
                <nav className="flex flex-col gap-10 text-sm p-6 ">
                  <div className="flex gap-10 border-b">
                    <p
                      className={`cursor-pointer ${
                        activeItem === "language"
                          ? "font-bold border-b-2 border-black pb-2"
                          : "text-gray-500 font-semibold"
                      }`}
                      onClick={() => handleClick("language")}
                    >
                      Language and region
                    </p>
                    <p
                      className={`cursor-pointer ${
                        activeItem === "currency"
                          ? "font-bold border-b-2 border-black pb-2"
                          : "text-gray-500 font-semibold"
                      }`}
                      onClick={() => handleClick("currency")}
                    >
                      Currency
                    </p>
                  </div>
                  <div>
                    {activeItem === "language" ? (
                      <div className="flex flex-col gap-6 ">
                        <div className="text-2xl font-semibold">
                          Choose a language and region
                        </div>
                        <div className="flex flex-col cursor-pointer hover:bg-gray-100 border border-black rounded-lg p-4 py-3 w-52">
                          <p className="font-semibold">English</p>
                          <p>United States</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-6">
                        <div className="text-2xl font-semibold">
                          Choose a currency
                        </div>
                        <div className="flex gap-4">
                          <div
                            className={`flex flex-col cursor-pointer hover:bg-gray-100 border border-black rounded-lg p-4 py-3 w-52 ${
                              currency === "USD" ? "bg-gray-200" : ""
                            }`}
                            onClick={() => {
                              setCurrency("USD");
                              window.location.reload();
                            }}
                          >
                            <p className="font-semibold">
                              United States dollar
                            </p>
                            <p>USD - $</p>
                          </div>
                          <div
                            className={`flex flex-col cursor-pointer hover:bg-gray-100 border border-black rounded-lg p-4 py-3 w-52 ${
                              currency === "ILS" ? "bg-gray-200" : ""
                            }`}
                            onClick={() => {
                              setCurrency("ILS");
                              window.location.reload();
                            }}
                          >
                            <p className="font-semibold">Israeli new shekel</p>
                            <p>ILS - ₪</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </nav>
              </DialogContent>
            </Dialog>

            <div className="flex items-center border border-grey-300 rounded-full p-3 gap-4 hover:shadow-lg">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2">
                  <Menu className="w-4 h-4 self-center" />
                  <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                    {loggedInUser ? (
                      <div className="bg-black w-6 h-6 rounded-full text-white flex justify-center items-center text-xs">
                        {loggedInUser.user.picture ? (
                          <img
                            src={loggedInUser.user.picture}
                            alt={loggedInUser.user.firstName[0]}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span>{loggedInUser.user.firstName[0]}</span>
                        )}
                      </div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 relative top-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="relative right-12 top-4 w-60 flex flex-col gap-2">
                  {loggedInUser ? (
                    <>
                      <DropdownMenuItem>Messages</DropdownMenuItem>
                      <Link to="/trips">
                        <DropdownMenuItem>Trips</DropdownMenuItem>
                      </Link>
                      <Link to="/wishlists">
                        <DropdownMenuItem>Wishlists</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link to={"/hostPage"}>
                        <DropdownMenuItem>Manage listings</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>Refer a host</DropdownMenuItem>
                      <Link to={"/account"}>
                        <DropdownMenuItem>Account</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Gift cards</DropdownMenuItem>
                      <DropdownMenuItem>Help center</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          logout();
                          // Navigate after logging out
                          window.location.href = "/";
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        className="font-bold"
                        onClick={() => setModalOpen(true)}
                      >
                        Log in
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setModalOpen(true)}>
                        Sign up
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Gift cards</DropdownMenuItem>
                      <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
                      <DropdownMenuItem>Help center</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>

        {/* Conditionally render the SearchBar with visibility */}
        <div
          className={`transition-all duration-300 ${
            isScrolled && !isReplacementClicked ? "hidden" : "block"
          }`}
        >
          <SearchBar
            selectedDestination={selectedDestination}
            setSelectedDestination={setSelectedDestination}
          />
        </div>
        <hr className="pt-2 pb-4 mt-3" />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default HeaderComponent;
