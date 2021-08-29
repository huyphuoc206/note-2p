let ACCESS_TOKEN;

const decodeBase64 = (input) => {
  return decodeURIComponent(
    atob(input)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};

const isExpired = (token) => {
  if (token) {
    const data = token.split(".");
    if (data.length !== 3) return;
    const result = JSON.parse(decodeBase64(data[1]));
    const expiredDate = new Date(result.exp * 1000).getTime();
    const currentDate = new Date().getTime();
    if (currentDate >= expiredDate) {
      ACCESS_TOKEN = undefined;
      return true;
    } else {
      return false;
    }
  }
  return true;
};

const getUserInfo = (token) => {
  if (token) {
    const data = token.split(".")
    if (data.length !== 3) return null
    const result = JSON.parse(decodeBase64(data[1]))
    const userInfo = {
      id: result['sub'],
      fullname: result['fullname'],
    };
    return userInfo;
  }
  return null;
};

export default {
  ACCESS_TOKEN: ACCESS_TOKEN,
  isExpired: isExpired,
  getUserInfo: getUserInfo,
};
