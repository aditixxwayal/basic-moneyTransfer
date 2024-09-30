/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
const Button = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
            }}
        >
            {label}
        </button>
    );
};

export default Button;
