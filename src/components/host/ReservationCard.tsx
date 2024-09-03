import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PopulateReservationResponse } from "@/pages/HostPage";

function ReservationCard({
  filteredReservation,
}: {
  filteredReservation: PopulateReservationResponse;
}) {
  return (
    <div className="mb-4">
      <Card className="rounded-2xl">
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
            {new Date(filteredReservation.startDate).toLocaleDateString()} -{" "}
            {new Date(filteredReservation.endDate).toLocaleDateString()}
          </p>
          <p>Total Price: ${filteredReservation.totalPrice}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Additional actions or buttons can be added here if needed */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default ReservationCard;
