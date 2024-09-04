import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  fetchNotifications,
  updateNotificationReadStatus,
} from "@/lib/http";
import { INotification } from "@/types";
import { useAuth } from "@/providers/user.context";
import notificationlogo from "../assets/airbnb-notification.png";
import { X } from "lucide-react";

const NotificationPage: React.FC = () => {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.user._id;
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    error: fetchError,
    refetch,
  } = useQuery<INotification[], Error>({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId as string),
    enabled: !!userId,
  });

  const updateNotificationMutation = useMutation({
    mutationFn: (notification: INotification) =>
      updateNotificationReadStatus(notification._id, true),
    onSuccess: () => {
      // Refetch notifications after updating
      refetch();
    },
    onError: (err) => {
      console.error("Error updating notification read status:", err);
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
    onSuccess: () => {
      // Invalidate and refetch notifications after deletion
      queryClient.invalidateQueries(["notifications", userId]);
    },
    onError: (err) => {
      console.error("Error deleting notification:", err);
    },
  });

  useEffect(() => {
    // Update unread notifications to read
    if (notifications) {
      const unreadNotifications = notifications.filter(
        (notification) => !notification.read
      );
      if (unreadNotifications.length > 0) {
        unreadNotifications.forEach((notification) =>
          updateNotificationMutation.mutateAsync(notification)
        );
      }
    }
  }, [notifications, updateNotificationMutation]);

  if (isLoading)
    return <div className="text-center">Loading notifications...</div>;
  if (fetchError)
    return (
      <div className="text-center">
        Error fetching notifications: {fetchError.message}
      </div>
    );

  return (
    <div className="flex justify-center items-center p-4">
      <div className="p-6 w-[50%]">
        <h1 className="text-4xl font-semibold mb-10">Notifications</h1>
        {notifications && notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications
              .slice() // Create a copy of the array
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              ) // Sort by date in descending order
              .map((notification) => (
                <li
                  key={notification._id}
                  className={`flex items-start gap-4 py-4 ${
                    notification.read ? "" : "bg-gray-100"
                  } rounded-lg shadow-sm`}
                >
                  <img
                    className="ml-6 w-14 h-14 rounded-full"
                    src={notificationlogo}
                    alt="notification logo"
                  />
                  <div className="flex">
                    <div className="flex-1 flex flex-col">
                      <p
                        className={`font-semibold text-sm ${
                          notification.read ? "text-gray-500" : "text-black"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <small className="text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </small>
                    </div>
                    <button
                      onClick={() =>
                        deleteNotificationMutation.mutate(notification._id)
                      }
                      className="ml-4"
                    >
                      <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
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
