import React, { useState } from "react";
//styles
import "./UserProfile.css";

const UserProfile = ({ handleUserLogout, handleAuthPage }) => {
    const displayName = () => {
        const data = window.localStorage.getItem("ewa_user");

        if (data) return JSON.parse(data).name;
        return "You are not logged in";
    };

    const displayButton = () => {
        const data = window.localStorage.getItem("ewa_user");

        if (data) {
            return (
                <button
                    className="p-2 bg-primary rounded-lg uppercase"
                    onClick={handleUserLogout}
                >
                    logout
                </button>
            );
        }
        return (
            <button
                className="p-2 bg-primary rounded-lg uppercase"
                onClick={() => handleAuthPage(true, "login")}
            >
                login
            </button>
        );
    };

    return (
        <div className="p-4 flex flex-col justify-between bg-semi-dark-blue/30 backdrop-blur-lg w-[500px] max-w-[95vw] fixed rounded-xl userProfile">
            <h4 className="text-primary">{displayName()}</h4>
            {displayButton()}
        </div>
    );
};

export default UserProfile;
