// // import { groteskText } from "@/app/fonts";
// // import React, { ReactNode } from "react";

// // interface DropdownInputFieldProps {
// //   type: string;

// //   label: string;

// //   className?: string;
// //   value: string;
// //   name: string;
// //   icon?: ReactNode | (() => ReactNode);
// //   options: { value: string; label: string }[];
// //   seletedValue?: string;

// //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // }

// // const DropdownInputField = ({
// //   options,
// //   label,
// //   onChange,
// //   selectedValue,
// //   className,
// //   icon,
// // }: DropdownInputFieldProps) => {
// //   const renderIcon = () => {
// //     if (typeof icon === "function") {
// //       return icon();
// //     }
// //     return icon;
// //   };
// //   return (
// //     <div className={` ${className}`}>
// //       {label && (
// //         <label
// //           className={`text-[#000000] text-[16px] ${groteskText.className} lg`}
// //         >
// //           {label}
// //         </label>
// //       )}
// //       <div className="relative">
// //         <select
// //           className="w-full h-full px-[16px] py-[16px] rounded-[6px] mt-[4px] border-[#D0D5DD] border-solid border text-[#667185] text-[14px] focus:outline-none appearance-none bg-white"
// //           onChange={onChange}
// //           value={selectedValue}
// //         >
// //           {options.map((option, index) => (
// //             <option
// //               key={index}
// //               value={option.value}
// //               className="bg-red-400 "
// //             >
// //               {/* {option.label} */}
// //               fgfgfgf
// //             </option>
// //           ))}
// //         </select>

// //         {icon && (
// //           <div className="absolute right-2 bottom-4 cursor-pointer">
// //             {renderIcon()}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DropdownInputField;


// import { groteskText } from "@/app/fonts";
// import React, { ReactNode } from "react";

// interface DropdownInputFieldProps {
//   type: string;
//   label: string;
//   className?: string;
//   value: string;
//   name: string;
//   icon?: ReactNode | (() => ReactNode);
//   options: { value: string; label: string }[];
//   selectedValue?: string;
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const DropdownInputField = ({
//   options,
//   label,
//   onChange,
//   selectedValue,
//   className,
//   icon,
// }: DropdownInputFieldProps) => {
//   const renderIcon = () => {
//     if (typeof icon === "function") {
//       return icon();
//     }
//     return icon;
//   };
  
//   return (
//     <div className={` ${className}`}>
//       {label && (
//         <label
//           className={`text-[#000000] text-[16px] ${groteskText.className} lg`}
//         >
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <select
//           className="w-full h-full px-[16px] py-[16px] rounded-[6px] mt-[4px] border-[#D0D5DD] border-solid border text-[#667185] text-[14px] focus:outline-none appearance-none bg-white"
//           onChange={onChange}
//           value={selectedValue}
//         >
//           <option value="" disabled className="text-gray-400  ">
//             Select an option
//           </option>
//           {options.map((option, index) => (
//             <option
//               key={index}
//               value={option.value}
//               className="text-gray-700 bg-white hover:bg-gray-100 appearance-none"
//             >
//               {option.label}
//             </option>
//           ))}
//         </select>

//         {icon && (
//           <div className="absolute right-2 bottom-4 cursor-pointer">
//             {renderIcon()}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DropdownInputField;
import { ReactNode } from 'react';
import { PiPlaceholder } from 'react-icons/pi';
import Select from 'react-select';


interface DropdownInputFieldProps {
  label: string;
  placeholder?:string;
  className?: string;
  value: string;
  name: string;
  icon?: ReactNode | (() => ReactNode);
  options: { value: string; label: string }[];
  selectedValue?: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropdownInputField = ({ options, label, onChange, selectedValue,placeholder, className, icon }:DropdownInputFieldProps) => {
  const customStyles = {
    control: (provided,state) => ({
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
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '6px',
    }),
  };

  return (
    <div className={` ${className}`}>
      {label && (
        <label className="text-[#000000] text-[16px]">
          {label}
        </label>
      )}
      <div className="relative">
        <Select
          options={options}
          styles={customStyles}
          value={options.find(option => option.value === selectedValue)}
          onChange={(selected) => onChange({ target: { value: selected.value } })}
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
