import React, { useState } from "react";

const Authentication = ({ type, handleAuthPage }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    //functions
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(formData);
    };
    const dispayNameInput = () => {
        if (type === "login") return null;

        return (
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="capitalize bg-inherit px-4 py-2 border outline-none border-semi-dark-blue border-b-greyish-blue"
                required
            />
        );
    };
    const displayLoginMessage = () => {
        return (
            <span>
                <span>Alread have an account?</span>
                <span> </span>
                <span
                    className="text-primary cursor-pointer"
                    onClick={() => handleAuthPage(true, "login")}
                >
                    Login
                </span>
            </span>
        );
    };
    const displayRegisterMessage = () => {
        return (
            <span>
                <span>Don't have an account?</span>
                <span> </span>
                <span
                    className="text-primary cursor-pointer"
                    onClick={() => handleAuthPage(true, "register")}
                >
                    Register
                </span>
            </span>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center fixed w-[100vw] h-[100vh] bg-dark-blue/75 z-50 backdrop-blur-md">
            <form
                onSubmit={handleSubmit}
                className="bg-semi-dark-blue w-[400px] min-h-[418px] max-w-[90vw] rounded-2xl p-8 flex flex-col justify-between gap-4"
            >
                <p className="capitalize text-left text-h3">{type}</p>
                {dispayNameInput()}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-inherit px-4 py-2 border outline-none border-semi-dark-blue border-b-greyish-blue"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-inherit px-4 py-2 border outline-none border-semi-dark-blue border-b-greyish-blue"
                    required
                />
                <button
                    className="bg-primary p-4 rounded-lg mt-6"
                    type="submit"
                >
                    {type === "login"
                        ? "Login to your account"
                        : "Create an account"}
                </button>
                {type === "login"
                    ? displayRegisterMessage()
                    : displayLoginMessage()}
            </form>
        </div>
    );
};

export default Authentication;
