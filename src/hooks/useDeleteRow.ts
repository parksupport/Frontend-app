import { useState, useEffect } from "react";
import { useDeleteVehicle } from "./mutations/vehicles";
import { useDeleteNominee, useEndNomination } from "./mutations/nominee";
import { useGetVehicles } from "./queries/vehicles";



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
  setOpenDropdownIndex:any
}

export default function useDeleteRow(externalData: any, type: "vehicle" | "nominee"  ): useDeleteRowProps {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [data, setData] = useState<any[]>(externalData);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(null);

   const {refetch } = useGetVehicles();

 
  const {
    deleteVehicle: deleteVehicle,
    isError: isDeleteVehicleError,
    error: deleteVehicleError,
  } = useDeleteVehicle();
  
  const {
    endNomination: endNomination,
    isError: isDeleteNomineeError,
    error: deleteNomineeError,
  } = useEndNomination();
  

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(externalData)) {
      setData(externalData);
    }
  }, [externalData]);
  // }, [externalData, data]);

  
  

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    setShowConfirmButton(false);
  };

  const handleDelete = async (index: number, registration_number?: string) => {
    const item = data[index];
  
    if (type === "vehicle") {
      const id = item?.registration_number;
      if (id) {
        deleteVehicle(id); // Trigger the delete mutation
      }
    } else if (type === "nominee") {
      const nominee_id = item?.id;
      if (registration_number && nominee_id) {
        endNomination({ registration_number, nominee_id }); // Pass both as an object
      }
    }
  
    // Refetch to ensure data consistency
    await refetch();
  
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
    setData,
    setOpenDropdownIndex
  };
}
