// Generate 4 random digits for email
const randomEmailDigits = Math.floor(1000 + Math.random() * 9000); // 1000-9999

// Generate 8 random digits for contact number
const randomContactNumber = Math.floor(10000000 + Math.random() * 90000000); // 10000000-99999999

export const customerData = {
  firstName: 'Test',
  lastName: 'Test',
  dob: '05/05/2005',
  email: `paulotest${randomEmailDigits}@yopmail.com`,
  password: 'Test123!',
  contactNumber: `04${randomContactNumber}`
};

export const cardDeclined = {
  number: '4242 4242 4242 4242',
  expiry: '01/27',
  cvv: '123'
};

export const address = 'Level 6 17-19 Bridge St, SYDNEY NSW 2000';
