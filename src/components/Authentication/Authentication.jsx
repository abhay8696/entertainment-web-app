import React, { useState } from "react";
import { authFunction } from "../../backend_functions";
import { set_localUserData } from "../../functions";

const Authentication = ({ type, handleAuthPage }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [formError, SetFormError] = useState({
        status: false,
        msg: "",
    });

    //functions
    const handleChange = (event) => {
        const { name, value } = event.target;

        SetFormError({ status: false, msg: "" });

        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        let response;
        try {
            const res = await authFunction({
                authType: type,
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            response = res;
        } catch (error) {
            console.log(error.message);
            SetFormError({
                status: true,
                msg: error.message || "Something went wrong!",
            });
            window.localStorage.removeItem("ewa_user");
        }

        if (response) {
            set_localUserData({
                token: response.tokens.access.token,
                name: response.user.name,
                email: response.user.email,
            });
            handleAuthPage(false, type);
        }
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

    const displayError = () => {
        return (
            <span className="text-left text-red-500 capitalize">
                {formError.msg}
            </span>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center fixed w-[100vw] h-[100vh] bg-dark-blue/75 z-50 backdrop-blur-md">
            <form
                onSubmit={handleSubmit}
                className="bg-semi-dark-blue w-[400px] min-h-[418px] max-w-[90vw] rounded-2xl p-8 flex flex-col justify-between gap-4"
                style={{
                    border: "1px solid ",
                    borderColor: formError.status ? "#EF4444" : "#161D2F",
                }}
            >
                <p className="capitalize flex justify-between items-center">
                    <span className="text-h3">{type}</span>
                    <butto
                        className="p-2 bg-gray-500 rounded-lg cursor-pointer"
                        onClick={() => handleAuthPage(false, type)}
                    >
                        cancel
                    </butto>
                </p>
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
                {displayError()}
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
