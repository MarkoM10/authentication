const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#465362',
        'main-blue': '#4F46E5',
        'p-green': '#1EA896',
        'gray-light': '#374151',
        'white-light': '#F7F7F2',
      },
      backgroundImage: {
        form: "url('./assets/images/formBgImg.jpg')",
      },
    },
  },
  plugins: [],
};
