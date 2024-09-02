import { fetchHomeById } from "@/lib/http";
import { DateRange, IHome, IReservationRequest } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChevronLeft, CircleCheck, Star } from "lucide-react";
import { useDate } from "@/hooks/useDate";
import { calculateOverallAverageRating } from "@/lib/utils";
import { useGuestContext } from "@/providers/Guest-Context";
import { Button } from "../ui/button";
import { useAuth } from "@/providers/user.context";
import { useEffect, useState } from "react";
import Modal from "./LoginModalComponent";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Card as GuestCard } from "./GuestCard";
import { useMutation } from "@tanstack/react-query";
import { createNewReservation } from "@/lib/http";

type GuestType = "adults" | "children" | "infants" | "pets";

function Reservation() {
  const { id } = useParams<{ id: string }>();
  const { checkDates, setCheckDates } = useDate();
  const [tempDates, setTempDates] = useState<DateRange | undefined>(checkDates);
  const { guestCounts, setGuestCounts } = useGuestContext();
  const [tempGuestCounts, setTempGuestCounts] = useState(guestCounts);
  const { loggedInUser } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenGuest, setIsDialogOpenGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDialogOpenGuest) {
      setTempGuestCounts(guestCounts);
    }
  }, [isDialogOpenGuest, guestCounts]);

  const {
    data: home,
    isLoading,
    error,
  } = useQuery<IHome | null>({
    queryKey: ["home", id],
    queryFn: () => fetchHomeById(id as string),
  });

  const {
    mutate: createReservation,
    isPending: isCreating,
    error: reservationError,
  } = useMutation({
    mutationFn: createNewReservation,
    onSuccess: (data) => {
      console.log("Reservation created:", data);
    },
    onError: (error) => {
      console.error("Error creating reservation:", error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading home details</div>;
  if (!home) return <div>No home details available.</div>;

  const calculateNights = (checkDates: DateRange | undefined) => {
    if (!checkDates || !checkDates.from || !checkDates.to) return 0;

    const diffInTime = checkDates.to.getTime() - checkDates.from.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days

    return diffInDays;
  };

  const formatDateToUTC = (date: Date | undefined) => {
    if (!date) return undefined;
    // Return date in ISO string format in UTC
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
  };

  const parseDate = (dateString: string | undefined): Date | undefined => {
    if (!dateString) return undefined;
    return new Date(dateString);
  };

  const CleaningFee = 35;
  const AirbnbServiceFee = 67;
  const Texas = 12;

  const reservationData: IReservationRequest = {
    user: loggedInUser?.user._id || "",
    home: home._id,
    startDate: parseDate(formatDateToUTC(checkDates?.from)),
    endDate: parseDate(formatDateToUTC(checkDates?.to)),
    totalPrice:
      home.price * calculateNights(checkDates) +
      CleaningFee +
      AirbnbServiceFee +
      Texas,
  };

  console.log("Reservation data:", reservationData);

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

  const handleTempIncrement = (key: GuestType) => {
    setTempGuestCounts((prevCounts) => {
      if (key !== "adults" && prevCounts.adults === 0) {
        return {
          ...prevCounts,
          adults: 1,
          [key]: prevCounts[key] + 1,
        };
      } else {
        return {
          ...prevCounts,
          [key]: prevCounts[key] + 1,
        };
      }
    });
  };

  const handleTempDecrement = (key: GuestType) => {
    setTempGuestCounts((prevCounts) => {
      if (key === "adults") {
        const { children, infants, pets } = prevCounts;
        if (
          prevCounts.adults === 1 &&
          children === 0 &&
          infants === 0 &&
          pets === 0
        ) {
          return prevCounts; // Prevent decrement if it's the only adult and no other guests
        } else if (prevCounts.adults > 0) {
          // Check if other guest types are greater than 0
          if (
            prevCounts.adults === 1 &&
            (prevCounts.children > 0 ||
              prevCounts.infants > 0 ||
              prevCounts.pets > 0)
          ) {
            return prevCounts; // Prevent decrement to 0 if there are other guests
          }
          return {
            ...prevCounts,
            adults: prevCounts.adults - 1,
          };
        } else {
          return prevCounts; // Prevent decrement below zero
        }
      } else {
        return {
          ...prevCounts,
          [key]: prevCounts[key] > 0 ? prevCounts[key] - 1 : 0,
        };
      }
    });
  };

  const handlePay = () => {
    if (loggedInUser && checkDates) {
      createReservation(reservationData);
    } else {
      console.log("Please log in or select dates");
    }
  };

  const handleGuestSave = () => {
    setGuestCounts(tempGuestCounts);
    setIsDialogOpenGuest(false);
  };

  const handleCancle = () => {
    setIsDialogOpenGuest(false);
  };

  const handleSave = () => {
    if (tempDates !== undefined) {
      setCheckDates(tempDates);
      setTempDates(tempDates);
      setIsDialogOpen(false);
    }
  };

  const handleClear = () => {
    setTempDates(undefined);
  };

  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <div>
      <div>
        <p className="p-12 mt-4 text-3xl font-semibold flex items-center gap-4">
          <ChevronLeft
            className="cursor-pointer hover:bg-gray-100 rounded-full"
            onClick={handleGoBack}
          />{" "}
          Request to book
        </p>
      </div>
      <div className="flex justify-between px-16 gap-4">
        <div>
          <Card className="w-[37rem] border-none shadow-none ">
            <CardHeader>
              {loggedInUser && (
                <div className="flex flex-col mb-4">
                  <div className="flex flex-col  gap-4 mb-2">
                    <CircleCheck className="w-8 h-8" />
                    <span className="font-semibold text-xl">
                      Hi, you're logged in
                    </span>
                  </div>
                  <p className="text-gray-700">
                    Review your booking details to continue.
                  </p>
                </div>
              )}
              <CardTitle className="text-xl">Your trip</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Dates</p>
                  <p className="">{formatDates()}</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger>
                    <p
                      className="underline font-semibold cursor-pointer"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Edit
                    </p>
                  </DialogTrigger>
                  <DialogContent className="max-w-[38rem] mb-10 max-h-[40rem] overflow-y-auto">
                    <div className="">
                      <p className="text-xl font-semibold">Select dates</p>
                      <p className="text-sm text-gray-700">
                        Add your travel dates for exact pricing
                      </p>
                    </div>
                    <Calendar
                      mode="range"
                      selected={tempDates}
                      onSelect={(ev) => {
                        setTempDates(ev as DateRange | undefined);
                      }}
                      numberOfMonths={2}
                      fromDate={new Date()}
                      initialFocus
                    />
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant={null}
                        className="underline hover:bg-gray-100"
                        onClick={handleClear}
                      >
                        Clear dates
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={tempDates === undefined}
                      >
                        Save
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex justify-between ">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Guests</p>
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
                </div>

                <Dialog
                  open={isDialogOpenGuest}
                  onOpenChange={setIsDialogOpenGuest}
                >
                  <DialogTrigger>
                    <p
                      className="underline font-semibold cursor-pointer"
                      onClick={() => setIsDialogOpenGuest(true)}
                    >
                      Edit
                    </p>
                  </DialogTrigger>
                  <DialogContent className="max-w-[23rem] mb-10 max-h-[40rem] overflow-y-auto">
                    <div>
                      <p className="text-xl font-semibold">Guests</p>
                    </div>
                    <div className="">
                      <GuestCard
                        title="Adults"
                        paragraph="Age 13+"
                        count={tempGuestCounts.adults}
                        onIncrement={() => handleTempIncrement("adults")}
                        onDecrement={() => handleTempDecrement("adults")}
                      />
                      <GuestCard
                        title="Children"
                        paragraph="Ages 2-12"
                        count={tempGuestCounts.children}
                        onIncrement={() => handleTempIncrement("children")}
                        onDecrement={() => handleTempDecrement("children")}
                      />
                      <GuestCard
                        title="Infants"
                        paragraph="Under 2"
                        count={tempGuestCounts.infants}
                        onIncrement={() => handleTempIncrement("infants")}
                        onDecrement={() => handleTempDecrement("infants")}
                      />
                      <GuestCard
                        title="Pets"
                        paragraph="Bringing a service animal?"
                        count={tempGuestCounts.pets}
                        onIncrement={() => handleTempIncrement("pets")}
                        onDecrement={() => handleTempDecrement("pets")}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant={null}
                        className="underline hover:bg-gray-100"
                        onClick={handleCancle}
                      >
                        Cancle
                      </Button>
                      <Button onClick={handleGuestSave}>Save</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <div className="mt-8 flex flex-col gap-4">
                <p className="text-xl font-semibold">Choose how to pay</p>
                <Button
                  onClick={handlePay}
                  disabled={!loggedInUser || isCreating}
                >
                  {isCreating ? <span>Processing...</span> : "PayPal"}
                </Button>
                {reservationError && (
                  <p className="text-red-500 mt-2">
                    Error creating reservation: {reservationError.message}
                  </p>
                )}
              </div>
            </CardFooter>
            <CardFooter className="border-t">
              {loggedInUser ? (
                ""
              ) : (
                <div>
                  <Button className="mt-6" onClick={() => setModalOpen(true)}>
                    Login
                  </Button>{" "}
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                  />
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
        <div className="w-[27rem] relative">
          <div className="sticky top-20">
            <Card className="border">
              <CardHeader>
                <CardTitle className="font-400 text-xl">
                  <div className="flex items-center gap-4">
                    <img
                      src={home.imgUrls[0]}
                      alt={`${home.name} - Main Image`}
                      className="w-[6.3rem] h-[6.3rem] object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-[1rem]">{home.name}</p>
                      <p className="text-sm font-400">{home.roomType}</p>
                      <p className="flex items-center gap-1 text-sm">
                        <Star fill="black" width="12px" />
                        <span>
                          {calculateOverallAverageRating(home.reviews)}
                        </span>
                        <span className="font-400">
                          ({home.reviews.length} review
                          {home.reviews.length > 1 ? "s" : ""})
                        </span>
                        {home.host.isSuperhost && (
                          <>
                            <span className="text-black">•</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                              className="ml-1 h-3 w-3 fill-current"
                            >
                              <path d="m8.5 7.6 3.1-1.75 1.47-.82a.83.83 0 0 0 .43-.73V1.33a.83.83 0 0 0-.83-.83H3.33a.83.83 0 0 0-.83.83V4.3c0 .3.16.59.43.73l3 1.68 1.57.88c.35.2.65.2 1 0zm-.5.9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"></path>
                            </svg>
                            <span className="ml-1 text-sm font-400">
                              Superhost
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full flex flex-col gap-2">
                  <p className="text-xl font-semibold">Price details</p>
                  <div className="flex justify-between">
                    <p className="">
                      ${home.price} x {calculateNights(checkDates)} nights
                    </p>
                    <p>${home.price * calculateNights(checkDates)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="underline">Cleaning fee</p>
                    <p>${CleaningFee}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="underline">Airbnb service fee</p>
                    <p>${AirbnbServiceFee}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="underline">Taxes</p>
                    <p>${Texas}</p>
                  </div>
                  <hr className="mt-2" />
                  <div className="flex justify-between font-semibold mt-2">
                    <p>Total</p>
                    <p>
                      $
                      {home.price * calculateNights(checkDates) +
                        CleaningFee +
                        AirbnbServiceFee +
                        Texas}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
