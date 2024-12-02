import React, { useState } from "react";
//styles
import "./UserProfile.css";

const UserProfile = (props) => {
    const displayName = () => {
        const data = window.localStorage.getItem("ewa_user");

        if (data) return JSON.parse(data).name;

        return null;
    };

    return (
        <div className="p-4 flex flex-col justify-between bg-semi-dark-blue/30 backdrop-blur-lg w-[500px] max-w-[95vw] fixed rounded-xl userProfile">
            <h4 className="text-primary">{displayName()}</h4>
            <button className="p-2 bg-primary rounded-lg uppercase">
                logout
            </button>
        </div>
    );
};

export default UserProfile;
