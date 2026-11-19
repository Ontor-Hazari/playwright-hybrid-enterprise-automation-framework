export const catalogTestData = {
  categories: {
    women: { group: 'Women', subCategory: 'Tops', expectedTitle: /women - tops products/i },
    men: { group: 'Men', subCategory: 'Jeans', expectedTitle: /men - jeans products/i },
  },
  brands: {
    first: { name: 'Polo', expectedTitle: /brand - polo products/i },
    second: { name: 'Madame', expectedTitle: /brand - madame products/i },
  },
  search: {
    term: 'Jeans',
  },
  heroText: 'Full-Fledged practice website for Automation Engineers',
  review: {
    name: 'Automation QA User',
    text: 'Great product, automated review check.',
    successMessage: 'Thank you for your review.',
  },
} as const;
