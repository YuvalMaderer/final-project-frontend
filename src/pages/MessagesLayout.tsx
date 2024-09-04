import ChatRoom from "@/components/general-components/ChatRoom";
import { Outlet } from "react-router-dom";

function MessagesLayout() {
  return (
    <>
      <div className="flex font-montserrat">
        <div className="h-full p-8 text-xl font-600 pl-10 w-1/4">
          <h1>Messages</h1>
          <ChatRoom />
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MessagesLayout;
