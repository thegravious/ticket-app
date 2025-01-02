import React from "react";
import "./submitbutton.css"


interface submitbuttonType{
    ButtonText? : string,
    Func?() : void
}

const submitbutton:React.FC<submitbuttonType>= ({ButtonText , Func}) => {
  return (
    <button 
    onClick={Func}
    className="btn-96">
      <span>{ButtonText}</span>
    </button>
  );
};

export default submitbutton;
