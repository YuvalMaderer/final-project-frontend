import { Globe } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="px-24 flex justify-between items-center p-4 bg-gray-50 border-t border-gray-300 text-[0.95rem] h-16 font-500 mt-6">
      <div className="flex items-center space-x-2">
        <span>© 2024 Airbnb, Inc.</span>
        <span>·</span>
        <p className="hover:underline">Terms</p>
        <span>·</span>
        <p className="hover:underline">Sitemap</p>
        <span>·</span>
        <p className="hover:underline">Privacy</p>
        <span>·</span>
        <p className="hover:underline">Your Privacy Choices</p>
        <svg width="26" height="12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="25"
            height="11"
            rx="5.5"
            fill="#fff"
          ></rect>
          <path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path>
          <path
            d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5"
            stroke="#06F"
            strokeLinecap="round"
          ></path>
          <path
            d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5"
            stroke="#fff"
            strokeLinecap="round"
          ></path>
          <rect
            x="0.5"
            y="0.5"
            width="25"
            height="11"
            rx="5.5"
            stroke="#06F"
          ></rect>
        </svg>
      </div>
      <div className="flex items-center justify-center space-x-2 text-[0.9rem] gap-6">
        <span className="flex justify-center items-center gap-1">
          <Globe className="w-4 h-4" />
          <p className="">English (US)</p>
        </span>
        <span>$USD</span>
      </div>
    </footer>
  );
};

export default Footer;
