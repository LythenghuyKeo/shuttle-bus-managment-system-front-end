/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**.{html,ts}"],
  theme: {
    extend: {},
    colors:{
      'base':"#e6cb57",
      'white':"#ffffff",
      'baseBG':"#393534",
      'black':"#000000",
      'divider':"#eeebeb",
      'blue':"#5CA09F",
      "blueA-hover":"#3D6B6A",
      "gray":"#747F7F",
      "button-hover":"#AD9A44",
      "blue-hover":"#437574",
      "red":"#DE1904",
      "red-hover":"#A31904",
      "light-blue":"#126CE0",
      "light-blue-hover":"#0D4FA6",
      "green":"#17BA49",
      "grren-hover":"#179849"
    },  screens:{
      'xsm':'100px',
      'sm':'640px',
      'md':'900px',
      'lg':'1024px'
    },
    fontFamily:{
      prodsan:["prodsan","sans"]
},
fontSize:{
  'display-lg':"32px"
}
  },
  plugins: [],
}

