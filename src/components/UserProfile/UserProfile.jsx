import React, { useState } from "react";
//styles
import "./UserProfile.css";

const UserProfile = ({
    handleUserLogout,
    handleAuthPage,
    handleUserProfileDisplay,
}) => {
    const displayName = () => {
        const data = window.localStorage.getItem("ewa_user");

        if (data) return `Hello, ${JSON.parse(data).name}`;
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
            <div className="flex justify-between items-center">
                <h4 className="text-primary">{displayName()}</h4>
                <butto
                    className="p-2 bg-gray-500 rounded-lg cursor-pointer"
                    onClick={() => handleUserProfileDisplay()}
                >
                    close
                </butto>
            </div>
            {displayButton()}
        </div>
    );
};

export default UserProfile;
