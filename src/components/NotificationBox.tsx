import React from "react";
import Button from "./Buttons";
import { useRouter } from "next/navigation";
import { groteskText } from "@/app/fonts";

interface NotificationBoxProps {
  hasTicket: boolean;
  position?: any;
  signUp?: () => void;
}

export default function NotificationBox({
  hasTicket,
  position = { right: 0, top: 0 },
  signUp
}: NotificationBoxProps) {
  const router = useRouter();
  return (
    <div>
      <div
        className={` ${groteskText.className} absolute z-10 w-[270px] h-[128px] ${
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
         {NotificationMessage({ hasTicket, signUp })}

        
        </p>
        <div className="absolute top-[65px] right-[24px]">
          <Button
            type="button"
            className="rounded-[12px] whitespace-nowrap h-[2.5rem] py-0 px-[23px]"
            variant="primary"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}



const NotificationMessage = ({ hasTicket, signUp }) => (
  <div>
    {hasTicket ? (
      <p>
        Oops! Looks like you’ve got a parking ticket.{' '}
        <a href="#" onClick={() => signUp()} style={{ textDecoration: 'none', color: 'red-900', cursor: 'pointer' }}>
          Sign up
        </a>{' '}
        now to see all the details and stay in the loop for future updates.
      </p>
    ) : (
      <p>
        Phew, no ticket this time! Want to keep it that way?{' '}
        <a href="#" onClick={() => signUp()} style={{ textDecoration: 'none', color: 'green', cursor: 'pointer' }}>
          Sign up
        </a>{' '}
        to get instant notifications if you do get one in the future.
      </p>
    )}
  </div>
);

