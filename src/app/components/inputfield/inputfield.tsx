import React, { ChangeEvent } from "react";
import "./inputfield.css";

interface InputfieldType {
  labelvalue?: string;
  inputType? : string
  inputvalue?: string;
  changeValue?: (e: ChangeEvent<HTMLInputElement>) => void; 
}

const Inputfield: React.FC<InputfieldType> = ({ inputvalue, labelvalue, changeValue  , inputType}) => {
  return (
    <div>
      <div className="brutalist-container">
        <input
          placeholder={labelvalue}
          value={inputvalue}
          className="brutalist-input smooth-type"
          type={inputType}
          onChange={changeValue}
        />
        <label className="brutalist-label">{labelvalue}</label>
      </div>
    </div>
  );
};

export default Inputfield;
