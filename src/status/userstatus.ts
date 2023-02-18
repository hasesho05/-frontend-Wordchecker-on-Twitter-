import { atom } from "recoil";

export const userStatusState = atom({
  key: "userStatusState",
  default: {
    icon: "",
    username: "",
    isSignedIn: false,
  }
});