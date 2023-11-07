/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      colors:{
        beige:'#F9F5F6',
        light:'#F8E8EE',
        medium:'#FDCEDF',
        dark:'#F2BED1',
        darker:'#F875AA'
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      }
    },
  },
  plugins: [
    // ...
  
],
}

