import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteNotification,
  fetchNotifications,
  queryClient,
} from "@/lib/http";
import { INotification } from "@/types";
import { useAuth } from "@/providers/user.context";
import notificationlogo from "../assets/airbnb-notification.png";
import { X } from "lucide-react";

const NotificationPage: React.FC = () => {
  const { loggedInUser } = useAuth();

  // Safely get the user ID
  const userId = loggedInUser?.user._id;

  // Fetch notifications using the object format for useQuery
  const { data: notifications, isLoading } = useQuery<INotification[], Error>({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId as string),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
    onSuccess: () => {
      // Invalidate and refetch notifications after deletion
      queryClient.invalidateQueries(["notifications", userId]);
    },
    onError: (err) => {
      console.error("Error deleting notification:", err);
    },
  });

  if (isLoading)
    return <div className="text-center">Loading notifications...</div>;

  return (
    <div className="flex justify-center items-center  p-4">
      <div className=" p-6  w-[50%]">
        <h1 className="text-4xl font-semibold mb-10">Notifications</h1>
        {notifications && notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className="flex items-start  gap-4 py-4"
              >
                <img
                  className="w-14 h-14 rounded-full"
                  src={notificationlogo}
                  alt="notification logo"
                />
                <div className="flex">
                  <div className="flex-1 flex flex-col">
                    <p className="font-semibold text-sm">
                      {notification.message}
                    </p>
                    <small className="text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </div>
                  <button
                    onClick={() => mutation.mutate(notification._id)}
                    className=""
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You're all caught up</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
