import { Globe, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "./LoginModalComponent";
import { useState } from "react";
import { useAuth } from "@/providers/user.context";

function HeaderComponent() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { loggedInUser, logout } = useAuth(); // Assuming useAuth returns the user object directly.

  return (
    <>
      <div>
        <nav className="flex justify-between items-center p-3 px-8">
          <Link to="/">
            <img
              src="src/assets/airbnb-logo.webp"
              alt="logo"
              className="w-[105px] h-[60px]"
            />
          </Link>
          <div className="flex gap-6 ml-40">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Stays
            </NavLink>
            <NavLink
              to="/experiences"
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Experiences
            </NavLink>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/airbnb-your-home" className="font-600 text-sm">
              Airbnb your home
            </Link>
            <Globe className="w-4 h-4" />
            <div className="flex items-center border border-grey-300 rounded-full p-3 gap-4 hover:shadow-lg">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2">
                  <Menu className="w-4 h-4 self-center" />
                  <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 relative top-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="relative right-12 top-4 w-60 flex flex-col gap-2">
                  {loggedInUser ? (
                    <>
                      <DropdownMenuItem>Messages</DropdownMenuItem>
                      <DropdownMenuItem>Trips</DropdownMenuItem>
                      <DropdownMenuItem>Wishlists</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
                      <DropdownMenuItem>Refer a host</DropdownMenuItem>
                      <DropdownMenuItem>Account</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Gift cars</DropdownMenuItem>
                      <DropdownMenuItem>Help center</DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        className="font-bold"
                        onClick={() => setModalOpen(true)}
                      >
                        Log in
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setModalOpen(true)}>
                        Sign up
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Gift cards</DropdownMenuItem>
                      <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
                      <DropdownMenuItem>Help center</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
        <SearchBar />
        <hr className="my-6" />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default HeaderComponent;
