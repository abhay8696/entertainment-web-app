import React, { useState } from "react";
//styles
import "./BookmarkButton.css";
//assets
import bookmarkIcon from "../../assets/icon-bookmark-outline.svg";
import bookmarkWhiteIcon from "../../assets/icon-bookmark-white-small.svg";
import loadingIcon from "../../assets/icon-loading.svg";
//backend functions
import { bookmark_Ops } from "../../backend_functions";

const BookmarkButton = (props) => {
    const {
        handleBookMarks,
        allBookmarks,
        tmdbID,
        tv_Movie_data,
        customClass,
    } = props;
    //states
    const [loading, setLoading] = useState(false);

    const handleBookButton = async (evt) => {
        evt.stopPropagation();

        //check if user is logged in
        //  check if tmdbID is present is allBookmarks map
        //      if true delete, and call backend function
        //  else add new, and call backend function
        //else display auth page

        const userData = JSON.parse(window.localStorage.getItem("ewa_user"));

        if (userData) {
            setLoading(true);

            let method, op_Type;
            if (allBookmarks.has(tmdbID)) {
                method = "delete";
                op_Type = "delete";
            } else {
                method = "post";
                op_Type = "new";
            }
            let updatedBookmarks = await bookmark_Ops({
                method,
                op_Type,
                tmdb_id: tmdbID,
                data: tv_Movie_data,
                token: userData.token,
            });

            if (updatedBookmarks) handleBookMarks(true, updatedBookmarks);

            setLoading(false);
        } else handleBookMarks(false, null);
    };

    if (!allBookmarks)
        return (
            <span
                onClick={handleBookButton}
                className={`bookmarkButton ${customClass} flex items-center justify-center`}
            >
                <img
                    src={bookmarkIcon}
                    alt="bookmark"
                    className="nav-icon mx-2"
                />
            </span>
        );

    return (
        <span
            onClick={handleBookButton}
            className={`bookmarkButton ${customClass} flex items-center justify-center`}
            style={allBookmarks.has(tmdbID) ? { opacity: 1 } : null}
        >
            <img
                src={loadingIcon}
                alt="loading"
                className="nav-icon mx-2"
                style={{
                    position: "absolute",
                    opacity: `${loading ? "1" : "0"}`,
                    animation: "rotate 5s linear infinite", //animation decalred in index.css
                }}
            />
            <img
                src={
                    allBookmarks.has(tmdbID) ? bookmarkWhiteIcon : bookmarkIcon
                }
                alt="bookmark"
                className="nav-icon mx-2"
                style={{
                    position: "absolute",
                    opacity: `${loading ? "0" : "1"}`,
                }}
            />
        </span>
    );
};

export default BookmarkButton;
