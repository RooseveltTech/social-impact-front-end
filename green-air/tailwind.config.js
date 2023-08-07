/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
				'sans': ['Ubuntu', 'sans-serif'],
			},
            colors: {
				"primary-marine-blue": '#02295a',
				'primary-purplish-blue': '#473dff',
				'primary-pastel-blue': '#adbeff',
				'primary-light-blue': '#bfe2fd',
				'primary-starberry-red': '#ed3548',
				'neutral-cool-gray': '#9699ab',
				'neutral-light-gray': '#d6d9e6',
				'neutral-magnolia': '#f0f6ff',
				'neutral-alabaster': '#fafbff'
			},
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'sidebar-image-mobile': "url('../../public/assets/images/bg-sidebar-mobile.svg')",
				'sidebar-image-desktop': "url('../../public/assets/images/bg-sidebar-desktop.svg')",
            }
        },
    },
    plugins: [
        require("flowbite/plugin")
    ],
}
