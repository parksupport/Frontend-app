import React from "react";
import Button from "./Buttons";
import { useRouter } from "next/navigation";

interface NotificationBoxProps {
  isSuccess: boolean;
  message: string;
}

export default function NotificationBox({
  isSuccess,
  message,
}: NotificationBoxProps) {
  const router = useRouter();
  return (
    <div>
      <div
        className={`w-[280px] h-[120px] ${
          isSuccess
            ? "bg-green-100 border-green-300"
            : "bg-red-100 border-red-300"
        } border rounded-[6px] flex flex-col justify-between  relative`}
      >
        <p
          className={`${
            isSuccess ? "text-green-600" : "text-red-600"
          } p-4 text-[15px]`}
        >
          {message}
          <span
            className={`${
              isSuccess ? "text-green-800" : "text-red-800"
            } font-semibold`}
          >
            {" "}
            sign in{" "}
          </span>
          to get instant notifications
        </p>
        <div className="absolute top-[56px] right-[24px]">
          <Button
            type="button"
            className="rounded-[0.75rem] whitespace-nowrap h-[2.5rem] py-0 px-[23px]"
            variant="primary"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
