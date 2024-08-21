import { Globe, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function HeaderComponent() {
  return (
    <nav className="flex justify-between items-center">
      <img
        src="src/assets/airbnb-logo.webp"
        alt="logo"
        className="w-[110px] h-[63px]"
      />
      <div className="flex gap-4">
        <a href="" className="font-bold">
          Stays
        </a>
        <a href="">Experiences</a>
      </div>
      <div className="flex items-center">
        <a href="" className="font-bold">
          Airbnb your home
        </a>
        <Globe />
        <div className="flex items-center">
          <Menu />
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
