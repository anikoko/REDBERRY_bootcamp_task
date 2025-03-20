import React, { useState, useEffect, useRef } from "react";
import "./SingleSelectDropdown.css";
import dropArrowBlack from "./assets/imgs/drop_arrow_black.png";

function SingleSelectDropdown({ options, value, onChange, class: className, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`single-${className}-button`}
      >
        <div>{value}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z" 
        fill="#0D0F10"/> 
        </svg>
      </button>

      {isOpen && (
        <div className="single-select-dropdown-container">
          <div className="single-select-dropdown-options">
            {options.map((option) => (
              <div
                key={option.id}
                className={`single-select-dropdown-option ${
                  value === option.name ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(option.name); 
                  setIsOpen(false);
                }}
              >
                <input
                  type="checkbox"
                  name="single-select"
                  className="custom-checkbox"
                  checked={value === option.name}
                  readOnly
                />
                <label className="single-select-dropdown-option-label">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleSelectDropdown;
