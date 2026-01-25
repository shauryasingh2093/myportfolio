/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'hero': '#FAD0C4',
                'about': '#C6A2B8',
                'process': '#A67B8C',
                'dark': '#4A3440',
                'mauve-soft': '#DDBDCF',
                'mauve-deep': '#8E6A7D',
            },
            fontFamily: {
                'sans': ['Plus Jakarta Sans', 'sans-serif'],
                'serif': ['Playfair Display', 'serif'],
            },
            borderRadius: {
                'custom': '60px',
            },
            boxShadow: {
                'neumorphic-light': 'inset -5px -5px 15px rgba(255, 255, 255, 0.8), inset 5px 5px 15px rgba(0, 0, 0, 0.1)',
                'neumorphic-dark': '-10px -10px 30px rgba(255, 255, 255, 0.15), 10px 10px 30px rgba(0, 0, 0, 0.3)',
                'neumorphic-card': 'inset -5px -5px 15px rgba(255, 255, 255, 0.05), 10px 10px 30px rgba(0, 0, 0, 0.2)',
                'neumorphic-card-hover': 'inset -5px -5px 15px rgba(255, 255, 255, 0.1), 15px 15px 40px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [],
}
