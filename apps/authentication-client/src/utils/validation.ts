export const validateEmail = (email: string) => {
  let validRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const emailValid = email.match(validRegex) ? true : false;
  return emailValid;
};
export const validateUsername = (username: string) => {
  let validRegex = '^[A-Za-z][A-Za-z0-9_]{7,29}$';
  const usernameValid = username.match(validRegex) ? true : false;
  return usernameValid;
};
export const validatePassword = (password: string) => {
  if (password.length < 6) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }
  return true;
};
