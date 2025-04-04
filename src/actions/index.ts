import login from "./login";
import logout from "./logout";
import addStatus from "./addStatus";

export const server = {
  login: login,
  logout: logout,
  status: addStatus,
}