/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue,svelte}"
    ],
    theme: {
        container: {
            padding: '2rem',
            center: true,
        },
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif']
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
