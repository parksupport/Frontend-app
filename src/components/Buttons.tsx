import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { groteskText, groteskTextMedium } from '@/app/fonts';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'tertiary' | 'quaternary' | 'quinary';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Accepts an event parameter
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  loading = false,
  icon,
  style,
}) => {
  const baseStyles = 'rounded focus:outline-none focus:ring-2 focus:ring-opacity-50';

  const variantStyles: Record<Variant, string> = {

    primary: 'bg-[#3957D7] mt-[16px] max-w-[400px] w-full px-[16px] py-[16px] rounded-[6px] border-solid text-white focus:bg-[#3957D7] items-center  active:bg-[#3957D7] justify-center flex hover:bg-[#6a85e6] transition duration-200 ease-in-out',
    secondary: 'bg-white mt-[16px] max-w-[400px] w-full px-[16px] py-[10px] rounded-[6px] border-[#98A2B3] border-solid border items-center ',

    success: 'bg-green-500 text-white hover:bg-green-700 focus:ring-green-500  px-[16px] py-[14px]',
    danger: 'bg-red-500 text-white hover:bg-red-700 focus:ring-red-500',
    tertiary: 'bg-yellow-500 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    quaternary: 'bg-purple-500 text-white hover:bg-purple-700 focus:ring-purple-500',
    quinary: 'bg-[#3957D7] text-white cursor-pointer rounded-[8px] ',
  };

  const textStyles: Record<Variant, string> = {
    primary: `text-white text-base lg:text-lg ${groteskText.className}  pb-1`,
    secondary: `text-black text-base lg:text-lg ${groteskText.className} pb-1`,
    success: 'text-white',
    danger: 'text-white',
    tertiary: 'text-white',
    quaternary: 'text-white',
    quinary: 'text-white flex items-center ',
  };

  let buttonStyle;
  let textStyle;

  switch (variant) {
    case 'primary':
      buttonStyle = loading ? variantStyles.secondary : variantStyles.primary;
      textStyle = textStyles.primary;
      break;
    case 'secondary':
      buttonStyle = variantStyles.secondary;
      textStyle = textStyles.secondary;
      break;
    case 'tertiary':
      buttonStyle = variantStyles.tertiary;
      textStyle = textStyles.tertiary;
      break;
    case 'quaternary':
      buttonStyle = variantStyles.quaternary;
      textStyle = textStyles.quaternary;
      break;
    case 'quinary':
      buttonStyle = variantStyles.quinary;
      textStyle = textStyles.quinary;
      break;
    case 'success':
      buttonStyle = variantStyles.success;
      textStyle = textStyles.success;
      break;
    case 'danger':
      buttonStyle = variantStyles.danger;
      textStyle = textStyles.danger;
      break;
    default:
      buttonStyle = loading ? variantStyles.secondary : variantStyles.primary;
      textStyle = textStyles.primary;
      break;
  }

  const classes = `
    ${baseStyles}
    ${buttonStyle}
    ${disabled ? 'opacity-50' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
      style={style}
      
    >
      <div className='flex items-center justify-center'>
      {loading ? (
          <div className="loader h-5 w-5 border-2 border-t-2 border-white border-opacity-50 rounded-full animate-spin"></div>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            <span className={textStyle}>{children}</span>
          </>
        )}
      </div>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'tertiary', 'quaternary', 'quinary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.node, 
};

export default Button;

