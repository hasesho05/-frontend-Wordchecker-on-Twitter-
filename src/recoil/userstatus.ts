import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : sessionStorage
});

export const userStatusState = atom({
  key: 'userStatusState',
  default: {
    id: 1,
    userId: "",
    username: "",
    icon: "",
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
