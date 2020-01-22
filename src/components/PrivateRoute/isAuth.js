import jwt_decode from "jwt-decode";

export const checkAuthForPrivateRoute = () => {
  let jwtToken = localStorage.getItem("jwtToken-reddit");

  let decoded;

  if (jwtToken) {
    const currentTime = Date.now() / 1000;
    decoded = jwt_decode(jwtToken);

    if (decode.exp < currentTime) {
      localStorage.removeItem("jwtToken-reddit");
      return false;
    } else {
      return true;
    }
  }
};
