
import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';

const DeleteRowModal = ({
  position = { right: 0, top: 0 },
  showConfirmButton = false,
  onEdit,
  onRemove,
  onCancelDelete,
  onConfirmDelete,
  selectedDataIndex,
  index,
  customStyles = ""
}) => {
  return (

      <div
        className={`rounded-[8px] bg-white absolute z-10 ${customStyles}`}
        style={position}
      >
        <div className="border border-gray-200 rounded-[8px] p-[1px]">
          <button
            className="w-full flex items-center px-[1px] py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onEdit}
          >
            <FiEdit className="mr-2" />
            Edit Nominee
          </button>
          <button
            className="w-full flex items-center px-[1px] py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={onRemove}
          >
            <FiTrash2 className="mr-2" />
            Remove Nominee
          </button>
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
