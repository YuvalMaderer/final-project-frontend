import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllUserReservations } from "@/lib/http";
import { useAuth } from "@/providers/user.context";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type selectedReservations =
  | "Checking out"
  | "Currently hosting"
  | "Arriving soon"
  | "Upcoming"
  | "Pending review";

type PopulateReservationResponse = {
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
  const { loggedInUser } = useAuth();
  const [selected, setSelected] = useState<selectedReservations>();

  const {
    data: reservations,
    error: reservationsError,
    isLoading: reservationsLoading,
  } = useQuery<PopulateReservationResponse[]>({
    queryKey: ["reservations", loggedInUser?.user._id],
    queryFn: () => getAllUserReservations(),
  });
  console.log(reservations);

  return (
    <div className="p-28">
      <h1 className="text-3xl font-500 mb-10 ">
        Welcome back, {loggedInUser?.user.firstName}
      </h1>

      <section>
        <h2 className="text-2xl font-500 py-8">Your reservations</h2>
        <div className="space-x-2">
          <Button
            onClick={() => setSelected("Checking out")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Checking out (0)
          </Button>
          <Button
            onClick={() => setSelected("Currently hosting")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Currently hosting (0)
          </Button>
          <Button
            onClick={() => setSelected("Arriving soon")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Arriving soon (0)
          </Button>
          <Button
            onClick={() => setSelected("Upcoming")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Upcoming (0)
          </Button>
          <Button
            onClick={() => setSelected("Pending review")}
            className="bg-white border-[1.5px] border-gray-300 rounded-full hover:border-black hover:bg-white p-2"
          >
            Pending review (0)
          </Button>
        </div>
        {selected === "Pending review" && (
          <div className="grid grid-cols-4 max-w-[80%] gap-4 py-6 ">
            {reservations!
              .filter((reservation) => reservation.status === "pending")
              .map((filteredReservation) => (
                <div key={filteredReservation._id} className="mb-4 ">
                  <Card className="w-[8 0%] ">
                    <CardHeader>
                      {filteredReservation.home.name.length > 15 ? (
                        <CardTitle>
                          {filteredReservation.home.name.substring(0, 15)}...
                        </CardTitle>
                      ) : (
                        <CardTitle>{filteredReservation.home.name}</CardTitle>
                      )}

                      <CardDescription>
                        Reservation by {filteredReservation.user.firstName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Dates:{" "}
                        {new Date(
                          filteredReservation.startDate
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(
                          filteredReservation.endDate
                        ).toLocaleDateString()}
                      </p>
                      <p>Total Price: ${filteredReservation.totalPrice}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Decline</Button>
                      <Button variant={"new"}>Confirm</Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HostPage;
