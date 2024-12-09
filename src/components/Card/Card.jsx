import React, { useContext, useState } from "react";
//styles
import "./Card.css";
import "../../imageUrls.css";
//components
import CardTexts from "../CardTexts/CardTexts";
//context
import { ModalContext } from "../../contexts/AllContexts";
//assets
import bookmark from "../../assets/icon-bookmark-outline.svg";
import bookmarkWhite from "../../assets/icon-bookmark-white-small.svg";
import loadingIcon from "../../assets/icon-loading.svg";
//helper functions
import { transformString } from "../../functions";
import { bookmark_Ops } from "../../backend_functions";
import Loading from "../Loading/Loading";

const dummyImg =
    "https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc";

const Card = (props) => {
    //props
    const {
        allData,
        year,
        category,
        rating,
        title,
        noData,
        thumbnail,
        trendImg,
        poster,
        parentComp,
        allBookmarks,
        handleBookMarks,
        cardID,
        customClassName,
    } = props;
    const { name, characterName } = props;

    //contexts
    const [Modal, SetModal] = useContext(ModalContext);
    //varaibles
    let cardTitle = title;

    //states
    const [loading, setLoading] = useState(false);

    title === "1998" ? (cardTitle = "NinteenNightyEight") : null;
    title === "112" ? (cardTitle = "OneHundredAndTwelve") : null;

    const DisplayInfo = ({ padding }) => {
        return (
            <div
                div
                className={`CardTexts flex flex-col items-start ${padding} justify-between`}
            >
                <CardTexts
                    year={year}
                    category={category}
                    rating={rating}
                    title={title}
                    noData={noData}
                    name={name}
                    characterName={characterName}
                    parentComp={parentComp}
                />
            </div>
        );
    };
    const DisplayBookmarkButton = () => {
        const handleBookButton = async (evt) => {
            evt.stopPropagation();

            //check if user is logged in
            //  check if cardID is present is allBookmarks map
            //      if true delete, and call backend function
            //  else add new, and call backend function
            //else display auth page

            const userData = JSON.parse(
                window.localStorage.getItem("ewa_user")
            );

            if (userData) {
                setLoading(true);

                let method, op_Type;
                if (allBookmarks.has(cardID)) {
                    method = "delete";
                    op_Type = "delete";
                } else {
                    method = "post";
                    op_Type = "new";
                }
                let updatedBookmarks = await bookmark_Ops({
                    method,
                    op_Type,
                    tmdb_id: cardID,
                    data: allData,
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
                    className="cardButton flex items-center justify-center"
                >
                    <img
                        src={bookmark}
                        alt="bookmark"
                        className="nav-icon mx-2"
                    />
                </span>
            );

        return (
            <span
                onClick={handleBookButton}
                className="cardButton flex items-center justify-center"
                style={allBookmarks.has(cardID) ? { opacity: 1 } : null}
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
                    src={allBookmarks.has(cardID) ? bookmarkWhite : bookmark}
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

    return (
        <div
            className={`CardWrapper ${customClassName} cursor-pointer `}
            onClick={() => console.log(allData)}
        >
            <div
                className={`Card flex ${parentComp}-card`}
                id={`${transformString(cardTitle)}-small`} //remove spaces nad special characters
                style={{
                    backgroundImage: poster
                        ? `url(https://image.tmdb.org/t/p/w220_and_h330_face${poster})`
                        : `url(${dummyImg})`,
                }}
                onClick={() => SetModal({ position: "up", data: allData })}
                // onClick={()=> console.log(allData)}
            >
                <DisplayBookmarkButton />
                {parentComp === "Trending" ? (
                    <DisplayInfo padding="p-3 md:p-5" />
                ) : null}
            </div>
            {parentComp != "Trending" ? (
                <DisplayInfo padding="py-3 md:py-5" />
            ) : null}
        </div>
    );
};

export default Card;
