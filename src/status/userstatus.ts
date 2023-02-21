import { atom } from "recoil";

export const userStatusState = atom({
  key: "userStatusState",
  default: {
    id: "",
    icon: "",
    username: "",
    isSignedIn: false,
  }
});