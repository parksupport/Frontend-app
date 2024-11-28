import { groteskText, groteskTextMedium } from "@/app/fonts";
import DeleteRowModal from "../DeleteRowModal";
import SearchSortModal from "../SearchSortModal";
import { useRef, useState } from "react";
import useDeleteRow from "@/hooks/useDeleteRow";
import useIsMobile from "@/hooks/useIsMobile";
import ThirdPartyNominees, {
  AddThirdPartyNominee,
} from "../card/ThirdPartyNominee";
import TruncatedText from "../ToggleComponent/TruncatedText";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";

export const CorporateCarProfileDrawer = ({
  toggleDrawer,
  addVehicleDetails,
  vehicles,
  user,
}) => {

  const isMobile = useIsMobile();

  const [form, setForm] = useState(false);


  const {
    openDropdownIndex,
    data,
    showConfirmButton,
    selectedDataIndex,
    toggleDropdown,
    handleDelete,
    showDeleteConfirmation,
    cancelDelete,
    setData,
    setOpenDropdownIndex,
  } = useDeleteRow(vehicles.carDetails);

  const [selectedNominee, setSelectedNominee] = useState(data[0] || {});

  const nextComponentRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (nextComponentRef.current) {
      nextComponentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <>

      <SearchSortModal data={data} setData={setData} />


      <div className="w-full z-0  rounded-[16px] border border-gray-200 relative">
        <div className="overflow-x-auto" style={{ paddingBottom: "50px" }}>
          <table className="min-w-full bg-white m-0">
            <thead>
              <tr className={`${groteskTextMedium.className} text-[17px]`}>
                <th
                  className={`py-1 px-2 bg-gray-100 text-right font-semibold text-gray-500 w-1/12 ${groteskTextMedium.className}`}
                ></th>
                <th
                  className={`py-1 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-2/12 ${groteskTextMedium.className}`}
                >
                  Reg number
                </th>
                <th
                  className={`py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-2/12 ${groteskTextMedium.className}`}
                >
                  Owner
                </th>
                <th
                  className={`py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-1/12 ${groteskTextMedium.className}`}
                >
                  Contravention Status
                </th>
                <th
                  className={`py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-2/12 ${groteskTextMedium.className}`}
                >
                  Notification Recipients
                </th>
                <th
                  className={`py-1 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-1/12 ${groteskTextMedium.className}`}
                >
                  Color
                </th>
                <th
                  className={`py-1 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-1/12 ${groteskTextMedium.className}`}
                >
                  Make
                </th>
              </tr>
            </thead>


            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t border-gray-200 text-[18px] ${
                    item.registrationNumber ===
                    selectedNominee?.registrationNumber
                      ? "bg-gray-300 text-white"
                      : "hover:bg-gray-50"
                  } ${groteskText.className}`}
                  onClick={() => setSelectedNominee(item)}
                >
                  <td
                    className={` ${groteskText.className} relative pt-2 text-center whitespace-nowrap w-1/12`}
                  >
                    <button
                      className="text-gray-500 hover:text-gray-900 px-4"
                      onClick={() => toggleDropdown(index)}
                    >
                      &#8942;
                    </button>
                    {openDropdownIndex === index && (
                      <DeleteRowModal
                        position={{ right: -100, top: 40 }}
                        showConfirmButton={showConfirmButton}
                        onEdit={() => {}}
                        onRemove={() => showDeleteConfirmation(index)}
                        onCancelDelete={cancelDelete}
                        onConfirmDelete={() => handleDelete(index)}
                        selectedDataIndex={selectedDataIndex}
                        index={index}
                        customStyles=""
                        isVehicle
                        onAddNominee={() => {
                          setForm(true);
                          setTimeout(() => {
                            handleButtonClick();
                          }, 125);
                          setOpenDropdownIndex(null);
                        }}
                      />
                    )}
                  </td>
                  <td
                    className={` ${groteskText.className} px-6 text-sm text-gray-700 w-2/12 whitespace-nowrap`}

                  >
                    {item.registrationNumber}
                  </td>
                  <td
                    className={` ${groteskText.className} px-4 text-sm text-gray-700 leading-none w-1/12 whitespace-nowrap`}
                  >
                    <TruncatedText
                      text={item.owner}
                      maxLength={10}
                      className={`${groteskText.className}`}
                    />
                  </td>
                  <td
                    className={` ${groteskText.className} px-4 text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap`}
                  >
                    <span
                      className={` ${
                        groteskText.className
                      } w-[116px] py-1 text-[18px] flex items-center justify-center rounded-full px-3 text-xs font-semibold whitespace-nowrap ${
                        item.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <div className="flex items-center whitespace-nowrap">
                        {item.contraventionStatus === "Verified" ? (
                          <IoMdCheckmark size={14} className="mr-1" />
                        ) : (
                          <IoMdClose size={14} className="mr-1" />
                        )}
                        {item.status}
                      </div>
                    </span>
                  </td>

                  <td
                    className={` ${groteskText.className} px-6 text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap`}
                  >
                    <TruncatedText
                      text={item.thirdPartyNominee}
                      maxLength={10}
                      className={`${groteskText.className}`}
                    />
                  </td>
                  <td
                    className={` ${groteskText.className} px-6 text-sm text-gray-700 leading-none w-1/12 whitespace-nowrap`}
                  >
                    {item.color}
                  </td>
                  <td
                    className={` ${groteskText.className} px-6 text-sm text-gray-700 leading-none w-1/12 whitespace-nowrap`}
                  >

                    {item.make}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      <div ref={nextComponentRef}>
        {form ? (
          <AddThirdPartyNominee
            vehiclesRegNunbers={vehicles.carDetails.map((vehicle) => ({
              value: vehicle.registrationNumber,
              label: vehicle.registrationNumber, // You can customize the label here
            }))}
            toggleForm={setForm}
            addVehicle={addVehicleDetails}
            nominees={selectedNominee || []}
            user={user}
          />
        ) : (
          <ThirdPartyNominees
            toggleForm={setForm}
            nominees={selectedNominee || []}
          />
        )}
      </div>
    </>
  );
};

export default CorporateCarProfileDrawer;
