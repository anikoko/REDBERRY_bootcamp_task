import React, { useState, useEffect, useRef } from "react";
import "./MultiSelectDropdown.css";
import dropArrowBlack from "./assets/imgs/drop_arrow_black.png";

function MultiSelectDropdown(props) {
  const [selectedOptions, setSelectedOptions] = useState(props.value || []);

  const dropdownRef = useRef(null);

  const handleCheckboxChange = (optionValue) => {
    const updatedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((val) => val !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(updatedOptions);
    props.onChange(updatedOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        props.setOpenDropdownToNull()
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown">
    
      <button
        onClick={props.setOpenDropdown}
        className={`${props.class}-button`}
      >
        <div>{props.label}</div>
        <img src={dropArrowBlack} alt="drop-arrow-black" />
      </button>

      {props.isOpen && (
      <div ref={dropdownRef} className="multi-select-dropdown-container" style={{ top: "100%", left: 0 }}>
        <div className="multi-select-dropdown-options">
          {props.options.map((option) => (
            <div key={option.id} className={`multi-select-dropdown-option ${selectedOptions.includes(option.name) ? "selected" : ""}`}>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={selectedOptions.includes(option.name)}
                onChange={() => handleCheckboxChange(option.name)}
                id={`checkbox-${option.id}`} 
              />
              <label htmlFor={`checkbox-${option.id}`} className="multi-select-dropdown-option-label">
                {option.name}
              </label>
            </div>
          ))}
        </div>
        <button className="choose-button" onClick={props.setOpenDropdown}>
          არჩევა
        </button>
      </div>
)}

   
    </div>
  );
}

export default MultiSelectDropdown;
