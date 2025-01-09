
import { groteskText } from '@/app/fonts';
import { ReactNode } from 'react';
import Select, { SingleValue } from 'react-select';



interface DropdownInputFieldProps {
  label: string;
  placeholder?: string;
  className?: string;
  icon?: ReactNode | (() => ReactNode);
  options: { value: string; label: string }[];
  selectedValue?: string;

  // Adjusted to handle react-select's option type
  onChange: (selected: SingleValue<{ value: string; label: string }>) => void;
}

const DropdownInputField = ({
  options,
  label,
  onChange,
  selectedValue,
  placeholder,
  className,
  icon,
}: DropdownInputFieldProps) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '6px',
      borderColor: '#D0D5DD',
      padding: '8px',
      boxShadow: state.isFocused ? 'none' : provided.boxShadow,
      "&:hover": {
        borderColor: '#D0D5DD',
      },
    }),
    option: (provided) => ({
      ...provided,
      borderRadius: '6px',
      padding: '10px 15px',
      // fontFamily: `${groteskText.className}`,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '6px',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '15px', 
      color: '#667185', 
      // fontFamily: `${groteskText.className}`,
    }),
  };

  return (
    <div className={` ${className}`}>

      {label && (
        <label className={`${groteskText.className} text-black text-[18px] `}>
          {label}
        </label>
      )}
      <div className={`${groteskText.className} relative`}>
        <Select
          options={options}
          styles={customStyles}
          value={options.find((option) => option.value === selectedValue)}
          onChange={(selected) => onChange(selected)}
          placeholder={placeholder}
        />
        {icon && (
          <div className="absolute right-2 bottom-4 cursor-pointer">
            {typeof icon === 'function' ? icon() : icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownInputField;

