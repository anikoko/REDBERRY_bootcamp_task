import React, { useState, useEffect, useRef } from "react";
import "./MultiSelectDropdown.css";
import dropArrowBlack from "./assets/imgs/drop_arrow_black.png";

function MultiSelectDropdown(props) {
  const [selectedOptions, setSelectedOptions] = useState(props.values || []);
  const [selectedOptionsTracker, setSelectedOptionsTracker] = useState([])
  // console.log(selectedOptions)

  const dropdownRef = useRef(null);

  const handleCheckboxChange = (optionValue) => {
    const updatedOptions = selectedOptionsTracker.includes(optionValue)
      ? selectedOptionsTracker.filter((val) => val !== optionValue)
      : [...selectedOptionsTracker, optionValue];

    setSelectedOptionsTracker(updatedOptions)
  };
  
  useEffect(() => {
    setSelectedOptions(props.values || []);
    setSelectedOptionsTracker(props.values || []);

  }, [props.values]);

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

  // const handleSelect= () => {
  //   return <div className="selected-filters-container">
  //     <div>
  //       {selectedOptions && selectedOptions.map((value)=>{
  //         return <div className="selected-filter">
  //           {value}
  //         </div>
  //       })}
  //     </div>
  //   </div>
  // } 

  const surname = (option)=>{
    if (props.class==='worker'){
      return option.surname
    }
  }

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
            <div key={option.id} className={`multi-select-dropdown-option ${selectedOptionsTracker.includes(option.name) ? "selected" : ""}`}>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={selectedOptionsTracker.includes(option.name)}
                onChange={() => handleCheckboxChange(option.name)}
                id={`checkbox-${option.id}`} 
              />
              <label htmlFor={`checkbox-${option.id}`} className="multi-select-dropdown-option-label">
                {option.name} {surname(option)}
              </label>
            </div>
          ))}
        </div>
        <button className="choose-button" onClick={()=> {
          props.setOpenDropdown()
          setSelectedOptions(selectedOptionsTracker || [])
          props.onChange(selectedOptionsTracker);

          }}>
          არჩევა
        </button>
      </div>
)} 

   
    </div>
  );
}

export default MultiSelectDropdown;
