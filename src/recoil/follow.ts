import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : sessionStorage
});

export const followingState = atom({
  key: 'followingState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
