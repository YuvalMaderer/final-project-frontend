import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getChatHistory, sendMessage } from "@/lib/http";
import { useAuth } from "@/providers/user.context";

function ChatRoomPage() {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const { loggedInUser } = useAuth();
  const senderId = loggedInUser?.user._id;

  const {
    data: RoomChat,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chatroom", roomId],
    queryFn: () => getChatHistory(roomId),
    enabled: !!roomId,
  });

  const mutation = useMutation({
    mutationFn: () => sendMessage(roomId, senderId, message),
    onSuccess: () => {
      setMessage(""); // Clear input field after sending
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim()) {
      mutation.mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;

  // Find the other participant
  const otherParticipant = RoomChat.participants.find(
    (participant) => participant._id !== senderId
  );

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-md mb-4">
        {RoomChat?.messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-4 p-3 rounded-lg max-w-md ${
              msg.sender === senderId
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            <p className="font-semibold">
              {msg.sender === senderId
                ? "You"
                : `${otherParticipant?.firstName} ${otherParticipant?.lastName}`}
            </p>
            <p>{msg.message}</p>
            <p className="text-sm text-gray-500 text-right">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-1 p-2 border border-gray-300 rounded-l-md"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md disabled:bg-gray-400"
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ChatRoomPage;
