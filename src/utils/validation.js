export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
  return usernameRegex.test(username);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateNickname = (nickname) => {
  const nicknameRegex = /^[가-힣]{2,}$/;
  return nicknameRegex.test(nickname);
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};
