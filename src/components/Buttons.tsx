import React, { ReactNode } from "react";
import { groteskText, groteskTextMedium } from "@/app/fonts";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "tertiary"
  | "quaternary"
  | "quinary"
  | "link";

type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactElement;
  style?: React.CSSProperties;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  loading = false,
  icon,
  iconPosition = "left",
  style,
}) => {
  const baseStyles =
    "rounded focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const variantStyles: Record<Variant, string> = {
    primary:
      "bg-[#3957D7] mt-[16px] max-w-[400px] w-full px-[16px] py-[16px] rounded-[6px] border-solid text-white focus:bg-[#3957D7] items-center active:bg-[#3957D7] justify-center flex hover:bg-[#6a85e6] transition duration-200 ease-in-out",
    secondary:
      "bg-white mt-[16px] max-w-[400px] w-full px-[16px] py-[10px] rounded-[6px] border-[#98A2B3] border-solid border items-center",
    success:
      "bg-green-500 text-white hover:bg-green-700 focus:ring-green-500 px-[16px] py-[14px]",
    danger:
      "bg-red-500 text-white hover:bg-red-700 focus:ring-red-500 px-[16px] py-[14px]",
    tertiary:
      "bg-yellow-500 text-white hover:bg-yellow-700 focus:ring-yellow-500 px-[16px] py-[14px]",
    quaternary:
      "bg-purple-500 text-white hover:bg-purple-700 focus:ring-purple-500 px-[16px] py-[14px]",
    quinary: "bg-[#3957D7] text-white cursor-pointer rounded-[8px] px-[16px] py-[14px]",
    link: "bg-transparent ",
  };

  const textStyles: Record<Variant, string> = {
    primary: `text-white text-base lg:text-lg ${groteskText.className} pb-1`,
    secondary: `text-black text-base lg:text-lg ${groteskText.className} pb-1`,
    success: "text-white",
    danger: "text-white",
    tertiary: "text-white",
    quaternary: `text-white ${groteskText.className}`,
    quinary: `text-white flex items-center text-[16px] ${groteskText.className}`,
    link: `  ${groteskText.className}`,
  };

  const buttonStyle = variantStyles[variant];
  const textStyle = textStyles[variant];

  const classes = `
    ${baseStyles}
    ${buttonStyle}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
      style={style}
      aria-busy={loading}
      aria-disabled={disabled || loading}
    >
      <div className="flex items-center justify-center">
        {loading ? (
          <div
            className="loader h-5 w-5 border-2 border-t-2 border-white border-opacity-50 rounded-full animate-spin"
            role="status"
            aria-label="loading"
          ></div>
        ) : (
          <>
            {iconPosition === "left" && icon && (
              <span className="mr-2">{icon}</span>
            )}
            <span className={textStyle}>{children}</span>
            {iconPosition === "right" && icon && (
              <span className="ml-2">{icon}</span>
            )}
          </>
        )}
      </div>
    </button>
  );
};

export default Button;
