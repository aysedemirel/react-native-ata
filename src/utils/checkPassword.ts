const MIN_PASSWORD_LENGHT = 8;

const hasMinimumLength = (pass: string): boolean =>
  pass.length >= MIN_PASSWORD_LENGHT;

const hasUpperCase = (pass: string): boolean => /[A-Z]/.test(pass);

const hasLowerCase = (pass: string): boolean => /[a-z]/.test(pass);

const hasNumber = (pass: string): boolean => /\d/.test(pass);

const hasSpecialCharacter = (text: string): boolean => {
  const specialCharRegex = /[^A-Za-z0-9]/;
  return specialCharRegex.test(text);
};

const hasAllowedSpecialCharacter = (password: string) =>
  /[@#_\-*+=!]/.test(password);

export {
  hasLowerCase,
  hasUpperCase,
  hasMinimumLength,
  hasNumber,
  hasSpecialCharacter,
  hasAllowedSpecialCharacter,
};
