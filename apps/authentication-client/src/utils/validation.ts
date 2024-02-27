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
export const validateName = (name: string) => {
  let validRegex = /^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/;
  const nameValid = name.match(validRegex) ? true : false;
  return nameValid;
};
export const validatePhoneNumber = (phone: string) => {
  let validRegex = '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$';
  const phoneValid = phone.match(validRegex) ? true : false;
  return phoneValid;
};
