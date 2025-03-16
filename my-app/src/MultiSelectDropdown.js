import React, { useState } from "react";
import "./MultiSelectDropdown.css";
import dropArrowBlack from "./assets/imgs/drop_arrow_black.png";

function MultiSelectDropdown(props) {
  const [selectedOptions, setSelectedOptions] = useState(props.value || []);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const handleCheckboxChange = (optionValue) => {
    const updatedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((val) => val !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(updatedOptions);
    props.onChange(updatedOptions);
  };

  return (
    <div className="dropdown">
    
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${props.class}-button`}
      >
        <div>{props.label}</div>
        <img src={dropArrowBlack} alt="drop-arrow-black" />
      </button>

      {isOpen && (
      <div className="multi-select-dropdown-container" style={{ top: "100%", left: 0 }}>
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
        <button onClick={() => onClose()} className="choose-button">
          არჩევა
        </button>
      </div>
)}

   
    </div>
  );
}

export default MultiSelectDropdown;
