import { groteskText, groteskTextMedium } from "@/app/fonts";
import DeleteRowModal from "../DeleteRowModal";
import SearchSortModal from "../SearchSortModal";
import { useEffect, useRef, useState } from "react";
import useDeleteRow from "@/hooks/useDeleteRow";
import useIsMobile from "@/hooks/useIsMobile";
import ThirdPartyNominees, {
  AddThirdPartyNominee,
} from "../card/ThirdPartyNominee";
import TruncatedText from "../ToggleComponent/TruncatedText";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import InfoIconWithText from "../InfoIconWithText";
import { MdHistory } from "react-icons/md";
import { useAuthStore } from "@/lib/stores/authStore";
import { useGetNominees } from "@/hooks/queries/nominee";
import { useAddNominee } from "@/hooks/mutations/nominee";
import { Spinner } from "@chakra-ui/react";

export const CorporateCarProfileDrawer = ({
  toggleDrawer,
  openVerifyVehicleDrawer,
  isForm,
  openNominationHistory,
  vehicles,
  full_name,
  user_type,
  verify,
  backToDashboard,
  loading,
  openAddVehicleDetailsDrawer,
}) => {
  const [form, setForm] = useState(isForm);

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
  } = useDeleteRow(vehicles, "vehicle");

  const [selectedVehicle, setSelectedVehicle] = useState(data?.[0] || {});

  useEffect(() => {
    if (data?.length === 0) {
      backToDashboard(); // If no vehicles are left, navigate back to the dashboard
    } else if (
      !data.some(
        (vehicle) =>
          vehicle.registration_number === selectedVehicle.registration_number
      )
    ) {
      // If the selected vehicle has been deleted and is no longer in data, select the first vehicle
      setSelectedVehicle(data[0]);
    }
  }, [data, selectedVehicle, setData]);

  const { nominees, isLoading } = useGetNominees(
    selectedVehicle?.registration_number
  );
  const { addNominee, addNomineeLoading } = useAddNominee();

  const nextComponentRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (nextComponentRef.current) {
      nextComponentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {loading ? (
        <div> loaing </div>
      ) : (
        <>
          <div className=" flex flex-col min-w-[900px]  mx-auto">
            <div className="flex items-center justify-between  ">
              <SearchSortModal name={full_name} data={data} setData={setData} />
              {/* <button
              onClick={openNominationHistory}
              className=" ml-4  w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center mt-8"
            >
              <MdHistory size={20} />
            </button> */}
              <button
                onClick={openNominationHistory}
                className={`${groteskText.className} -mb-4 border border-gray-200 rounded-[8px] text-[18px] py-2 px-4 hover:bg-gray-100`}
              >
                Nomination History
              </button>
            </div>

            <div className=" mx-auto z-0 rounded-[16px] border border-gray-200 relative flex items-center justify-center">
              <div className="w-full ">
                {" "}
                {/* Wider container */}
                <table className="min-w-[900px] min-h-[200px]">
                  {" "}
                  {/* Full-width table */}
                  <thead>
                    <tr
                      className={`${groteskTextMedium.className} text-[20px]`}
                    >
                      <th
                        className={`py-2 px-4 bg-gray-100 text-right font-semibold text-gray-500 w-[5%] ${groteskTextMedium.className}`}
                      ></th>
                      <th
                        className={`whitespace-nowrap py-2 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-[15%] ${groteskTextMedium.className}`}
                      >
                        Reg No.
                      </th>
                      <th
                        className={`py-2 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-[15%] ${groteskTextMedium.className}`}
                      >
                        Owner
                      </th>
                      <th
                        className={`py-2 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-[10%] ${groteskTextMedium.className}`}
                      >
                        <InfoIconWithText
                          text="Status"
                          identity={`verificationStatus`}
                          infoText="Verification Status"
                          className={`${groteskTextMedium.className} text-[20px]`}
                          verticalAligment={"-mt-[4px]"}
                        />
                      </th>
                      {/* <th
                        className={`py-2 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-[25%] ${groteskTextMedium.className}`}
                      >
                        <InfoIconWithText
                          text="Recipient"
                          identity={`verificationStatus`}
                          infoText="Notification Recipient"
                          className={`${groteskTextMedium.className} text-[20px]`}
                          verticalAligment={"-mt-[4px]"}
                        />
                      </th> */}
                      <th
                        className={`py-2 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-[10%] ${groteskTextMedium.className}`}
                      >
                        Color
                      </th>
                      <th
                        className={`py-2 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-[10%] ${groteskTextMedium.className}`}
                      >
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-t border-gray-200 text-[18px] ${
                          item.registration_number ===
                          selectedVehicle?.registration_number
                            ? "bg-gray-300 text-white"
                            : "hover:bg-gray-50"
                        } ${groteskText.className}`}
                        onClick={() => setSelectedVehicle(item)}
                      >
                        <td
                          className={` ${groteskText.className} relative pt-2 text-[24px] text-center whitespace-nowrap w-[5%]`}
                        >
                          <button
                            className="text-gray-500 hover:text-gray-900 pl-2"
                            onClick={() => toggleDropdown(index)}
                          >
                            &#8942;
                          </button>
                          {openDropdownIndex === index && (
                            <DeleteRowModal
                              position={{ right: -82, top: 44 }}
                              showConfirmButton={showConfirmButton}
                              onEdit={() => {}}
                              onRemove={() => showDeleteConfirmation(index)}
                              onCancelDelete={cancelDelete}
                              onConfirmDelete={() => handleDelete(index)}
                              selectedDataIndex={selectedDataIndex}
                              onClose={() => setOpenDropdownIndex(null)}
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
                          className={` ${groteskText.className} px-6 text-sm md:text-[18px] text-gray-700 w-[15%] whitespace-nowrap`}
                        >
                          {item.registration_number.toUpperCase()}
                        </td>
                        <td
                          className={` ${groteskText.className} px-4 text-sm md:text-[18px] text-gray-700 leading-none w-[15%] whitespace-nowrap`}
                        >
                          <TruncatedText
                            text={
                              item.owner
                                ? item.owner
                                    .split(" ")
                                    .map(
                                      (name) =>
                                        name.charAt(0).toUpperCase() +
                                        name.slice(1)
                                    )
                                    .join(" ")
                                : full_name
                                    .split(" ")
                                    .map(
                                      (name) =>
                                        name.charAt(0).toUpperCase() +
                                        name.slice(1)
                                    )
                                    .join(" ")
                            }
                            maxLength={20}
                            className={`${groteskText.className}`}
                          />
                        </td>
                        <td
                          className={` ${groteskText.className} px-4 text-sm md:text-[18px] text-gray-700 leading-none w-[10%] whitespace-nowrap`}
                        >
                          <span
                            className={` ${
                              groteskText.className
                            } w-[116px] py-1 text-[18px] flex items-center justify-center rounded-full px-3 text-xs font-semibold whitespace-nowrap ${
                              item.verification_status === "Verified"
                                ? "bg-green-100 text-green-700"
                                : item.verification_status === "Pending"
                                ? "bg-yellow-100 text-yellow-700 cursor-pointer"
                                : "bg-red-100 text-red-700"
                            }`}
                            onClick={
                              item.verification_status !== "Verified"
                                ? () => openVerifyVehicleDrawer() // Add your onClick handler here
                                : undefined
                            }
                          >
                            <div className="flex items-center whitespace-nowrap">
                              {item.verification_status === "Verified" ? (
                                <IoMdCheckmark size={14} className="mr-1" />
                              ) : (
                                <IoMdClose size={14} className="mr-1" />
                              )}
                              {item.verification_status}
                            </div>
                          </span>
                        </td>

                        {/* <td
                          className={` ${groteskText.className} px-6 text-sm md:text-[18px] text-gray-700 leading-none w-[25%] whitespace-nowrap`}
                        >
                          <TruncatedText
                            text={item.thirdPartyNominee}
                            maxLength={20}
                            className={`${groteskText.className}`}
                          />
                        </td> */}
                        <td
                          className={` ${groteskText.className} px-6 text-sm md:text-[18px] text-gray-700 leading-none w-[10%] whitespace-nowrap`}
                        >
                          {item.color.charAt(0).toUpperCase() +
                            item.color.slice(1)}
                        </td>
                        <td
                          className={` ${groteskText.className} px-6 text-sm md:text-[18px] text-gray-700 leading-none w-[10%] whitespace-nowrap`}
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-center"
            ref={nextComponentRef}
          >
            {addNomineeLoading ? (
              <div className="flex flex-col justify-center h-[300px] items-center">
                <Spinner color="blue" />;
              </div>
            ) : form ? (
              <AddThirdPartyNominee
                toggleForm={setForm}
                openAddVehicleDetailsDrawer={openAddVehicleDetailsDrawer}
                selectedVehicle={selectedVehicle || {}}
                user_type={user_type}
                setSelectedVehicle={setSelectedVehicle}
                data={data}
                openVerifyVehicleDrawer={openVerifyVehicleDrawer}
                addNominee={addNominee}
              />
            ) : (
              <ThirdPartyNominees
                user_type={user_type}
                selectedVehicle={selectedVehicle || {}}
                toggleForm={setForm}
                nominees={nominees?.nominations || []}
                loading={isLoading}
                openAddVehicleDetailsDrawer={openAddVehicleDetailsDrawer}
                openVerifyVehicleDrawer={openVerifyVehicleDrawer}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CorporateCarProfileDrawer;
