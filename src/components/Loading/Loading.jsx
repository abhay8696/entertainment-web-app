import React from "react";
//styles
import "./Loading.css";
//assets
import loadingIcon from "../../assets/icon-loading.svg";

const Loading = ({ size }) => {
    return (
        <div
            onClick={() => console.log(size)}
            className={`flex items-center justify-center`}
        >
            <img
                src={loadingIcon}
                alt="load"
                className={`loadingIcon w-[${size}] h-[${size}]`}
            />
        </div>
    );
};

export default Loading;
