/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-yellow': '#FEDA14',
        'my-blue':'#263571',
        'my-golden':'#daa520'
      },
    },
  },
  plugins: [],
}
