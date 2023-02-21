import { atom } from "recoil";

export const profileOpenState = atom({
  key: "profileOpenState",
  default: {
    profileOpen: false,
  }
});