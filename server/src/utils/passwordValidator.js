const isPasswordValid = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>~`_+\-=\[\]\\;'<>\/]/.test(password);

  const validationResults = {
    minLength: password.length >= minLength,
    hasUpperCase,
    hasLowerCase,
    hasDigit,
    hasSpecialChar,
  };

  const isValid = Object.values(validationResults).every(Boolean);

  const failedRequirement = Object.entries(validationResults).find(([_key, value]) => !value);

  let errorMessage = "";

  if (failedRequirement?.length > 0) {
    switch (failedRequirement[0]) {
      case "minLength":
        errorMessage = "The password must be at least 8 characters long.";
        break;
      case "hasUpperCase":
        errorMessage = "The password must contain at least one uppercase letter.";
        break;
      case "hasLowerCase":
        errorMessage = "The password must contain at least one lowercase letter.";
        break;
      case "hasDigit":
        errorMessage = "The password must contain at least one digit.";
        break;
      case "hasSpecialChar":
        errorMessage = "The password must contain at least one special character.";
        break;
      default:
        errorMessage = "The password does not meet the required criteria.";
    }
  }

  return { isValid, errorMessage };
};

export default isPasswordValid;
