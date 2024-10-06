import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'tertiary' | 'quaternary' | 'quinary';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button' || 'submit' || 'reset',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  loading = false,
}) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50';

  const variantStyles: Record<Variant, string> = {
    primary: 'bg-[#3957D7] max-w-[400px] w-full px-[16px] py-[16px] rounded-[6px] border-none text-white focus:bg-[#3957D7] active:bg-[#3957D7] justify-center flex"',
    secondary: 'bg-gray-500 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-500 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-500 text-white hover:bg-red-700 focus:ring-red-500',
    tertiary: 'bg-yellow-500 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    quaternary: 'bg-purple-500 text-white hover:bg-purple-700 focus:ring-purple-500',
    quinary: 'bg-pink-500 text-white hover:bg-pink-700 focus:ring-pink-500',
  };

  const textStyles: Record<Variant, string> = {
    primary: 'text-white text-[18px]',
    secondary: 'text-white',
    success: 'text-white',
    danger: 'text-white',
    tertiary: 'text-white',
    quaternary: 'text-white',
    quinary: 'text-white',
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
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      <span className={textStyle}>{children}</span>
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
};

export default Button;

