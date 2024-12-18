import React, { useEffect, useRef } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { groteskText } from "@/app/fonts";
import { Plus } from "lucide-react";

interface DeleteRowModalProps {
  position?: { right: number; top: number };
  showConfirmButton?: boolean;
  onEdit?: () => void;
  onRemove?: () => void;
  onCancelDelete?: () => void;
  onConfirmDelete?: () => void;
  selectedDataIndex?: number;
  index?: number;
  customStyles?: string;
  removeAddButton?: boolean;
  isVehicle?: boolean;
  onAddNominee?: () => void;
  expiredLease?: boolean;
  onClose?: () => void; // New prop to handle modal close
}

const DeleteRowModal = ({
  position = { right: 0, top: 0 },
  showConfirmButton = false,
  onEdit,
  onRemove,
  onCancelDelete,
  onConfirmDelete,
  selectedDataIndex,
  index,
  customStyles = "",
  removeAddButton = false,
  isVehicle = false,
  expiredLease,
  onAddNominee,
  onClose, // Handle closing the modal
}: DeleteRowModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose?.(); // Call the onClose function to close and reset the modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`rounded-[8px] bg-white absolute z-10 ${customStyles}`}
      style={position}
      ref={modalRef} // Attach the ref to the modal container
    >
      <div className="border shadow-lg border-gray-200 rounded-[8px] p-[1px]">
        {!removeAddButton && (
          <button
            className={`w-full flex items-center px-[1px] py-2 text-[14px] text-black hover:bg-gray-100 ${groteskText.className}`}
            onClick={onAddNominee}
          >
            <Plus className="mr-2" />
            Add Nominee
          </button>
        )}
        {isVehicle ? (
          <button
            className={`w-full flex items-center px-[1px] py-2 text-[14px] text-red-600 hover:bg-gray-100  ${groteskText.className}`}
            onClick={onRemove}
          >
            <FiTrash2 className="mr-2" />
            Remove Vehicle
          </button>
        ) : (
          <button
            className={`w-full flex items-center px-[1px] py-2 text-[14px] ${
              expiredLease
                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                : "text-red-600 hover:bg-gray-100"
            } ${groteskText.className}`}
            onClick={onRemove}
            disabled={expiredLease}
          >
            <FiTrash2 className="mr-2" />
            End Nomination
          </button>
        )}
      </div>
      {showConfirmButton && selectedDataIndex === index && (
        <div className="flex justify-between gap-2 mt-1">
          <button
            className="bg-white border border-gray-200 rounded-[8px] p-1 text-red-600 hover:bg-gray-100"
            onClick={onCancelDelete}
          >
            <MdClose size={25} />
          </button>
          <button
            className="bg-white border border-gray-200 rounded-[8px] p-1 text-green-700 hover:bg-gray-100"
            onClick={onConfirmDelete}
          >
            <IoMdCheckmark size={25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteRowModal;
