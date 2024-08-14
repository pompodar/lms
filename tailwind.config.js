import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            transitionTimingFunction: {
                'custom-cubic': 'cubic-bezier(0.91, 0.01, 0.6, 0.99)',
            },
            backgroundColor: { // Corrected key
                'body-dark': 'rgb(6, 5, 40)', // Changed key name to avoid conflicts
            },
        },
    },
    plugins: [forms],
};
