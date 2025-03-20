import './CreateEmployeeApp.css';
import React, { useState, useEffect, useRef } from "react";
import vector from './assets/imgs/Vector.png';
import avatarDefault from './assets/imgs/avatar_default_img.png';
import trash from './assets/imgs/trash-2.png';
import SingleSelectDropdown from './SingleSelectDropdown';

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e75f618-7888-45c1-acc4-e9e0681adaf8";

function CreateEmployeeApp(props) {
    const [image, setImage] = useState(avatarDefault);
    const [selectedDepartment, setSelectedDepartment] = useState();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [isValidatedName, setIsValidatedName] = useState(false);
    const [isValidatedSurname, setIsValidatedSurname] = useState(false);
    const [imageError, setImageError] = useState('');

    const displayOverlay = props.createEmployeeOverlay ? "block" : "none";
    const overlayRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target)) {
                props.setCreateEmployeeOverlay(false);
                handleClose()
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const validateName = (value) => {
        const nameRegex = /^[a-zA-Zა-ჰ]{2,255}$/;
        setIsValidatedName(nameRegex.test(value));
    };

    const validateSurname = (value) => {
        const surnameRegex = /^[a-zA-Zა-ჰ]{2,255}$/;
        setIsValidatedSurname(surnameRegex.test(value));
    };
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        validateName(value);
    };
    
    const handleSurnameChange = (e) => {
        const value = e.target.value;
        setSurname(value);
        validateSurname(value);
    };
    
    const getInputBorderColor = (value, isValid) => {
        if (value === "") return "#6C757D";
        return isValid ? "#08A508" : "#FA4D4D"; 
    };
    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setImageError("მხოლოდ სურათის ფაილები");
                return;
            }
            if (file.size > 600 * 1024) {
                setImageError("სურათი უნდა იყოს 600KB-მდე");
                return;
            }
            setImage(URL.createObjectURL(file));
            setImageError("");
        }
    };

    const handleDelete = () => {
        setImage(avatarDefault);
    };

    const handleClose = () => {
        if (props.createEmployeeOverlay===false){
            setImage(avatarDefault)
            setName('')
            setSurname('')
            setSelectedDepartment('')
        }
    }

    const handleSubmit = async () => {
        if (!isValidatedName || !isValidatedSurname || image === avatarDefault || !selectedDepartment) {
            return;
        }
        
        const dep = props.departments.find((dep)=>dep.name==selectedDepartment)

        const formData = new FormData();
        formData.append("name", name);
        formData.append("surname", surname);
        
        if (image !== avatarDefault) {
            const file = document.getElementById("imageUpload").files[0];
            formData.append("avatar", file, file.name); 
        }
        
        formData.append("department_id", dep.id);
    
        try {
            const response = await fetch(`${API_URL}/employees`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`,
                },
                body: formData,
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                alert("თანამშრომელი წარმატებით დაემატა!");
                props.setCreateEmployeeOverlay(false);
            } else {
                alert(`Error: ${responseData.message || "An error occurred"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error occurred. Please try again later.");
        }
    };
        

    return (
        <div className='overlay' style={{ display: displayOverlay }}>
            <div className='create-employee-overlay' ref={overlayRef}>
                <button className='cancel-x-button' onClick={() => {
                    props.setCreateEmployeeOverlay(false)
                    handleClose()
                    }}>
                    <img src={vector} alt='vector-x' />
                </button>
                <div className='create-container'>
                    <div className='create-employee'>
                        <div className='text'>თანამშრომლის დამატება</div>
                        <div className='create-employee-form'>
                            <div className='name-fill-in-container'>
                                <div className='name-container'>
                                    <label>სახელი*</label>
                                    <input 
                                        type='text' 
                                        className='name-input' 
                                        value={name} 
                                        onChange={handleNameChange} 
                                    />
                                    <div className='requirements'>
                                        <div className='requirement-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke={getInputBorderColor(name, isValidatedName)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div className='requirement-1-text' style={{ color: getInputBorderColor(name, isValidatedName) }}>მინიმუმ 2 სიმბოლო</div>
                                        </div>
                                        <div className='requirement-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke={getInputBorderColor(name, isValidatedName)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div className='requirement-2-text' style={{ color: getInputBorderColor(name, isValidatedName) }}>მაქსიმუმ 255 სიმბოლო</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='surname-container'>
                                    <label>გვარი*</label>
                                    <input 
                                        type='text' 
                                        className='surname-input' 
                                        value={surname} 
                                        onChange={handleSurnameChange} 
                                    />
                                    <div className='requirements'>
                                        <div className='requirement-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke={getInputBorderColor(surname, isValidatedSurname)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div className='requirement-1-text' style={{ color: getInputBorderColor(surname, isValidatedSurname) }}>მინიმუმ 2 სიმბოლო</div>
                                        </div>
                                        <div className='requirement-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke={getInputBorderColor(surname, isValidatedSurname)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div className='requirement-2-text' style={{ color: getInputBorderColor(surname, isValidatedSurname) }}>მაქსიმუმ 255 სიმბოლო</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='photo-upload-container'>
                                <label className='avatar'>ავატარი*</label>
                                <div className='photo-upload'>
                                    <input 
                                        type='file' 
                                        accept='image/*' 
                                        className='upload-img-input' 
                                        onChange={handleImageChange} 
                                        id="imageUpload" 
                                    />
                                    <label htmlFor="imageUpload" className='upload-img-label'>
                        
                                        <img src={image} className='uploaded-img' style={{ display: image ? '' : 'none' }} />
                                    </label>
                                    <button className='delete-img-button' onClick={handleDelete}>
                                        <img className='trash-icon' src={trash} />
                                    </button>
                                </div>
                                {imageError && <div className="error-message" style={{ color: "red" }}>{imageError}</div>}
                            </div>

                            <div className='department-fill-in-container'>
                                <label className='department-label'>დეპარტამენტი*</label>
                                <SingleSelectDropdown
                                    options={props.departments}
                                    value={selectedDepartment}
                                    onChange={setSelectedDepartment}
                                    class="department"
                                    label="დეპარტამენტი"
                                />
                            </div>
                        </div>

                        <div className='create-buttons'>
                            <button className='cancel-button' onClick={() => {
                                props.setCreateEmployeeOverlay(false)
                                handleClose()
                                }}>გაუქმება</button>
                            <button className='add-employee-button' disabled={!isValidatedName || !isValidatedSurname || image === avatarDefault || !selectedDepartment} onClick={handleSubmit}>დაამატე თანამშრომელი</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEmployeeApp;
