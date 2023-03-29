const verifyFields = (email, password) => {
  const MIN_LENGTH = 6;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(email) && password.length >= MIN_LENGTH;
};

export default verifyFields;
