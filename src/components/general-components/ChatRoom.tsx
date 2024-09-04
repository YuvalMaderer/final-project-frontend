import { getChatroomByUserId, getChatroomDetailsById } from "@/lib/http";
import { useAuth } from "@/providers/user.context";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Avatar } from "../ui/avatar";
import { useState } from "react";

// Define types if using TypeScript
type Participant = {
  _id: string;
  firstName: string;
  lastName: string;
};

type LastMessage = {
  createdAt: string;
  message: string;
  sender: string;
};

type ChatroomDetails = {
  participants: Participant[];
  lastMessage: LastMessage;
};

function ChatRoom() {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.user._id;
  const [selectedChatroomId, setSelectedChatroomId] = useState<
    string | null | undefined
  >(null);

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
    return <div>Error loading chatrooms: {isErrorChatrooms}</div>;

  const isLoadingDetails = chatroomQueries.some((query) => query.isLoading);
  const isErrorDetails = chatroomQueries.some((query) => query.isError);

  if (isLoadingDetails) return <div>Loading chatroom details...</div>;
  if (isErrorDetails) return <div>Error loading chatroom details</div>;

  return (
    <div className="font-montserrat font-[530]">
      <ul className="space-y-1">
        {chatroomQueries.map((query, index) => {
          const chatroomDetails = query.data as ChatroomDetails;
          const roomId = chatroomIds?.[index];

          // Find the other participant
          const otherParticipant = chatroomDetails?.participants.find(
            (participant) => participant._id !== userId
          );

          if (!otherParticipant) return null;

          const date = new Date(chatroomDetails.lastMessage.createdAt);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;

          return (
            <div
              key={roomId}
              className={`text-[#6A6A6A] w-[270px] hover:bg-[#F7F7F7] p-4 rounded-xl ${
                selectedChatroomId === roomId ? "bg-[#F7F7F7]" : ""
              }`}
              onClick={() => setSelectedChatroomId(roomId)}
            >
              <Link to={`${roomId}`}>
                <div className="flex text-[13px] items-center">
                  <div>
                    <Avatar className="text-2xl mr-3 bg-[#6A6A6A] text-white flex justify-center items-center">
                      {otherParticipant.firstName[0]}
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex justify-between items-center w-48">
                      {`${otherParticipant.firstName} ${otherParticipant.lastName}`}
                      <span>{formattedDate}</span>
                    </div>
                    {userId === chatroomDetails.lastMessage.sender
                      ? `You: ${
                          chatroomDetails.lastMessage.message.length > 20
                            ? `${chatroomDetails.lastMessage.message.slice(
                                0,
                                20
                              )}...`
                            : chatroomDetails.lastMessage.message
                        }`
                      : `${otherParticipant.firstName}: ${
                          chatroomDetails.lastMessage.message.length > 20
                            ? `${chatroomDetails.lastMessage.message.slice(
                                0,
                                20
                              )}...`
                            : chatroomDetails.lastMessage.message
                        }`}
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
