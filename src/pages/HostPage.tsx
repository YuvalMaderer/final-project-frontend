import PendingReservation from "@/components/host/PendingReservation";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  getAllHostReservations,
  queryClient,
  updateReservationStatus,
} from "@/lib/http";
import { useAuth } from "@/providers/user.context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import ReservationsList from "@/components/host/ReservationsList";
import NotHaveReservaions from "@/components/host/NotHaveReservaions";
import Modal from "@/components/general-components/LoginModalComponent";

type selectedReservations =
  | "Checking out"
  | "Currently hosting"
  | "Arriving soon"
  | "Upcoming"
  | "Pending";

export type PopulateReservationResponse = {
  _id: string;
  user: {
    firstName: string;
    _id: string;
  };
  host: string;
  home: {
    name: string;
    _id: string;
  };
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
};

function HostPage() {
  let content = <NotHaveReservaions />;
  const { loggedInUser } = useAuth();
  const [selected, setSelected] = useState<selectedReservations>();
  const [isModalOpen, setModalOpen] = useState(true);
  useEffect(() => {
    if (loggedInUser) {
      setModalOpen(false);
    }
  }, [loggedInUser]);

  //get all host reservations using react query
  const {
    data: reservations,
    error: reservationsError,
    isLoading: reservationsLoading,
  } = useQuery<PopulateReservationResponse[]>({
    queryKey: ["reservations"],
    queryFn: () => getAllHostReservations(),
  });

  //update reservation status using react query
  const mutation = useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: string;
      status: string;
    }) => updateReservationStatus(reservationId, status),
    onSuccess: (_, variables) => {
      let descriptionMessage = "";

      switch (variables.status) {
        case "confirmed":
          descriptionMessage =
            "The reservation has been successfully confirmed!";
          break;
        case "canceled":
          descriptionMessage = "The reservation has been canceled.";
          break;
        default:
          descriptionMessage = "The reservation status has been updated.";
      }

      toast({
        title: "Reservation status",
        description: descriptionMessage,
      });

      // Invalidate the specific query by its key
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
    onError: (error) => {
      console.error("Error while updating reservation status:", error);
      toast({
        title: "Error",
        description:
          "There was an issue updating the reservation status. Please try again.",
      });
    },
  });

  function handleReservationStatusUpdate(
    reservationId: string,
    status: string
  ) {
    mutation.mutate({ reservationId: reservationId, status: status });
  }

  if (reservationsLoading) {
    content = <div>...Loading</div>;
  }
  if (reservationsError) {
    const errorStatus = (reservationsError as any).status;

    if (errorStatus === 404) {
      content = <div>You currently don’t have any reservations</div>;
    } else {
      content = <div>Error, please try again</div>;
    }
  }
  if (reservations && reservations.length === 0) {
    content = <div>no reservation found</div>;
  }

  /////show reservation type///////
  if (reservations && selected === "Pending") {
    content = (
      <PendingReservation
        reservations={reservations}
        handleReservationStatusUpdate={handleReservationStatusUpdate}
      />
    );
  } else if (reservations && selected === "Upcoming") {
    // Filter confirmed reservations
    const confirmedReservations = reservations.filter(
      (reservation) => reservation.status === "confirmed"
    );
    content = <ReservationsList reservations={confirmedReservations} />;
  } else if (reservations && selected === "Arriving soon") {
    const arrivingSoonReservations = reservations!.filter((reservation) => {
      const today = new Date();
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0); // Set time to midnight

      const reservationStartDate = new Date(reservation.startDate);
      reservationStartDate.setHours(0, 0, 0, 0); // Set time to midnight

      // Check if the reservation start date is the next day
      return (
        reservation.status === "confirmed" &&
        reservationStartDate.getTime() === nextDay.getTime()
      );
    });
    content = <ReservationsList reservations={arrivingSoonReservations} />;
  } else if (reservations && selected === "Currently hosting") {
    const currentlyHostingReservations = reservations!.filter((reservation) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight

      const reservationStartDate = new Date(reservation.startDate);
      reservationStartDate.setHours(0, 0, 0, 0); // Set time to midnight

      const reservationEndDate = new Date(reservation.endDate);
      reservationEndDate.setHours(0, 0, 0, 0); // Set time to midnight

      // Check if today is after the start date and before the end date
      return (
        reservation.status === "confirmed" &&
        today >= reservationStartDate && // After the start date
        today <= reservationEndDate // Before the end date
      );
    });

    content = <ReservationsList reservations={currentlyHostingReservations} />;
  } else if (reservations && selected === "Checking out") {
    const checkingOutTodayReservations = reservations!.filter((reservation) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight

      const reservationEndDate = new Date(reservation.endDate);
      reservationEndDate.setHours(0, 0, 0, 0); // Set time to midnight

      // Check if today is the checkout day
      return (
        reservation.status === "confirmed" &&
        today.getTime() === reservationEndDate.getTime() // Today is the checkout day
      );
    });
    content = <ReservationsList reservations={checkingOutTodayReservations} />;
  }
  return (
    <div className="p-28">
      <h1 className="text-3xl font-500 mb-10 ">
        Welcome back, {loggedInUser?.user.firstName}
      </h1>

      <section>
        {reservations ? (
          <h2 className="text-2xl font-500 py-8">
            Your reservations ({reservations.length})
          </h2>
        ) : (
          <h2 className="text-2xl font-500 py-8">Your reservations (0)</h2>
        )}

        <div className="space-x-2">
          <Button
            onClick={() => setSelected("Checking out")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Checking out
          </Button>
          <Button
            onClick={() => setSelected("Currently hosting")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Currently hosting
          </Button>
          <Button
            onClick={() => setSelected("Arriving soon")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Arriving soon
          </Button>
          <Button
            onClick={() => setSelected("Upcoming")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Upcoming
          </Button>
          <Button
            onClick={() => setSelected("Pending")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Pending
          </Button>
        </div>
        {content}
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen} />
    </div>
  );
}

export default HostPage;
