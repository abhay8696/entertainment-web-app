import React, { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
    const [debValue, setDebValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => {
            setDebValue(value);
        }, delay);

        return () => {
            clearTimeout(id);
        };
    }, [value, delay]);

    return debValue;
};

export default useDebounce;
