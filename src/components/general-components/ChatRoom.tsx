import { getChatroomByUserId, getChatroomDetailsById } from "@/lib/http";
import { useAuth } from "@/providers/user.context";
import { useQueries, useQuery } from "@tanstack/react-query"; // React Query imports
import { Link } from "react-router-dom";
import { Avatar } from "../ui/avatar";

function ChatRoom() {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.user._id;

  // Fetch the chatroom IDs
  const {
    data: chatroomIds,
    isLoading: isLoadingChatrooms,
    isError: isErrorChatrooms,
  } = useQuery<string[]>({
    queryKey: ["chatrooms"],
    queryFn: () => getChatroomByUserId(userId),
    enabled: !!userId,
  });

  // Fetch the details for each chatroom ID
  const chatroomQueries = useQueries({
    queries: (chatroomIds ?? []).map((roomId) => ({
      queryKey: ["chatroomDetails", roomId],
      queryFn: () => getChatroomDetailsById(roomId),
      enabled: !!roomId,
    })),
  });

  if (isLoadingChatrooms) return <div>Loading chatrooms...</div>;
  if (isErrorChatrooms)
    return <div>Error loading chatrooms: {isErrorChatrooms.message}</div>;

  const isLoadingDetails = chatroomQueries.some((query) => query.isLoading);
  const isErrorDetails = chatroomQueries.some((query) => query.isError);

  if (isLoadingDetails) return <div>Loading chatroom details...</div>;
  if (isErrorDetails) return <div>Error loading chatroom details</div>;

  return (
    <div className="w-[60%] font-montserrat font-[530]">
      <ul>
        {chatroomQueries.map((query, index) => {
          const chatroomDetails = query.data;
          const roomId = chatroomIds?.[index];

          // Find the other participant
          const otherParticipant = chatroomDetails?.participants.find(
            (participant) => participant._id !== userId
          );

          const date = new Date(chatroomDetails.lastMessage.createdAt);
          const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
          const year = date.getFullYear(); // Get full year
          const formattedDate = `${day}/${month}/${year}`;

          if (!otherParticipant) return null;
          return (
            <div
              key={roomId}
              className="text-[#6A6A6A] w-[270px] bg-[#F7F7F7] p-4 rounded-lg"
            >
              <Link to={`${roomId}`}>
                <div className="flex text-[13px] justify-between items-center">
                  <div>
                    <Avatar className="text-2xl bg-[#6A6A6A] text-white flex justify-center items-center">
                      {otherParticipant.firstName[0]}
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      {`${otherParticipant.firstName} ${otherParticipant.lastName}`}
                      <span>{formattedDate}</span>
                    </div>
                    {userId === chatroomDetails.lastMessage.sender
                      ? `You: ${chatroomDetails.lastMessage.message}`
                      : `${otherParticipant.firstName}: ${chatroomDetails.lastMessage.message}`}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default ChatRoom;
