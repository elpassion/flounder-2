// Extend colors/variables here so it will be propagated to admin/frontend apps
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        'sample-extended-color': '#ffc0cb',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
