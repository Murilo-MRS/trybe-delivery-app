/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */

const validUserMock = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const invalidEmail = {
  email: 'zebiritaemailcom',
  password: '$#zebirita#$',
};

const userNotFound = {
  email: 'ze@email.com',
  password: '$#zebirita#$',
};

const userInvalidPassword = {
  email: 'zebirita@email.com',
  password: '$#zebir#$',
};

const userResponseMock = {
  dataValues: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },
};

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjgxMjM0MjE3fQ.weqSHs60TUd2_mj5_wIWl3ok4SL9_VkOQoBNjlMPNXQ';

const loginResponseSuccess = {
  token: tokenMock,
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
};

const registerResponseMock = {
  dataValues: {
    id: 4,
    password: 'fcea920f7412b5da7be0cf42b8c93759',
    email: 'cicrana@deliveryapp.com',
    name: 'Cicrana Pereira',
    role: 'customer',
  },
};

const newUserMock = {
  name: 'Cicrana Pereira',
  email: 'cicrana@deliveryapp.com',
  password: '1234567',
  role: 'customer',
};

const registerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjaWNyYW5hQGRlbGl2ZXJ5YXBwLmNvbSIsIm5hbWUiOiJDaWNyYW5hIFBlcmVpcmEiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjgxMjM1MDQ4fQ.rN_nC2IM9EKwAcA7nWqi3CZR7tGCSLjQoNC4-1qelLE';

const registerResponseSuccess = {
  token: registerToken,
  id: 4,
  email: 'cicrana@deliveryapp.com',
  name: 'Cicrana Pereira',
  role: 'customer',
};

const sellerTwo = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: '3c28d2b0881bf46457a853e0b07531c6',
  role: 'seller',
};

const sellerFour = {
  id: 4,
  name: 'Cicrana Pereira',
  email: 'cicrana@deliveryapp.com',
  password: 'fcea920f7412b5da7be0cf42b8c93759',
  role: 'seller',
};

const sellersMock = [
  {
    dataValues: sellerTwo,
  },
  {
    dataValues: sellerFour,
  },   
];

const responseGetAllSellers = [sellerTwo, sellerFour];

const tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjgxMjM3NTA3fQ.00VV9tyK1gqLpbwylqyPeBEskNxqAdYNgkwRDZTQHBI';

module.exports = {
  validUserMock,
  userResponseMock,
  loginResponseSuccess,
  tokenMock,
  registerResponseMock,
  registerResponseSuccess,
  registerToken,
  newUserMock,
  sellersMock,
  responseGetAllSellers,
  tokenAdmin,
  invalidEmail,
  userNotFound,
  userInvalidPassword,
};