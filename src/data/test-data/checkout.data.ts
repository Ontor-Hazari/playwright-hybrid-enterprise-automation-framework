export const checkoutTestData = {
  comment: 'Please deliver during business hours.',
  payment: {
    nameOnCard: 'Automation QA User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030',
  },
  orderConfirmedMessage: 'Congratulations! Your order has been confirmed!',
} as const;
