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
      "gray":"#747F7F",
      "button-hover":"#AD9A44",
      "blue-hover":"#437574"
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

