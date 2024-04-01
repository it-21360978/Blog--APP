/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kalam: ['kalam'],
        exo2:['exo2'],
        sansita:['sansita swashed']
        },

        backgroundImage: {
          'wave': "url('./assets/cool-background.svg')",
          'nBack':"url('./assets/header.a6837f08.png')",
          'blob':"url('./assets/newback.png')",
          'regBack':"url('./assets/dddepth-036.jpg')",
          'regBack1':"url('./assets/dddepth-034.jpg')",
          'Back':"url('./assets/text.png')",
         
         
        },
       
    },
  },
  plugins: [
   
  ],
}