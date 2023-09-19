import { useFilterProduct } from "@/hook/useFilterProduct";
import { axiosAuth } from "@/libraries/axiosConfig";
import React, { useEffect, useState } from "react";

function SuppliersFilter() {
  const { filter, getMutipleFillter } = useFilterProduct((state: any) => state);
  // State to manage the visibility of the dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [suppliers, setSuppliers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track the selected category

  useEffect(() => {
    axiosAuth
      .get("/suppliers?active=true")
      .then((res) => {
        setSuppliers(res.data.results);
      })
      .catch((err) => console.log(`⚠️⚠️⚠️!! err `, err));
  }, []);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Function to handle checkbox selection
  const handleCategorySelect = (supplierId: any) => {
    if (selectedCategory === supplierId) {
      setSelectedCategory(null); // Unselect if already selected
      getMutipleFillter({ supplierId: null });
    } else {
      setSelectedCategory(supplierId); // Otherwise, select it
      getMutipleFillter({ supplierId });
    }
  };

  return (
    <div className=" flex items-center justify-center p-4 relative">
      <button
        id="dropdownDefault"
        onClick={toggleDropdown}
        className="text-white bg-slate-600 hover:bg-slate-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button"
      >
        Supplier
        <svg
          className={`w-4 h-4 ml-2 ${
            isDropdownOpen ? "transform rotate-180" : ""
          } transition-transform duration-300`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={`z-10 ${
          isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        } transform origin-top w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 absolute mt-64 transition-opacity duration-300 ease-in-out`}
      >
        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          Supplier
        </h6>
        <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
          {suppliers.map((item: any, index) => (
            <li className="flex items-center" key={item._id}>
              <input
                onChange={() => {
                  handleCategorySelect(item._id);
                }}
                id={item.name}
                type="checkbox"
                value={item._id}
                checked={selectedCategory === item._id} // Check if this checkbox should be checked
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor={item.name}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                {item.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SuppliersFilter;
