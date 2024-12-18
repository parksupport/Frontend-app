import React, { useState } from "react";
import SearchSVG from "@/assets/svg/search-normal.svg";
import SortSVG from "@/assets/svg/sort.svg";
import CarSVG from "@/assets/svg/colorfilter_blue.svg";
import MakeSVG from "@/assets/svg/car.svg";
import CalendarSVG from "@/assets/svg/calendarOutline.svg";
import RegSVG from "@/assets/svg/numbers_blue.svg";
import { groteskText } from "@/app/fonts";

const SearchSortModal = ({ data, setData }) => {
  const [originalData] = useState(data); // Keep a reference to the original data
  const sortOptions = [
    { label: "Color", icon: <CarSVG /> },
    { label: "Date added", icon: <CalendarSVG /> },
    { label: "Make", icon: <MakeSVG /> },
    { label: "Reg No", icon: <RegSVG /> },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setData(originalData); // Reset to original data when search term is empty
    } else {
      // Filter the data based on the search term
      const filteredData = originalData.filter(
        (item) =>
          item.owner.toLowerCase().includes(term) ||
          item.color.toLowerCase().includes(term) ||
          item.make.toLowerCase().includes(term) ||
          item.registrationNumber.toLowerCase().includes(term)
      );
      setData(filteredData);
    }
  };

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle sort option selection
  const handleSort = (label) => {
    setSelectedSort(label);
    setIsDropdownOpen(false); // Close dropdown after selection

    const sortedData = [...data];
    switch (label) {
      case "Color":
        sortedData.sort((a, b) => a.color.localeCompare(b.color));
        break;
      case "Date added":
        sortedData.sort(
          (a, b) =>
            new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
        break;
      case "Make":
        sortedData.sort((a, b) => a.make.localeCompare(b.make));
        break;
      case "Reg No":
        sortedData.sort((a, b) =>
          a.registrationNumber.localeCompare(b.registrationNumber)
        );
        break;
      default:
        break;
    }

    setData(sortedData);
  };

  return (
    <div className="mt-8 flex justify-between gap-6 p-0 md:mb-4">
      {/* Search Input */}
      <SearchInput
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        groteskText={groteskText}
      />

      {/* Sort Dropdown */}
      <SortDropdown
        selectedSort={selectedSort}
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
        sortOptions={sortOptions}
        handleSort={handleSort}
        groteskText={groteskText}
      />
    </div>
  );
};

export default SearchSortModal;

const SearchInput = ({ searchTerm, handleSearch, groteskText }) => (
  <div
    className={`${groteskText.className} relative flex justify-center items-center gap-4`}
  >
    <SearchSVG
      className={`${groteskText.className} absolute left-2 top-2 cursor-pointer`}
    />
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleSearch}
      className="px-10 py-2 border rounded-[8px] w-[200px] text-gray-400"
    />
  </div>
);

const SortDropdown = ({
  selectedSort,
  toggleDropdown,
  isDropdownOpen,
  sortOptions,
  handleSort,
  groteskText,
}) => (
  <div className="relative z-10">
    <div>
      <button
        className={` ${groteskText.className} flex justify-between pr-4 pl-1 py-2 gap-2 border rounded-[8px] text-gray-400`}
        onClick={toggleDropdown}
      >
        <SortSVG className="cursor-pointer" />
        {selectedSort || "Sort"}
      </button>
    </div>
    {isDropdownOpen && (
      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
        <ul>
          {sortOptions.map((option, index) => (
            <li
              key={index}
              className={` ${groteskText.className} flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer gap-2`}
              onClick={() => handleSort(option.label)}
            >
              {option.icon} {option.label}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
