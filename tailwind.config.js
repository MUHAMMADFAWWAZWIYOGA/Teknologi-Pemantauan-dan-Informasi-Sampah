import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';

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
            colors: {
                // brand palette (emerald-based) for dashboard styling
                brand: {
                    50: colors.emerald[50],
                    100: colors.emerald[100],
                    200: colors.emerald[200],
                    300: colors.emerald[300],
                    400: colors.emerald[400],
                    500: colors.emerald[500],
                    600: colors.emerald[600],
                    700: colors.emerald[700],
                    800: colors.emerald[800],
                    900: colors.emerald[900],
                },
                // Keep a named accent for indigo and amber for easy use
                accent: {
                    indigo: colors.indigo[500],
                    amber: colors.amber[400],
                },
            },
        },
    },

    plugins: [forms],
};
