import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import './BackButton.scss';

function BackButton() {
    const navigate = useNavigate();

    return (
        <div className="BackButton" onClick={() => navigate(-1)}>
            <span className="arrow"><IoIosArrowRoundBack /></span>Back
        </div>
    );
}

export default BackButton;