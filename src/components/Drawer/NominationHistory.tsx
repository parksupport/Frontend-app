import { groteskText, groteskTextMedium } from "@/app/fonts";
import SearchSVG from "@/assets/svg/search-normal.svg";
import SortSVG from "@/assets/svg/sort.svg";
import { useGetAllNominees } from "@/hooks/queries/nominee";
import { useState } from "react";
import TruncatedText from "../ToggleComponent/TruncatedText";
import DrawerHeader from "./DrawerHeader";

interface NominationHistoryTableProps {
  toggleDrawer: () => void;
  back: any;
}

const NominationHistoryTable = ({ back }: NominationHistoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const { allNominees } = useGetAllNominees();

  const nominations = allNominees?.nominations;


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    const column = e.target.value;
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredNominations =
    nominations?.filter((nomination) =>
      Object.values(nomination).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) || [];

  const sortedNominations = [...filteredNominations].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <DrawerHeader
        toggleDrawer={back}
        title="Nomination History"
        subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account."
      />
      <section className="flex justify-center items-center w-[900px] flex-col">
        <div className="mb-4 flex justify-between items-center mt-[20px] w-[83%]">
          <div
            className={`${groteskText.className} relative flex justify-center items-center gap-4`}
          >
            <SearchSVG className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`${groteskText.className} pl-10 py-2 border rounded-md w-full max-w-xs`}
            />
          </div>

          <div className="flex items-center text-[14px]">
            <SortSVG className="cursor-pointer" />

            <select onChange={handleSortChange} className="">
              <option value="">Sort </option>
              <option value="carRegNo">Car Reg No</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="startDate">Start Date</option>
              <option value="endDate">End Date</option>
              <option value="email">Email</option>
              <option value="phoneNumber">Phone Number</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full md:min-w-[900px] bg-white border border-gray-200">
            <thead>
              <tr>
                <th
                  className={`whitespace-nowrap py-2 pl-4 bg-gray-100 text-left  text-[#667185] ${groteskTextMedium.className}`}
                >
                  Car Reg No
                </th>
                <th
                  className={`py-2 pl-4 bg-gray-100 text-left  text-[#667185]   ${groteskTextMedium.className}`}
                >
                  Name
                </th>
                <th
                  className={`py-2 pl-4 bg-gray-100 text-left  text-[#667185]   ${groteskTextMedium.className}`}
                >
                  Status
                </th>
                <th
                  className={`py-2 pl-4 bg-gray-100 text-left  text-[#667185]   ${groteskTextMedium.className}`}
                >
                  Start Date
                </th>
                <th
                  className={`py-2 pl-4 bg-gray-100 text-left  text-[#667185]   ${groteskTextMedium.className}`}
                >
                  End Date
                </th>
                <th
                  className={`py-2 pl-4 bg-gray-100 text-left  text-[#667185]   ${groteskTextMedium.className}`}
                >
                  Email
                </th>
                <th
                  className={`py-2 pl-4 bg-gray-100 text-left  text-[#667185]   ${groteskTextMedium.className}`}
                >
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody className="">
              {sortedNominations?.map((nomination, index) => (
                <tr
                  key={index}
                  className={`className={index % 2 === 0 ? 'bg-[#FFFFFF]' : '' } hover:bg-[#F0F2F5] cursor-pointer gap-[5px] border-t border-gray-200`}
                >
                  <td
                    className={` ${groteskText.className} py-2 px-4 text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap `}
                  >
                    {nomination.vehicle_registration_number}
                  </td>
                  <td
                    className={` ${groteskText.className} px-4 text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap`}
                  >
                    <TruncatedText
                      text={nomination.name}
                      maxLength={10}
                      className={`${groteskText.className}`}
                    />
                  </td>
                  <td
                    className={`h-[26px]  my-[8px] text-[18px] flex items-center justify-center rounded-full px-3 text-xs font-semibold whitespace-nowraptext-center ${
                      nomination.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {nomination.status}
                  </td>
                  <td
                    className={` ${groteskText.className} px-4 text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap`}
                  >
                    {nomination.start_date}
                  </td>
                  <td
                    className={` ${groteskText.className} px-4 text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap`}
                  >
                    {nomination.end_date}
                  </td>
                  <td
                    className={` ${groteskText.className} px-4 text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap`}
                  >
                    <TruncatedText
                      text={nomination.email}
                      maxLength={13}
                      className={`${groteskText.className}`}
                    />
                  </td>
                  <td
                    className={` ${groteskText.className} px-4 text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap`}
                  >
                    {nomination.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default NominationHistoryTable;
