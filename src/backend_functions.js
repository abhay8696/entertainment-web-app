import axios from "axios";
// const serverUrl = "https://backend-entertainment-web-app.vercel.app/v1";
//variables
const serverUrl = import.meta.env.VITE_REACT_APP_serverURL; //development/production backend url

export const authFunction = async ({ authType, name, email, password }) => {
    if (!email || !password) return;
    const url = `${serverUrl}/auth/${authType}`;
    const body = { name, email, password };

    try {
        const res = await axios.post(url, body);
        // console.log(url);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        // console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const bookmark_Ops = async ({
    method, // "get", "post", "put", "delete"
    op_Type, // new, delete, all
    tmdb_id,
    data,
    token,
}) => {
    //op_Type = create/find_all/delete
    console.log("calling bookmark api...");
    let param = op_Type;

    if (op_Type === "delete") param = tmdb_id;
    const url = `${serverUrl}/bookmark/${param}`;

    const config = {
        method,
        url,
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        data: { tmdb_id, data },
    };

    // console.log(config);

    try {
        const response = await axios(config);
        console.log("bookmark response: ", response.data);
        return response.data;
    } catch (error) {
        // console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

//LOGIN:
//h1
//form
//email
//password
//button: login route

//SIGNUP:
//h1
//form
//name
//email
//password
//button: register route
