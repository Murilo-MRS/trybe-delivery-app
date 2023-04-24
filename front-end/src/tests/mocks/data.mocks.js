/* eslint-disable max-len */
const emailDataTestId = 'common_login__input-email';
const loginBtnDataTestId = 'common_login__button-login';
const registerBtnDataTestId = 'common_login__button-register';
const passwordDataTestId = 'common_login__input-password';
const customerEmail = 'zebirita@email.com';
const customerPassword = '$#zebirita#$';
const admEmail = 'adm@deliveryapp.com';
const admPassword = '--adm2@21!!--';
const sellerEmail = 'fulana@deliveryapp.com';
const sellerPassword = 'fulana@123';
const STATUS_OK = 200;
const CREATED_STATUS = 201;
const DELETE_STATUS = 204;
const NOT_FOUND = 404;
const loginEndpoint = 'http://localhost:3001/login';

const TOKEN_CUSTOMER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o';
const TOKEN_SELLER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIn0sImlhdCI6MTY4MTMyNzk5NCwiZXhwIjoxNjgxOTMyNzk0fQ.BaHuWKIaXOf-M4DRYAMT_Xr4t6UCsOF8iV95dwsz5U0';
const TOKEN_ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjgxMjM5MDUyLCJleHAiOjE2ODE4NDM4NTJ9.fB-uigOpqdz_Y3Enzmw_CVVl816ne529XJEBVhh8nAA';

const nameDataTestId = 'common_register__input-name';
const emailRegisterDataTestId = 'common_register__input-email';
const passwordRegisterDataTestId = 'common_register__input-password';
const registerRegisterBtnDataTestId = 'common_register__button-register';
const validName = 'João da Silva';
const validEmail = 'joao@email.com';
const validPassword = 'joao123';
const alreadyUsedEmail = 'zebirita@email.com';
const registerEndpoint = 'http://localhost:3001/login';
const checkoutBtnDataTestId = 'customer_products__checkout-bottom-value';

const selectSellerDataTestId = 'customer_checkout__select-seller';
const inputAddressDataTestId = 'customer_checkout__input-address';
const inputAddressNumDataTestId = 'customer_checkout__input-address-number';
const finishBtnDataTestId = 'customer_checkout__button-submit-order';
const deliveredBtnDataTestId = 'customer_order_details__button-delivery-check';

const newUsername = 'exemplo exemplo';
const newUserEmail = 'exemplo@exemplo.com';
const newUserPassword = '111111';
const selectValue = 'customer';
const newUserMock = {
  id: 4,
  name: newUsername,
  email: newUserEmail,
  password: newUserPassword,
  role: selectValue,
};
const admRegisterBtnDataTestId = 'admin_manage__button-register';
const admRegisterNameDataTestId = 'admin_manage__input-name';
const admRegisterEmailDataTestId = 'admin_manage__input-email';
const admRegisterPasswordDataTestId = 'admin_manage__input-password';
const admRegisterSelectDataTestId = 'admin_manage__select-role';
const admRegisterErrMsgDataTestId = 'admin_manage__element-invalid-register';

export {
  emailDataTestId, loginBtnDataTestId,
  registerBtnDataTestId, passwordDataTestId,
  customerEmail, customerPassword,
  admEmail, admPassword,
  sellerEmail, sellerPassword,
  STATUS_OK, NOT_FOUND, CREATED_STATUS,
  loginEndpoint, TOKEN_CUSTOMER, DELETE_STATUS,
  TOKEN_SELLER, TOKEN_ADMIN,
  nameDataTestId, validName,
  validEmail, validPassword,
  alreadyUsedEmail, registerEndpoint,
  emailRegisterDataTestId, passwordRegisterDataTestId,
  registerRegisterBtnDataTestId, checkoutBtnDataTestId,
  selectSellerDataTestId, inputAddressDataTestId,
  inputAddressNumDataTestId, finishBtnDataTestId,
  deliveredBtnDataTestId, newUsername,
  newUserEmail, newUserPassword,
  selectValue, admRegisterBtnDataTestId,
  admRegisterNameDataTestId, admRegisterEmailDataTestId,
  admRegisterPasswordDataTestId, admRegisterSelectDataTestId,
  admRegisterErrMsgDataTestId, newUserMock,
};
