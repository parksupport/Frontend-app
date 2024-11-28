import { useState, useEffect } from "react";



interface useDeleteRowProps {
  openDropdownIndex: number | null;
  data?: any;
  showConfirmButton: boolean;
  selectedDataIndex: number | null;
  toggleDropdown: (index: number) => void;
  handleDelete: (index: number) => void;
  showDeleteConfirmation: (index: number) => void;
  cancelDelete: () => void;
  setShowConfirmButton:any;
  setData:any;
}

export default function useDeleteRow(externalNominees: any): useDeleteRowProps {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [data, setData] = useState<any[]>(externalNominees);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(null);

//   useEffect(() => {
//     setNominees(externalNominees);
//   }, [externalNominees]);


  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    setShowConfirmButton(false);
  };

  const handleDelete = (index: number) => {
    setData((prevNominees) => prevNominees.filter((_, nomineeIndex) => nomineeIndex !== index));
    setShowConfirmButton(false);
    setOpenDropdownIndex(null);
    setSelectedDataIndex(null); 
  };

  const showDeleteConfirmation = (index: number) => {
    setShowConfirmButton(true);
    setSelectedDataIndex(index);
  };

  const cancelDelete = () => {
      setSelectedDataIndex(null);
      setShowConfirmButton(false);
      setOpenDropdownIndex(null);

  };

  return {
    openDropdownIndex,
    data,
    showConfirmButton,
    selectedDataIndex,
    toggleDropdown,
    handleDelete,
    showDeleteConfirmation,
    cancelDelete,
    setShowConfirmButton,
    setData
  };
}
