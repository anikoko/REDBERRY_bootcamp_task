import React, { useState, useEffect, useRef } from "react";
import "./MultiSelectDropdown.css";

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

  const handleCheckboxChangeWorker = (optionValue) => {
    setSelectedOptionsTracker([optionValue])
  }
  
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

  const color = props.isOpen ? '#8338EC' : "#0D0F10"

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
        <div style={{color:color}}>{props.label}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z" 
        fill={color}/> 
        </svg>
      </button>

      {props.isOpen && (
      <div ref={dropdownRef} className="multi-select-dropdown-container" style={{ top: "100%", left: 0 }}>
        <div className="multi-select-dropdown-options">
          {props.options.map((option) => (
            <div key={option.id} className={`multi-select-dropdown-option ${(props.class==='worker' ? selectedOptionsTracker.includes(option.id) : selectedOptionsTracker.includes(option.name)) ? "selected" : ""}`}>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={props.class==='worker' ? selectedOptionsTracker.includes(option.id) : selectedOptionsTracker.includes(option.name)}
                onChange={() => props.class==='worker' ? handleCheckboxChangeWorker(option.id) : handleCheckboxChange(option.name)}
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
