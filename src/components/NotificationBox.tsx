import React from "react";
import Button from "./Buttons";
import { useRouter } from "next/navigation";
import { groteskText } from "@/app/fonts";
import { useAuthStore } from "@/lib/stores/authStore";

interface NotificationBoxProps {
  hasTicket: boolean;
  position?: any;
  onClick?: () => void;
}

export default function NotificationBox({
  hasTicket,
  position = { right: 0, top: 0 },
  onClick,
}: NotificationBoxProps) {
  const isAuthenticated = useAuthStore((state) => state.token !== null);
  return (
    <div>
      <div
        className={` ${
          groteskText.className
        } absolute z-10 w-[270px] h-[128px] ${
          !hasTicket
            ? "bg-green-100 border-green-300"
            : "bg-red-100 border-red-300"
        } border rounded-[6px]  flex flex-col justify-between  relative`}
        style={position}
      >
        <p
          className={`${
            !hasTicket ? "text-green-600" : "text-red-600"
          } px-2 py-3 text-[15px]`}
        >
          {NotificationMessage({ hasTicket, onClick, isAuthenticated })}
        </p>
        <div className={`absolute top-[65px] right-[24px]`}>
          <Button
            onClick={onClick}
            type="button"
            className="rounded-[12px] whitespace-nowrap h-[2.5rem] py-0 px-[23px]"
            variant="primary"
          >
           {isAuthenticated ? "Subscribe" : " Sign up"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const NotificationMessage = ({ hasTicket, onClick, isAuthenticated }) => (
  <div className={`${groteskText.className}  ${isAuthenticated ?"text-[13px]": "text-[15px]" }`}>
    {hasTicket ? (
      <p>
        Oops! Looks like you’ve got a parking ticket.{" "}
        <a
          href="#"
          onClick={onClick}
          style={{
            textDecoration: "none",
            color: "red-900",
            cursor: "pointer",
          }}
        >
          {isAuthenticated ? "Subscribe" : " Sign up"}
        </a>{" "}
        now to see all the details and stay in the loop for future updates.
      </p>
    ) : (
      <p>
        Phew, no ticket this time! Want to keep it that way?{" "}
        <a
          href="#"
          onClick={onClick}
          style={{ textDecoration: "none", color: "green", cursor: "pointer" }}
        >
         {isAuthenticated ? "Subscribe" : " Sign up"}
        </a>{" "}
        to get instant notifications if you do get one in the future.
      </p>
    )}
  </div>
);
