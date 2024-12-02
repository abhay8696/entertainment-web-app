/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                fullScreen: "100vw",
            },
            colors: {
                primary: "#FC4747",
                "dark-blue": "#10141E",
                white: "#FFFFFF",
                "greyish-blue": "#5A698F",
                "semi-dark-blue": "#161D2F",
            },
        },
        fontSize: {
            h1: ["3.1875rem", { lineHeight: "3.5rem" }], // 51px
            h2: ["2.25rem", { lineHeight: "2.5rem" }], // 36px
            h3: ["1.875rem", { lineHeight: "2.25rem" }], // 30px
            h4: ["1.5rem", { lineHeight: "2rem" }], // 24px
            h5: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
            h6: ["1rem", { lineHeight: "1.5rem" }], // 16px
        },
        boxShadow: {
            custom: "2px 2px 5px 0px rgba(0, 0, 0, 0.75)",
        },
        zIndex: {
            "-1": "-1",
            50: "50",
            100: "100",
        },
    },
    plugins: [],
};

/**
 * npx tailwindcss -i ./index.css -o ./src/output.css --watch
 */
